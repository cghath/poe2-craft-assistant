# Where the tool and the game disagree

Found by the 16 Oct 2026 research (`research/`, the "Conflicts with the tool" sections hold the evidence). The player
chose to note these, not fix the tool. Check a route against this list before presenting it, and say which gap
touches it. Ordered by how often they change advice.

## Changes costs or routes

1. **Catalysing Exaltation ×25.** `app/planner.js:79` `CATALYST_DEFAULT = 25` (one 4-of-4 player test).
   The only measured figure is ×5 at 20% quality, ×7.5 at 40% (poe2wiki, Prohibited Library, 0.4.0).
   *Workaround:* run with `--cat-mult 5` and present that; give the default (×25) as the optimistic case.
   With Greater Exaltation the tool boosts both mods; Maxroll says only the first, the wiki says both. Prefer routes
   that don't depend on it.

2. **Quality capped at 20%.** `planner.js:1236` and `network.js:788` use `Math.min(20, ...)`. Breach Rings reach
   40%, Refined Breach Rings 45%, Essence of the Breach adds 20% (kept after removal), the Catalysing Infuser +10%.
   *Workaround:* for Breach rings, run `--cat-mult 7.5` (40%) as an approximation and say so. The infuser has no
   "at max quality" check either.

3. **Cast Speed (and 25 other tiers) carry poe2db's no-data weight 1.** poe2db is the page's default weight source.
   Craft of Exile has 1000 (rings) / 800 (amulets). *Workaround:* the CLI already corrects jewellery Cast Speed to 800
   (`scripts/cli/lib.js weightsFor`); `--poe2db-weights` turns that off. The others (life/mana leech T5 on bows and
   crossbows, ES recharge T4-6 on int body armour, quiver extra-arrow chance) are not corrected: distrust routes that
   chase them.

4. **Crystallisation omens refused with alloys.** `planner.js:634` and `:1756`; recipes b1/b3 say the omen "does not
   work with alloys". Alloys are Perfect essences in the game data and three crafter sources use the omens with them.
   *Effect:* the route only applies an alloy when any removal is safe, so it can overstate cost or order steps oddly.
   *Workaround:* when the route waits for a safe moment to use an alloy, tell the player a Crystallisation omen makes
   it safe earlier, and add the omen's price by hand.

5. **Two crafted modifiers after Astrid's is replaced.** `engine.js:843-844` (error "max 1 crafted mod"),
   `engine.js:935`, `planner.js:480/623/711`. The cap counts only a currently socketed Astrid's. Real items (live
   wands: Celestial + Transcendent, Lifesprig socketed) hold two crafted mods with no Astrid's.
   *Effect:* pasting such an item gives a reader error; plans may allow a third crafted mod while Astrid's is on.
   *Workaround:* ignore that reader error for items with 2 crafted mods and a socket; treat the item as crafted-full.

6. **Runes can't replace runes.** `planner.js:654-668` need an empty socket. Astrid's, normal runes, soul cores,
   Legacy runes and Hedgewitch's can be overwritten. *Effect:* the tool can't plan "Astrid's → two alloys → Lifesprig".
   *Workaround:* plan the two-crafted part with Astrid's, then add the final rune by hand (its price, no risk).

7. **Altered Collarbone.** `network.js:760` treats it as a Preserved Collarbone. The 36 `breach_desecration` mods are
   in the KB but never offered. It also allows a lich omen with it (the game refuses). *Workaround:* for ring Mana
   before Life or spell-extra-damage desecrations, reason from mechanics.md; `well.js` can't show them.

8. **Putrefaction may not roll desecrated-only mods** (wiki, 1 source). The tool's `putrefy()` reveals them. Routes
   built on a Putrefaction hitting a lich/named mod are unverified: say so.

9. **Lich omen options.** The tool makes one of the three options the lich's; a wiki test says all options become
   that lich's (and other liches are blocked). `well.js` odds with a lich are therefore a floor, not a guess at the
   middle. Desecrated-only weights are equal in the tool; the wiki says uneven.

10. **Genesis Tree mods can't be planned** (only Grasping Mail has the tags). +1 Spell Skills or Mana before Life on
    rings/amulets: price a birthed or bought base instead of a route.

## Smaller

11. **Vaal outcomes.** `vaalOutcome` gives wands/staves quality up to 23% and jewellery a socket; since 0.2.0g wands,
    staves and sceptres get a socket and jewellery gets nothing. Atziri's soul cores (0.5.5, "always change") aren't
    used as the no-change remover.
12. **One Aldur rune per item** (`planner.js:667`); a live staff has two Passion of Aldur. No Rare check either.
13. **Mark of the Abyssal Lord**: the tool applies no floor; the game culls options below 40% of the ilvl.
14. **Sanctify rounds** to nearest in the tool, up in the game (small).
15. **Exceptional bases**: the tool says socket, quality or both; the game text says either. New-base plans never
    consider buying a 2-socket exceptional base: suggest it by hand for Lifesprig + Hedgewitch or Astrid's + Aldur.
16. **KB text that contradicts itself or the notes:**
    - `crafting_ops` regal/alchemy/annul still list Coronation, Alchemy and Greater Annulment omens (gone since 0.3.0).
    - `recipes_0.5.5.json:244` says alloys aren't usable in Forbidden Rites; the KB (27 Sept) says they trade there.
    - R_ONE_CRAFTED's "Runic Ward enchants share this slot" has no game-text source.
    - Catalysts "solely from the Genesis Tree" is official (0.5.0 notes), not just community.

## Not gaps (checked, the tool is right)

Wand Artificer cap 1 (exceptional adds 1); Fracturing ignores desecrated mods but counts them; Greater/Perfect floors
44/70 and 35/50; Whittling takes unrevealed mods first; Erasure on full items; one desecrated mod with the
Putrefaction exception; Legacy of Lifesprig +2; Transcendent Alloy's 0.5.3 wand values; the 0.5.0 Cast Speed tier levels.
