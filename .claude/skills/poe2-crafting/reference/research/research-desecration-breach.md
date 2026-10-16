# PoE2 0.5.5 crafting reference: Desecration, Essences, Catalysts/Quality, Breach/Genesis Tree, Corruption

Researched 2026-10-16 for patch 0.5.5 (Forbidden Rites event, Runes of Aldur challenge league).

Confidence tags: [game text] = in-game item or keyword text (the tool's KB `item_descriptions` / `game_keywords`, matching poe2db/poe2wiki); [patch notes] = official notes as mirrored on poe2wiki "Version 0.5.x" pages; [2+ sources]; [1 source]; [inference].

## Which sources worked

- **poe2wiki.net worked through the built-in browser.** Plain WebFetch hits its Anubis bot check. Pages read: Version 0.5.0 to 0.5.5, Genesis Tree, Altered Collarbone, Essence of the Breach, Breach Ring, Refined Breach Ring, Catalyst, Omen of Catalysing Exaltation, Desecrated modifier, Omen of Light, Putrefaction, Abyssal Echoes, Liege, Blackblooded, Sovereign, Essence of the Abyss, Fracturing Orb, Vaal Orb, Corrupted, Quality, Sanctified, Item, Essence, Vaal Catalysing Infuser, Grasping Mail and Preserved Cranium.
- **poe2db.tw worked with WebFetch:** Desecrated_Modifiers, Quality, Catalysts, Breach, Flesh_Catalyst and Omen_of_Putrefaction.
- **Craft of Exile worked:** `js/poe2.js` and `package.js`, read in the browser and not saved.
- **Smaller sources:** gameshorizon.com (Genesis Tree, July 2026) worked. poe2db `markdown_raw` worked but only gave lists of names.
- **Failed:** playnews.gg (both language versions) and mobalytics.gg returned 403. No Maxroll Genesis Tree page was found. Game8, poe-vault and the official pathofexile.com forum weren't reached. The poe2wiki patch pages mirror the official notes.

---

## 1. Desecration

### Bones and what they apply to
- **Jawbone** desecrates a Rare Weapon or Quiver. **Rib** desecrates a Rare Armour. **Collarbone** desecrates a Rare Amulet, Ring or Belt. **Preserved Cranium** desecrates a Rare Jewel. **Preserved Vertebrae** desecrates a Rare Waystone. [game text] https://poe2db.tw/us/Desecrated_Modifiers
- **Gnawed bones** have "Maximum Item Level: 64". **Preserved bones** have no limit. **Ancient bones** have "Minimum Modifier Level: 40". [game text] (same URL)
  - The Minimum Modifier Level keyword reads: "Added random Modifiers are at least this level ... except if a specific Modifier type would be excluded entirely ... cannot be used on items with an item level below the Minimum Modifier Level." [game text]
- **Altered Collarbone:** "Desecrates a Rare Amulet, Ring or Belt with a chance for otherworldly modifiers". It comes from the Genesis Tree currency womb (Lavish Wombgift) with the node "Curse of the Abyss", which gives "2% chance for Birthed Currency to be an Altered Collarbone". [game text + 2+ sources] https://www.poe2wiki.net/wiki/Altered_Collarbone, https://www.poe2wiki.net/wiki/Genesis_Tree
- **Jewel bones:** only the Preserved Cranium exists for jewels in 0.5.5. There is no Gnawed or Ancient Cranium on poe2db. [2+ sources] https://poe2db.tw/us/Desecrated_Modifiers
- **Time-Lost jewels:** the Cranium works on them, but jewel-exclusive desecrated modifiers ("Lightless" / "of the Abyss") roll only on regular jewels, not Time-Lost ones (poe2db note). [1 source]
- **Unstable Desecration** (Undying Hate and similar uniques): "increasing chance for it to be destroyed each time it is Desecrated". [game text]
- **Ancient bone drops (0.5.3):** the Vessel of Kulemak can drop Ancient Jawbones, Ribs and Collarbones. Tasgul and Vandroth always drop Desecrated currency. [patch notes] https://www.poe2wiki.net/wiki/Version_0.5.3
- **Abyss omen drops (0.5.0):** Abyss Omens no longer drop in areas below level 65. [patch notes] https://www.poe2wiki.net/wiki/Version_0.5.0

### Core rules
- **Adding the modifier:** "Desecrating an item adds an Unrevealed Desecrated modifier. If modifiers are full then a random modifier is also removed. These modifiers can be revealed at the Well of Souls. Items with Desecrated Modifiers cannot be Desecrated again." [game text] (keyword Abyssalify)
- **Limit of one (0.5.0):** "Desecrated modifiers no longer count as crafted modifiers, but items are limited to 1 Desecrated modifier." [patch notes]
  - The error message is "Failed to apply item: Item already has a revealed modifier", even when the modifier is still unrevealed. [1 source] https://www.poe2wiki.net/wiki/Desecrated_modifier
- **Side:** the unrevealed modifier takes a prefix or suffix slot while hidden, and the reveal only offers modifiers of that side. Necromancy omens force the side. [2+ sources] (poe2wiki Desecrated modifier; game text of the Necromancy omens)
- **Armour prefixes:** Body Armour, Helmets, Gloves and Boots have no exclusive desecrated prefixes. [2+ sources] (poe2db, poe2wiki)
- **Sceptres** have no exclusive desecrated modifiers at all. [2+ sources]
- **Lich modifiers** (Amanamu, Kurgal, Ulaman) are level 65 on equipment. [2+ sources] (poe2db: "all level 65")
- **0.5.0 removal:** desecrated modifiers granting Instant Leech can no longer roll. [patch notes] The KB has none, which is consistent.
- **0.5.3 staff additions:** an 'of Kurgal' staff suffix (+3-4 maximum Puppetmaster stacks) and an 'Amanamu's' staff prefix (Gain 40-50% of Damage as Extra Chaos) were added. The 'of Amanamu' block suffix went to +20-25%. [patch notes]

### Well of Souls reveal
- **Three options:** the reveal offers a choice of 1 of 3 modifiers, some of them basic (base) modifiers. [2+ sources] (poe2wiki; poe2db: "Reveal desecrated modifiers may include base modifiers. Unless you use Omen to guarantee named modifiers")
- **At least one exclusive option:** at least one option is an exclusive desecrated modifier when the item level is high enough ("typically ilvl 65+ for non-jewels") and the item class has one on that side. More than one is possible. [1 source] https://www.poe2wiki.net/wiki/Desecrated_modifier
- **The 80/15/5 claim:** this comes only from Craft of Exile's code, `let desecrationModSpawnRate = [0.8, 0.15, 0.05];` in poe2.js, read 2026-10-16. That is a chance of 1, 2 or 3 exclusive options. [1 source] https://www.craftofexile.com/js/poe2.js
  - poe2wiki gives no numbers. The claim is unverified beyond CoE.
- **Weights:** "Regular affixes appear to use their usual weights, while exclusive modifiers appear to have uneven weights." [1 source] (poe2wiki Desecrated modifier)
  - The Altered Collarbone page also says "It is known that normal Desecrated mods do not have equal weight."
  - Craft of Exile gives every desecrated modifier weight 1.
  - No source publishes real weights.
- **Omen of Abyssal Echoes:** "the next time you reveal Desecrated modifiers you can reroll the options once". [game text] (0.3.0b fixed using it after the reveal)

### Lich omens (Blackblooded = Kurgal, Liege = Amanamu, Sovereign = Ulaman)
- **Game text:** "your next Weapon or Jewellery Desecration attempt will guarantee a random Kurgal [Amanamu/Ulaman] modifier". [game text]
- **GGG (Timothy_GGG, 3 Sep 2025):** "Lich-type omens (guarantee xxx mod) only work on weapons and jewelry". [1 source, official] (cited on https://www.poe2wiki.net/wiki/Omen_of_the_Liege)
- **Which bones they work with:** the restriction follows the bone, not the item class. Jawbones and Collarbones work, belts included through the Collarbone. Any Rib or an Altered Collarbone gives an error and the bone is not consumed. [1 source] (poe2wiki Liege, Blackblooded and Sovereign pages)
- **What the reveal shows:** "will always reveal options which are 'Amanamu's' or 'of Amanamu' modifiers, if possible. It will also block Ulaman and Kurgal modifiers". The omen is consumed even if no such modifier can roll, and then only regular modifiers are offered. [1 source] (Prohibited Library test, 0.3.0c)
  - The wiki wording implies the lich modifier pool replaces the exclusive options. Craft of Exile's text and the tool assume only the first option is the lich's. Unresolved.
- **Floors:** the lich omen overrides the floor of Ancient bones and of the Mark of the Abyssal Lord, since lich modifiers are level 65 anyway. [1 source]

### Omen of Light
- **Game text:** "your next Orb of Annulment will remove only Desecrated modifiers". [game text]
- **Scope:** it removes a Desecrated modifier whether it is exclusive or a base modifier. [1 source] https://www.poe2wiki.net/wiki/Omen_of_Light

### Omen of Putrefaction
- **Game text:** "your next Desecration attempt will replace all modifiers on the item creating an item with up to 6 Unrevealed modifiers and Corrupting the item". [game text]
- **No exclusive modifiers:** "will always attempt to roll the maximum number of desecrated modifiers ... typically 6 (or 5 if the item is fractured). It will never roll Desecration-exclusive modifiers, such as named Lich modifiers, or 'Lightless'/'of the Abyss' affixes on jewels." [1 source] https://www.poe2wiki.net/wiki/Omen_of_Putrefaction
- **Ancient bones:** with an Ancient bone, not all modifiers meet the minimum level, so the wiki recommends a Preserved bone. [1 source]
- **It still works in 0.5.5.** The player confirmed this on 25 Sept 2026 (the tool's research log), and Putrefaction batch crafting videos exist. [2+ sources]

### Essence of the Abyss / Mark of the Abyssal Lord
- **Game text:** "Removes a random modifier and augments a Rare item with a new guaranteed modifier / Equipment: Mark of the Abyssal Lord". [game text]
- **Prefix or suffix:** the Mark can be either. The side is chosen at random when the essence is used, which can give "Failed to apply item" errors with Crystallisation omens on full items. [1 source] https://www.poe2wiki.net/wiki/Essence_of_the_Abyss
- **Not alongside a Desecrated modifier:** it cannot be added to an item that already has a Desecrated modifier. [1 source]
- **What the next desecration does:** the next desecration always removes the Mark and puts "an Unrevealed Desecrated modifier of a higher tier" in its place. [2+ sources] (poe2db and poe2wiki)
  - In practice it "culls modifier options that have a level of less than 40% of the item's item level" (ilvl 80 means options of level 32 or higher). [1 source]
  - An undocumented hotfix made this "no longer guarantee the highest possible tier". [1 source]
- **Fractured Mark:** if the Mark is fractured, the bone replaces another modifier instead. [1 source]

### Fracturing and desecrated modifiers
- **Desecrated modifiers can't be fractured:** "Desecrated modifiers cannot be fractured, although they can count towards the minimum 4 modifiers required to use a Fracturing Orb ... increase the optimal odds of a desirable fracture from 1/4 to 1/3." [2+ sources] https://www.poe2wiki.net/wiki/Fracturing_Orb, plus crafter videos (Opulent Exile, MMOEXP) in the tool's research log
  - This applies to all Desecrated modifiers, revealed or not.
- **Fracturing Orb drops (0.5.0):** they require Atlas specialisation: "Hidden Scars", Cleansed monsters, area level 75+. [patch notes + 1 source]

---

## 2. Essences

- **Tiers:**
  - Lesser, normal and Greater: "Upgrades a Magic item to a Rare item, adding a guaranteed modifier".
  - Perfect and corrupted/special essences: "Removes a random modifier and augments a Rare item with a new guaranteed modifier". [game text]
- **Crafted slot (0.5.0):** "All crafted modifiers are now guaranteed, but items can only have 1 crafted modifier at a time." Essence modifiers are crafted modifiers. [patch notes]
- **Greater/Perfect Orbs (0.5.0):** the Greater Orb of Transmutation/Augmentation minimum level went from 55 to 44. Craft of Exile's poe2.js still shows 55, which is outdated. [patch notes]
- **Perfect essence modifiers:** each adds one class-specific modifier, for example:
  - Perfect Body: Body Armour (8-10)% maximum Life.
  - Perfect Mind: Ring (4-6)% maximum Mana.
  - Perfect Enhancement: Amulet (20-30)% global defences.
  - Perfect Infinite: Amulet (7-10)% Str/Dex/Int.
  - Perfect Sorcery: Wand +3 / Staff +5 spell levels.
  - Perfect Battle (0.5.0): +2 one-hand/bow, +3 two-hand/crossbow attack levels. [2+ sources] https://www.poe2wiki.net/wiki/Essence, matching the tool's `essence_outcomes` and `weights.essences`
- **Special (corrupted) essences:** all remove a random modifier and add one. [game text + 1 source]
  - **Abyss:** Mark of the Abyssal Lord (prefix or suffix).
  - **Breach:** "Jewellery: +20% to Maximum Quality". It comes from essence monsters near Unstable Breaches or Hives with "Essence Transference", and from the Genesis currency womb node "Crystallised Form" (2%). The wiki's Essence of the Breach page says "Ornate Wombgift", but the Genesis Tree page and poe2db list Crystallised Form under the Currency womb.
  - **Horror:** "Gloves or Boots: 60% increased effect of Socketed Augment Items".
  - **Insanity:** "Belt: On Corruption, Item gains two Enchantments".
  - **Delirium:** "Body Armour: Allocates a random Notable Passive Skill".
  - **Hysteria:** per class. For example, Ring (50-59)% Mana Regeneration, Amulet (19-21)% of Damage taken Recouped as Life, Belt +(254-304) Stun Threshold, Focus (20-23)% ES Recharge (0.5.0 change).
  - Sources: https://www.poe2wiki.net/wiki/Essence, https://www.poe2wiki.net/wiki/Essence_of_the_Breach
- **Essence of the Breach keeps its quality:** if the "+20% to Maximum Quality" modifier is removed after quality was raised, the item keeps the higher quality. [2+ sources] (poe2wiki Quality and Essence of the Breach pages)
- **Crystallisation omens:** "your next Perfect or Corrupted Essence will remove only Prefix [Suffix] modifiers". [game text]
- **Vaal Orb on an essence monster:** outcomes are no change, freed, an extra essence, reroll at the same tier, or upgrade one tier (Perfect becomes a random corrupted essence). [1 source] (poe2wiki Essence)
  - 0.5.5 replaced Doryani's Refined Formula with "Archaic Corruption" ("Monsters released from Essences become Corrupted"). [patch notes]

---

## 3. Catalysts and quality

### Catalysts
- **Ring and amulet catalysts:** each "Adds quality that enhances X modifiers on a ring or amulet / Replaces other quality types". [game text]
  - Flesh: Life. Neural: Mana. Carapace: Armour/Evasion/ES. Uul-Netol's: Physical. Xoph's: Fire. Tul's: Cold. Esh's: Lightning. Chayula's: Chaos. Reaver: Attack. Sibilant: Caster. Skittering: Speed. Adaptive: Attribute. Necrotic: Minion (added in 0.5.2).
- **Jewel catalysts:** "Refined" versions of the same 13 work on jewels. 12 were added in 0.5.0 and Refined Necrotic in 0.5.2. [patch notes] https://www.poe2wiki.net/wiki/Version_0.5.2
  - The game text of Refined Necrotic wrongly says "left click a ring or amulet".
- **Source (0.5.0):** "Catalysts can no longer drop from Monsters, these are now solely obtained from the Genesis Tree". [patch notes]
  - The currency womb nodes are "Catalyst Chance" (15%), "Complete Refinement" (catalysts only), "Enhanced Creation" and "Jewel Catalyst Chance" (jewel catalysts). [1 source + poe2db]
  - The game keyword still says "exclusive drops from the Breach mechanic", which is consistent.
- **Salvaging (0.5.0):** alternate-quality items can be salvaged for part of the catalysts used. [patch notes]
- **Effect size:** 1% increased magnitude of matching modifiers per 1% quality. [1 source] https://www.poe2wiki.net/wiki/Quality
- **Quality per catalyst:** "the Equipment's Item Level will determine how much Quality you get. The higher the Item Level, the less Quality each Currency Item will apply." No source gives exact numbers per item level. [2+ sources, no numbers]
- **Switching type:** a catalyst of another type replaces the quality type. Sources disagree on whether quality restarts at 0. [2+ sources]

### Maximum quality
- **Default maximum:** 20% ("The default maximum Quality 20%"). [game text]
- **Breach Ring:** implicit "+20% to Maximum Quality", so 40%. It was 50% in 0.1 and changed to 40% in 0.2.0. poe2db and guides that say 50% are outdated. [2+ sources] https://www.poe2wiki.net/wiki/Breach_Ring
- **Refined Breach Ring:** implicit "+25% to Maximum Quality", so 45%. [2+ sources] (poe2wiki, poe2db)
- **Essence of the Breach:** "+20% to Maximum Quality" (crafted, jewellery). It stays effective after the modifier is removed. [2+ sources]
- **Vaal Catalysing Infuser:** "Improves the quality of a ring or amulet, exceeding maximum quality by up to 10% with a chance of Corrupting it. Can only be used on items at or above maximum quality." [game text]
  - 0.5.0 notes: "All Infusers can only be used on items at or above 20% Quality." [patch notes]
- **Grasping Mail:** keeps armour quality and catalyst quality separately, and a Vaal Armourer's Infuser raises both. [1 source] https://www.poe2wiki.net/wiki/Grasping_Mail
- **Reaching 40-55%:** inference from the above.
  - Breach Ring 40 (+10 infuser = 50).
  - Refined Breach Ring 45 (55).
  - A normal ring with Essence of the Breach: 40, then remove the essence modifier; with an infuser, 50.
  - Whether the essence stacks with the Breach Ring implicit (to 60) is not confirmed.
- **"Speed catalyst to 40% quality on breach rings"** is a crafter step (Hax ring, 0.5.5, in the tool's research log). [1 source]

### Omen of Catalysing Exaltation
- **Game text:** "your next Exalted Orb will consume all Catalyst Quality to increase the chance of the corresponding type of Modifier". It consumes all of the quality. [game text]
- **Measured multiplier:** "At 20% quality, this omen multiplies the weight of the corresponding tagged modifiers by 5x. At 40% quality (e.g. Breach Ring), the multiplier is 7.5x." [1 source] https://www.poe2wiki.net/wiki/Omen_of_Catalysing_Exaltation (reference: Prohibited Library test, version 0.4.0, Discord)
  - The domistae Codex (in the tool's research log) gives the same 5x / 7.5x. That is probably the same origin, so it is not independent.
- **With Omen of Greater Exaltation,** both added modifiers are affected. [1 source]
- **Craft of Exile does not model this omen** (no code for it in poe2.js). [1 source]

---

## 4. Breach and the Genesis Tree (0.5)

- **Patch notes (0.5.0):** [patch notes] https://www.poe2wiki.net/wiki/Version_0.5.0
  - "The Genesis Tree allows consuming of Wombgifts and Hiveblood to create Rings, Amulets, Belts and Currency. Nodes on the Genesis Tree can be allocated to affect what items will be crafted. New Nodes are unlocked by using Wombgifts."
  - "Added 6 new Ring / 4 Amulet / 4 Belt base types that can be exclusively crafted from the Genesis Tree."
  - "Added a new set of Caster and Minion mods that can be crafted onto Rings and Belts using the Genesis Tree."
  - "Killing monsters in a Breach now drops Hiveblood and Wombgifts and Breachstone Splinters."
- **How it works:** [1 source, detailed] https://www.poe2wiki.net/wiki/Genesis_Tree
  - Hiveblood is gained automatically at the end of Breach encounters. Wombgifts drop from Breaches and Hive Fortress chests.
  - Each womb takes its own wombgift: Lavish = currency, Signet = ring, Ornate = amulet, Banded = belt. Revelatory (300 Breach Splinters) makes a Breachstone.
  - Birthing costs Hiveblood. Low-level wombgifts are cheaper and unlock nodes just as well; about 10 births fully unlock a womb.
  - Each womb has 10-15 points: 8 from the "Keepers of the Flame" quest, plus Atlas nodes "Diverse Control" (+2 each), "Exquisite Design" (+5 amulet) and "Growing Wealth" (+5 currency). Respeccing is free.
- **Ring womb bases:** Breach Ring (+20% max quality), Refined Breach Ring (+25%), Biostatic (+1% all max resistances), Vitalic (4-6% life), Mnemonic (4-6% mana), Kinetic (added physical to attacks), Oneiric (11-23% chaos damage) and Grasping (gains bonuses from socketed items as gloves; hidden augment socket). [2+ sources] (poe2wiki; KB bases match)
- **Ring womb nodes** (exact texts): [1 source] poe2wiki Genesis Tree; Otherworldly Clutch, Refined Grip and Crystallised Form also confirmed on https://poe2db.tw/us/Breach
  - "Natural Weaving: Birthed Items always have a Caster Modifier"
  - "Overtaken by Power: Birthed Items always have two Caster Modifiers"
  - "First Working: Birthed Items can roll additional Caster-related Modifiers" (opens the genesis_tree_caster pool)
  - "Hand in the Grave" (the minion version); "Corpse's Clutch" / "Buried Alive": one or two Minion modifiers
  - "Otherworldly Clutch: Birthed Items have 10% chance to be Breach Rings"
  - "Refined Grip: Birthed Breach Rings have 5% chance to instead Birth as a Refined Breach Ring"
  - Minimum Modifier Level nodes: "Modifier Level" 20 and 30; Caster 35; Caster Prefix 50; Caster Critical 60; Caster Speed 60; Attribute, Damage, Resistance and Life/Mana 40; Minion 35; Minion Damage, Resistance and Speed 60
  - "Caster [Minion] Modifier Values: roll their values an additional 2 times, keeping the highest value"
  - Several "5% chance for Birthed Items to have a Crafted Modifier" nodes; "cannot have Modifiers of type ..." nodes; "Whimpering Echos: Birthed Items have an empty Modifier of type ..."
- **Amulet womb:** Lament (-1 prefix), Portent (-1 suffix), Absent (-1 prefix and -1 suffix), each granting a random Persistent Buff skill. Corona comes from "The Burden of Authority" at 5%. [1 source]
  - Nodes include "End of Mourning: Prefix Modifiers on Birthed Items have maximum values", "Premonition Fulfilled" (the suffix version), "Lament No More" / "Empty Feeling" (an empty prefix or suffix), "Spells Forbidden", and per-stat minimum-level nodes at 55-60.
- **Belt womb:** Forking, Stalking, Invoking and Sinew belts. "Branded With Hexes: always two Caster Modifiers", "Sorcerer's Scar: always a Caster Modifier". [1 source]
- **Genesis-only caster modifiers** (spawn tag `genesis_tree_caster`): the wiki table matches the KB exactly. [2+ sources: poe2wiki table + KB game data]
  - "+1 to Level of all Spell Skills" (of Jordan, suffix, level 45): weights "belt 0, genesis_tree_caster 1", so rings and amulets.
  - "(4-6)…(13-15)% of Damage is taken from Mana before Life" (Taxing to Enervating, levels 23-77): "ring 0", so not on rings; amulets only. The ring version of this stat is the Altered Collarbone desecrated modifier, see the next item.
  - Spell damage, spell crit chance/multiplier, Arcane Surge, curse magnitude, spell cooldown, flask-effect spell damage and cast speed, Remnant modifiers, ES on amulets, mana regeneration.
  - Grasping Mail ("Can roll Ring Modifiers") rolls them naturally. Its KB tags include genesis_tree_caster and genesis_tree_minion.
- **Breach desecration ("otherworldly") modifiers:** 36 modifiers with spawn tag `breach_desecration`, offered only through the Altered Collarbone. [2+ sources: poe2wiki list + KB]
  - Ring-only examples: "Burdensome (8-12)% of Damage is taken from Mana before Life", "Fire Breather's / Storm Chaser's / Tempest Rider's Gain (8-12)% of Damage as Extra Fire/Lightning/Cold with Spells", "Soul Stealer's ... Chaos", "of Amplification +1 to maximum number of Elemental Infusions", "Dedicated Offering Skills (23-30)% Buff effect", "of Multitudes +1 temporary minion limit".
  - Belt examples: Archon, Infusion and Minion lines. Amulet examples: Anaemia, extra Cold, Seals, Fire spell crit.
  - "The Otherworldly mod pool is added to the normal desecrated mod pool when revealing ... at least one mod from the combined pool ... may be a normal Desecrated mod and not always an Otherworldly mod." The weights are unknown.
  - The Altered Collarbone cannot be combined with lich omens.
- **Grasping Orchid:** turning in 60 Breach-ring bases gives a Grasping Mail. It needs Vruun's head, from the Flesh Flower Atlas node. [2+ sources] (poe2wiki Grasping Mail, gameshorizon)
- **Later patches:** 0.5.3 added Ctrl+click quick-birthing. 0.5.4 fixed Breach Splinters auto-converting to a Revelatory Wombgift in the Fragment tab. 0.5.5 fixed Hive Fortress wombgifts dropping only for the map owner. [patch notes]

---

## 5. Corruption

- **Vaal Orb:** "Modifies an item unpredictably and Corrupts it". [game text]
  - **Rare/Magic equipment outcomes:** no change; reroll up to three modifiers into new ones; add a Vaal (corruption) enchantment; add an augment socket to weapons (sceptres, wands and staves included since 0.2.0g) and armour, ignoring socket limits. For jewellery the socket outcome is "no change". [1 source] https://www.poe2wiki.net/wiki/Corrupted
  - "The odds of each effect seem to be all equally likely." [1 source]
- **Unique equipment:** a 0.78x-1.22x magnitude multiplier. Since 0.5.0 it applies to the current value ("now multiplies each modifier based on the current value, instead of randomising"). [patch notes]
- **Jewels:** reroll up to 3, enchant, or add/remove a modifier ignoring the 2+2 limit (a way to get 5-modifier jewels). [1 source]
- **No-change removal:**
  - The Omen of Corruption can no longer be obtained (0.5.0). It is on the Currency Exchange only in Standard. [patch notes]
  - 0.5.5 added Atziri's Soul Cores of Devotion (Helmet), Alacrity (Gloves), Inoculation (Boots) and Vitality (Body Armour). They are socket-bound and read "Corrupting will always result in change". [patch notes + game text] https://www.poe2wiki.net/wiki/Version_0.5.5
  - These remove the no-change outcome, but not the "pseudo no change" of the jewellery socket outcome. [1 source]
- **Augments on corrupted items (0.5.4):** Astrid's Creativity, Serle's Triumph, pool runes and some others can no longer be socketed into Corrupted or Sanctified items. [patch notes]
- **Double corruption:**
  - Architect's Orb (and its Atziri's Temple bench): "Modifies a Corrupted Equipment or Jewel item unpredictably or destroys it"; 50% to add a second corruption enchantment, destroyed on failure; the result is Twice Corrupted. [game text + 1 source]
  - Orbs of Sacrifice (0.5.4, from Atziri's vault) upgrade the corruption enchantment and remove a random explicit modifier. [patch notes]
  - Vaal Siphoner works on corrupted rare jewellery. [1 source]
- **Sanctification** (Omen of Sanctification + Divine Orb on a Rare):
  - The keyword reads: "multiply the values of an items modifiers by a random value ranging from 78% to 122% for each modifier". [game text]
  - Since 0.5.0 the multiplier applies to the current value. [patch notes]
  - poe2wiki says results "round up", in 0.01 steps. [1 source] https://www.poe2wiki.net/wiki/Sanctified
  - Sanctified items can't be modified further.

## 6. Exceptional bases

- **What they are:** "Exceptional Items have Quality over maximum or an additional Augment Socket" (poe2db). The wiki says high-tier bases of item level 78+ "can rarely drop as a Normal Exceptional base with over 20% quality (max 30%) or an additional augment socket". [2+ sources] https://poe2db.tw/us/Quality, https://www.poe2wiki.net/wiki/Item
- **Sockets:** the extra socket stacks with the corruption socket. [1 source]
- **Infusers:** the quality bonus is the same stat as an Infuser's, so an Infuser can't take an Exceptional item past 30%. [1 source]
- **Where they drop:**
  - In maps, only after allocating the Atlas specialisation passives (0.5.0). [patch notes]
  - In the Trial of Chaos and Trial of Sekhemas (area level 65+) through inherent bonuses (0.5.5). [patch notes]
  - 0.5.5 fixed Rogue Exiles and Strongboxes being unable to drop them. [patch notes]
  - The exact Atlas node name was not found.

---

## Conflicts with the tool

| # | Rule / data key | Tool says | What sources say | Evidence | Workaround |
|---|---|---|---|---|---|
| 1 | `planner.js` CATALYST_DEFAULT = 25; `catalystBoost` linear to 20%; README "Catalysing Exaltation x25" | x25 weight at 20% quality (one player test: 4 of 4 attribute hits) | x5 at 20%, x7.5 at 40% (Prohibited Library, 0.4.0) | poe2wiki Omen of Catalysing Exaltation. The player's 4/4 result has a 5.7-8.5% chance at x5 and 12-17% at x7.5 (base 16-19%), so it does not rule out x5. | Default to 5 (20%) and 7.5 (40%), keep the user override, and flag that the estimate comes from a single test |
| 2 | `planner.js` catalyst op `Math.min(20, …)`; validator "already 20%"; `catalystBoost` caps at q/20 | Catalyst quality is always capped at 20% | Breach Ring 40%, Refined 45%, Essence of the Breach +20% (kept after removal), Vaal Catalysing Infuser +10% above max | poe2wiki Quality, Breach Ring, Essence of the Breach; game text; KB base implicits already list "+20/+25% to Maximum Quality" | Read the max quality from the base implicit and the EssenceBreach modifier; allow catQ up to the cap; scale the omen to 7.5x at 40% |
| 3 | `network.js` ~l.760 comment: Altered Collarbone "otherworldly modifiers are not in the data, so it is a bone of its own price and nothing more"; README: Altered Collarbone's modifiers "estimated" | Altered Collarbone reveals like a Preserved one | The 36 `breach_desecration` modifiers ARE in the KB (dom d, sw `[amulet/ring/belt 0, breach_desecration 1]`) and match the poe2wiki list; they join the reveal pool | poe2wiki Altered Collarbone; `node -e` on `kb.mods` (36 hits) | Add the `breach_desecration` pool to `revealPool` when the bone is Altered, respecting the class blocks; weights unknown, so treat as estimates |
| 4 | `lichOmenWorks` (class only) and the network lich loop with any bone, Altered included | Lich omen + Altered Collarbone allowed | Altered Collarbone with a lich omen gives an error and the bone is not used | poe2wiki Altered Collarbone and the Liege/Blackblooded/Sovereign pages | Refuse `bone quality=Altered` together with `lich` |
| 5 | `R_DESECRATE_REVEAL` ("Desecrated-only modifiers all have the same weight"); `desPoolFor` w:1 | All exclusive desecrated weights equal (from Craft of Exile) | "exclusive modifiers appear to have uneven weights" / "known that normal Desecrated mods do not have equal weight" | poe2wiki Desecrated modifier, Altered Collarbone | Keep equal weights but label them an estimate (no numbers published) |
| 6 | `R_DESECRATE_REVEAL` "a lich omen makes the first option that lich's"; `revealOptions` puts one lich modifier first, then the others | One lich option plus 2 regular/exclusive | "will always reveal options which are Amanamu's ... if possible. It will also block Ulaman and Kurgal modifiers" (implies the lich pool replaces the exclusive pool for the options) | poe2wiki lich omen pages (Prohibited Library test, 0.3.0c) | Mark as unverified; test in game (t-new): count lich options over a few reveals |
| 7 | `putrefy()` uses `revealOptions` (exclusive modifiers included) and floor 40 for Ancient; README Putrefaction "Desecrated-only" targets | Putrefaction reveals can give exclusive/lich modifiers; Ancient floor applies | "It will never roll Desecration-exclusive modifiers"; Ancient bone floor not applied to all | poe2wiki Omen of Putrefaction (1 source) | High impact (README route "50 ex on a bow" depends on it). Verify in game; until then exclude exclusive modifiers from Putrefaction reveals, or mark such routes as unverified |
| 8 | Mark of the Abyssal Lord handling (`markOf`, l.604/1148) | Desecration on the Mark: no floor | The reveal culls options below 40% of item level (ilvl 80 means level 32 or higher), standard Minimum Modifier Level rules | poe2wiki Essence of the Abyss (1 source) | Apply floor = floor(0.4 x ilvl) when the bone replaces a Mark |
| 9 | `vaalOutcome` 'socket' branch | Wand/Staff: quality up to 23%; Ring/Amulet/Belt: +1 socket | Since 0.2.0g wands, staves and sceptres get a socket (the quality outcome was removed); jewellery gets "no change" | poe2wiki Quality version history, Corrupted | Wand/Staff: socket; jewellery: nothing |
| 10 | Vaal "always change" sources (`a.omen` only, Omen of Corruption legacy) | Only the legacy Omen of Corruption removes "no change" | 0.5.5 Atziri's Soul Cores (helmet, gloves, boots, body armour; socket-bound) "Corrupting will always result in change"; already in KB `augments` | 0.5.5 patch notes; KB augments | Treat a socketed Atziri core (or offer it as a step) as `a.omen` |
| 11 | `divine` with sanctify: `Math.round` | Rounds to the nearest value | Rounds up ("then rounds up the value") | poe2wiki Sanctified (1 source) | Use ceil for positive values; low impact |
| 12 | `R_EXCEPTIONAL` "socket ..., quality above 20%, or both" | Both possible | Game/poe2db text: "Quality over maximum or an additional Augment Socket" (either one) | poe2db Quality; poe2wiki Item | Treat as either one unless an item showing both is seen |
| 13 | `infuser` op | No precondition | "Can only be used on items at or above maximum quality" (0.5.0: at or above 20%) | game text; 0.5.0 notes | Add the precondition |
| 14 | README Known gaps: quality per catalyst "1% (2% under item level 50)" | Fixed 1%/2% | Amount falls as item level rises; no published table | poe2wiki/poe2db Quality | Keep as an estimate (already labelled); in-game test needed |
| 15 | Known gap: Genesis Tree modifiers on rings/amulets/belts can't be planned | Confirmed: the `genesis_tree_caster`/`genesis_tree_minion` tags exist only on Grasping Mail in the KB; tree births can't be simulated | Patch notes + Genesis Tree node list above | — | Out of planner scope: handle as "bought base"/recipe; Grasping Mail is already plannable |
| 16 | Suspected gap "unrevealed desecrated can't be picked by Fracturing Orb" | Tool: no Desecrated modifier (revealed or not) is fractured, but they count toward 4 | Same: "Desecrated modifiers cannot be fractured, although they can count towards the minimum 4" | poe2wiki Fracturing Orb + crafter guides (1/3 trick) | **No conflict**; the rule can move from crafters' practice to [2+ sources] |
| 17 | catalyst op note "0.5 community sources: from the Genesis Tree" | Community sources only | Official 0.5.0 notes: "solely obtained from the Genesis Tree" | Version 0.5.0 | Raise the confidence to patch notes |
| 18 | `R_DESECRATE_REVEAL` 80/15/5 | CoE numbers | Only Craft of Exile has them (poe2.js `desecrationModSpawnRate`); the wiki says only "at least one, possibly more" | CoE poe2.js; poe2wiki | Keep it, labelled single-source |

Confirmed consistent:
- **Rules:** `R_ONE_DESECRATED`, `R_DESECRATE_FULL` (game text), `R_ONE_CRAFTED`, `R_SANCTIFIED_LOCK` / `R_VALUE_MULT_05`, armour has no exclusive desecrated prefixes (KB: 0), Instant Leech desecrated modifiers gone.
- **Data:** the catalyst list and tags, and the 13 Refined catalysts. Essence outcomes per class match the poe2wiki values (Greater Essence of the Body has no Ring version; Hysteria per class).
- **Bases and modifiers:** the Genesis bases and the Genesis caster-modifier spawn weights.

## Open questions (need an in-game test or a better source)

1. **Lich omens:** is 1 of the 3 options that lich's (CoE, tool), or all of them (wiki)?
2. **Putrefaction:** can its reveals include exclusive/lich modifiers in 0.5.5? The wiki says never.
3. **Catalysing Exaltation:** the true multiplier at 20% and 40%, and whether it scales smoothly below 20%. The only test is from 0.4.0.
4. **Quality per catalyst:** the amount by item level (for example ilvl 75-82 rings).
5. **Essence of the Breach on a Breach Ring:** does it stack to 60% max quality? Does the Vaal Catalysing Infuser add the catalyst-type quality on rings?
6. **Altered Collarbone:** the share of otherworldly options (the guaranteed "at least one" is from the combined pool), and the weights.
7. **Genesis tags after birth:** does a birthed ring keep a hidden `genesis_tree_caster` tag, so that Chaos or Exalted Orbs can roll Genesis modifiers later? No source found. The tool assumes no (bases have no such tag).
8. **Well of Souls 80/15/5:** not confirmed outside Craft of Exile.
9. **Exceptional items:** the exact Atlas passive name, and whether an item can have both the extra quality and the extra socket.
10. **Essence of the Breach source:** poe2wiki has an internal conflict (Ornate Wombgift vs the Currency-womb node Crystallised Form; poe2db says Currency).
