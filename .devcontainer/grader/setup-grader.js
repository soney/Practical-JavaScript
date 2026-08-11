#!/usr/bin/env node

// Installs the in-codespace autograder from the encrypted bundle that ships
// beside this file (grader-bundle.enc + grader-bundle.json).
//
// What it does, once per bundle version:
//   1. decrypt grader-bundle.enc (bundle-format.js) and check its sha256
//      against the manifest
//   2. unzip it into ~/.pjs-grader/versions/<version>/grader
//   3. npm install the engine's dependencies there (Cypress downloads its
//      browser binary into ~/.cache/Cypress on first install)
//   4. `cypress verify`, so the slow first-run browser check happens during
//      codespace setup instead of on a learner's first Submit
//   5. point ~/.pjs-grader/current at the new version and prune old ones
//
// Everything lands under $HOME, outside the workspace, so none of it shows
// up in the explorer or search. Re-running is a fast no-op while the
// installed version matches the manifest; --force reinstalls.
//
// post-create.sh runs this at codespace creation; post-start.sh re-runs it
// on every start so a `git pull` that brought a new bundle takes effect
// after a container restart.

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const child_process = require('child_process');

const format = require(path.join(__dirname, 'bundle-format.js'));

const QUIET = process.argv.includes('--quiet');
const FORCE = process.argv.includes('--force');
const ROOT = process.env.PJS_GRADER_HOME || path.join(os.homedir(), '.pjs-grader');

const log = (msg) => { if (!QUIET) console.log(`setup-grader: ${msg}`); };
const fail = (msg) => { console.error(`setup-grader: ${msg}`); process.exit(1); };

function run(cmd, args, opts = {}) {
  const r = child_process.spawnSync(cmd, args, {
    stdio: QUIET ? 'ignore' : 'inherit',
    ...opts,
  });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} exited ${r.status}`);
}

const manifestPath = path.join(__dirname, 'grader-bundle.json');
const encPath = path.join(__dirname, 'grader-bundle.enc');
if (!fs.existsSync(manifestPath) || !fs.existsSync(encPath)) {
  fail(`no grader bundle next to ${__dirname}; was the bundle published?`);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const versionDir = path.join(ROOT, 'versions', manifest.version);
const engineDir = path.join(versionDir, 'grader');
const stampPath = path.join(versionDir, '.install-ok');
const currentLink = path.join(ROOT, 'current');

function pointCurrentAt(target) {
  // ln -sfn semantics: replace whatever `current` was, atomically enough
  // for a single-user machine.
  const tmp = `${currentLink}.tmp-${process.pid}`;
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.symlinkSync(target, tmp);
  fs.renameSync(tmp, currentLink);
}

if (!FORCE && fs.existsSync(stampPath)) {
  let currentTarget = null;
  try { currentTarget = fs.readlinkSync(currentLink); } catch (e) { /* missing */ }
  if (currentTarget !== versionDir) pointCurrentAt(versionDir);
  log(`bundle ${manifest.version} already installed`);
  process.exit(0);
}

log(`installing grader bundle ${manifest.version} (${manifest.plaintextBytes} bytes)`);

let zip;
try {
  zip = format.decrypt(fs.readFileSync(encPath));
} catch (e) {
  fail(`could not decrypt grader-bundle.enc: ${e.message}`);
}
if (format.sha256(zip) !== manifest.plaintextSha256) {
  fail('decrypted bundle does not match the manifest hash; refusing to install');
}

fs.rmSync(versionDir, { recursive: true, force: true });
fs.mkdirSync(engineDir, { recursive: true });
const zipPath = path.join(versionDir, 'bundle.zip');
fs.writeFileSync(zipPath, zip);
try {
  run('unzip', ['-q', '-o', zipPath, '-d', engineDir]);
} catch (e) {
  fail(`could not unzip the bundle (is unzip installed?): ${e.message}`);
} finally {
  fs.rmSync(zipPath, { force: true });
}

log('installing engine dependencies (first install downloads the Cypress browser) ...');
try {
  run('npm', ['install', '--no-audit', '--no-fund'], { cwd: engineDir });
} catch (e) {
  fail(`npm install failed in ${engineDir}: ${e.message}`);
}

// The browser unpack-and-verify step is the slow part of any fresh Cypress
// install; doing it here means the first Submit is a normal ~5-15 s grade.
log('verifying the Cypress browser ...');
try {
  run(path.join(engineDir, 'node_modules', '.bin', 'cypress'), ['verify'], { cwd: engineDir });
} catch (e) {
  fail(`cypress verify failed: ${e.message}`);
}

fs.writeFileSync(stampPath, JSON.stringify({
  version: manifest.version,
  installedAt: new Date().toISOString(),
}, null, 2) + '\n');
pointCurrentAt(versionDir);

// Old versions only waste disk once current points elsewhere.
const versionsRoot = path.join(ROOT, 'versions');
for (const name of fs.readdirSync(versionsRoot)) {
  if (name !== manifest.version) {
    fs.rmSync(path.join(versionsRoot, name), { recursive: true, force: true });
  }
}

log(`bundle ${manifest.version} installed at ${engineDir}`);
