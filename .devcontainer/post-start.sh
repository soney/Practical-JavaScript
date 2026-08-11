#!/usr/bin/env bash
# Runs on every container start. Keeps the learner workspace in shape even
# for codespaces created from older states: practice solution folders stay
# out of the working tree. The check is against REALITY (are solution dirs
# on disk?), not against the sparse config, so a half-applied or failed
# earlier attempt self-heals here. Authors: `git sparse-checkout disable`
# restores the solutions for the current session; they return to hidden on
# the next start.
set -uo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

# --- In-codespace autograder -------------------------------------------
# Keep the local grading service alive across restarts. setup-grader is a
# fast no-op while the installed bundle matches .devcontainer/grader/, and
# installs it when post-create failed (or a git pull brought a new bundle
# and the container restarted). Port matches pjsCompanion.graderUrl.
if command -v node >/dev/null 2>&1 && [ -f "$here/grader/grader-server.js" ]; then
    node "$here/grader/setup-grader.js" --quiet || \
        echo "post-start: grader bundle install failed; Submit will not work yet" >&2
    if ! (exec 3<>/dev/tcp/127.0.0.1/8123) 2>/dev/null; then
        mkdir -p "$HOME/.pjs-grader"
        nohup node "$here/grader/grader-server.js" >>"$HOME/.pjs-grader/server.log" 2>&1 &
        echo "post-start: grading service starting on 127.0.0.1:8123"
    else
        exec 3>&- 2>/dev/null || true
    fi
fi

cd "$here/.." || exit 0
[ -d .git ] || exit 0

git config --global --add safe.directory "$(pwd)" 2>/dev/null || true

# Count without a `head` in the pipeline: under `pipefail`, head closing the
# pipe early makes find fail with SIGPIPE and the whole test read as false,
# which silently skipped the fix.
count_solutions() {
    find assignments -maxdepth 5 -type d -name solution 2>/dev/null | wc -l | tr -d ' '
}

if [ "$(count_solutions)" != "0" ]; then
    git sparse-checkout set --no-cone '/*' '!/assignments/**/solution/**' || true
    git sparse-checkout reapply 2>/dev/null || true
    left="$(count_solutions)"
    if [ "$left" != "0" ]; then
        echo "post-start: $left solution dirs still present after sparse-checkout" >&2
    else
        echo "post-start: practice solutions hidden"
    fi
fi
