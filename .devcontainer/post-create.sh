#!/usr/bin/env bash
# Replicates the Coursera lab's shared dependency install. The lab image
# installs one package.json as /home/coder/package.json so that Node, walking
# up from any assignment folder, finds a node_modules with every package the
# Course 3 assignments need. Here the same manifest is installed one level
# above the repo checkout (/workspaces), which sits on the walk-up path of
# every folder in the repo. No per-assignment npm install is needed.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
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

# Learners should not have the practice solutions sitting next to the
# starters. git sparse-checkout drops them from the working tree while
# keeping it clean (authors: `git sparse-checkout disable` restores them;
# they also remain visible in the repo on GitHub).
(cd "$here/.." && git sparse-checkout set --no-cone '/*' '!**/solution/**' 2>/dev/null) || \
    echo "post-create: sparse-checkout of solution/ dirs failed; they remain visible" >&2

# Suppress the workspace-trust prompt, as the course lab does. Trust is an
# application-scoped setting, so it goes in the remote machine settings.
machine_settings="$HOME/.vscode-remote/data/Machine/settings.json"
mkdir -p "$(dirname "$machine_settings")"
node -e '
const fs = require("fs");
const p = process.argv[1];
let s = {};
try { s = JSON.parse(fs.readFileSync(p, "utf8")); } catch (e) {}
s["security.workspace.trust.enabled"] = false;
s["security.workspace.trust.startupPrompt"] = "never";
fs.writeFileSync(p, JSON.stringify(s, null, 2));
' "$machine_settings"
echo "post-create: solutions hidden, workspace trust prompt disabled"
