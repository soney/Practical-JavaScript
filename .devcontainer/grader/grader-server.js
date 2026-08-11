#!/usr/bin/env node

// The in-codespace grading service: the same HTTP surface as the (retired)
// aws-grader wrapper, bound to 127.0.0.1, running the engine that
// setup-grader.js installed under ~/.pjs-grader. The companion extension's
// Submit button posts here (pjsCompanion.graderUrl in devcontainer.json);
// post-start.sh keeps the service running.
//
// API (unchanged from aws-grader, so the extension needed no code change):
//   GET  /healthz   liveness + installed bundle version
//   GET  /parts     gradable part ids: {partId, filename, assignment}
//   POST /grade     { "partId": "...", "files": { "<deliveredName>":
//                     "<utf8>" | {"base64": "..."} }, "html": true? }
//     -> { ok, partId, fractionalScore, feedback, feedbackType,
//          gradingSeconds, htmlFeedback? }
//
// The engine is invoked exactly as production invokes it (grader.js with
// --graderDir/--feedbackDir/--submissionDir), so scores match Coursera's.
// There is no auth: the socket only accepts connections from inside the
// learner's own codespace, and the only thing a caller can do is grade
// their own files on their own machine.
//
// Env: PJS_GRADER_PORT (8123), PJS_GRADER_HOME (~/.pjs-grader),
//      PJS_GRADE_TIMEOUT_SECONDS (300), PJS_GRADER_SHIMS (defaults on in a
//      codespace: containers without a Chromium sandbox helper need
//      --no-sandbox etc.), PJS_GRADER_ELECTRON_ARGS (override the shim set).

'use strict';

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const HOST = '127.0.0.1';
const PORT = Number(process.env.PJS_GRADER_PORT || 8123);
const TIMEOUT_S = Number(process.env.PJS_GRADE_TIMEOUT_SECONDS || 300);
const MAX_BODY = 20 * 1024 * 1024;

const ROOT = process.env.PJS_GRADER_HOME || path.join(os.homedir(), '.pjs-grader');
const SHARED = path.join(ROOT, 'work', 'shared');
const SUBMISSION = path.join(SHARED, 'submission');

// The engine lives behind the `current` symlink, which setup-grader repoints
// on upgrades - resolve it per request so a new bundle takes effect without
// a restart. Resolve to the REAL path: Cypress realpaths the project root
// before matching spec globs, so specs handed over under the symlinked path
// match nothing ("no spec files were found") - and the engine's no-failures
// branch would score that empty run 1.0.
function engineDir() {
  try {
    return path.join(fs.realpathSync(path.join(ROOT, 'current')), 'grader');
  } catch (e) {
    return null;
  }
}

// Containers usually cannot run Chromium's setuid sandbox (and codespaces
// keep /dev/shm small), so inside a codespace Electron needs the same flags
// a docker Cypress run needs. Off elsewhere so local author runs match
// production exactly.
const shims = process.env.PJS_GRADER_SHIMS != null
  ? process.env.PJS_GRADER_SHIMS === '1'
  : !!process.env.CODESPACES;

let busy = false;

function engineVersion() {
  try {
    const stamp = path.join(fs.realpathSync(path.join(ROOT, 'current')), '.install-ok');
    return JSON.parse(fs.readFileSync(stamp, 'utf8')).version;
  } catch (e) {
    return null;
  }
}

function json(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readBody(req, res, cb) {
  const chunks = [];
  let size = 0;
  req.on('data', (c) => {
    size += c.length;
    if (size > MAX_BODY) {
      req.destroy();
      return json(res, 413, { ok: false, error: `body over ${MAX_BODY} bytes` });
    }
    chunks.push(c);
  });
  req.on('end', () => cb(Buffer.concat(chunks)));
}

function safeName(name) {
  // Delivered filenames are flat basenames; anything with a path in it is
  // not a legal submission file.
  return name && !name.includes('/') && !name.includes('\\') && !name.includes('..');
}

function stageFiles(files) {
  for (const [name, value] of Object.entries(files || {})) {
    if (!safeName(name)) throw new Error(`illegal filename: ${name}`);
    const target = path.join(SUBMISSION, name);
    if (value && typeof value === 'object' && typeof value.base64 === 'string') {
      fs.writeFileSync(target, Buffer.from(value.base64, 'base64'));
    } else if (typeof value === 'string') {
      fs.writeFileSync(target, value, 'utf8');
    } else {
      throw new Error(`file ${name} must be a string or {base64: ...}`);
    }
  }
}

// Fresh state for every grade: the staging dirs, plus the paths inside the
// engine dir that a run writes (grader.js copies the submission into
// <engine>/submission; Cypress writes screenshots/downloads on failures).
function resetWorkspace(engine) {
  for (const d of [
    path.join(ROOT, 'work'),
    path.join(engine, 'submission'),
    path.join(engine, 'cypress', 'screenshots'),
    path.join(engine, 'cypress', 'downloads'),
  ]) {
    fs.rmSync(d, { recursive: true, force: true });
  }
  fs.mkdirSync(SUBMISSION, { recursive: true });
}

function runGrader(engine, partId, userId, cb) {
  const env = { ...process.env, partId };
  if (userId) env.userId = String(userId);
  if (shims) {
    env.ELECTRON_EXTRA_LAUNCH_ARGS = process.env.PJS_GRADER_ELECTRON_ARGS ||
      '--no-sandbox --disable-dev-shm-usage --disable-gpu';
  }
  const child = spawn(
    'node',
    ['grader.js', '--feedbackDir', SHARED, '--submissionDir', SUBMISSION + '/'
      , '--graderDir', engine],
    { cwd: engine, env, detached: true, stdio: ['ignore', 'pipe', 'pipe'] }
  );
  let out = '';
  let err = '';
  const cap = (s, c) => (s.length < 20000 ? s + c : s);
  child.stdout.on('data', (c) => { out = cap(out, String(c)); });
  child.stderr.on('data', (c) => { err = cap(err, String(c)); });

  let done = false;
  const timer = setTimeout(() => {
    if (done) return;
    done = true;
    // The whole process group: a hung run means Cypress/Xvfb children too.
    try { process.kill(-child.pid, 'SIGKILL'); } catch (e) { /* already gone */ }
    cb({ timedOut: true, exitCode: null, out, err });
  }, TIMEOUT_S * 1000);

  child.on('close', (code) => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    console.log(`grader exit=${code} partId=${partId}`);
    if (err.trim()) console.log('grader stderr tail: ' + err.slice(-3000));
    // Cypress's own errors (spec not found, browser crash) only appear on
    // stdout, so keep its tail in the service log too.
    console.log('grader stdout tail: ' + out.slice(-3000));
    // The engine's exit code is not a success signal (it exits 1 on some
    // paths AFTER writing valid feedback); the caller reads feedback.json.
    cb({ timedOut: false, exitCode: code, out, err });
  });
}

function handleGrade(req, res, url) {
  const engine = engineDir();
  if (!engine || !fs.existsSync(path.join(engine, 'grader.js'))) {
    return json(res, 503, {
      ok: false,
      error: 'the grading engine is not installed; run '
        + '`node .devcontainer/grader/setup-grader.js` or rebuild the container',
    });
  }
  if (busy) {
    return json(res, 409, { ok: false, error: 'a grading run is already in progress' });
  }
  busy = true;
  const started = Date.now();
  const release = () => { busy = false; };

  readBody(req, res, (buf) => {
    let partId;
    let userId;
    let wantHtml = url.searchParams.get('html') === '1';
    try {
      resetWorkspace(engine);
      const body = JSON.parse(buf.toString('utf8'));
      partId = body.partId;
      userId = body.userId;
      if (body.html) wantHtml = true;
      stageFiles(body.files);
      if (!partId) {
        release();
        return json(res, 400, { ok: false, error: 'partId is required' });
      }
    } catch (e) {
      release();
      return json(res, 400, { ok: false, error: String(e.message || e) });
    }

    runGrader(engine, partId, userId, (r) => {
      const seconds = (Date.now() - started) / 1000;
      let feedback = null;
      try {
        feedback = JSON.parse(fs.readFileSync(path.join(SHARED, 'feedback.json'), 'utf8'));
      } catch (e) { /* handled below */ }

      if (!feedback || typeof feedback.fractionalScore !== 'number') {
        release();
        return json(res, 500, {
          ok: false,
          partId,
          error: r.timedOut ? `grading timed out after ${TIMEOUT_S}s` : 'grader produced no feedback.json',
          graderExit: r.exitCode,
          stdoutTail: r.out.slice(-4000),
          stderrTail: r.err.slice(-4000),
          gradingSeconds: seconds,
        });
      }

      const reply = {
        ok: true,
        partId,
        fractionalScore: feedback.fractionalScore,
        feedback: feedback.feedback,
        feedbackType: feedback.feedbackType || 'TEXT',
        gradingSeconds: seconds,
      };
      if (wantHtml) {
        try {
          reply.htmlFeedback = fs.readFileSync(path.join(SHARED, 'htmlFeedback.html'), 'utf8');
        } catch (e) { /* html is best-effort */ }
      }
      release();
      json(res, 200, reply);
    });
  });
}

function handleParts(req, res) {
  const engine = engineDir() || '';
  let filenames = {};
  let info = {};
  try { filenames = JSON.parse(fs.readFileSync(path.join(engine, 'filename-map.json'), 'utf8')); } catch (e) {}
  try { info = JSON.parse(fs.readFileSync(path.join(engine, 'assignment-info-map.json'), 'utf8')); } catch (e) {}
  const parts = Object.keys(filenames).sort().map((partId) => ({
    partId,
    filename: filenames[partId],
    assignment: (info[partId] && (info[partId].assignmentDir || info[partId].assignment)) || null,
  }));
  json(res, 200, { ok: true, count: parts.length, parts });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/healthz') {
    return json(res, 200, { ok: true, node: process.version, version: engineVersion(), shims });
  }
  if (req.method === 'GET' && url.pathname === '/parts') return handleParts(req, res);
  if (req.method === 'POST' && url.pathname === '/grade') return handleGrade(req, res, url);
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('practical-js in-codespace grader. POST /grade, GET /parts, GET /healthz\n');
  }
  json(res, 404, { ok: false, error: 'not found' });
});
server.listen(PORT, HOST, () => {
  console.log(`pjs grader listening on ${HOST}:${PORT} (root=${ROOT} engine=${engineDir()} shims=${shims} timeout=${TIMEOUT_S}s)`);
});
