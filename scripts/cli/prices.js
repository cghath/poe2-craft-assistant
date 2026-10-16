/* node scripts/cli/prices.js [--check]
 *
 * Refreshes the price documents in .kb_cache/out (meta.json, league-<slug>.json) from the published price package
 * (npm poe2-craft-assistant-prices on jsDelivr, unpkg as fallback): the same data the page loads, written where
 * scripts/selftest/lib.js and scripts/cli/lib.js read it. The cloud job republishes it every 3 hours.
 * --check only prints how old the local copy is.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT, args } = require('./lib.js');

const OUT = path.join(ROOT, '.kb_cache', 'out');
const URLS = ['https://cdn.jsdelivr.net/npm/poe2-craft-assistant-prices@latest/prices.json', 'https://unpkg.com/poe2-craft-assistant-prices@latest/prices.json'];

function get(url, hops) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'poe2-craft-assistant-cli' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && (hops || 0) < 5) { res.resume(); return resolve(get(new URL(res.headers.location, url).toString(), (hops || 0) + 1)); }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`${url}: HTTP ${res.statusCode}`)); }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (d) => (body += d));
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

function age() {
  const f = path.join(OUT, 'meta.json');
  if (!fs.existsSync(f)) return 'no local prices yet';
  const meta = JSON.parse(fs.readFileSync(f, 'utf8'));
  const h = (Date.now() - Date.parse(meta.updatedAt)) / 3600e3;
  return `local prices updated ${meta.updatedAt} (${h.toFixed(1)} h ago)`;
}

(async () => {
  const a = args(process.argv.slice(2));
  if (a.check) { console.log(age()); return; }
  let feed = null, lastErr = null;
  for (const u of URLS) {
    try { feed = JSON.parse(await get(u)); break; } catch (e) { lastErr = e; }
  }
  if (!feed) { console.error('could not fetch prices: ' + (lastErr && lastErr.message)); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(feed.meta));
  for (const [slug, doc] of Object.entries(feed.leagues)) fs.writeFileSync(path.join(OUT, 'league-' + slug + '.json'), JSON.stringify(doc));
  const fr = feed.leagues['forbidden-rites'];
  console.log(`prices updated ${feed.meta.updatedAt}: ${Object.keys(feed.leagues).length} leagues` + (fr ? `; Forbidden Rites: 1 divine = ${fr.divine} ex, ${Object.keys(fr.items).length} items` : ''));
})();
