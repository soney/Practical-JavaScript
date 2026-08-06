#!/usr/bin/env bash
# Runs on every container start. Keeps the learner workspace in shape even
# for codespaces created from older states: practice solution folders stay
# out of the working tree (idempotent; authors restore with
# `git sparse-checkout disable`).
set -uo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
cd "$here/.." || exit 0

if [ -d .git ] && ! git sparse-checkout list 2>/dev/null | grep -q 'solution'; then
    git sparse-checkout set --no-cone '/*' '!**/solution/**' 2>/dev/null || true
fi
