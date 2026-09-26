#!/usr/bin/env bash
# Guard: Tailwind v4 emits real cascade layers. Unlayered CSS beats every layer,
# so a top-level `* { margin: 0; padding: 0 }` silently kills all spacing utilities.
# This check fails if any plain rule in app/globals.css sits outside @layer base.
set -euo pipefail
CSS="app/globals.css"

# Every top-level block must be one of: @import, @theme, @layer, @custom-variant, @supports, or a comment.
BAD=$(awk '
  /^[[:space:]]*$/ { next }
  /^[[:space:]]*\/\*/ { in_comment=1 }
  in_comment { if (/\*\//) in_comment=0; next }
  /^[[:space:]]*\/\// { next }
  /^[[:space:]]*@(import|theme|layer|custom-variant|supports|keyframes|media|charset|font-face)/ { next }
  /^[[:space:]]*@keyframes/ { next }
  # inside a block?
  depth>0 { next }
  { printf "%d: %s\n", NR, $0 }
  { }
  /@layer|@theme|@supports|@media/ { }
' "$CSS" || true)

# Simpler + reliable: count top-level (depth 0) declarations outside at-rules.
python3 - "$CSS" <<'PY'
import re, sys
src = open(sys.argv[1]).read()
# strip comments
src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
depth = 0
offenders = []
line = 1
i = 0
while i < len(src):
    ch = src[i]
    if ch == '\n':
        line += 1
    if ch == '{':
        depth += 1
    elif ch == '}':
        depth -= 1
    i += 1

# Walk again tracking whether we are inside an allowed at-rule at depth 0
depth = 0
allowed = ('@layer', '@theme', '@supports', '@media', '@custom-variant', '@keyframes', '@import', '@font-face')
buf = ''
line = 1
violations = []
i = 0
while i < len(src):
    ch = src[i]
    if ch == '\n':
        line += 1
    if depth == 0:
        if ch == '{':
            prefix = buf.strip()
            if not prefix.startswith(allowed):
                violations.append((line, prefix[:80]))
            depth += 1
            buf = ''
        elif ch == ';':
            stmt = buf.strip()
            if stmt and not stmt.startswith(allowed):
                violations.append((line, stmt[:80]))
            buf = ''
        else:
            buf += ch
    else:
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                buf = ''
    i += 1

# The critical one: unlayered universal reset
if re.search(r'(?m)^\s*\*\s*\{[^}]*margin\s*:\s*0', src):
    violations.append((0, 'TOP-LEVEL UNIVERSAL RESET `* { margin: 0; padding: 0 }`'))

if violations:
    print(f"FAIL: {len(violations)} unlayered top-level rule(s) in {sys.argv[1]}:")
    for ln, txt in violations:
        print(f"  line {ln}: {txt}")
    print("\nMove plain rules inside `@layer base { ... }` so Tailwind utilities can override them.")
    sys.exit(1)
print("OK: no unlayered top-level rules in %s" % sys.argv[1])
PY
