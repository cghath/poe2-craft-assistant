# PoE2 0.5.5 crafting research: core currency, omens, modifier rules, fracturing, item level

Researched 2026-10-16. Patch 0.5.5 (Forbidden Rites event, Runes of Aldur challenge league; Runes of Aldur went core in 0.5.5).
Confidence tags: [game text] = in-game item/keyword text (poe2db or the tool's datamined `item_descriptions` / `game_keywords`);
[patch notes] = official GGG notes; [2+ sources] / [1 source] = community guides; [inference] = my reasoning from the evidence.

## Sources: what worked

- **Worked:** official forum patch notes 0.5.0 (https://www.pathofexile.com/forum/view-thread/3932540) and 0.5.5
  (https://www.pathofexile.com/forum/view-thread/4000864); Maxroll's copy of the 0.3.0 notes
  (https://maxroll.gg/poe2/news/0-3-0-patch-notes-the-third-edict); Maxroll crafting guide updated for 0.5.2
  (https://maxroll.gg/poe2/resources/how-to-craft-in-path-of-exile-2); poe2db item pages (descriptions, Currency Exchange
  activity); Game8; Kami-Labs 0.5.4 summary; timesaver.gg and switchbladegaming 0.5.4 guides (lower quality, partly
  AI-written); one official forum discussion thread.
- **Did not work:** poe2wiki.net (Anubis bot-block, only search snippets usable); mobalytics.gg (HTTP 403); poe2db
  modifier weight tables (loaded by script, not in the fetched page); craftofexile.com not fetched (I used the tool's
  own cross-check `reports/coe-crosscheck.md` and `app/data/weights_0.5.5.json`, which hold CoE's numbers).
- Found no official 0.5.1 to 0.5.4 notes that change core orbs, omens or the crafted-modifier rule. The 0.5.5 notes don't
  mention omens, alloys, crafted limits, desecration, Fracturing, Artificer, Vaal, Divine or Hinekora's Lock.

## 1. Core orbs

- **Orb of Transmutation** (Greater, Perfect): "Upgrades a Normal item to a Magic item with 1 modifier". [game text] https://poe2db.tw/us/Orb_of_Transmutation
- **Orb of Augmentation** (Greater, Perfect): "Augments a Magic item with a new random modifier" (on the open side). [game text]
- **Transmutation and Augmentation minimum modifier levels:** Greater is 44 (it was 55 before 0.5.0) and Perfect is 70. The 0.5.0 note reads: "Greater Orbs of Transmutation and Greater Orbs of Augmentation now have a minimum Modifier Level of 44 (previously 55)". [patch notes + 2+ sources] 0.5.0 notes; Maxroll 0.5.2.
- 0.5.0 made Transmutation and Augmentation "significantly rarer". Greater and Perfect currencies are "somewhat rarer". [patch notes]
- **Regal Orb** (Greater, Perfect): "Upgrades a Magic item to a Rare item, adding 1 modifier". [game text]
- **Exalted Orb** (Greater, Perfect): "Augments a Rare item with a new random modifier". [game text]
- **Chaos Orb** (Greater, Perfect): "Removes a random modifier and augments a Rare item with a new random modifier". This is not a full reroll. [game text]
- **Regal, Exalted and Chaos minimum modifier levels:** Greater is 35 and Perfect is 50. [2+ sources: poe2wiki snippets, the tool's TieredCurrency game table, Maxroll]
- **Minimum Modifier Level rule:** "Added random Modifiers are at least this level or higher, except if a specific Modifier type would be excluded entirely from being able to roll. Currency with a Minimum Modifier Level cannot be used on items with an item level below the Minimum Modifier Level." [game text, keyword BetterCurrencyMinimumLevel]
  - Greater and Perfect orbs change only the tier floor, not which modifier type gets picked. They are wasted on jewels, because jewel modifiers have no tiers. [1 source: Maxroll]
- **Orb of Alchemy:** "Upgrades a Normal or Magic item to a Rare item with 4 random modifiers". [game text]
- **Orb of Annulment:** "Removes a random modifier from an item". [game text]
- **Divine Orb:**
  - "Randomises the numeric values of modifiers on an item". [game text]
  - It does not change Fractured modifiers. [game text, keyword Fracture: "cannot be removed or altered"]
  - Divine Orbs are "more common" in 0.5.0. [patch notes]
- **Vaal Orb:** "Modifies an item unpredictably and Corrupts it". [game text]
  - **Outcomes on gear:** no change; reroll some explicit modifiers; add a corruption enchantment; add one augment socket (this can go past the usual cap). Uniques can also get their values multiplied by 0.78 to 1.22. [2+ sources: Maxroll 0.5.2, switchbladegaming 0.5.4, mobalytics/gamerant via search]
  - **Odds:** about 25% each. No official numbers exist. [2+ sources]
  - **How many mods the reroll hits is disputed:** "1-3 mods", "up to half the modifiers", or "like a Chaos Orb applied 1-3 times". [conflict between sources]
  - **Rings, amulets and belts** can't get a socket. One guide says that outcome then does nothing, so "no change" is about 50% on jewellery. [1 source: switchblade]
  - **0.5.0 change:** "The Corruption outcome that randomises the numeric values of the modifiers on an item beyond the normal range" now multiplies from the current value. Sanctify got the same change. [patch notes]
- **Fracturing Orb:** "Fracture a random modifier on a rare item with at least 4 modifiers, locking it in place." Usage text: "Cannot be used on Fractured items." [game text] https://poe2db.tw/us/Fracturing_Orb
  - **Desecrated modifiers:** a desecrated modifier, revealed or unrevealed, is never the one picked, but it counts toward the 4. With three normal mods plus one desecrated mod, each normal mod has a 1/3 chance. [2+ sources: timesaver 0.5.4 citing poe2wiki; guide snippets]
  - **Crafted (essence or alloy) modifiers:** no source says whether they can be picked. One guide implies a fractured essence mod still counts as the crafted one (ezg.com). [1 source / open]
  - **How it's obtained in 0.5:** an Atlas specialisation is required ("Some items and content now require you to specialise in them through Atlas Passive Skills including Exceptional Items ... Fracturing Orbs"). [patch notes]
  - It drops from Cleansed monsters in Cleansed maps after the Hidden Scars passive, at area level 75+. [1 source: timesaver]
  - Fractured items can't be chanced into uniques. [1 source]
  - The Recombinator is disabled (0.5.0), so an item can't carry two fractured mods by combining. [patch notes]
- **Orb of Chance:** "Unpredictably either upgrades a Normal item to Unique rarity or destroys it". [game text]
  - Usable on Tablets since 0.5.0. [patch notes]
  - Outcome odds per base aren't published. [open]
- **Mirror of Kalandra:** "Creates a Mirrored copy of an item". Mirrored items can't be modified. [game text]
- **Artificer's Orb:** "Adds an Augment Socket to a Martial Weapon, wand, staff or Armour". [game text]
  - **Usual caps:** body armour and two-handed weapons 2; one-handed weapons, helmets, gloves, boots and shields 1. [2+ sources: timesaver 0.5.4, gamerant, mmogah]
  - **Jewellery and quivers** can't take sockets. [2+ sources]
  - **Wands and staves:** they have been in the game text since about 0.2.0e. Older guides that say "martial and armour only" are out of date. [game text + 1 source]
  - **Staff cap:** 2 (it's two-handed). [inference]
  - **Sceptres:** a poe2wiki search snippet lists sceptres, but the datamined game text does not. [conflict / open]
- **Exceptional bases:** can drop with one socket more than usual (for example body armour with 3, gloves with 2), with quality above 20% (up to 30%), or both. [2+ sources: sportskeeda/aoeah snippets, vortexgaming, an official forum thread about "2 socket" exceptionals]
  - They need Atlas specialisation since 0.5.0. [patch notes]
  - Since 0.5.5 they also drop in the Trial of Chaos, plus a fix for Rogue Exiles and Strongboxes that couldn't drop them. [patch notes 0.5.5]
  - Artificer's Orb does not go past the usual cap; only a Vaal Orb does. [2+ sources]
- **Hinekora's Lock:** "Allows an item to foresee the result of the next Currency item used on it. Modifying the item in any way removes the ability to foresee". [game text]
  - Added in 0.3.0. [patch notes 0.3.0]
  - The Remnant recipe for Hinekora's Lock was temporarily disabled in 0.5.1 hotfix 3. [1 source: Mobalytics hub search snippet]
  - Not usable on corrupted or mirrored items. [1 source]
  - Whether an active omen changes the foreseen result is unconfirmed. [open]

## 2. Omens (crafting)

All crafting omens read "While this item is active in your inventory your next X ...". Each is consumed when it triggers. [game text] Full list: https://poe2db.tw/us/Omen

- **Sinistral / Dextral Exaltation:** the next Exalted Orb "will add only prefix / suffix modifiers". [game text]
  - Traded on the Currency Exchange in the current league: poe2db shows live economy data for Sinistral. [poe2db]
- **Greater Exaltation:** the next Exalted Orb "will add two random modifiers". The item needs 2 open slots. It combines with Sinistral or Dextral. [game text + 1 source: Maxroll]
- **Catalysing Exaltation:** the next Exalted Orb "will consume all Catalyst Quality to increase the chance of the corresponding type of Modifier". [game text]
  - It works on rings and amulets (catalyst quality) and combines with Sinistral or Dextral. [1 source: Maxroll 0.5.2]
  - With Greater Exaltation, the quality only boosts the first of the two mods. [1 source: Maxroll 0.5.2]
  - **Size of the boost:** not published. Craft of Exile's calculator uses weight x(1 + 0.2 x quality), which is x5 at 20%. [1 source: GitHub PR citing CoE] https://github.com/huythinh2507/poe2crafting/pull/6
  - Forum anecdotes are poor (https://www.pathofexile.com/forum/view-thread/3842222). [1 source]
- **Sinistral / Dextral Annulment:** the next Orb of Annulment "will remove only prefix / suffix modifiers". [game text]
- **Greater Annulment:** "will remove two modifiers". It was removed in 0.3.0: "The following Omens can no longer be obtained: Omen of Greater Annulment, Omen of Dextral Alchemy, Omen of Sinistral Alchemy, Omen of Dextral Coronation, and Omen of Sinistral Coronation." [patch notes 0.3.0 via Maxroll]
  - poe2db shows no economy data for it. A poe2wiki snippet says it "can still appear as a reward in Ritual". [1 source, unverified]
  - **Status:** legacy, not obtainable in practice.
- **Sinistral / Dextral Coronation** (Regal Orb) and **Sinistral / Dextral Alchemy** (Orb of Alchemy, "maximum number of prefix/suffix modifiers"): same status as Greater Annulment, unobtainable since 0.3.0. [patch notes 0.3.0]
- **Sinistral / Dextral Erasure:** the next Chaos Orb "will remove only prefix / suffix modifiers". On a full item, the new mod is then forced onto the same side. [game text + 1 source: Maxroll]
- **Whittling:** the next Chaos Orb "will remove the lowest level modifier". [game text]
  - "Level" means the modifier's level requirement, not its tier. Ties are highlighted light yellow, a single target orange. [1 source: Maxroll]
  - Unrevealed desecrated mods count as level 1, so Whittling takes them first. [1 source: poe2wiki via search snippet]
- **Light:** the next Orb of Annulment "will remove only Desecrated modifiers". [game text]
- **Sinistral / Dextral Crystallisation:** the next Perfect or Corrupted Essence "will remove only Prefix / Suffix modifiers". [game text]
  - Without the omen, the removal is random, except that when the essence mod's side is full it must remove from that side. [2+ sources: Mobalytics essence guide, stratlore]
- **Sanctification:** the next Divine Orb used on a Rare item "will Sanctify it". [game text]
  - Sanctifying multiplies each value by a random 78% to 122%, and from 0.5.0 that is applied to the current value. "Most methods of item crafting and modification cannot be used on Sanctified items." [game text + patch notes]
- **The Blessed:** the next Divine Orb "will only reroll Implicit Modifiers". [game text]
- **Homogenising Exaltation / Coronation:** "add a Modifier of the same type as an existing Modifier".
  - Drops were disabled in a 0.4.0 hotfix. [poe2wiki snippet, 1 source]
  - 0.5.0: "only appear on the Currency Exchange in Standard Leagues". [patch notes]
  - **Status:** Standard only. Existing copies still work.
- **Corruption:** the next Vaal Orb "will always result in change". 0.5.0: "Omen of Corruption can no longer be obtained" (Standard Currency Exchange only). [patch notes]
- **Recombination:** "The Omen of Recombination has been removed." "The Recombinator has been disabled." [patch notes 0.5.0]
- **Sinistral / Dextral Necromancy:** the next Desecration "will add only prefix / suffix modifiers". [game text]
- **Putrefaction:** "your next Desecration attempt will replace all modifiers on the item creating an item with up to 6 Unrevealed modifiers and Corrupting the item". [game text]
  - Maxroll (0.5.2) treats it as the exception to the one-Desecrated limit. [1 source]
  - An AI-assisted codex says it is Standard only. That is unverified, and the 0.5.0 notes don't say so. [open]
- **Blackblooded (Kurgal) / Liege (Amanamu) / Sovereign (Ulaman):** "your next Weapon or Jewellery Desecration attempt will guarantee a random [lich] modifier". Weapons and jewellery only. [game text]
- **Abyssal Echoes:** "the next time you reveal Desecrated modifiers you can reroll the options once". It must be active before revealing. [game text + Maxroll]
- **Chance / the Ancients:** Orb of Chance "will not destroy the Item" / "will upgrade the Item to a random Unique of the same Item Class". [game text]
- **Waystone omens:** Chaotic Rarity, Quantity and Monsters were inverted in 0.5.0 to *prevent* their type. Chaotic Effectiveness was added. Up to 3 can be used at once. [patch notes; not relevant to gear]

## 3. Modifier rules

- **Prefix and suffix limits:**
  - "Magic items can have 2 Modifiers; a Prefix and a Suffix. Rare items can have up to 6 Modifiers; 3 Prefixes and 3 Suffixes." [game text, keyword ItemRarity]
  - Rare jewels: 2 prefixes + 2 suffixes. [2+ sources: Maxroll]
  - Serle's Triumph rune: "+1 Suffix Modifier allowed". [game text]
  - Astrid's Creativity does **not** raise the 6-mod cap. [1 source: forum thread 3979409, community answer]
- **Crafted modifiers:**
  - "An item can only have one Crafted Modifier" (keyword Crafted). [game text]
  - The 0.5.0 note: "All crafted modifiers are now guaranteed, but items can only have 1 crafted modifier at a time." [patch notes]
  - **What counts as crafted:** essences of every tier including Perfect and Corrupted ones, the 13 alloys ("add various new crafted modifiers ... similar to Perfect Essences"), and liquid emotions on jewels. [patch notes + game text]
  - **Runic Ward enchants** are claimed to count as crafted by an AI-assisted codex only. [unverified]
  - A second essence-type craft "isn't allowed"; remove the first with Annulment or Chaos. [1 source: Maxroll 0.5.2]
- **Astrid's Creativity rune:** "Can have 1 additional Crafted Modifier" (any equipment, limited to 1). [game text] https://poe2db.tw/us/Astrids_Creativity
  - It is socket-bound but can be replaced by another augment. [game text]
  - **The two-crafted trick:** a 0.5 "+7 wand" guide sockets Astrid's, adds Celestial Alloy (prefix) and another alloy, then *replaces Astrid's with the rune of choice at the end*. The item keeps both crafted mods. [1 source: Mobalytics guide via search snippet, https://mobalytics.gg/poe-2/profile/bigdaddygaming/guides/0-5-7-wand-crafting-guide; matches the live wands]
  - **0.5.4f (Aug 13):** it can no longer be socketed into Corrupted or Sanctified items. [1 source: Kami-Labs summary of official notes]
- **Desecrated modifiers:**
  - "Desecrated modifiers no longer count as crafted modifiers, but items are limited to 1 Desecrated modifier." [patch notes 0.5.0]
  - Desecrating a full item removes a random modifier, and "Items with Desecrated Modifiers cannot be Desecrated again." [game text]
  - Putrefaction items are the exception (see section 2).
- **Fractured modifiers:** "locked onto the item permanently. It cannot be removed or altered." [game text]
- **Item-level gating:** a tier can roll only if its modifier level is at or below the item level. Example: resistance T2 needs ilvl 71, T1 needs 81-82. [2+ sources: Maxroll, codex]
- **Patch notes changed several tier levels in 0.5.0** [patch notes]:
  - Top Cast Speed tier: rings level 60, amulets level 66.
  - "of the Locust" rolls from 21.
  - Precise 8, Reliable 13, Squire's 8, Journeyman's 14.
  - Leech mods on gloves and rings adjusted. "of the Vampire" and "of the Desperate" now also roll on bows and crossbows.
- **Mod groups:** only one modifier per group on an item. [2+ sources; standard rule]
  - Exception from Fluxes: a Flux can leave two modifiers of one group (the tool's R_FLUX). [tool, multi_secondary]
- **Tags:** spawn weights are checked against item tags, and some mods add tags. For example, one element's spell prefix blocks the others on caster weapons. [game data in the tool]

## 4. Weights

- poe2db says: "Modifier weight information cannot be obtained from game files". The client only has 0/1 eligibility. [poe2db Amulets page]
- So every weight is a community estimate, from poe2db (DropChance) or Craft of Exile (poec_data.json). Per the tool's 28 Sept / 6 Oct data, they agree on 8,929 of 8,987 tiers. [tool report]
- **poe2db uses 1 as a "no data" placeholder:**
  - In the tool's poe2db fetch, every mod on the One/Two Hand Swords, One/Two Hand Axes, Daggers and Flails pages (classes not in the game), on all jewel pages, and on Grasping Mail is weight 1.
  - The remaining isolated 1s are mods added or changed in 0.5.0: Cast Speed on jewellery (6 amulet + 5 ring tiers), Life/Mana Leech T5 on bows and crossbows, ES Recharge Rate T4-6 on int body armours, and Additional Arrow chance on quivers.
  - Craft of Exile gives those tiers 250-1000. **So poe2db's 1 for jewellery Cast Speed is almost certainly missing data, not a real weight.** [inference, strong]
- **The other kind of disagreement:** weapon "+# to Level of all Melee/Projectile Skills" T2-T5. poe2db gives 750/500/250/100, CoE gives 1000/750/500/250 (spears: 375/250/125/50 vs 500/375/250/125).
  - This looks like a one-tier offset. It may come from the 0.3.0 change "lowest tier ... on Two Hand Weapons now +2". [inference; unresolved]
- **Desecrated-only mods** are equally weighted in Craft of Exile (925 tiers, all weight 1). No other source exists.
- **Desecrated reveal:** 1/2/3 desecrated-only options at 80%/15%/5%, per CoE's poe2.js (read by the tool's author). [1 source]

## Conflicts with the tool

| Rule / data key | Tool says | What is true | Evidence | Suggested fix |
|---|---|---|---|---|
| `crafting_rules` **R_ONE_CRAFTED** and `engine.js validateItem` (lines 843-844) | Over 1 crafted mod (2 with Astrid's socketed) is an **error**: "max 1 crafted mod". | A legal item can hold **2 crafted mods with no Astrid's**: socket Astrid's, add the second crafted mod, then replace Astrid's with another rune. The extra mod stays, the same way the jewel "+1 allowed" overflow stays. | Live wands (Celestial Alloy prefix + Transcendent Alloy suffix, no Astrid's). The Mobalytics 0.5 "+7 wand" guide's last step swaps Astrid's for another rune. poe2db: Astrid's "cannot be retrieved" but can be replaced. | Downgrade to `info` when crafted = 2 and the item has a socketed augment (or any socket): "2 crafted mods: Astrid's Creativity was socketed and later replaced." Keep `error` at 3 or more. Planner: such an item counts as crafted-full (already the case via `hasCrafted`). Add the "replace Astrid's at the end" step to Astrid routes, since the final rune choice is free. |
| `engine.js maxSockets` / **R_EXCEPTIONAL**, wands | Artificer cap 1 on wands. A 2-socket wand is shown as info ("exceptional base"). | This matches the evidence: an exceptional wand can drop with 2 sockets, and Artificer's Orb still stops at 1. **No real conflict.** `app/pricecheck.js:357` says the same. | Exceptional = usual + 1 (body 3, gloves 2: guides). No source gives an Artificer cap above 1 for one-handed items. | Keep it. Raise R_EXCEPTIONAL above single_secondary and cite the 0.5.0 note (exceptional items need Atlas specialisation) and the 0.5.5 note (they drop from Trial of Chaos). Sceptre eligibility for Artificer is still open (the game text in the KB omits it). |
| **R_WEIGHTS** / `weights_0.5.5.json` with **poe2db as the default** (`index.src.html:3318`, `S.weightSource`) | Default weight for Cast Speed on rings and amulets is 1, so the planner treats it as about 1/1000 as likely as other suffixes. | The poe2db 1 is a no-data placeholder (see section 4). Craft of Exile has 1000 (rings) and 800 (amulets). | Pattern of weight-1 entries: whole unreleased-class pages and jewel pages, plus exactly the mods changed in 0.5.0. poe2db's own note says weights can't be datamined. | For the 26 tiers where poe2db = 1 and CoE > 1 (cast speed on jewellery, leech T5 on bows and crossbows, ES recharge T4-6, quiver arrow chance), **default to Craft of Exile**. Keep the picker only for the 32 skill-level tiers where both sources have real numbers. |
| `legacy_or_disabled` (Coronation, Alchemy, Greater Annulment) | "in the game files but not in the game", conf single_secondary, source "player". | Correct, and it is official: the 0.3.0 notes say these five omens "can no longer be obtained". | Maxroll copy of the 0.3.0 notes; poe2db shows no market for them. | Change conf to `patch_note_quote`, source "0.3.0 patch notes". Optional: note the poe2wiki claim that they can still come from Ritual. |
| `crafting_ops` **regal** / **alchemy** / **annul** omens lists | Still list Sinistral/Dextral Coronation, Sinistral/Dextral Alchemy and "Omen of Greater Annulment (removes 2)" as available omens. | Unobtainable since 0.3.0 (the tool's own `legacy_or_disabled` agrees). | As above. | Mark them `legacy` in those lists, or drop them, so the KB doesn't contradict itself. |
| `legacy_or_disabled` Homogenising | "drops disabled since 0.4", source "0.4 guides; player". | Correct. 0.5.0 notes: Currency Exchange in Standard leagues only. | 0.5.0 notes. | Add the patch-note quote. |
| `planner.js` exalt with `catalyse` + `greater` (around line 1117) | The catalyst boost applies to **both** mods added by Greater Exaltation. | Maxroll 0.5.2: "With Greater Exaltation, Quality only affects the first Exalt." | 1 source. | Pass `boost` only for `i === 0`, or flag it as unverified. |
| `CATALYST_DEFAULT = 25` (planner.js:74-78) | x25 boost at 20% quality, from one 4-ring test. | Craft of Exile's calculator: x(1 + 0.2 x q) = **x5** at 20% (+0.12 per % above 20). | GitHub PR citing CoE; the tool's own comment says x5 was the earlier value. | Keep the setting adjustable, but show both (CoE x5 vs player x25). 4 of 4 is a small sample; x6+ only fits at 95%. |
| **R_ONE_CRAFTED** text: "some Runic Ward enchants share this slot" | Listed as game_text. | No game text or official source found. Only an AI-assisted codex and secondary guides say it. | Searches. | Lower that clause's confidence to single_secondary or remove it. |
| `crafting_ops` **desecrate** omens: "Omen of Putrefaction ... conflicts with 0.5 one-desecrated cap -> verify" | Unverified. | Maxroll (0.5.2) lists Putrefaction as the exception to the one-Desecrated rule, which matches `validateItem`. | Maxroll. | Mark it as resolved (1 source). |
| `crafting_ops` **artificer** input | "martial weapon, wand, staff or armour" | Matches the datamined text. One poe2wiki snippet also lists sceptres. | Search snippet only. | Leave it; add sceptres as an open question. |
| `crafting_ops` **vaal** / README "~25% each" and "1-3 mods" | Estimate. | The sources disagree: "1-3 mods" (switchblade 0.5.4), "up to half the modifiers" (Maxroll 0.5.2, sportskeeda), and Maxroll also lists value randomisation as an outcome for non-uniques. | See section 1. | Keep it labelled as an estimate. Maybe model "up to half" (1-3 on a 6-mod item) as the same thing. |

No conflict found (the tool agrees with the sources):
- Greater/Perfect floors 44/70 and 35/50.
- Fracturing never picks desecrated mods but counts them.
- Whittling and unrevealed mods (the tool gives a level-0 mod to unparsed or unrevealed lines).
- Erasure on full items.
- Crystallisation and swap-side removal (R_SWAP_REMOVAL).
- One desecrated mod, with the Putrefaction exception.
- The rarity slot limits.
- The Omen of Corruption and Recombinator status.
- The 0.5.0 Cast Speed tier levels (KB: ring T5 at 60, amulet T6 at 66).

## Open questions

- Can a Fracturing Orb pick a crafted (essence or alloy) modifier? If it does, does the fractured crafted mod still use up the crafted slot? (One guide implies yes.)
- When Astrid's Creativity is replaced, is the old rune destroyed? Game8 says destroyed; poe2db/Fextralife say "replaced". Is a third crafted mod then impossible? (Presumably yes, since the cap goes back to 1 while 2 are present.)
- Does an essence or alloy whose mod group is already on the item fail without being consumed, or get consumed with no effect? (R_MOD_GROUP says it "fails".)
- Exact Vaal Orb outcome weights and how many mods the reroll hits on rares (0.5.x).
- Whether Artificer's Orb works on sceptres in 0.5.5.
- Whether the poe2db skill-level tier weights (750/500/250/100) or CoE's (1000/750/500/250) are right.
- Whether Hinekora's Lock's preview respects active omens.
- Whether the Omen of Light can remove an *unrevealed* desecrated mod (presumably yes; no source found).
- Whether Greater Annulment, Coronation and Alchemy omens can still come from Ritual rewards (poe2wiki snippet) or are fully gone.
- Whether Runic Ward enchants count as the crafted modifier.
