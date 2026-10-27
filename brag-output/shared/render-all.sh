#!/usr/bin/env bash
# Render every video and language, then synthesize each score.
#   usage: shared/render-all.sh [pt en es]   (run from brag-output/)
set -euo pipefail
langs=${*:-pt en es}
for v in pessoal profissional; do
  mkdir -p "$v/work"
  python shared/score.py "$v" "$v/work/score.wav"
  for l in $langs; do
    (cd "$v/composition" && npx --yes hyperframes@0.8.91 render --quiet --variables "{\"lang\":\"$l\"}" -o "../work/video-$l.mp4")
    ls -la "$v/work/video-$l.mp4"
  done
done
