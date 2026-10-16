/* node scripts/cli/well.js --item <file> [--side prefix|suffix] [--runs 150000] [--top 18]
 *
 * What the Well of Souls can offer when a bone is used on this item: for each modifier, the chance it is among the
 * three options, and with one Omen of Abyssal Echoes reroll; without a lich omen and with each of the three.
 * D = Desecrated-only modifier, b = a base modifier of the side (any tier the bone's floor allows).
 * Uses the planner's own reveal (Craft of Exile's 80/15/5% split of desecrated-only options, equal weights).
 * The side is the one the bone can use; give --side when both are open (that is an Omen of Sinistral/Dextral Necromancy).
 */
'use strict';
const fs = require('fs');
const L = require('./lib.js');

const a = L.args(process.argv.slice(2));
if (!a.item) { console.error('give --item <file>'); process.exit(2); }
const { kb, ix } = L.load();
const item = L.parse(fs.readFileSync(a.item, 'utf8')).item;
const ctx = L.P.makeContext(ix, item, { weights: L.weightsFor(item.base) });
const st = L.P.toState(ctx, item);
const sides = L.P.desSides(ctx, st, { op: 'bone' });
const side = a.side || sides[0];
if (!side) { console.log('No bone can be used on this item (no side with room, or it already has a Desecrated modifier).'); process.exit(0); }
console.log(`${item.base}: the bone can use ${sides.join(' or ')}; showing ${side}. Lich omens work on this class: ${L.P.lichOmenWorks(ctx)}`);
const taken = new Set(st.mods.flatMap((m) => m.grp || []));
console.log(`\nDesecrated-only ${side}es on ${item.base}:`);
for (const [id, pe] of L.E.desecratedPoolFor(ix, item.base)) {
  if (pe.side !== side) continue;
  const m = kb.mods[id];
  console.log(`  ${(m.grp || []).some((g) => taken.has(g)) ? 'BLOCKED by the item' : '                   '} ${(L.E.lichOf(m) || '-').padEnd(8)} ${m.txt.replace(/\n/g, ' / ')}`);
}
let seed = 12345;
const rng = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const N = +(a.runs || 150000);
const lichOk = L.P.lichOmenWorks(ctx);
for (const lich of [null].concat(lichOk ? ['Kurgal', 'Amanamu', 'Ulaman'] : [])) {
  const seen = {}, either = {};
  for (let i = 0; i < N; i++) {
    const o1 = L.P.revealOptions(ctx, st, side, 0, lich, rng), o2 = L.P.revealOptions(ctx, st, side, 0, lich, rng);
    for (const o of o1) { const k = (kb.mods[o.id].dom === 'd' ? 'D ' : 'b ') + o.fam; seen[k] = seen[k] || { n: 0, id: o.id }; seen[k].n++; }
    for (const f of new Set([...o1, ...o2].map((o) => o.fam))) either[f] = (either[f] || 0) + 1;
  }
  const omen = { Kurgal: 'Omen of the Blackblooded', Amanamu: 'Omen of the Liege', Ulaman: 'Omen of the Sovereign' }[lich];
  console.log(`\n== ${lich ? lich + ' (' + omen + ')' : 'no lich omen'}: offered | with one Abyssal Echoes reroll`);
  for (const [k, v] of Object.entries(seen).sort((x, y) => y[1].n - x[1].n).slice(0, +(a.top || 18)))
    console.log(`${(100 * v.n / N).toFixed(1).padStart(5)}%  ${(100 * either[k.slice(2)] / N).toFixed(1).padStart(5)}%  ${k[0]}  ${kb.mods[v.id].txt.replace(/\n/g, ' / ')}${k[0] === 'b' ? '  (any tier)' : ''}`);
}
