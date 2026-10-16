/* Shared loader for the command-line tools in scripts/cli (route.js, well.js, mods.js, prices.js).
 *
 * Loads the knowledge base, the poe2db weights, the essence lists and the latest prices, and the craft network with one
 * addition made in memory only: answer() also returns the solved network as `_net`, so route.js can trace a route
 * stage by stage. app/network.js itself is not changed; if its answer() no longer looks as expected, loading fails
 * with a message instead of tracing wrong.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const Module = require('module');

const ROOT = path.join(__dirname, '..', '..');
const E = require(path.join(ROOT, 'app', 'engine.js'));
const P = require(path.join(ROOT, 'app', 'planner.js'));
const PRICE_DIR = path.join(ROOT, '.kb_cache', 'out');

let cache = null;
function load() {
  if (cache) return cache;
  const kb = require(path.join(ROOT, 'poe2_kb_0.5.5.json'));
  const ix = E.buildIndex(kb);
  const W = require(path.join(ROOT, 'app', 'data', 'weights_0.5.5.json'));
  // as the page does: which mods are essence mods, overall and per class
  ix.essenceMods = new Set(Object.values(W.essences || {}).flat().map((r) => r.mod));
  ix.essenceModsByClass = new Map(Object.entries(W.essences || {}).map(([c, l]) => [c, new Set(l.map((r) => r.mod))]));
  cache = { kb, ix, W };
  return cache;
}

/** The network module, with answer() also returning the network it solved (`_net`). */
function network() {
  const file = path.join(ROOT, 'app', 'network.js');
  let src = fs.readFileSync(file, 'utf8');
  const anchor = "net: true, label: 'Route', goals: net.goals.map(plain),";
  if (!src.includes(anchor)) throw new Error('app/network.js changed: answer() no longer has the expected shape; update scripts/cli/lib.js');
  src = src.replace(anchor, '_net: net, ' + anchor);
  const m = new Module(file, module);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  m._compile(src, file);
  return m.exports;
}

/** Latest prices of a league (default Forbidden Rites) from .kb_cache/out (scripts/cli/prices.js writes it). */
function prices(slug) {
  slug = slug || 'forbidden-rites';
  const file = path.join(PRICE_DIR, 'league-' + slug + '.json');
  if (!fs.existsSync(file)) throw new Error(`no prices at ${file}: run  node scripts/cli/prices.js  first`);
  const league = JSON.parse(fs.readFileSync(file, 'utf8'));
  const byName = {};
  for (const r of Object.values(league.items)) if (r[2] != null) byName[r[0]] = r[2];
  return { league, byName, divine: league.divine, updatedAt: league.updatedAt };
}

/**
 * Roll weights for a base: poe2db's, with Craft of Exile's weight where poe2db is known to be wrong.
 * Cast Speed on rings and amulets: poe2db gives every tier weight 1, Craft of Exile 800 (reports/coe-crosscheck.md);
 * with weight 1 the network prices any Cast Speed craft on jewellery in the thousands of divines.
 */
function weightsFor(base, opts) {
  const { kb, W } = load();
  const page = W.base_page[base];
  const w = page && W.pages[page] ? Object.assign({}, W.pages[page].weights) : null;
  if (!w || (opts && opts.poe2dbOnly)) return w;
  const cls = kb.bases[base] && kb.bases[base].cls;
  if (cls === 'Ring' || cls === 'Amulet') for (const id of Object.keys(w)) if (kb.mods[id] && kb.mods[id].fam === 'IncreasedCastSpeed' && w[id] <= 1) w[id] = 800;
  return w;
}

function essencesFor(base) {
  const { kb, W } = load();
  const b = kb.bases[base];
  return P.essencesForBase(load().ix, b, (W.essences || {})[b.cls] || []).concat(P.liquidFor(kb, base));
}

const CLASS_TEXT = { Staff: 'Staves', Focus: 'Foci', Warstaff: 'Quarterstaves', 'Body Armour': 'Body Armours', Gloves: 'Gloves', Boots: 'Boots' };
/** A white (Normal) item of a base as the game copies it. */
function whiteItemText(base, ilvl) {
  const { kb } = load();
  const b = kb.bases[base];
  if (!b) throw new Error(`unknown base "${base}"`);
  const imp = (b.imp || []).length ? '\n--------\n' + b.imp.map((t) => '{ Implicit Modifier }\n' + t.replace(/\((-?[\d.]+)-(-?[\d.]+)\)/g, '$2')).join('\n') : '';
  return `Item Class: ${CLASS_TEXT[b.cls] || b.cls + 's'}\nRarity: Normal\n${base}\n--------\nItem Level: ${ilvl || 82}${imp}`;
}

function parse(text) {
  const r = E.parseItem(load().ix, text);
  if (!r.item) throw new Error('could not read the item: ' + JSON.stringify(r.warnings || r).slice(0, 300));
  return r;
}

/** Simple argument reader: --name value, --flag; repeated names collect into arrays. */
function args(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { out._.push(a); continue; }
    const k = a.slice(2);
    const v = i + 1 < argv.length && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    if (out[k] === undefined) out[k] = v;
    else out[k] = [].concat(out[k], v);
  }
  return out;
}
const list = (v) => (v === undefined ? [] : [].concat(v));

/** Strip the trade site's [Tag|Text] markup. */
const cleanTrade = (s) => String(s).replace(/\[([^\]|]*\|)?([^\]]*)\]/g, '$2');

module.exports = { ROOT, E, P, load, network, prices, weightsFor, essencesFor, whiteItemText, parse, args, list, cleanTrade };
