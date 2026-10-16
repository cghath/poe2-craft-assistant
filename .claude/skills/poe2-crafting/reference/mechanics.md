# PoE2 0.5.5 crafting mechanics

What the game does, condensed from the three research reports in `research/` (16 Oct 2026; sources and quotes are
there). Tags: **[game]** in-game text, **[notes]** official patch notes, **[2+]** / **[1]** community sources,
**[inf]** reasoning, **[open]** unresolved. Say the tag's weight when advice rests on a [1] or [open] fact.

Nobody can datamine modifier weights: every weight (the tool's, Craft of Exile's, poe2db's) is a community estimate.

## Slots and limits

- Magic: 1 prefix + 1 suffix. Rare: 3 + 3. Rare jewels: 2 + 2. [game]
- Serle's Triumph rune: +1 suffix (socket-bound). Astrid's Creativity does **not** raise the 6-mod cap. [game] [1]
- One modifier per mod group. [2+]
- A tier rolls only if its modifier level is at or below the item level (e.g. resistance T1 needs ilvl 81-82). [2+]
- **Crafted modifiers: one per item.** [game] [notes 0.5.0] Crafted = every essence (Perfect and corrupted
  included), the 13 alloys, liquid emotions on jewels. Runic Ward enchants sharing the slot: [1, unverified].
- **Astrid's Creativity** (rune, replaceable, limit 1): +1 crafted modifier while socketed. [game]
  Replace it with another rune after the second crafted mod is on, and **both crafted mods stay**. [2+ and live wands]
  Whether a new crafted mod can then be added: presumably not. [open]
  Can't be socketed into Corrupted or Sanctified items (0.5.4f). [notes]
- **Desecrated modifiers: one per item**, and they are not crafted. [notes 0.5.0] An item with one, revealed or not,
  can't be desecrated again. [game] Exception: Omen of Putrefaction. [1]
- Fractured modifiers can't be removed or changed, Divine Orbs included. [game]

## Core currency

| Orb | Does | Notes |
|---|---|---|
| Transmutation / Augmentation | Normal → Magic with 1 mod / add 1 mod to Magic | Greater min mod level 44, Perfect 70 [notes 0.5.0] |
| Regal | Magic → Rare, +1 mod | Greater 35, Perfect 50 [2+] |
| Exalted | +1 mod on a Rare | Greater 35, Perfect 50 |
| Chaos | removes 1 random mod, adds 1 (not a full reroll) | Greater 35, Perfect 50 |
| Alchemy | Normal/Magic → Rare with 4 mods | |
| Annulment | removes 1 random mod | |
| Divine | rerolls values | not on fractured mods |
| Fracturing | locks a random mod; needs 4+ mods; not on an item already fractured | see below |
| Vaal | corrupts, unpredictably | see Corruption |
| Artificer's | +1 augment socket (martial weapon, wand, staff, armour) | never jewellery |
| Hinekora's Lock | preview the next currency's result | any change ends the preview [game] |
| Chance | Normal → random Unique or destroyed | |

- A minimum modifier level only raises the tier floor; it doesn't change which family is picked. Such an orb can't be
  used on items whose ilvl is below its floor. [game]
- Greater/Perfect orbs are wasted on jewels (no tiers). [1]

## Omens (each fires once, on the next matching use)

- **Sinistral / Dextral Exaltation**: the Exalt adds only a prefix / suffix. [game]
- **Greater Exaltation**: the Exalt adds two mods (needs 2 open slots); combines with Sinistral/Dextral. [game]
- **Catalysing Exaltation**: the Exalt consumes all catalyst quality to favour the matching tag. [game]
  - Size: **×5 at 20%, ×7.5 at 40%** (a Prohibited Library test, 0.4.0; CoE's formula 1 + 0.2 × q gives the same at 20%). [1]
    The tool assumes ×25 at 20% from one 4-of-4 player test that ×5 doesn't rule out. Default to `--cat-mult 5`; show ×25 as the optimistic case.
  - With Greater Exaltation: Maxroll says only the first mod is boosted; poe2wiki says both. [conflict]
- **Sinistral / Dextral Annulment**: the Annulment removes only a prefix / suffix. [game]
- **Sinistral / Dextral Erasure**: the Chaos removes only a prefix / suffix (on a full item the new mod lands there too). [game] [1]
- **Whittling**: the Chaos removes the lowest-*level* mod (level requirement, not tier). Unrevealed desecrated mods count as level 1, so they go first. [game] [1]
- **Light**: the Annulment removes only a Desecrated mod (exclusive or base). [game] [1]
- **Sinistral / Dextral Crystallisation**: a Perfect or Corrupted Essence removes only a prefix / suffix. [game]
  Works with alloys too (alloys are Perfect essences in the game data; three crafter sources). [2+]
  Without it the removal is random, except a full side of the new mod's type must lose one from that side. [2+]
- **Sinistral / Dextral Necromancy**: the desecration uses only a prefix / suffix slot. [game]
- **Liege (Amanamu) / Sovereign (Ulaman) / Blackblooded (Kurgal)**: the desecration guarantees that lich's modifier.
  Weapons and jewellery only (Jawbone, Collarbone, belts included); with a Rib or Altered Collarbone it errors and the
  bone isn't used. [game] [GGG staff] Whether 1 of the 3 options is the lich's (CoE, the tool) or all of them (wiki
  test, 0.3.0c): [open]
- **Abyssal Echoes**: reroll the Well of Souls options once; must be active before the reveal. [game]
- **Putrefaction**: the desecration replaces every mod with up to 6 unrevealed ones and corrupts the item. [game]
  The wiki says it never rolls desecrated-only (lich/named) mods [1]; the tool assumes it can. Still works in 0.5.5. [2+]
- **Sanctification**: Divine on a Rare sanctifies it: each value ×0.78-1.22 of the current value, then locked. [game] [notes]
- **The Blessed**: Divine rerolls implicits only. [game]
- **Gone**: Greater Annulment, Sinistral/Dextral Coronation and Alchemy (0.3.0); Homogenising and Corruption (Standard
  exchange only); Recombination and the Recombinator (0.5.0). [notes]

## Fracturing

- Picks a random mod among the eligible ones; the item needs 4+ mods. [game]
- **Desecrated mods, revealed or not, are never picked but count toward the 4**: three mods + an unrevealed
  desecrated = 1 in 3 for each. [2+]
- Whether a crafted (essence/alloy) mod can be picked: [open; one guide implies yes, and it still fills the crafted slot].
- Fracturing Orbs need Atlas specialisation (Hidden Scars, Cleansed monsters, area 75+). [notes] [1]

## Desecration (bones and the Well of Souls)

- Jawbone: weapon or quiver. Rib: armour. Collarbone: amulet, ring, belt. Preserved Cranium: jewel. Vertebrae: waystone. [game]
- Gnawed: max ilvl 64. Preserved: no limit. Ancient: min modifier level 40. [game]
- On a full item the bone also removes a random mod. [game]
- The unrevealed mod takes a prefix or suffix slot; the reveal offers only that side. [2+]
- The Well offers 3 options, some may be base mods. With ilvl high enough (about 65+), at least one is desecrated-only;
  CoE's split is 1/2/3 desecrated-only options at 80/15/5% [1]. Desecrated-only weights: CoE says equal, the wiki says
  uneven [conflict; treat odds from well.js as estimates].
- Armour (body, helmet, gloves, boots) has no desecrated-only prefixes; sceptres have none at all. [2+]
- Lich mods are level 65 on equipment. [2+]
- **Altered Collarbone** (Genesis Tree only): adds 36 "otherworldly" `breach_desecration` mods to the reveal pool
  (ring: Mana before Life 8-12%, Gain % as extra Fire/Cold/Lightning/Chaos with Spells, +1 Elemental Infusion, ...).
  Not with lich omens. Weights unknown. [2+]
- **Mark of the Abyssal Lord** (Essence of the Abyss, either side): the next bone replaces the Mark with a higher-tier
  unrevealed mod (options below 40% of the ilvl are culled). Can't be added next to a Desecrated mod. [2+] [1]

## Essences and alloys

- Lesser/normal/Greater: Magic → Rare with a guaranteed mod. Perfect and corrupted: remove a random mod, add one. [game]
- All are crafted modifiers (one per item, see Slots).
- Notable Perfect essences: Sorcery (wand +3 / staff +5 spell levels), Battle (+2 one-hand/bow, +3 two-hand/crossbow
  attack levels), Mind (ring 4-6% mana), Body (body armour 8-10% life). [2+]
- Corrupted essences: Abyss (Mark), Breach (jewellery +20% max quality, kept after the mod is removed), Horror (gloves
  or boots +60% socketed augment effect), Insanity (belt: two enchantments on corruption), Delirium (body armour
  notable), Hysteria (per class). [game] [2+]
- **Alloys** (13, from Remnants): remove a random mod and add a crafted mod, like Perfect essences. Key ones:
  - Celestial (prefix, lvl 65): wand/staff +142-188 mana and **+1 to Level of all Spell Skills**; martial accuracy + attack speed.
  - Transcendent (suffix, lvl 65): staff 39-47% cast speed + 11-16% extra Cold; wand/focus 26-31% + 7-11% (0.5.3 values).
  - Sovereign (lvl 65): weapons +20-30% socketed augment effect; jewellery +20-30% explicit resistance magnitude (prefix).
  - Swift: ring 7-9% attack speed, gloves 9-12% cast speed. Mystic: caster weapons +1 Elemental Infusion; boots +10-15 Spirit.
  - The full list per class: `mods.js --base "<base>"` prints the class's essences and alloys.
  - Usable in Forbidden Rites: probably (traded on its exchange, 27 Sept; Remnants core since 0.5.5). One tool recipe says no. [inf]

## Sockets, runes and augments

- Artificer's cap: 2 on body armour and two-handed weapons, 1 on everything else. Jewellery and quivers: none. [2+]
- **Exceptional bases** (ilvl 78+, need Atlas specialisation; also Trial of Chaos/Sekhemas since 0.5.5): one socket
  above the cap and/or quality above 20% (max 30%). Whether both at once: [open]. [2+]
- Vaal Orb can add a socket past the cap (weapons incl. wands/staves/sceptres, armour; not jewellery). [2+]
- **Replaceable** augments (can be overwritten, not retrieved): normal runes, soul cores, Astrid's Creativity, Legacy
  runes, Hedgewitch's rune. **Socket-bound** (permanent): Serle's Triumph, the six pool runes, the four Aldur runes,
  Raven-Touched Shard. [game]
- Orb of Extraction destroys the item and returns the non-socket-bound augments. [game]
- **Aldur runes** (Ire: Fire+Cold→Lightning; Passion: →Fire; Breath: →Cold; Betrayal: →Chaos): Rare weapons only;
  convert existing mods at the same tier on socketing; later mods aren't converted; fractured mods aren't converted.
  Two on one item exist (live staff with two Passion). Whether crafted/desecrated mods convert: [open]. [game] [live]
- **Aldur's Legacy** turns an uncorrupted Kalguuran/Ezomyte unique into a Legacy rune of its class (limit 1 Legacy).
  Legacy of Lifesprig: wand **+2 Spell Skills**. Others: Cursecarver (wand +3 curse levels), Runeseeker's Call (wand
  +75% socketed rune effect), Mjölner (mace +3 lightning). [game]
- Hedgewitch Assandra's Rune of Wisdom: wand/staff **+1 Spell Skills**, replaceable. A 2-socket wand could hold it and
  Lifesprig (+3 total) [inf, untested].
- Pool runes (socket-bound): Medved's Tending (body, Soul mods incl. Spirit), Kolr's Hunt / Katla's Gloom (gloves),
  Vorana's Carnage (helmet), Uhtred's Sidereus (boots), Thrud's Might (weapons). [game]
- **Bonded** lines work only for Shaman (Wisdom of the Maji) or with a Fox Idol on body armour. Display-only for crafting. [2+]
- Socket Astrid's, Serle's and pool runes **before** any Vaal or Sanctify (0.5.4). [notes]

## Quality and catalysts

- Ring/amulet catalysts (13 types: Flesh life, Neural mana, Carapace defences, Sibilant caster, Skittering speed,
  Reaver attack, Adaptive attributes, Necrotic minion, elemental/chaos/physical ones) give quality that boosts matching
  mods 1% per 1% and feeds Catalysing Exaltation. Refined versions work on jewels. [game] [notes]
- Catalysts come only from the Genesis Tree since 0.5.0. Quality per catalyst falls as ilvl rises (no table). [notes] [2+]
- Max quality 20%; Breach Ring 40%, Refined Breach Ring 45%; Essence of the Breach +20% (kept after the mod goes);
  Vaal Catalysing Infuser +up to 10% over max (item must be at max; may corrupt). [game] [2+]

## Corruption

- Vaal on Rare/Magic gear, about equally likely [1]: no change; reroll some mods (1-3 / up to half: sources differ);
  a corruption enchantment; +1 socket (jewellery: no change instead). Uniques: values ×0.78-1.22. [2+]
- "Always change": Atziri's soul cores (0.5.5, helmet/gloves/boots/body, socket-bound). [notes] Omen of Corruption is Standard-only.
- Architect's Orb: 50% second enchantment, else destroyed. Orbs of Sacrifice upgrade the enchantment and remove a mod. [game] [notes]

## Breach and the Genesis Tree

- Wombgifts and Hiveblood from Breaches birth rings (Signet), amulets (Ornate), belts (Banded), currency (Lavish). [notes]
- Genesis-only bases: rings (Breach, Refined Breach, Biostatic, Vitalic, Mnemonic, Kinetic, Oneiric, Grasping),
  amulets (Lament -1 prefix, Portent -1 suffix, Absent -1 each, with a Persistent Buff skill; Corona), belts. [2+]
- Tree nodes force Caster/Minion mods, raise minimum levels, max values, and open the `genesis_tree_caster` pool:
  **+1 to Level of all Spell Skills** (rings and amulets), **Damage taken from Mana before Life** (amulets only;
  the ring version comes from the Altered Collarbone), spell damage/crit, Arcane Surge, curse magnitude... [2+]
- Those mods can't be added later by Chaos/Exalt on a normal base (no tag), except on Grasping Mail. [open for birthed items]

## Proven strategies (0.5.x)

1. **Two crafted mods**: socket Astrid's → alloy/essence #1 → alloy #2 (Crystallisation omen picks the side the
   removal hits) → finish → overwrite Astrid's with Lifesprig / Hedgewitch / an Aldur rune.
2. **Fracture at 1 in 3**: three mods + an unrevealed desecrated mod, then Fracturing Orb.
3. **Annul down, Chaos spam** one slot around a fractured key mod (Erasure omens pick the side).
4. **Desecration loop**: lich + Necromancy omen → bone → Abyssal Echoes reveal → miss: Omen of Light + Annulment → repeat.
5. **Catalysts + Catalysing Exaltation** on rings/amulets, Breach rings to 40% for ×7.5.
6. **Putrefaction slot machine** on ilvl 82+ bases; sell the hits.
7. **Fix, don't build**: buy a near-finished item with one flaw, fix it, resell.
8. **Hinekora's Lock** before a Vaal, Divine or Fracturing Orb.
Profit claims in videos (poebuilds.cc index) are creators' claims, not sales data.
