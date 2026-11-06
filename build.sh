#!/bin/sh
# Joins src/*.js (in name order) into site.js, which GitHub Pages serves.
set -e
cd "$(dirname "$0")"
{
  echo "/* TekFab site scripts for shop.tekfab.co.uk. Built $(date -u +%Y-%m-%dT%H:%MZ) from src/. Do not edit site.js directly. */"
  echo "(function () {"
  for f in src/*.js; do echo; cat "$f"; done
  echo "})();"
} > site.js
