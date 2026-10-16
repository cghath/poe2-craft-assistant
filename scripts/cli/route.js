/* node scripts/cli/route.js (--item <file> | --base "<Base Name>" [--ilvl 82]) --want <target> [--want ...] [options]
 *
 * The craft network's route (what the page's "Find craft route" gives), from the command line.
 *
 * Item: --item a file with the item as the game copies it (Alt+Ctrl+C best), or --base for a white item of that base.
 * Targets (--want, repeatable): "<side>:<what>[:<min tier>]"
 *   side   prefix | suffix | des (a Desecrated modifier, revealed at the Well of Souls)
 *   what   a modifier family name (e.g. BaseSpirit) or words from the modifier text on this base (e.g. "to Spirit",
 *          "Level of all Spell Skills"); ambiguous words list the candidates
 *   tier   1 = only T1, 2 = T2 or better, ...; leave out to accept any tier (or to keep a modifier the item has)
 * Options:
 *   --base-cost <ex>      price of one white base (default 5)
 *   --base-limit <n>      at most n bases per finished item (0 = no limit, the default)
 *   --restart white|item|never  what "give up" means: a new white base (default), another item like this one
 *                         (needs --item-cost <ex>), or never (the item is one of a kind)
 *   --quality lock|use|raise    catalyst quality: leave it (default), spend it with Omen of Catalysing Exaltation,
 *                         or add catalysts and spend them; --cat-mult <x> the omen's multiplier at 20% quality
 *                         (the tool assumes 25; poe2wiki reports about 5: try both)
 *   --exclude "<item>"    treat an item as unavailable (repeatable), e.g. "Astrid's Creativity", "Preserved Collarbone"
 *   --no-bones            exclude every bone (keeps the one Desecrated slot free for a later desecration)
 *   --league <slug>       price league (default forbidden-rites)
 *   --poe2db-weights      do not correct Cast Speed on rings/amulets to Craft of Exile's weight
 *   --trace               also list the route's stages by expected spend (where the money goes)
 *   --json                machine-readable output
 * Prices come from .kb_cache/out (node scripts/cli/prices.js refreshes them).
 */
'use strict';
const fs = require('fs');
const L = require('./lib.js');

const a = L.args(process.argv.slice(2));
if (!a.item && !a.base) { console.error('give --item <file> or --base "<Base Name>" (see the header of scripts/cli/route.js)'); process.exit(2); }
const { kb, ix, W } = L.load();
const pr = L.prices(a.league);
const price = Object.assign({}, pr.byName);
for (const n of L.list(a.exclude)) delete price[n];
if (a['no-bones']) for (const n of Object.keys(price)) if (/(Jawbone|Rib|Collarbone|Cranium|Vertebrae)$|Omen of Putrefaction/.test(n)) delete price[n];
const priceOf = (n) => (price[n] != null ? price[n] : null);

const text = a.item ? fs.readFileSync(a.item, 'utf8') : L.whiteItemText(a.base, +(a.ilvl || 82));
const parsed = L.parse(text);
const item = parsed.item;
const base = item.base;
if (!kb.bases[base]) { console.error('unknown base: ' + base); process.exit(2); }
const sig = kb.bases[base].sig;

/** Resolve "<side>:<what>[:<tier>]" to a network target. */
function target(spec, i) {
  const m = String(spec).match(/^(prefix|suffix|des):(.+?)(?::(\d+))?$/i);
  if (!m) throw new Error(`bad --want "${spec}": use <prefix|suffix|des>:<family or words>[:<min tier>]`);
  const side = m[1].toLowerCase(), what = m[2].trim(), tier = m[3] ? +m[3] : null;
  let fams;
  if (kb.mods && Object.values(kb.mods).some((x) => x.fam === what)) fams = [what];
  else {
    const re = new RegExp(what.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const set = new Map();
    if (side === 'des') { for (const [id, pe] of L.E.desecratedPoolFor(ix, base)) if (re.test(kb.mods[id].txt)) set.set(kb.mods[id].fam, kb.mods[id].txt); }
    else {
      for (const [id, pe] of L.E.poolFor(ix, sig)) if (pe.side === side && re.test(kb.mods[id].txt)) set.set(kb.mods[id].fam, kb.mods[id].txt);
      for (const r of (W.essences || {})[kb.bases[base].cls] || []) { const km = kb.mods[r.mod]; if (km && (km.gen === 'p') === (side === 'prefix') && re.test(km.txt)) set.set(km.fam, km.txt + ' (' + r.item + ')'); }
      for (const mm of item.mods || []) { const km = kb.mods[mm.id]; if (km && re.test(km.txt)) set.set(km.fam, km.txt + ' (on the item)'); }
    }
    // prefer families whose text matches the words most tightly
    fams = [...set.keys()];
    if (fams.length > 1) {
      const exact = fams.filter((f) => new RegExp('^[^a-z]*' + what.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^a-z]*$', 'i').test(set.get(f).split('\n')[0].replace(/\(.*?\)|[\d+\-#%]/g, '').trim()));
      if (exact.length === 1) fams = exact;
    }
    if (!fams.length) throw new Error(`no ${side} modifier on ${base} matches "${what}"`);
    if (fams.length > 1) throw new Error(`"${what}" matches several ${side} families on ${base}:\n  ` + fams.map((f) => `${f}: ${set.get(f).replace(/\n/g, ' / ')}`).join('\n  ') + '\nuse the family name');
  }
  const fam = fams[0];
  // the label shows the wanted tier's text (T1 when no tier is given), from this base's pool when it has the family
  const tiers = [...L.E.poolFor(ix, sig)].filter(([id]) => kb.mods[id].fam === fam).sort((x, y) => x[1].tier - y[1].tier);
  const at = tiers.find(([, pe]) => pe.tier === (tier || 1)) || tiers[0];
  const label = at ? kb.mods[at[0]].txt : (Object.values(kb.mods).find((x) => x.fam === fam) || {}).txt || fam;
  return { key: (side === 'des' ? 'suffix' : side) + '-' + i, t: { fam, group: side === 'des' ? 'desecrated' : side, minTier: tier, required: true, label: label.split('\n')[0] + (tier ? ` (T${tier}+)` : '') } };
}

const targets = {};
try { L.list(a.want).forEach((w, i) => { const t = target(w, i); targets[t.key] = t.t; }); } catch (e) { console.error(e.message); process.exit(2); }
if (!Object.keys(targets).length) { console.error('give at least one --want'); process.exit(2); }

const restart = a.restart === 'item' ? 'item' : a.restart === 'never' ? 'never' : undefined;
const input = {
  ix, item, targets, locks: {}, priceOf, baseCost: +(a['base-cost'] || 5), weights: L.weightsFor(base, { poe2dbOnly: !!a['poe2db-weights'] }),
  essences: L.essencesFor(base), quality: a.quality || 'lock', catalystMult: a['cat-mult'] ? +a['cat-mult'] : undefined,
  restart, itemCost: a['item-cost'] ? +a['item-cost'] : undefined,
};
const NW = L.network();
const t0 = Date.now();
const ans = NW.answer(input, { baseLimit: +(a['base-limit'] || 0) });
const div = (ex) => (ex / pr.divine).toFixed(ex / pr.divine < 10 ? 2 : 1);
const head = `${base} (ilvl ${item.ilvl || '?'}), prices ${String(pr.updatedAt).slice(0, 16)} (1 div = ${Math.round(pr.divine)} ex), ${((Date.now() - t0) / 1000).toFixed(1)} s`;

if (ans.blocked || ans.unsupported || ans.impossible) {
  const why = ans.blocked || ans.unsupported || ans.impossible;
  if (a.json) console.log(JSON.stringify({ base, targets, result: why }));
  else console.log(head + '\nNO ROUTE: ' + JSON.stringify(why));
  process.exit(0);
}

const net = ans._net;
let stages = null;
if (a.trace && net) {
  // expected visits of every node from the start (a restart goes back to the start of the network)
  const s0 = net.start;
  let v = new Map([[s0, 1]]);
  const total = new Map();
  for (let it = 0; it < 6000 && v.size; it++) {
    const nv = new Map();
    for (const [n, p] of v) {
      total.set(n, (total.get(n) || 0) + p);
      const st = net.step(n);
      if (!st || net.done(n)) continue;
      for (let k = 0; k < st.out.length; k += 2) {
        const to = st.out[k + 1] === -1 || st.out[k + 1] === undefined ? net.n0 : st.out[k + 1];
        const q = p * st.out[k];
        if (q > 1e-9) nv.set(to, (nv.get(to) || 0) + q);
      }
    }
    v = nv;
  }
  const say = (w) => [w.rarity, w.has && w.has.length ? 'has ' + w.has.join(', ') : '', w.inWay && w.inWay.length ? 'blocked: ' + w.inWay.join(', ') : '',
    `other P${w.otherPrefixes} S${w.otherSuffixes}`, w.desecratedOther ? 'unwanted desecrated ' + w.desecratedOther : '', w.hidden ? 'unrevealed ' + w.hidden : '', w.fracturedOther ? 'unwanted fractured ' + w.fracturedOther : ''].filter(Boolean).join(' | ');
  stages = [...total.entries()].map(([n, vis]) => { const st = net.step(n); return { visits: vis, spend: st ? vis * (st.cost || 0) : 0, state: say(net.describe(n)), step: st ? (st.names.join(' + ') || 'Well of Souls') : 'DONE' }; })
    .sort((x, y) => y.spend - x.spend).slice(0, +(a.stages || 30));
}

const out = {
  base, ilvl: item.ilvl, targets: Object.values(targets).map((t) => t.label), prices: pr.updatedAt, divine: pr.divine,
  cost: ans.meanCost, costDiv: ans.meanCost / pr.divine, sdDiv: ans.sd / pr.divine, bases: ans.bases, firstStep: ans.next,
  materials: ans.steps.map((s) => ({ item: s.names.join(' + '), uses: s.avg, price: s.cost })),
  otherFirstSteps: ans.options.map((o) => ({ step: o.names.join(' + '), totalDiv: o.total / pr.divine })), stages,
};
if (a.json) { console.log(JSON.stringify(out, null, 1)); process.exit(0); }
console.log(head);
console.log('targets: ' + out.targets.join(' + '));
console.log(`expected cost: ${Math.round(ans.meanCost)} ex = ${div(ans.meanCost)} div (sd ${div(ans.sd)} div); bases used: ${ans.bases.toFixed(2)}`);
console.log('next step: ' + (ans.next.done ? 'DONE, the item already meets the targets' : ans.next.names.join(' + ') + (ans.next.hit != null ? ` (finishes the item ${(100 * ans.next.hit).toFixed(1)}% of the time)` : '')));
console.log('materials (average uses per finished item):');
for (const s of out.materials) console.log(`  ${s.item.padEnd(44)} ${s.uses.toFixed(2).padStart(9)} x ${String(Math.round(s.price)).padStart(7)} ex`);
if (out.otherFirstSteps.length) console.log('other first steps: ' + out.otherFirstSteps.map((o) => `${o.step} (${o.totalDiv.toFixed(1)} div)`).join('; '));
if (stages) { console.log('stages by expected spend (visits, ex, state -> step):'); for (const s of stages) console.log(`  ${s.visits.toFixed(2).padStart(8)} ${String(Math.round(s.spend)).padStart(9)}  ${s.state} -> ${s.step}`); }
for (const w of parsed.warnings || []) if (w.level !== 'info') console.log('reader: ' + w.msg);
