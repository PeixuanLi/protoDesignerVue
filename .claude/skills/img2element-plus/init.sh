#!/usr/bin/env bash
# img2element-plus project scaffold initializer
# Usage: bash init.sh <project-name> [output-root]
# Example: bash init.sh "0412-华为云控制台" output
#
# Copies _templates/base/ to <output-root>/<project-name>/
# and replaces __NAME__, __TITLE__, __LANG__ tokens.

set -euo pipefail

NAME="${1:?Usage: bash init.sh <project-name> [output-root]}"
OUTPUT_ROOT="${2:-output}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE_DIR="$SCRIPT_DIR/_templates/base"
TARGET_DIR="$OUTPUT_ROOT/$NAME"

if [ -d "$TARGET_DIR" ]; then
  echo "Error: $TARGET_DIR already exists"
  exit 1
fi

# Ensure output root exists
mkdir -p "$OUTPUT_ROOT"

# Copy template structure
cp -R "$TEMPLATE_DIR" "$TARGET_DIR"

# Ensure empty directories exist (git may skip empty dirs)
mkdir -p "$TARGET_DIR/src/views"
mkdir -p "$TARGET_DIR/src/components"
mkdir -p "$TARGET_DIR/src/mock"

# Replace tokens
# __NAME__  -> project dir name (used in package.json)
# __TITLE__ -> page title (defaults to project name)
# __LANG__  -> html lang attribute (defaults to zh-CN)
LANG_VAL="zh-CN"

# macOS sed requires '' for in-place
if sed --version 2>&1 | grep -q "GNU"; then
  SED_INPLACE="sed -i"
else
  SED_INPLACE="sed -i ''"
fi

eval "$SED_INPLACE \"s/__NAME__/$NAME/g\" \"$TARGET_DIR/package.json\""
eval "$SED_INPLACE \"s/__TITLE__/$NAME/g\" \"$TARGET_DIR/index.html\""
eval "$SED_INPLACE \"s/__LANG__/$LANG_VAL/g\" \"$TARGET_DIR/index.html\""

echo "Created: $TARGET_DIR"
echo "Files:"
find "$TARGET_DIR" -type f | sort | sed "s|$TARGET_DIR/||"
echo ""
echo "Next: add dependencies to package.json if needed, then write:"
echo "  - src/styles/element-overrides.css  (theme overrides)"
echo "  - src/views/MainView.vue            (main page)"
echo "  - src/mock/data.ts                  (mock data)"
echo "  - src/components/*.vue              (sub-components)"
