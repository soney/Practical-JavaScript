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
