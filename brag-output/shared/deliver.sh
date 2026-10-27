#!/usr/bin/env bash
# Mux a rendered video with its score and write the site files.
#   usage: shared/deliver.sh <pessoal|profissional> <pt|en|es> <poster-second>
# run from brag-output/. Reads <video>/work/video-<lang>.mp4 and
# <video>/work/score.wav, writes public/videos/about/<video>-<lang>.{mp4,jpg}
set -euo pipefail
v=$1 lang=$2 at=$3
out=../public/videos/about
# CRF 20 keeps the type and the soft gradients clean; aq-mode 3 spends more
# bits in the dark areas, where 8-bit gradients band first
ffmpeg -v error -y -i "$v/work/video-$lang.mp4" -i "$v/work/score.wav" \
  -filter_complex "[1:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[a]" \
  -map 0:v -map "[a]" -t 26 \
  -c:v libx264 -preset slow -crf 20 -x264-params aq-mode=3 -pix_fmt yuv420p -profile:v high \
  -c:a aac -b:a 128k -movflags +faststart \
  "$out/$v-$lang.mp4"
# the poster is a separate jpg: baking it into frame 0 would flash on every loop
ffmpeg -v error -y -ss "$at" -i "$v/work/video-$lang.mp4" -frames:v 1 -q:v 3 "$out/$v-$lang.jpg"
ls -la "$out/$v-$lang.mp4" "$out/$v-$lang.jpg"
