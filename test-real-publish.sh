#!/bin/bash
set -e

echo "=== Building WASM ==="
deno task build

echo ""
echo "=== Attempting REAL publish to JSR ==="
echo "This will try to publish version 1.0.3 to JSR..."
deno publish --allow-dirty
