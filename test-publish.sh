#!/bin/bash
set -e

echo "=== Environment Info ==="
deno --version
rustc --version
wasm-bindgen --version

echo ""
echo "=== Cleaning previous build ==="
rm -rf rs_lib/pkg/*.js rs_lib/pkg/*.ts rs_lib/pkg/*.wasm 2>/dev/null || true

echo ""
echo "=== Building WASM with inline ==="
deno task build

echo ""
echo "=== File sizes ==="
ls -lh rs_lib/pkg/

echo ""
echo "=== Checking for .wasm file ==="
if [ -f "rs_lib/pkg/rs_lib.wasm" ]; then
    echo "WARNING: .wasm file exists!"
    ls -lh rs_lib/pkg/rs_lib.wasm
else
    echo "✓ OK: No .wasm file (inline mode)"
fi

echo ""
echo "=== rs_lib.js analysis ==="
wc -l rs_lib/pkg/rs_lib.js
wc -c rs_lib/pkg/rs_lib.js
echo "First 500 bytes:"
head -c 500 rs_lib/pkg/rs_lib.js

echo ""
echo ""
echo "=== Testing publish (dry-run) ==="
deno publish --dry-run --allow-dirty
