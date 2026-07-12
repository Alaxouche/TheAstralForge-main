#!/usr/bin/env bash
#
# Optimize raster images under assets/Images into WebP.
#
#   scripts/optimize-images.sh           # convert *.png/*.jpg/*.jpeg -> *.webp
#   scripts/optimize-images.sh --check   # CI mode: exit 1 if any conversion is
#                                        # missing or an image exceeds the budget
#
# Requires `cwebp` (libwebp) or `ffmpeg` on PATH. Logos in assets/logos are
# intentionally skipped: they are referenced as PNG by SEO/OG/favicon tags.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT/assets/Images"
QUALITY=82
BUDGET_KB=1024           # warn/fail above this size (WebP)
CHECK=0
[[ "${1:-}" == "--check" ]] && CHECK=1

have() { command -v "$1" >/dev/null 2>&1; }

to_webp() { # $1 src  $2 dest
  if have cwebp; then
    cwebp -quiet -q "$QUALITY" "$1" -o "$2"
  elif have ffmpeg; then
    ffmpeg -y -loglevel error -i "$1" -c:v libwebp -quality "$QUALITY" "$2"
  else
    echo "error: need cwebp or ffmpeg on PATH" >&2
    exit 2
  fi
}

status=0
while IFS= read -r -d '' src; do
  dest="${src%.*}.webp"
  if [[ ! -f "$dest" ]]; then
    if [[ $CHECK -eq 1 ]]; then
      echo "::warning::missing WebP for $src"
      status=1
    else
      echo "convert: $src -> $dest"
      to_webp "$src" "$dest"
    fi
  fi
done < <(find "$SRC_DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

# Size budget guard (applies to every WebP we ship).
while IFS= read -r -d '' img; do
  kb=$(( $(wc -c < "$img") / 1024 ))
  if (( kb > BUDGET_KB )); then
    echo "::warning::${img#"$ROOT"/} is ${kb}KB (budget ${BUDGET_KB}KB)"
    status=1
  fi
done < <(find "$SRC_DIR" -type f -iname '*.webp' -print0)

exit $status
