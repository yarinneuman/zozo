// Free English→Hebrew translation with Argos Translate (open source, offline model). Used by brief.mjs.
// Needs: pip install argostranslate (the workflow does it). Without it, or on any failure, the original text is
// returned unchanged. Results are cached in data/translations.json so a headline is translated once.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, '..', 'data', 'translations.json');

export async function translate(texts) {
  const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};
  const todo = [...new Set(texts.filter((t) => t && !cache[t]))];
  if (todo.length) {
    const py = spawnSync(process.platform === 'win32' ? 'python' : 'python3', [join(HERE, 'argos.py')], { input: JSON.stringify(todo), encoding: 'utf8', timeout: 300000 });
    try {
      const out = JSON.parse(py.stdout);
      todo.forEach((t, i) => { if (out[i] && out[i] !== t) cache[t] = out[i]; });
      writeFileSync(CACHE, JSON.stringify(cache));
    } catch { console.log('translate: Argos unavailable — headlines stay in English'); }
  }
  return texts.map((t) => cache[t] || t);
}
