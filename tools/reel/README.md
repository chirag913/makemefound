# Hero showreel

Source for `public/reel/hero-reel.{mp4,webm}` and its poster. Everything is generated
in code: visuals are a deterministic canvas renderer (`scene.html`, one frame = a pure
function of time), and all sound — music bed and sound design — is synthesized in
`audio.mjs`. 34 s, 1920×1080, 30 fps, 120 BPM (one beat = 0.5 s).

## Re-render

Needs Playwright (Chromium) and a full ffmpeg build (`npm i @ffmpeg-installer/ffmpeg`
works if your system ffmpeg lacks libx264/libopus).

```bash
cd tools/reel
node audio.mjs reel.wav          # music + SFX → WAV (-15 LUFS-ish, -1 dBFS peak)
node render.mjs                  # frames → master.mp4 (silent, CRF 14)

FF=ffmpeg   # or the @ffmpeg-installer path
$FF -i master.mp4 -i reel.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 23 \
  -profile:v high -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 160k -shortest \
  ../../public/reel/hero-reel.mp4
$FF -i master.mp4 -i reel.wav -map 0:v -map 1:a -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 \
  -c:a libopus -b:a 128k -shortest ../../public/reel/hero-reel.webm
$FF -ss 1.3 -i master.mp4 -frames:v 1 -vf scale=1280:-1 -q:v 3 ../../public/reel/hero-reel-poster.jpg
```

Timing for picture and sound is shared: change a beat in one file, change it in the other.

## Structure

| Time | Beat | Sound |
| --- | --- | --- |
| 0–2.4 s | Hook: "Most videos lose people before the point." + glitch rewind | sub impacts, glitch, tape rewind |
| 2.4–4 s | Silence, then "Yours don't have to." | impact |
| 4–10 s | Cut the dead air — razor cuts, ripple delete | snips, swoosh, ticks |
| 10–15 s | Lead with the payoff — clip reorder, retention curve | whoosh, thud, riser, pops |
| 15–21 s | Show every idea — punch-in, data, callout, lower third, captions | hit per beat |
| 21–26 s | One recording, many shorts — 16:9 → 9:16 | whoosh, riser |
| 26–29.5 s | Earn the click — title + thumbnail concepts | typing, riser → silence |
| 30–34 s | Logo and tagline, fade to black (loops cleanly) | boom + reverb tail |
