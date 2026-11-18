#!/usr/bin/env bash
set -euo pipefail
repo='https://github.com/juanjogamero/website-tuahorroeficiente.git'
if ! command -v git >/dev/null; then echo 'Instala Git primero.'; exit 1; fi
if [ ! -d .git ]; then
  git init -b main
  git add .
  git commit -m 'feat: portal Astro de pruebas para GitHub Pages'
fi
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$repo"
else
  git remote add origin "$repo"
fi
printf 'Subiendo código al repositorio %s\n' "$repo"
git push -u origin main
printf '\nGitHub Pages: Settings > Pages > Source: GitHub Actions.\n'
