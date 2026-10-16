# PoE2 0.5.5: runes, augments, alloys, runeforging, and proven crafting strategies

Research date 2026-10-16. Patch 0.5.5 (Forbidden Rites event league, which started 4 Sept 2026; Runes of Aldur challenge league, which started 29 May 2026).
Confidence tags: [game text] = item or omen text as poe2db shows it, or the tool's datamined KB. [patch notes] = the official forum.
[2+ sources] / [1 source] = community sources. [inference] = my own reasoning, flagged as such.

**Sources that worked:** poe2db.tw (item boxes); pathofexile.com forum patch notes (0.5.0 3932540, 0.5.2 3960375, 0.5.3 3968601,
0.5.4 3975218, 0.5.5 4000864, FAQ 4000430, forum thread 3979409); maxroll.gg news; game8; vortexgaming.io; note.com/poe2_sat;
poebuilds.cc (video index); kami-labs.fr (0.5.4 summary); domistae.github.io codex (community; partly 0.5.0 content);
poe2craft.com codex.
**Blocked:** poe2wiki.net (Anubis bot wall, every page), mobalytics.gg (403; only search snippets), ezg.com (403),
softcap.online (connection refused). Craft of Exile was not needed.

---

## 1. Augment sockets, runes and soul cores

- Artificer's Orb text: "Adds an Augment Socket to a Martial Weapon, wand, staff or Armour". Jewellery is excluded. [game text] https://poe2db.tw/us/Artificers_Orb
- Usual maximum from Artificer's Orbs: 2 on body armour and two-handed weapons (staff, quarterstaff, bow, crossbow, two-hand mace/axe/sword, talisman), 1 on everything else. [2+ sources] https://poe2craft.com/codex/runes , https://domistae.github.io/poe2-leveling/poe2_crafting_codex.html
- Exceptional bases can have one socket more than the class usually gets, quality above 20%, or both. Live trade staves show `Sockets: S S S`, which is 2+1 (tool fixture `ghoul-beam`, 0.5.5 listing). Two-socket exceptional wands are reported by the user and the tool's R_EXCEPTIONAL (player, 6 Oct 2026); I found no web source for wands specifically. [1 source + live item for staves] Older 0.3 guide: https://vortexgaming.io/en/postdetail/539552
- Vaal Orb can add a socket past the maximum. [1 source: community codex; poe2db's Vaal Orb page doesn't list outcomes] https://domistae.github.io/poe2-leveling/poe2_crafting_codex.html
- 0.5.0 made Fracturing Orbs and Exceptional items depend on Atlas specialisation. [patch notes / codex] https://www.pathofexile.com/forum/view-thread/3932540
- Two kinds of augment:
  - **Replaceable augments** ("Once socketed it cannot be retrieved but can be replaced by other Augment items"): normal runes, soul cores, Astrid's Creativity, Legacy runes, Hedgewitch Assandra's Rune of Wisdom. [game text] https://poe2db.tw/us/Astrids_Creativity , https://poe2db.tw/us/Legacy_of_Lifesprig , https://poe2db.tw/us/Hedgewitch_Assandras_Rune_of_Wisdom
  - **Socket-bound augments** ("Once socketed it cannot be retrieved or replaced"): Serle's Triumph, the six pool ("warping") runes Medved's Tending, Kolr's Hunt, Katla's Gloom, Vorana's Carnage, Uhtred's Sidereus and Thrud's Might, and the four Aldur conversion runes. [game text] https://poe2db.tw/us/Serles_Triumph , https://poe2db.tw/us/Medveds_Tending , https://poe2db.tw/us/Ire_of_Aldur
- Orb of Extraction: "Destroys an Equipment item, returning any non Socket-Bound Augments socketed in it". [game text, tool KB]
- 0.5.4 change: Astrid's Creativity, Serle's Triumph, Katla's Gloom, Kolr's Hunt, Medved's Tending, Raven-Touched Shard, Thrud's Might, Uhtred's Sidereus and Vorana's Carnage can no longer be socketed into Corrupted or Sanctified items. Socket them before you Vaal or Sanctify. [patch notes] https://www.pathofexile.com/forum/view-thread/3975218
- 0.5.0 rune changes: Body Runes give +30/45/60 life on armour, Mind Runes +20/30/40 mana. Lesser/Greater/Perfect Jeweller's Orbs now work on items with skills. [patch notes] 3932540
- 0.5.4: Masterwork Runes can upgrade runes in the Martial Artist's Runic Meridians rune-only sockets, and those sockets now count toward "per rune socketed". [patch notes, via kami-labs summary] https://kami-labs.fr/en/path-of-exile-2/patch-notes-0-5-4-path-of-exile-2/

### Crafting runes

- **Astrid's Creativity**: "All Equipment: Can have 1 additional Crafted Modifier". Limit 1, drop level 65, about 2.3 div (poe2db 24h, undated). It is replaceable. [game text] https://poe2db.tw/us/Astrids_Creativity
  - It does not raise the 6-modifier cap (3 prefixes + 3 suffixes). Player answer, 3 Jul 2026, not GGG. [1 source] https://www.pathofexile.com/forum/view-thread/3979409
  - **The extra crafted modifier stays when another augment replaces Astrid's.** Guides say to "replace Astrid's Creativity socket with your rune of choice after the final mod is unveiled" (BigDaddy +7 wand guide, search snippet) and that the added modifier "remains even after you swap it for another rune" (Vortex). [2+ sources + live wands with Celestial and Transcendent and no Astrid's] https://vortexgaming.io/en/postdetail/1015758 , https://mobalytics.gg/poe-2/profile/bigdaddygaming/guides/0-5-7-wand-crafting-guide
  - Recipe (one list): Wisdom + Arcane + Time + Adaptive + Power + Volcanic + Death runeshapes. [1 source] aoeah/u4n lists
- **Serle's Triumph**: "+1 Suffix Modifier allowed" (stats local_maximum_suffixes_allowed_+ and local_maximum_mods_allowed_+). Limit 1, socket-bound. Recipe: an 8-rune remnant (Wisdom, Momentum, Protective, Moon, Power, Oath, Sky, Tidal). [game text; recipe 2 sources]
- **Pool ("warping") runes** each add an item tag so a hidden modifier family can roll. All are socket-bound and limited to 1.
  - Medved's Tending, body armour: Soul. 21 mods: 5 "of the Soul" suffixes and 16 "Medved's" prefixes, such as % life/mana/spirit and hybrid defence + Spirit.
  - Kolr's Hunt, gloves: Marksman.
  - Katla's Gloom, gloves: Decay.
  - Vorana's Carnage, helmet: Berserking.
  - Uhtred's Sidereus, boots: Chronomancy.
  - Thrud's Might, all weapons: Destruction. Its Bonded line is +5% to all elemental resistances.
  - [game text] https://poe2db.tw/us/Medveds_Tending
- **Cadigan's Epiphany**, gloves: "Destroys all Augment Sockets on the item to create a Jewel Socket". [game text, tool KB]
- **Masterwork Rune**: "Upgrades a socketed Rune" (martial weapons). [game text]
- **Hedgewitch Assandra's Rune of Wisdom**, wand or staff: +1 to Level of all Spell Skills. Bonded: Archon recovery 30% faster. Requires level 50, limit 1, replaceable. [game text] https://poe2db.tw/us/Hedgewitch_Assandras_Rune_of_Wisdom

### Aldur conversion runes

All four are socket-bound and go only into Rare weapons ("Place into an empty Augment Socket in a Rare Weapon").
- Ire of Aldur: Fire and Cold become Lightning.
- Passion of Aldur: Cold and Lightning become Fire.
- Breath of Aldur: Fire and Lightning become Cold.
- Betrayal of Aldur: Fire, Cold and Lightning become Chaos.
- Bonded line for each: 25% increased damage of its element.
- Game text: "Transforms modifiers upon socketing, further added modifiers will not be transformed." [game text] https://poe2db.tw/us/Ire_of_Aldur
- Mods change to the same tier. poe2db has a 78-row equivalency table, for example "Gain (43–48)% of Damage as Extra Fire" becomes the Lightning or Chaos version. [game text]
- Fractured mods are not converted. Live listing "Ghoul Beam": Passion of Aldur socketed, but the fractured "+7 to Level of all Cold Spell Skills" stays Cold. [live item, tool fixture]
- **"Forged by the X of Aldur (rune)"** is how a socketed Aldur rune shows on the item when copied (Ctrl+C), in place of a stat line. Live listings show it, for example "Forged by the Passion of Aldur (rune)". Converted mods show no "(Tier: n)" in the advanced copy. [live items: tool fixtures `ghoul-beam` and `mind-roar`]
- **Two Aldur runes on one item happen.** "Mind Roar" (2-socket staff, 0.5.5 listing, 45 div) has Passion of Aldur twice. My reading: the second rune converts mods added after the first one. [live item + inference]
- Recipes are Lv70+ runeshapes; for example Passion = Soul + Fire + Rage + Life + Power + Wisdom + Earth. Prices in Forbidden Rites: Passion about 187 per div (outof.games, undated). [1 source]

### Aldur's Legacy and Legacy runes

- Aldur's Legacy: "When socketed into a Unique Kalguuran or Ezomyte item, destroys the item to create a Rune imbued with that item's power". The unique must not be corrupted. [game text] https://poe2db.tw/us/Aldurs_Legacy
- Every Legacy rune is "Limited to: 1 Aldur's Legacy", requires level 65, is replaceable, and stays in the class of the unique it came from. There are 63 Legacy runes. [game text]
- **Legacy of Lifesprig** (wands): +2 to Level of all Spell Skills. Bonded: leech 1% of maximum life when you cast a spell. Confirmed. [game text] https://poe2db.tw/us/Legacy_of_Lifesprig
- Other notable Legacy runes:
  - Cursecarver (wand): +3 Curse skill levels.
  - Runeseeker's Call (wand): 75% increased Socketed Rune effect.
  - Adonia's Ego (wand): +1 maximum Power Charges.
  - Mjölner (one-hand mace): +3 Lightning skill levels and +200 Intelligence requirement.
  - Greymake (helmet): +50 to all Attributes.
  - Elevore (helmet): +1 Charm slot.
  - Northpaw (gloves): 7% base crit for weapon attacks.
  - Quill Rain (bow): 50% increased attack speed and 20% less attack damage.
  - [game text]
- 0.5.2 fixed a bug so Aldur's Legacy can be socketed into Runeseeker's Call. [patch notes] 3960375
- An exceptional 2-socket wand could in theory hold Legacy of Lifesprig and Hedgewitch's rune together, for +3 spell levels. The two have different limit groups. [inference; untested]

### Bonded effects

- Bonded lines apply only when the wearer can use them. The source is the Shaman (Druid) ascendancy notable **Wisdom of the Maji**: runes and idols in augment sockets on equipped items also give their Bonded effect. [2+ sources] https://poe2db.tw/us/Wisdom_of_the_Maji , https://www.poe2wiki.net/wiki/Bonded (search snippet)
- Not strictly Shaman-only: the **Fox Idol** on body armour reads "Idols socketed in this item gain the benefits of their Bonded modifiers". [1 source] https://poe2craft.com/codex/runes
- For crafting, Bonded lines are display-only. They never change modifier slots. [inference]

## 2. Runic Alloys

- 0.5.0 patch notes: "Added 13 new Alloy currency items, which can be unlocked through Remnant encounters… These items add various new crafted modifiers to items by replacing an existing modifier, similar to Perfect Essences." [patch notes] 3932540
- Item text: "Removes a random modifier and augments a Rare item with a new guaranteed modifier". [game text]
- **Alloy mods are crafted mods** and share the crafted limit with essences. [patch notes + 2+ sources]
- Game data lists every alloy (132 rows) as `IsAlloy` and also `IsPerfect`, inside poe2db's "perfect_essence" list. They are implemented as Perfect Essences. [game data: tool `weights_0.5.5.json`]
- The 13 alloys and what they add, by class. These come from the tool data, and the spot-checks on poe2db Celestial and Runic match. [game text]
  - **Runic**: amulet +6–10% maximum Runic Ward; ring +37–49 Runic Ward; belt +15–20% Ward regeneration (prefix, level 13).
  - **Adaptive**: sceptre, Puppet Master chance; wand +21–26% (staff +42–52%) damage as extra Fire while missing Runic Ward; gloves attack speed while missing Ward.
  - **Protective**: weapons +51–74 Runic Ward; shield/buckler, Ward on Block; belt, Ward on Charm use.
  - **Expansive**: body Presence area; helmet Mana Cost Efficiency (prefix); gloves Remnant pickup range; boots temporary minion limit.
  - **Swift**: shield/buckler/focus totem placement speed; ring 7–9% attack speed; belt flask charges per second; gloves 9–12% cast speed.
  - **Cyclonic**: body, reduced Slow potency; helmet, Archon duration; gloves, damaging ailment duration; boots 15–19% skill effect duration.
  - **Prismatic**: sceptre, minion ailment magnitude; wand/staff/focus 40–50% Exposure effect; martial weapons 20–30% ailment magnitude; gloves 9–15% elemental penetration (prefix).
  - **Mystic**: caster weapons +1 maximum Elemental Infusions; quiver chain chance; helmet spell AoE; gloves attack AoE; boots +10–15 Spirit.
  - **Sovereign**: weapons 20–30% increased effect of Socketed Augments (level 65); armour 24–30% increased Runic Ward; jewellery 20–30% increased explicit Resistance modifier magnitudes (level 65, prefix).
  - **Celestial** (prefix, level 65): wand/staff +142–188 maximum Mana and +1 to Level of all Spell Skills; martial weapons +327–427 accuracy and 5–8% attack speed. poe2db 24h: about 1.8 div. https://poe2db.tw/us/Celestial_Alloy
  - **Transcendent** (suffix, level 65): staff 39–47% cast speed and 11–16% elemental damage as extra Cold; wand/focus 26–31% and 7–11%; martial weapons +7–10 all attributes and 15–20% increased physical damage.
  - **The Runebinder's** (level 65): sceptre +4–5 Puppet Master stacks; wand +1 Limit for Elemental Skills; staff, Nature's Archon; bow 40–50% Mark effect; crossbow +2 Ballista Totems.
  - **The Runefather's** (level 65): quarterstaff, Tempest Bell hits; spear +8–10 weapon range; maces, retain Glory; talisman, Lightning contributes to ignite.
- Alloy history:
  - 0.5.2 (11 Jun 2026): Transcendent Alloy removed from foci and wands. Runefather's and Runebinder's moved to 8-slot inscription rewards. Swift Alloy obtainability fixed. [patch notes] https://www.pathofexile.com/forum/view-thread/3960375
  - 0.5.3 (18 Jun 2026): "Transcendent Alloy can once again be applied to Foci and Wands … same effects as … Staves but at lower values." [patch notes] https://www.pathofexile.com/forum/view-thread/3968601
- **How many alloy or crafted mods fit:**
  - The base rule is 1 crafted mod per item: "items can only have 1 crafted modifier at a time". [patch notes 0.5.0]
  - With Astrid's Creativity socketed, 2 fit.
  - Live wands with Celestial and Transcendent and no Astrid's are explained by replacing Astrid's after crafting (section 1). [2+ sources]
  - A third crafted mod is impossible even with Astrid's. [tool sweep finding; consistent with the rune text]
- Some Runic Ward enchants share the crafted slot. [1 source: community codex]
- **Are alloys league-only in 0.5.5? Unresolved. The evidence points both ways:**
  - The community codex says "Runic Alloys … remain Runes of Aldur–only". [1 source]
  - The official 0.5.5 notes say "Farrow, Dannig, and Expedition content is now available in the Atlas as a core mechanic, including in Standard" and add a Runeshape recipe to Expedition Remnants in Logbooks. Only the Aldur's Saga is named as Runes of Aldur-only. [patch notes] https://www.pathofexile.com/forum/view-thread/4000864
  - The tool's own KB note says alloys trade on the Currency Exchange in Forbidden Rites (checked 27 Sept 2026).
  - Several 0.5.5 Forbidden Rites crafting videos use alloys.
  - Best reading: alloys are obtainable in Forbidden Rites through core Remnants. Verify on the Forbidden Rites exchange. [inference]

## 3. Verisium, Runeforging, Anvil, Runic Ward

- Verisium drops from monsters raised by Remnants (Expedition and Logbooks). [patch notes 0.5.0]
- Act 1 Runeforging (Farrow) adds Runic Ward to armour. Ward starts absorbing once you reach 1 life and regenerates on its own. Above about level 55 bases, Runeforging trades some regular defences for Ward. [patch notes 0.5.0 + codex]
  - 0.5.3: defence loss on high-level non-unique bases lowered by about 20%. Existing items were updated. [patch notes]
- Act 3 Unique Runeforging upgrades a unique's base type.
  - Kalguuran uniques get extra properties: Runeforged, then Runemastered with a Crest, for example Brynhand's Mark at 205 then 460 Verisium plus Medved's Crest. [patch notes + tool KB]
- Modifiers stay when an item is Runeforged. Socketed augments are kept: 0.5.2 fixed the Anvil's augment preview, and 0.5.3 fixed socketed jewels being lost. [patch notes; tool t28]
- 0.5.5: outside Runes of Aldur, the Anvil unlocks with The Runeseeker quest in Act 4, and Farrow can be placed in your hideout. [patch notes 4000864]
- 0.5.4: Liquid Verisium (bought from Farrow, Expedition Atlas node "Feeling Lucky?") starts a Runic Remnant immediately. [patch notes 3975218]

## 4. Other crafting tools relevant here (texts verified)

- Omen of Sinistral/Dextral Crystallisation: "your next Perfect or Corrupted Essence will remove only Prefix/Suffix modifiers". [game text] https://poe2db.tw/us/Omen_of_Sinistral_Crystallisation
  - Crafters use it with alloys and report that it works. Note.com: Crystallisation with Transcendent Alloy removed one of the three prefixes. The Mobalytics paintmaster guide says "alloys count as essences for omen purposes". BigDaddy uses Celestial Alloy with Sinistral Crystallisation. This fits alloys being `IsPerfect` in the data. [2+ sources + game data]
- Omen of Whittling: the next Chaos Orb removes the lowest-*level* modifier, not the lowest tier. An unrevealed Desecrated mod counts as level 1. [game text + wiki snippet]
- Omen of Catalysing Exaltation: the next Exalted Orb consumes all catalyst quality to raise the chance of the matching modifier type. The community figures (about 5x at 20%, 7.5x at 40% on Breach rings) are not official. [game text; multipliers 1 source]
- Since 0.5.0, catalysts come only from the Genesis Tree. 0.5.2 added the Necrotic Catalyst and Refined Necrotic Catalyst for minion mods on rings and amulets. [patch notes]
- Hinekora's Lock: "foresee the result of the next Currency item used on it; modifying the item in any way removes the ability". About 18 locks per div (poe2db, undated). [game text] https://poe2db.tw/us/Hinekoras_Lock
- Desecration:
  - Lich omens (the Liege = Amanamu, the Sovereign = Ulaman, the Blackblooded = Kurgal) work on **weapon or jewellery** desecration only.
  - Body armour, gloves, boots and helmets have **no prefix desecrated mods**. Sceptres have no exclusive ones.
  - Gnawed bones: maximum item level 64. Ancient bones: minimum modifier level 40.
  - Omen of Putrefaction: up to 6 unrevealed mods, and the item is corrupted.
  - Mark of the Abyssal Lord is always replaced by a higher-tier unrevealed mod.
  - [game text] https://poe2db.tw/us/Desecrated_Modifiers
- Removed or disabled: Omen of Corruption (Standard only), Homogenising omens, the Recombinator. [patch notes 0.5.0]

## 5. Proven strategies (0.5.x)

1. **Two crafted modifiers with Astrid's Creativity.** Wand, staff, boots; also the Puppet Master sceptre. [2+ sources]
   1. Use a base with a free socket. Use an Artificer's Orb if needed, or an exceptional base.
   2. Socket Astrid's Creativity.
   3. Apply alloy #1 (or an essence), then alloy #2. Use a Sinistral or Dextral Crystallisation omen so the removal hits the side you choose.
   4. Desecrate or finish.
   5. **Last**, overwrite Astrid's with the rune you want: Legacy of Lifesprig (+2), Hedgewitch's (+1), or an Aldur conversion rune if the elements need converting.
   - Sources: note.com wand guide (4 Jul 2026, 0.5.0). Magic +5 elemental spell wand → Greater Essence of Seeking (crit) → Omen of Greater Exaltation + Sinistral Exaltation + Exalted Orb → Astrid's + Crystallisation + Transcendent Alloy → Omen of the Sovereign + Preserved Jawbone. Under 6 div plus the base. https://note.com/poe2_sat/n/n72ba913bbcad
   - Opulent Exile plant staff (26 Sept 2026, 0.5.5, from the tool's research log). Bought +7 physical-spell 3-socket base (about 12 div each; expect 3 bases per fracture), Fracturing Orb 7 div, annul down to one mod and Chaos-spam for T1 spell damage (about 1,400 Chaos, 175 div), Celestial Alloy, Astrid's 5 div, Transcendent Alloy, Perfect Exalt 3 div, Omen of Whittling about 20 div per use.
2. **Fracture first at 1 in 3.** Get three mods plus an unrevealed Desecrated mod (four mods, but Fracturing only picks among the three revealed ones; this is a community claim), then fracture. [1–2 sources: Opulent Exile; MMOEXP amulet write-up, 11 Jul 2026]
3. **Annul down, then Chaos spam.** With the key mod fractured, annul to one other mod. Each Chaos Orb (or Erasure omen + Chaos) then rerolls only that slot. Opulent Exile: about 1,400 Chaos for T1 spell damage. Jewel write-up: about 1 in 73 per Chaos on an Emerald. [1–2 sources]
4. **Desecration loop.** Rare item with the Desecrated slot free → lich omen (weapon or jewellery only) + Necromancy omen for the side → bone → reveal with Omen of Abyssal Echoes → on a miss, Omen of Light + Orb of Annulment → repeat. Hax jewel: about 8 tries at about 6 div each (9 Sept 2026). SaVeQ (16 Sept 2026) shows how to spam desecrations on amulets and rings without Omens of Light; method not read. [2+ sources]
5. **Fractured-suffix amulet loop** (Absent/Portent Amulet, Dusk Ring). Keep exactly two mods on the target side, one of them fractured. Necromancy omen + essence or alloy keeps the desecration on a chosen side without spending Omen of Light. [1 source: EZG 0.5.5 intro; body blocked]
6. **Catalyst + Catalysing Exaltation.** Breach ring to 40% quality (Hax ring "Speed catalyst to 40%", 18 Sept 2026), then the omen + Exalted Orb, then restore quality. Minion jewellery: Necrotic Catalyst (0.5.2). [2 sources]
7. **Omen of Putrefaction slot machine.** XTheFarmerX buys item level 82+ uncorrupted bases such as Ancestral Tiara, makes every mod Desecrated, and sells the hits (Sept 2026). [1 source + player confirmation, 25 Sept]
8. **Fix, don't build.** Buy a near-finished item with one cheap flaw, such as a bad Desecrated mod or one bad affix, fix it, and resell. SaVeQ titles claim "1,000 divines a day from fixing amulets" (about late Sept 2026). A jewel that costs about 240 div to craft is often fixed for 160–180 div (11 Jul 2026). [1–2 sources; profit claims unverified]
9. **Hinekora's Lock** before a risky one-shot currency (Vaal, Divine, Fracturing). Lock the item, preview the result, and use the currency only if the result is good. Any change to the item ends the preview. [game text + timesaver 0.5.4 guide]
10. **Profit-craft video index for 0.5.5** (poebuilds.cc, read 16 Oct 2026; titles only, profits are creator claims): https://www.poebuilds.cc/poe2/crafting
    - Amulets: SaVeQ "500 div in 3 hours", "2000 divines simple amulet craft"; Diztoh "+4 spell & Spirit Absent Amulet"; Fubgun "best amulet for Gemling".
    - Wands: Keyson "Wand craft that made me 1,000 div"; "Grim Pillar wands"; "+8 wand under 100d".
    - Rings: WesDesu "mana stacker ring, 2 mirrors"; SaVeQ "attack rings with 4 flats".
    - Other: SaVeQ "2000 div focus craft"; Belton "350 div/hr crafting 5c items" and "mirror in a day crafting gems"; SaVeQ waystones "100+ div/hr".
    - Boots: WesDesu Gemling Twister boots; SaVeQ ES boots.
    - Weapons: Spicysushi "#1 bow"; Lolcohol grenade crossbow; Bosorkana bleed spear.
- **Popular builds:** Gemling Legionnaire leads the build-guide lists (85 Gemling guides tagged 0.5.5 on poebuilds.cc). I could not verify the "35% of the league" figure because poe.ninja was not reachable as text. Disciple of Varashta, Stormweaver, Oracle, Infernalist and Martial Artist shares are also unverified. [unverified]

## 6. Conflicts with the tool (poe2-craft-assistant)

1. **Crafted cap is tied to Astrid's being socketed now.**
   - *Tool:* `engine.js:843` sets `craftedCap = 1 + runeRules(item).extraCrafted`, counting only runes currently socketed. It raises an *error* "max 1 crafted mod per item" on an item with two crafted mods and no Astrid's. Same in the planner (`planner.js:556`, `:1425`, `:1533`, `xCrafted` at `:480`). `crafting_rules` R_ONE_CRAFTED says "Astrid's Creativity socketed allows 1 more".
   - *True:* the extra crafted mod persists after Astrid's is replaced (Vortex; BigDaddy snippet). Live wands carry Celestial + Transcendent with Lifesprig or another rune in the socket.
   - *Workaround:* when the parsed item has more than one crafted mod, treat the cap as already used (no new crafted mod allowed), demote the warning to info, and set `xCrafted = crafted - 1`.
2. **The planner can't overwrite a replaceable augment.**
   - *Tool:* `rune_rule` and `aldur` validation (`planner.js:654-668`) require `freeSockets >= 1`, else NO_SOCKET. README line 364: "Runes need an empty augment socket".
   - *True:* Astrid's, normal runes, soul cores and Legacy runes "can be replaced by other Augment items". Only socket-bound ones can't. The standard wand route on 1 socket is Astrid's → two alloys → overwrite with Lifesprig or an Aldur rune.
   - *Workaround:* let a rune op target a socket that holds a non-socket-bound augment. Keep `xCrafted` after Astrid's is overwritten.
3. **Crystallisation omens are refused with alloys.**
   - *Tool:* `planner.js:633-634` and `:1756`; recipes b1 and b3 tell users the omen "does not work with alloys".
   - *True:* the omen's literal text names Perfect or Corrupted Essences, but alloys are flagged `IsPerfect` in game data (all 132 rows in the tool's own `weights_0.5.5.json`). Three crafter sources use Crystallisation with alloys, and the note.com run shows the prefix-only removal working. The tool's own research log (P6) says the same.
   - *Workaround:* allow side omens on alloys and mark it as a 2+ source claim, not game text.
4. **Only one Aldur rune per item.**
   - *Tool:* `planner.js:666` returns "A Rune of Aldur is already socketed".
   - *True:* live 0.5.5 listing "Mind Roar" has two Passion of Aldur. A second rune converts mods added after the first.
   - *Workaround:* allow a second Aldur rune in another free socket, and convert only mods that are not fractured and not yet converted.
5. **Aldur runes are not checked for rarity.** The game requires a *Rare* weapon ("Place into an empty Augment Socket in a Rare Weapon"); the tool checks class only (`:664-668`). Add a Rare check. [minor]
6. **Wand socket maximum** (suspected issue 2). `engine.js:824` `maxSockets('Wand') = 1` is correct for Artificer's Orbs. R_EXCEPTIONAL already lets a pasted exceptional item have +1, so this is a non-issue for pasted items. Still missing: new-base plans never consider buying an exceptional 2-socket base, for example for Lifesprig + Hedgewitch's, or Astrid's kept while an Aldur rune goes in. Optional enhancement.
7. **Alloy league scope is inconsistent inside the tool.**
   - Recipe `c1c` risk says "Alloys are exclusive to Runes of Aldur (poe2wiki); not usable in Forbidden Rites".
   - `poe2_kb_build.py:217` (`op('alloy')`) says they trade on the Forbidden Rites exchange (27 Sept 2026), and recipes b1, b3 and b10 list Forbidden Rites in `league_scope`.
   - 0.5.5 notes made Farrow, Dannig and Expedition core.
   - *Workaround:* drop the c1c sentence, or mark it as unverified.
8. **Legacy of Lifesprig at +2** (suspected issue 3): KB says +2, poe2db says +2. **No conflict.**
9. **Missing data, not wrong:**
   - KB `item_descriptions` is empty for Aldur's Legacy, the Aldur runes, Astrid's and Orb of Extraction. Augment texts exist under `augments`.
   - Socket-bound vs replaceable is not stored as a field. Socket-bound: Serle's, the 6 pool runes, the 4 Aldur runes, Raven-Touched Shard. Replaceable: everything else.
   - The tool's RUNE_NOTES text matches poe2db for Astrid's and Serle's.
10. **Transcendent Alloy on wands:** the tool has the 0.5.3 values (26–31% cast speed, 7–11% extra Cold). **No conflict.**

## 7. Open questions

- Is the extra crafted slot from Astrid's kept for *future* crafts after it is replaced, or only for mods already there? My reading is only for mods already there, but nothing confirms it. Test: replace Astrid's, then use a Perfect Essence on an item that already has two crafted mods.
- Do Aldur runes convert crafted mods (alloy or essence) and desecrated mods? Example: Transcendent's "extra Cold" under Passion of Aldur.
- Can two *different* pool runes sit on one 2-socket item? Each is "Limited to: 1", but is that per item or per character?
- Is "Limited to: 1" on Astrid's or Hedgewitch's per character? If so, a player can't wear two items that both still have Astrid's socketed.
- Does Sovereign Alloy (20–30% socketed augment effect) round Legacy of Lifesprig's +2 to +2 or +3? A U4GM claim exists but is unreliable.
- Can alloys be obtained in Forbidden Rites in practice? Check the Forbidden Rites currency exchange.
- Does a Vaal Orb really add a socket past the maximum in 0.5? Single source.
- Build shares (Gemling 35% etc.) need poe.ninja.
- The exact Omen of Catalysing Exaltation multipliers.
