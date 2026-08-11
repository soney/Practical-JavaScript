#!/usr/bin/env bash
# Replicates the Coursera lab's shared dependency install. The lab image
# installs one package.json as /home/coder/package.json so that Node, walking
# up from any assignment folder, finds a node_modules with every package the
# Course 3 assignments need. Here the same manifest is installed one level
# above the repo checkout (/workspaces), which sits on the walk-up path of
# every folder in the repo. No per-assignment npm install is needed.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

# FIRST, before anything that could fail the script: learners should not
# have the practice solutions sitting next to the starters. sparse-checkout
# drops them from the working tree while keeping it clean (authors:
# `git sparse-checkout disable` restores them; they remain on GitHub).
# safe.directory guards against Codespaces ownership mismatches.
(
    cd "$here/.." && \
    git config --global --add safe.directory "$(pwd)" 2>/dev/null; \
    git sparse-checkout set --no-cone '/*' '!/assignments/**/solution/**'
) || echo "post-create: sparse-checkout of solution/ dirs failed; post-start will retry" >&2
parent="$(dirname "$(dirname "$here")")"   # /workspaces in a codespace

if [ ! -w "$parent" ] && command -v sudo >/dev/null 2>&1; then
    sudo chown "$(id -un)" "$parent" || true
fi
if [ ! -w "$parent" ]; then
    echo "post-create: $parent is not writable; skipping shared dependency install" >&2
    exit 0
fi

if [ -e "$parent/package.json" ]; then
    echo "post-create: $parent/package.json already exists; leaving it alone"
else
    cp "$here/lab-package.json" "$parent/package.json"
fi

cd "$parent"
npm install --no-audit --no-fund
echo "post-create: node $(node --version), shared packages installed in $parent/node_modules"

# --- In-codespace autograder -------------------------------------------
# Grading runs locally against the encrypted bundle in grader/ (see
# grader/README.md). None of this is required to work through the course
# materials, so a failure here warns instead of breaking codespace
# creation; post-start retries the install on every container start.
grader_system_deps() {
    # Cypress's Electron browser needs an X server and the usual GTK/NSS
    # runtime libraries (Ubuntu 24.04 package names).
    sudo apt-get update -y && \
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        xvfb xauth unzip \
        libgtk2.0-0t64 libgtk-3-0t64 libgbm1 libnotify4 \
        libnss3 libxss1 libasound2t64 libxtst6
}
if command -v sudo >/dev/null 2>&1 && grader_system_deps; then
    if node "$here/grader/setup-grader.js"; then
        echo "post-create: in-codespace grader installed"
    else
        echo "post-create: grader setup failed; Submit will not work until 'node .devcontainer/grader/setup-grader.js' succeeds" >&2
    fi
else
    echo "post-create: could not install grader system packages; skipping grader setup" >&2
fi


# Suppress the workspace-trust prompt, as the course lab does. Trust is an
# application-scoped setting, so it goes in the remote machine settings.
# Merge-only: if an existing file does not parse (JSONC etc.), leave it
# alone rather than clobbering whatever the platform put there.
machine_settings="$HOME/.vscode-remote/data/Machine/settings.json"
mkdir -p "$(dirname "$machine_settings")"
node -e '
const fs = require("fs");
const p = process.argv[1];
let s = {};
if (fs.existsSync(p)) {
  try { s = JSON.parse(fs.readFileSync(p, "utf8")); }
  catch (e) { console.error("post-create: leaving unparseable " + p + " alone"); process.exit(0); }
}
s["security.workspace.trust.enabled"] = false;
s["security.workspace.trust.startupPrompt"] = "never";
fs.writeFileSync(p, JSON.stringify(s, null, 2));
' "$machine_settings"
echo "post-create: solutions hidden, workspace trust prompt disabled"
