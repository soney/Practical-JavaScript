#!/usr/bin/env bash
# Installs the course-specific extensions that are not published on any
# marketplace, from the .vsix files vendored next to this script:
#   - Portable Live Preview: in-editor preview of the assignment HTML pages
#   - Save Files As Zip: download your work as a zip (to submit on Coursera)
#   - Practical JavaScript Course Companion: course outline, progress, and
#     assignment submission
# Runs on every attach and is a no-op once all are installed. The `code` CLI
# only exists after the editor attaches, which is why this is not part of
# post-create.
set -uo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

if ! command -v code >/dev/null 2>&1; then
    echo "install-local-extensions: no 'code' CLI yet; will retry on next attach" >&2
    exit 0
fi

# id@version pairs: the version pin means a newer vendored vsix reinstalls
# over an older copy on the next attach (the plain id check would skip it).
installed="$(code --list-extensions --show-versions 2>/dev/null || true)"

for pair in \
    "local.portable-live-preview@0.1.0:portable-live-preview.vsix" \
    "local.save-files-as-zip@0.0.1:save-files-as-zip.vsix" \
    "oney.practical-js-companion@0.4.3:practical-js-companion.vsix"; do
    id="${pair%%:*}"
    file="${pair#*:}"
    case "$installed" in
        *"$id"*) ;;
        *) code --install-extension "$here/extensions/$file" || \
               echo "install-local-extensions: $id install failed; run manually: code --install-extension .devcontainer/extensions/$file" >&2 ;;
    esac
done
