/* node scripts/cli/mods.js --base "<Base Name>" [--ilvl 82] [--find "<words>"] [--side prefix|suffix]
 *
 * What a base can roll: every modifier family with its tiers (level, poe2db weight, Cast Speed on jewellery corrected
 * to Craft of Exile's weight), the Desecrated-only modifiers (with their lich), the essences/alloys of the class, and
 * the trade site's stat ids for the matching text (for trade searches). --find narrows to words in the modifier text.
 */
'use strict';
const L = require('./lib.js');

const a = L.args(process.argv.slice(2));
if (!a.base) { console.error('give --base "<Base Name>"'); process.exit(2); }
const { kb, ix, W } = L.load();
const b = kb.bases[a.base];
if (!b) { console.error('unknown base: ' + a.base + '\n  close names: ' + Object.keys(kb.bases).filter((n) => n.toLowerCase().includes(String(a.base).toLowerCase().split(' ')[0])).slice(0, 12).join(', ')); process.exit(2); }
const ilvl = +(a.ilvl || 82);
const re = a.find ? new RegExp(String(a.find).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') : null;
const w = L.weightsFor(a.base) || {};
console.log(`${a.base}: ${b.cls}, drop level ${b.lvl}, implicit: ${(b.imp || []).join(' / ') || 'none'}; item level ${ilvl}`);
const fams = new Map();
for (const [id, pe] of L.E.poolFor(ix, b.sig)) {
  const m = kb.mods[id];
  if ((a.side && pe.side !== a.side) || (re && !re.test(m.txt))) continue;
  const k = pe.side + ' ' + m.fam;
  if (!fams.has(k)) fams.set(k, []);
  fams.get(k).push({ id, tier: pe.tier, lvl: m.lvl, w: w[id], txt: m.txt.replace(/\n/g, ' / ') });
}
for (const [k, tiers] of [...fams.entries()].sort()) {
  tiers.sort((x, y) => x.tier - y.tier);
  const tot = tiers.filter((t) => t.lvl <= ilvl).reduce((s, t) => s + (t.w || 0), 0);
  console.log(`\n${k}  (family weight at ilvl ${ilvl}: ${tot})`);
  for (const t of tiers) console.log(`  T${t.tier}${t.lvl > ilvl ? ' (needs ilvl ' + t.lvl + ')' : ''}  L${t.lvl}  w${t.w == null ? '?' : t.w}  ${t.txt}`);
}
const des = [...L.E.desecratedPoolFor(ix, a.base)].filter(([id, pe]) => (!a.side || pe.side === a.side) && (!re || re.test(kb.mods[id].txt)));
if (des.length) { console.log('\nDesecrated-only:'); for (const [id, pe] of des) console.log(`  ${pe.side.padEnd(6)} ${(L.E.lichOf(kb.mods[id]) || '-').padEnd(8)} ${kb.mods[id].txt.replace(/\n/g, ' / ')}`); }
const ess = ((W.essences || {})[b.cls] || []).filter((r) => kb.mods[r.mod] && (!re || re.test(kb.mods[r.mod].txt)));
if (ess.length) { console.log('\nEssences and alloys:'); for (const r of ess) console.log(`  ${r.item.padEnd(34)} ${r.alloy ? 'alloy ' : r.kind.padEnd(6)} ${kb.mods[r.mod].gen === 'p' ? 'prefix' : 'suffix'}  ${kb.mods[r.mod].txt.replace(/\n/g, ' / ')}`); }
if (re) {
  const ids = kb.stat_index.filter((s) => re.test(s.r)).slice(0, 12);
  if (ids.length) { console.log('\nTrade stat ids:'); for (const s of ids) console.log(`  ${s.r}: ${Object.entries(s.ids).map(([k, v]) => k + ' ' + v.join(',')).join(' | ')}`); }
}
