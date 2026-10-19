// Sound design + music bed for the MakeMeFound hero reel. Pure synthesis, no samples.
// Writes a 48 kHz stereo 16-bit WAV. Timeline is locked to 120 BPM (beat = 0.5 s).
import fs from "node:fs";

const SR = 48000;
const DUR = 34;
const N = SR * DUR;
const BEAT = 0.5;

const music = [new Float32Array(N), new Float32Array(N)];
const sfx = [new Float32Array(N), new Float32Array(N)];
const verbSend = new Float32Array(N); // mono send into the reverb
const duck = new Float32Array(N).fill(1); // sidechain gain for music

// ---------- utils ----------
let seed = 1337;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const noise = () => rnd() * 2 - 1;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

function add(bus, i, l, r = l) {
  if (i < 0 || i >= N) return;
  bus[0][i] += l; bus[1][i] += r;
}
const panLR = (x, pan) => [x * Math.cos((pan + 1) * Math.PI / 4), x * Math.sin((pan + 1) * Math.PI / 4)];

// State-variable filter, time-varying friendly
function svf() {
  let lp = 0, bp = 0;
  return (x, fc, q = 0.7) => {
    const f = 2 * Math.sin(Math.PI * clamp(fc, 20, SR / 6) / SR);
    const hp = x - lp - bp / q;
    bp += f * hp; lp += f * bp;
    return { lp, bp, hp };
  };
}

function duckAt(t, depth = 0.5, release = 0.35) {
  const s = Math.floor(t * SR);
  for (let i = 0; i < release * SR; i++) {
    const k = s + i; if (k >= N) break;
    const g = 1 - depth * Math.exp(-i / (release * SR * 0.35));
    duck[k] = Math.min(duck[k], g);
  }
}

// ---------- instruments ----------
function kick(t, gain = 0.9) {
  const s = Math.floor(t * SR); let ph = 0;
  for (let i = 0; i < 0.45 * SR; i++) {
    const tt = i / SR;
    const f = 45 + 110 * Math.exp(-tt * 28);
    ph += (2 * Math.PI * f) / SR;
    const env = Math.exp(-tt * 7.5);
    const click = i < 90 ? noise() * 0.25 * (1 - i / 90) : 0;
    const v = (Math.sin(ph) * env + click) * gain;
    add(music, s + i, v, v);
  }
  duckAt(t, 0.35, 0.22);
}

function hat(t, gain = 0.12, open = false) {
  const s = Math.floor(t * SR); const f = svf(); const d = open ? 0.18 : 0.045;
  const pan = (rnd() - 0.5) * 0.5;
  for (let i = 0; i < d * 4 * SR; i++) {
    const tt = i / SR;
    const { hp } = f(noise(), 8000, 0.9);
    const [l, r] = panLR(hp * Math.exp(-tt / d) * gain, pan);
    add(music, s + i, l, r);
  }
}

function bassNote(t, m, len, gain = 0.32) {
  const s = Math.floor(t * SR); const f = svf(); let ph = 0;
  const fr = midi(m);
  for (let i = 0; i < len * SR; i++) {
    const tt = i / SR;
    ph += (2 * Math.PI * fr) / SR;
    const saw = Math.sin(ph) + 0.5 * Math.sin(2 * ph) + 0.25 * Math.sin(3 * ph) + 0.12 * Math.sin(4 * ph);
    const env = Math.min(1, tt / 0.005) * Math.exp(-tt * 3.2) * (i > (len - 0.02) * SR ? (len * SR - i) / (0.02 * SR) : 1);
    const { lp } = f(saw, 180 + 900 * Math.exp(-tt * 14), 0.9);
    const v = lp * env * gain;
    add(music, s + i, v, v);
  }
}

function padChord(t0, t1, notes, gain = 0.05) {
  const s0 = Math.floor(t0 * SR), s1 = Math.floor(t1 * SR);
  const voices = [];
  notes.forEach((m) => { for (let d = 0; d < 4; d++) voices.push({ f: midi(m) * (1 + (d - 1.5) * 0.004), ph: rnd() * 6.28, pan: (d / 3) * 2 - 1 }); });
  const f = [svf(), svf()];
  for (let i = s0; i < s1 && i < N; i++) {
    const tt = (i - s0) / SR, rem = (s1 - i) / SR;
    const env = Math.min(1, tt / 1.2) * Math.min(1, rem / 0.8);
    let l = 0, r = 0;
    for (const v of voices) {
      v.ph += (2 * Math.PI * v.f) / SR;
      const x = Math.sin(v.ph) + 0.3 * Math.sin(2 * v.ph + 0.3);
      const [a, b] = panLR(x, v.pan * 0.8); l += a; r += b;
    }
    const cut = 900 + 500 * Math.sin(tt * 0.6);
    l = f[0](l, cut).lp; r = f[1](r, cut).lp;
    music[0][i] += l * env * gain; music[1][i] += r * env * gain;
    verbSend[i] += (l + r) * env * gain * 0.25;
  }
}

// ---------- sound effects ----------
function impact(t, size = 1) {
  const s = Math.floor(t * SR); const f = svf(); let ph = 0;
  const len = (0.9 + size * 1.4) * SR;
  for (let i = 0; i < len; i++) {
    const tt = i / SR;
    const fr = 32 + 90 * Math.exp(-tt * 18);
    ph += (2 * Math.PI * fr) / SR;
    const sub = Math.sin(ph) * Math.exp(-tt * (2.2 / size));
    const { lp } = f(noise(), 2400 * Math.exp(-tt * 6) + 120, 0.8);
    const crack = lp * Math.exp(-tt * 9) * 0.6;
    const v = (sub * 0.95 + crack) * 0.75 * size;
    add(sfx, s + i, v, v);
    verbSend[s + i] += crack * 0.5 * size;
  }
  duckAt(t, 0.8, 0.6);
}

function whoosh(t, dur = 0.45, gain = 0.32, dir = 1) {
  const s = Math.floor(t * SR); const f = svf();
  for (let i = 0; i < dur * SR; i++) {
    const p = i / (dur * SR);
    const env = Math.pow(Math.sin(Math.PI * Math.pow(p, 0.8)), 2);
    const fc = 300 + 3200 * Math.sin(Math.PI * p);
    const { bp } = f(noise(), fc, 1.6);
    const pan = dir * (p * 2 - 1) * 0.85;
    const [l, r] = panLR(bp * env * gain, pan);
    add(sfx, s + i, l, r);
    verbSend[s + i] += bp * env * gain * 0.2;
  }
}

function riser(t0, t1, gain = 0.22) {
  const s = Math.floor(t0 * SR), len = (t1 - t0) * SR; const f = svf(); let ph = 0;
  for (let i = 0; i < len; i++) {
    const p = i / len;
    const fr = 180 * Math.pow(9, p);
    ph += (2 * Math.PI * fr) / SR;
    const { bp } = f(noise(), 400 + 7000 * p * p, 2.2);
    const env = Math.pow(p, 2.2);
    const v = (bp * 0.9 + Math.sin(ph) * 0.25 + Math.sin(ph * 1.5) * 0.12) * env * gain;
    add(sfx, s + i, v, v * 0.96);
    verbSend[s + i] += v * 0.3;
  }
}

function snip(t, gain = 0.4) {
  const s = Math.floor(t * SR); const f = svf(); let ph = 0;
  for (let i = 0; i < 0.06 * SR; i++) {
    const tt = i / SR;
    ph += (2 * Math.PI * 2600) / SR;
    const { hp } = f(noise(), 4500, 0.8);
    const v = (hp * Math.exp(-tt * 140) + Math.sin(ph) * Math.exp(-tt * 90) * 0.35) * gain;
    add(sfx, s + i, v, v);
  }
}

function pop(t, gain = 0.28, base = 950) {
  const s = Math.floor(t * SR); let ph = 0;
  for (let i = 0; i < 0.09 * SR; i++) {
    const tt = i / SR;
    ph += (2 * Math.PI * (base - 400 * Math.min(1, tt / 0.05))) / SR;
    const v = Math.sin(ph) * Math.exp(-tt * 45) * gain;
    add(sfx, s + i, v, v);
  }
}

function tick(t, gain = 0.12) {
  const s = Math.floor(t * SR); const f = svf(); const pan = (rnd() - 0.5) * 0.3;
  for (let i = 0; i < 0.025 * SR; i++) {
    const tt = i / SR;
    const { bp } = f(noise(), 3000 + rnd() * 1500, 2);
    const [l, r] = panLR(bp * Math.exp(-tt * 300) * gain * (0.7 + rnd() * 0.6), pan);
    add(sfx, s + i, l, r);
  }
}

function glitch(t, dur = 0.3, gain = 0.2) {
  const s = Math.floor(t * SR); let hold = 0, val = 0;
  for (let i = 0; i < dur * SR; i++) {
    if (hold-- <= 0) { hold = 40 + Math.floor(rnd() * 400); val = (rnd() > 0.5 ? 1 : -1) * (0.3 + rnd() * 0.7); }
    const gate = Math.sin(i / SR * 2 * Math.PI * 23) > -0.2 ? 1 : 0;
    const v = val * gate * gain * (1 - i / (dur * SR));
    add(sfx, s + i, v, -v * 0.8);
  }
}

function rewind(t0, t1, gain = 0.22) {
  const s = Math.floor(t0 * SR), len = (t1 - t0) * SR; const f = svf(); let ph = 0;
  for (let i = 0; i < len; i++) {
    const p = i / len;
    const fr = 2200 * Math.pow(0.12, p) + 160 * Math.sin(p * 60);
    ph += (2 * Math.PI * Math.max(60, fr)) / SR;
    const { bp } = f(noise(), 1800 - 1400 * p, 3);
    const v = (Math.sin(ph) * 0.3 + bp * 0.8) * Math.sin(Math.PI * p) * gain;
    add(sfx, s + i, v, v);
  }
}

function shimmer(t, gain = 0.06) {
  const s = Math.floor(t * SR);
  const tones = [84, 88, 91, 96].map((m) => ({ f: midi(m), ph: rnd() * 6 }));
  for (let i = 0; i < 2.2 * SR; i++) {
    const tt = i / SR; let x = 0;
    tones.forEach((o, k) => { o.ph += (2 * Math.PI * o.f) / SR; x += Math.sin(o.ph) * Math.exp(-tt * (1.4 + k * 0.3)) * (tt > k * 0.06 ? 1 : 0); });
    const v = x * gain * Math.min(1, tt / 0.01);
    add(sfx, s + i, v, v);
    verbSend[s + i] += v * 0.6;
  }
}

// ---------- arrangement ----------
// Hook
impact(0.0, 1.0); impact(0.5, 0.55); impact(1.0, 0.7);
glitch(1.55, 0.25); rewind(1.7, 2.35);
// Interrupt (2.35–2.6 is deliberate silence)
impact(2.6, 0.9); shimmer(2.62, 0.035);

// Groove 4.0 → 29.5
for (let b = 0; b * BEAT + 4.0 < 29.5; b++) {
  const t = 4.0 + b * BEAT;
  const inBreak = t >= 21.0 && t < 22.5; // breathe at the 16:9 → 9:16 morph
  if (!inBreak) kick(t, t < 10 ? 0.7 : 0.85);
  if (t >= 10 && !inBreak) hat(t + BEAT / 2, 0.1, b % 4 === 3);
  if (t >= 15 && t < 21) {
    hat(t + BEAT / 4, 0.05);
    hat(t + (3 * BEAT) / 4, 0.05);
  }
}
// Bass: A minor → F → C → G, eighth notes
const prog = [45, 41, 48, 43];
for (let t = 10.0; t < 29.5; t += BEAT / 2) {
  if (t >= 21.0 && t < 22.5) continue;
  const bar = Math.floor((t - 10) / 2) % 4;
  bassNote(t, prog[bar], BEAT / 2 - 0.01, t >= 26 ? 0.26 : 0.3);
}
// Pads
padChord(2.6, 10.2, [57, 60, 64], 0.035);
padChord(10.0, 21.4, [57, 60, 64, 67], 0.04);
padChord(21.0, 29.6, [53, 57, 60, 64], 0.045);
padChord(30.0, 34.0, [57, 64, 69, 72], 0.05);

// 01 Cut the dead air
whoosh(3.8, 0.45, 0.34);
[5.0, 5.5, 6.0, 6.5, 7.0, 7.5].forEach((t) => snip(t));
whoosh(8.0, 0.35, 0.28, -1); pop(8.38, 0.2, 700);
for (let i = 0; i < 12; i++) tick(8.4 + i * 0.05, 0.08);

// 02 Lead with the payoff
whoosh(9.8, 0.45, 0.34);
whoosh(11.0, 0.7, 0.26, -1); impact(11.75, 0.35);
riser(12.0, 13.5, 0.08);
[13.5, 13.9, 14.3, 14.7].forEach((t, i) => pop(t, 0.22, 900 + i * 60));

// 03 Show every idea
whoosh(14.8, 0.45, 0.34);
[16.0, 17.0, 18.0, 19.0, 20.0].forEach((t, i) => { whoosh(t - 0.18, 0.3, 0.22, i % 2 ? 1 : -1); impact(t, 0.28); });

// 04 Shorts
whoosh(20.85, 0.7, 0.3);
riser(21.2, 22.5, 0.1);
[22.5, 22.7, 22.9].forEach((t, i) => whoosh(t, 0.32, 0.22, i - 1 || 1));
pop(23.0, 0.25, 1000);

// 05 Packaging
whoosh(25.8, 0.45, 0.34);
const title = "I Priced My SaaS Wrong for 3 Years";
for (let i = 0; i < title.length; i++) tick(26.3 + i * 0.036, 0.11);
pop(28.0, 0.26, 1100);
riser(27.4, 29.5, 0.24);

// Drop
impact(30.0, 1.25); shimmer(30.02, 0.07);
whoosh(30.9, 0.6, 0.12);

// ---------- mix ----------
// Schroeder reverb on the send
function reverb(input) {
  const combs = [1557, 1617, 1491, 1422].map((d) => ({ buf: new Float32Array(d), i: 0, fb: 0.82 }));
  const aps = [225, 556].map((d) => ({ buf: new Float32Array(d), i: 0 }));
  const outL = new Float32Array(N), outR = new Float32Array(N);
  let lpz = 0;
  for (let n = 0; n < N; n++) {
    let x = input[n] * 0.3, y = 0;
    for (const c of combs) { const o = c.buf[c.i]; lpz = o * 0.7 + lpz * 0.3; c.buf[c.i] = x + lpz * c.fb; c.i = (c.i + 1) % c.buf.length; y += o; }
    for (const a of aps) { const o = a.buf[a.i]; const v = -y * 0.5 + o; a.buf[a.i] = y + o * 0.5; a.i = (a.i + 1) % a.buf.length; y = v; }
    outL[n] = y; outR[n] = n > 300 ? outL[n - 300] : 0;
  }
  return [outL, outR];
}
const [vl, vr] = reverb(verbSend);

const L = new Float32Array(N), R = new Float32Array(N);
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fadeOut = t > 33.0 ? Math.max(0, (34 - t) / 1.0) : 1;
  const m = 0.55 * duck[i];
  let l = music[0][i] * m + sfx[0][i] + vl[i] * 0.55;
  let r = music[1][i] * m + sfx[1][i] + vr[i] * 0.55;
  l = Math.tanh(l * 1.15) * fadeOut; r = Math.tanh(r * 1.15) * fadeOut;
  L[i] = l; R[i] = r; peak = Math.max(peak, Math.abs(l), Math.abs(r));
}
const norm = 0.89 / peak; // ≈ -1 dBFS
const data = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  data.writeInt16LE(Math.round(clamp(L[i] * norm, -1, 1) * 32767), i * 4);
  data.writeInt16LE(Math.round(clamp(R[i] * norm, -1, 1) * 32767), i * 4 + 2);
}
const h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(data.length, 40);
fs.writeFileSync(process.argv[2] || "reel.wav", Buffer.concat([h, data]));
console.log("wav written, peak before norm", peak.toFixed(3));
