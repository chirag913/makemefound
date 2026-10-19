import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
const FPS = 30, DUR = 34, N = FPS * DUR;
const FF = process.env.FFMPEG || 'ffmpeg';
const ff = spawn(FF, ['-y', '-hide_banner', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', 'master.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('file://' + process.cwd() + '/scene.html');
await p.evaluate(() => window.ready);
const t0 = Date.now();
for (let i = 0; i < N; i++) {
  const b64 = await p.evaluate(t => { window.renderAt(t); return document.getElementById('c').toDataURL('image/jpeg', 0.95).split(',')[1]; }, i / FPS);
  if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 150 === 0) console.log(`frame ${i}/${N} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await b.close();
console.log('master rendered in', ((Date.now() - t0) / 1000).toFixed(0), 's');
