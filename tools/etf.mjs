// Weekly ETF fee/AUM refresh for data/sectors.js (replaces `zozo-data.ps1 -Mode etf`). Source: stockanalysis.com.
// Usage: node tools/etf.mjs
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const F = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'sectors.js');
let src = readFileSync(F, 'utf8'), ok = 0, miss = 0;
for (const t of [...new Set([...src.matchAll(/\{t:"([A-Z.]+)",name:"[^"]*",er:[\d.]+,aum:"[^"]*"\}/g)].map((m) => m[1]))]) {
  try {
    const h = await (await fetch(`https://stockanalysis.com/etf/${t.toLowerCase()}/`, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(25000) })).text();
    const er = (h.match(/Expense Ratio<\/td>\s*<td[^>]*>([\d.]+)%<\/td>/) || [])[1], aum = (h.match(/Assets<\/td>\s*<td[^>]*>(\$[\d.,]+[KMBT]?)<\/td>/) || [])[1];
    if (!er || !aum) { miss++; continue; }
    src = src.replace(new RegExp(`(\{t:"${t}",name:"[^"]*",er:)[\d.]+(,aum:)"[^"]*"`, 'g'), `$1${er}$2"${aum}"`); ok++;
  } catch { miss++; }
  await new Promise((r) => setTimeout(r, 250));
}
if (ok) {
  src = src.replace(/etfsAsOf:\s*"[^"]*"/, `etfsAsOf: "${new Date().toISOString().slice(0, 10)}"`);
  writeFileSync(F, src); appendFileSync(join(dirname(F), '.changed'), 'data/sectors.js\n');
}
console.log(`etf: ${ok} updated, ${miss} unchanged`);
