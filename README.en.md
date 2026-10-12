# PoE2 Craft Assistant

*English translation of `README.md` (translated 12 Oct 2026). The "Desktop program (Windows)" section was already in
English and is copied unchanged, with a note on the local Firefox change.*

A crafting panel for Path of Exile 2 (patch 0.5.5): it reads a pasted item, works out a single craft route for the
target stats and a budget ceiling (with the other ways listed under it), and updates the route and the prices after
every step. Since 7 October 2026 the route comes from a network of equations, with no waiting for a simulation;
Cheap / Balanced / Premium and the tier range were removed (see "Craft network" below). It runs as a claude.ai Artifact:
https://claude.ai/artifact/7N2pMNG8ZhbqRjqy2mQmhH

Design document `poe2_craft_assistant_MASTER_PROMPT.md`; game knowledge `poe2_bilgi_bankasi_0.5.5.md` and
`poe2_kb_0.5.5.json`.

This product isn't affiliated with or endorsed by Grinding Gear Games in any way.

## Layout

| Path | Contents |
|---|---|
| `app/index.src.html` | The page (interface, price link, database, reading descriptions and screenshots with `sample`) |
| `app/engine.js` | Item text parser, matching, stat picker, leak filter |
| `app/planner.js` | Rules, 26 craft operators, Monte Carlo, profiles, recipe candidates and beam search |
| `app/guide.js` | Checking guide claims, source tiers, recipe library, league rules |
| `app/value.js` | Item value estimate from saved prices |
| `app/pricecheck.js` | Price check: Exiled Exchange 2's trade search (MIT licence, source in the header) |
| `scripts/coe_crosscheck.py` | Comparison with Craft of Exile data (tiers, weights, desecrated), `reports/coe-crosscheck.md` |
| `app/data/` | Recipes and decision log, poe2db weights, icons, self-test results |
| `app/tests/` | JS tests (including acceptance tests 10.1–10.5) |
| `scripts/fetch_prices.py` | Official Currency Exchange digest + Exiled Exchange 2 (poe.ninja) prices |
| `scripts/build_price_package.py` | npm package from the price documents |
| `scripts/fetch_icons.py`, `build_icons.py` | Icons of priced items (web.poecdn.com, addresses from the Exiled Exchange 2 list) and their package |
| `scripts/kb_update.py`, `kb_diff.py` | Knowledge base update pipeline (build / check / approve) |
| `scripts/selftest/` | Heavy self-test: random walks, strategy mining, recipe comparison; `sweep.js` sweeps every strategy combination |
| `.github/workflows/prices.yml` | Price job (every 3 hours) |

## Commands

```bash
node app/build.js                          # app/dist/index.html and data/ (then published as an Artifact)
node --test app/tests/*.test.js            # JS tests
python -m unittest discover -s scripts/tests
python scripts/fetch_prices.py             # updates prices locally (.kb_cache/out)
node scripts/selftest/run.js               # self-test (~30 min); --quick for a short version
scripts\selftest\capped.cmd node scripts/selftest/sweep.js --workers 25   # full sweep (~5 hours); on 25 of the CPU's 32 cores
scripts\selftest\capped.cmd node scripts/selftest/sweep_planner.js --workers 25   # measures the planner against the sweep (~30 min)
python scripts/kb_update.py build          # new knowledge base candidate, then check / approve
python scripts/fetch_icons.py              # icons of newly priced items, then scripts/build_icons.py
node scripts/selftest/reader_check.js      # reader: every base, every mod it can carry, both copy formats (~20 s)
node scripts/profit_recipes.js --write     # checks the profit recipes, writes the network cost of the targeted ones
```

`.kb_cache/` (downloaded game data, price hours, icons) and `app/dist/` are not committed.

## Craft network (`app/network.js`)

The player's decision of 7 October 2026: the assistant only showed fixed paths; instead they wanted one route, a budget
ceiling, alternatives and a "logical network" with no waiting time.

- **Node** = the item's state: which targets it has (natural, crafted, desecrated), which target has a mod of its own
  group in front of it, how many other mods are on each side, what is fractured, whether there is a hidden desecrated
  mod, catalyst quality. **Edge** = a currency: its outcomes, their probabilities (from poe2db weights) and its price.
- **Route** = the edge that is cheapest on average at every node. No simulation: costs are solved from equations
  (policy iteration starting from a rule set that always finishes; long "use it, missed, use it again" loops are solved
  exactly within blocks, and a fresh white base is a single unknown). On a white base two targets take about 1 second
  (6,700 nodes), three targets 3 seconds, four targets 9 seconds; five targets with a 100-base limit on boots take 35 to
  75 seconds (measured 8 Oct 2026; previously 4 minutes).
- **Blockers are tracked** (the player's decision of 8 Oct 2026: "if a bigger network is needed, grow it"). A mod from a
  target's group (a lower tier, a sibling mod), or a mod on the other side that stops it through its tags, is part of
  that target's state even if it arrives during the craft: while it stays on the item the target cannot come, and the
  route may choose to remove it. Previously this chance was drawn again at every use; on bases where local defences
  are half the pool (Grand Regalia, Grand Visage, Grand Cuisses) the promise was off by anything from 10% to 7 times.
  Up to five targets, every natural target is tracked; with six targets, the two with the largest groups (`net.track`).
- What it gives: expected cost, its spread, the chance of staying within the budget ceiling, the materials list, other
  first steps, "the most a start with this mod is worth buying for", and rules ("if the item is like this, use that").
- The "Bases per item" limit constrains the route: with few bases the route repairs instead of starting over (annul +
  chaos, fracture and the Omen of Light loop come up on their own).
- Catalyst quality is the player's choice: leave it (default), spend the existing quality with Omen of Catalysing
  Exaltation, or add catalysts and spend it.
- **Every request goes through the network** (the player's decision of 8 Oct 2026: "I don't want anything the network
  doesn't cover"). The page no longer falls back to the old simulator; the simulated planner, its workers, the progress
  ring and the leftovers of the profiles were removed from the page. The network is solved on the page in a separate
  thread (Web Worker). In the network: every orb (with tier and side omens), Orb of Alchemy, essences (Magic and
  Perfect, including those with several outcomes), alloys, liquid emotions and the jewel's "+1 modifier allowed" mod
  (five-mod jewel), bones (lich omens, Abyssal Echoes, leaving the mod hidden), Fracturing Orb, Omen of Whittling,
  Greater Exaltation, catalysts, value targets and Divine Orb, Flux, Rune of Aldur, Astrid's Creativity, Serle's
  Triumph, rune pools (with an Artificer's Orb for a socket if needed), and two tools from crafter videos: a cheap
  Perfect essence that removes an unwanted Desecrated mod without Omen of Light (aimed at that side with Omen of
  Crystallisation; if the side is full the omen isn't needed either: claim k60) and Essence of the Abyss (the next bone
  takes the place of the "Bears the Mark of the Abyssal Lord" mod it leaves: claim k59). On a bow missing only a
  Desecrated suffix the route fell from about 2,690 ex to 380 ex.
- When the answer is not a route it says why: `blocked` (Mirrored, Corrupted, Sanctified, Unique), `impossible` (item
  level too low, no socket for a rune, no rule set finishes with the targets).
- **Pool model.** Mods nobody wants are averaged, but every entry in the pool is tracked one by one: a mod takes out of
  the pool those of its own group and those its tags (game data `adds_tags`) stop, on the other side too (the "+ to
  Level of all Fire Spell Skills" suffix keeps the Chaos Damage prefix off a wand). The pasted item's own blockers are
  known states. Compared with drawn pools: within 0.6% on classes without tags, within 2.4% on wands and staves. A
  target's own tags on the item cut the pool (this does not count as another mod's blocker); a twin from the target's
  own group (elemental damage prefixes on wands, staves and foci) holds that group like the target. At the Well of
  Souls, if a Desecrated-only option is of the same group as a target ("#% increased Elemental Damage" with Cold Damage
  on a wand), the target can no longer come in that draw.
- **Omen of Whittling.** The omen removes the lowest-level mod. The lowest level among the mods nobody wants is in the
  node as one class per side (below or above the lowest level the targets can have). The omen is an edge only in nodes
  where what it removes is certain: on a side with a mod below every target on the item. This is what crafters call the
  "whittle angle". The classes make the network 2.6 to 6 times larger; since most routes don't use the omen, it is
  first solved "at its best" (as if the player chose what it removes) and the network with classes is built only if
  the route uses it. In requests where the classes don't fit, and in small networks, the omen is not in the route.
- **Values are solved until they settle.** Loops that cross blocks (a target is removed and rolled again) settle by
  their chance per round; with block passes alone, a quiver route of 25,000 white bases was valued a fifth too low.
  When passes are not enough, the values of the nodes the route reaches are settled with accelerated passes
  (Anderson); `net.settled`.
- **No step the rules refuse.** The playback asks the simulator's rules about every step (`P.validate`); a refused step
  is a mismatch in the sweep. Found this way: lich omens work only on weapons and jewellery, an essence whose own side
  is full cannot be aimed at another side, and there is no third crafted mod even with Astrid's Creativity.
- **Two crafted mods.** The node keeps two unwanted crafted mods apart (together with which essence's mod each is): on an
  item with Astrid's Creativity socketed, the tool essence and the alloy can be used one after the other. The 565 ex
  bow route earlier written up as a "known limit" broke the rules (22 steps refused in 300 crafts: a third crafted
  mod); with two slots the cheapest legal route the network finds is 667 ex (playback 624 ± 47, no refused steps).
- **Steps that lock the item or give it up.** These either finish the item or lose it; the new base for the loss is in
  the step's cost and count (`a.bases`), and the base limit's charge comes on top.
  - *Vaal Orb:* one of four outcomes changes one to three mods at random; the chance of finishing an item that misses a
    target is worked out exactly (1.43% on full boots; 1.44% in the simulator).
  - *Omen of Sanctification + Divine Orb:* every value is multiplied by 78–122%. Used for value targets; a value no
    tier's range reaches (up to 22% above T1's maximum) can only be a target with this, and then only the highest tier
    counts (two tiers promised the average chance in one case: 17.6% against 31.2%). The page shows the chance with the
    item's own value.
  - *Omen of Putrefaction + bone:* every non-fractured mod goes, six hidden Desecrated mods come, and the item becomes
    Corrupted. For requests with only Desecrated targets this is usually the cheapest route (50 ex on a bow with two
    targets; playback 50.4). Which option is taken on a miss is a rule (a Desecrated-only mod that is in no target's
    way and takes the most entries off the Well's list) and the list is tracked entry by entry; several Desecrated
    targets on the same side count together in one draw (two in nine, not 1 - (8/9)^2).
  - *Orb of Extraction:* gives back Astrid's Creativity; the item is given up this way (rune 1,753 ex, orb 307 ex).
  - *Void Flux:* turns Fire, Cold and Lightning Resistance into Chaos Resistance of the same tier. *Altered
    Collarbone:* a bone option on jewellery (it opens like a Preserved one according to the game data).
- **Runes belong to the item.** Astrid's Creativity and Serle's Triumph on the pasted item are that item's state; a new
  base doesn't have them and its sockets are empty. (Previously they counted as free on every new base, and a craft
  starting from such an item was promised as cheap as the rune's price.)
- **Base limit.** With four or more targets the small network (blockers not tracked) is fitted to the limit; the large
  network starts from the "give-up price" it found (base + charge + the white base's value), is adjusted in small steps
  and solved exactly once (`heldFit`). Solving the large network freely first and then searching took a minute and a
  half.
- **Deliberately left out of the network.** Items no longer in the game or removed (the side omens of Coronation and
  Alchemy, Greater Annulment, the Homogenising omens, Omen of Corruption: the player's decision of 8 Oct 2026).
  Currencies that don't touch the crafted item's prefixes and suffixes: Orb of Chance, Mirror of Kalandra, Architect's,
  Sacrifice and Cultivation orbs, Verisium, quality currencies, Omen of the Blessed (implicit only). Flask and charm
  crafting, anointing and the Verisium Anvil are out of scope.
- **Hinekora's Lock.** An edge in the network: with the lock on, every currency's outcome is seen in advance and the best
  one is used; the step's cost is the lock + E[smallest (price + value of the outcome)] (a step without the lock is the
  smallest of the expectations). Outcomes of different currency items count as independent; of the versions of the
  same currency with and without an omen, only one is looked at (whether the omen changes the outcome shown is not
  known: claim k62, test t36). The bone's mod (chosen at the Well), opening and runes are not shown; if none of those
  shown is worth it the route uses one of these or a new base, and without a value target it spends the lock with a
  Divine Orb and tries again. The lock can save at most the item's value, so while it costs more than the "give-up
  price" (at 517,000 ex, in nearly every craft) it is not an edge at all; it comes in after the rule set without the
  lock has settled, and every round is valued exactly. In a 667,000 ex quiver craft it isn't used at today's price; if
  the lock were 80,000 ex the craft would fall to 546,814 ex, at 20,000 ex to 367,941 ex. Playback: on boots with the
  lock at 3 ex, 268.1 promised, 266.1 ± 5.6 played.
- **What the third deep sweep found (9 Oct 2026, `reports/network-sweep-2026-10-09.md`).** Putrefaction counted every
  pair of misses as its own state on items with long Well lists (amulet 11+20, body armour 7+22, jewel 29 entries): a
  network of 1,600 nodes took 19 seconds to build and large ones filled the memory; the lists are now tracked only as
  far as the answer needs (0.2 seconds). When Chaos and an elemental resistance were wanted together, a single mod
  counted as the "twin" of two targets (Void Flux and Blazing Flux): a mod has one state, and one Flux also turns the
  other target's twin (Grand Cuisses: 1,239 promised, 2,611 played; now 2,173 against 2,159). A group mate on the other
  side also holds the target (the Thorns prefix on a belt holds the Desecrated "Thorns Critical Hit Chance" suffix):
  this is now a state. Steps that lock the item come in after the rule set has roughly settled without them (otherwise
  the solver could get stuck in a rule set that never finishes). Where a node doesn't know the blocker and the rules
  refuse a step, the playback takes the cheapest next step the rules allow and counts it, with the reason, as a
  "deviation".
- Rune of Aldur does not convert a mod that arrives after it is socketed (the player confirmed this on 8 Oct 2026:
  claim k61).
- Research log: `reports/research-crafters-2026-10-07.md` (0.5.5 crafter videos and written guides).

Verification (the network's promise is compared with the cost played in the simulator, which knows every mod):

    node --test app/tests/network.test.js
    node scripts/selftest/network_check.js --limit 24      # a few seconds locally, one core
    node scripts/selftest/network_sweep.js --shard 0/5 --minutes 17
    node scripts/selftest/network_sweep.js --deep --runs 100000 --minutes 17
    node scripts/selftest/network_gap.js "Dueling Wand" n6 150      # which step the difference comes from
    node scripts/selftest/network_gap.js "Dueling Wand" "id:<scenario name the sweep printed>" 300
    node scripts/selftest/network_gap.js "Dueling Wand" "fams:ColdDamageWeaponPrefix@2,IncreasedCastSpeed@3" 300

`network_gap.js`: played minus promised cost, split exactly node by node (number of visits x the difference between the
game's outcomes and the network's, valued at the network's own costs). This measurement found the wand error in which
the network promised half the craft's price.

The broad sweep runs in the cloud, not on the player's computer: `.github/workflows/network.yml` (started by hand only:
`mode=broad` runs many scenarios, `mode=deep` plays every scenario 100,000 times; every job stops itself). The repo has
been public since 8 Oct 2026, and Actions minutes are free. Every sixth drawn scenario of the sweep is a special
request: a value target, another element's resistance on the item, a rune pool, four suffixes (Serle's Triumph), a
five-mod jewel, two crafted mods (Astrid's Creativity). Results are in the job summary and the `sweep-*` outputs.

### What giving up an item means (`input.restart`)

In the network the "new base" edge leads to a white base by default. There are two more cases (10 Oct 2026):

- `restart: 'item'` + `itemCost`: the start is a bought item; when it is given up, another one like it is bought. The
  restart node is the pasted item itself (`net.n0 === net.start`), its price `itemCost`. On the page: Plan options >
  "If given up" > "another item like this".
- `restart: 'never'`, or when no price for another item is given: the item is one of a kind. Every edge that gives the
  item up or can lose it (new base, Vaal Orb, Sanctification, Putrefaction, Extraction) leaves the network.
- If the item has a target that a white base can never get (a Genesis Tree mod, a mod Rune of Aldur converted, a tier
  above the item level), the target becomes `held` and the item is bound automatically (`net.bound`). Such a request
  used to be turned down with "this mod can't be rolled on this base". If the held mod can be lost and there is no
  price for another item, the answer is an "impossible" that says why.

## Profit recipes (`app/data/recipes_0.5.5.json`, field `profit`)

"Buy, craft, sell" recipes: methods read from video transcripts the player gave (not in the repo). Each recipe says
what to buy, the materials of one attempt (`uses`), the buy and sell prices the source states with their dates (`buy`,
`outcomes`) and, where there is one, the target the network can solve (`goal`: start item + target mods).

- The page (Recipes & guides > Profit crafts) adds up the materials at current exchange prices; the sell price is the
  source's figure, because the trade site is not queried. When the player enters their own buy and sell prices, the
  profit uses those.
- For recipes with a target, the network solves the route from the bought item to the target at current prices in a
  separate worker: the route's cost, how many items it uses on average and the hit chance of a single attempt are the
  network's own numbers.
- "Load this craft" puts the start item and targets on the page, and sets the restart mode and the item's price.
- `scripts/profit_recipes.js` checks names and tags; `--write` writes the start item's text and the network's cost on
  that day (`goal.model`, price day `meta.profitModel`) into the file. The page shows it until a live result arrives.

## Full sweep (`scripts/selftest/sweep.js`)

(For the old planner's strategy settings. Since 8 Oct 2026 the page doesn't use this planner; the simulator stays on as
the network's auditor.)

In each self-test scenario (start item + targets) it covers the product of all the planner's strategy settings (about
10.6 million combinations) and checks the page's Cheap / Balanced / Premium choices.

1. **Classes.** The planner reads a setting only where it could change the outcome. The sweep records which settings
   were read; with the same random numbers, two strategies with the same value in every setting that was read make
   exactly the same moves. The space is split only on settings that were read, and every leaf (a "class") stands for
   all the combinations it covers.
2. **Elimination.** Every class gets a short run (6 trials, all with the same random numbers); by an optimistic
   estimate the best are run again with 30, then 300 trials.
3. **Matching.** Cheap = lowest cost per finished item, Balanced = cost weighted by the finish chance, Premium = highest
   finish chance (the page's profile scores).
4. **Verification.** The assigned strategies, the page planner's own choice and the rivals are run 1,000 times with new
   random numbers: is there a cheaper one that finishes as often, or a more certain one that is not more expensive? If
   so, the assignment changes and is checked again; the final choice is compared once more with the runner-up over
   4,000 trials.

Strategies that throw away a Rare start for a new base (slamOnly) are left out: the pasted Rare item is the item to
finish. On white and Magic starts a new base is part of the method.

Last full sweep (6 Oct 2026, 283 minutes, 25 cores): 784 scenarios, 12.9 billion combinations, 8.4 million classes, 9.6
million simulations. Simulating again changed the first assignment in 58 scenarios for Cheap, 94 for Balanced and 116
for Premium; for Cheap and Balanced no scenario was left with something cheaper than the assignment.

Related scripts:

- `sweep_planner.js`: runs the page's planning flow in every scenario and compares its choice with the sweep's verified
  best (784 scenarios in ~30 minutes, ~6 minutes with `--limit 150`). Every change to the planner is measured with it.
- `sweep_report.js`: `reports/sweep-latest.md` (summary) and `reports/sweep-summary.json`; with `--planner <file>` it
  takes the planner side from a `sweep_planner.js` measurement.
- `capped.cmd`: runs the command on part of the CPU (by default 25 of 32 logical cores) at low priority. `watch.sh`:
  shows progress as a bar.

An interrupted sweep continues from `reports/sweep-partial.jsonl`; `--fresh` starts over. The full result
`reports/sweep-latest.json` is not committed.

### Planner search (what came out of the sweep)

The page's search (`app/planner.js`, `makeScreen`) uses the sweep's methods:

- Strategies that behave the same share one run (the settings read are recorded, the same random numbers are used).
- Runs come in three lengths (40, 200, 800 trials); the short run only decides, by an optimistic estimate, who gets a
  long one.
- Start candidates are the profile's grid, the library's recipes and the sweep's most frequent winning routes
  (`ROUTES_RARE`, `ROUTES_START`). Some routes only work together (Orb of Alchemy + a new base on a miss), and a search
  that changes one setting at a time can't reach them.
- The beam search changes one or two settings together; at selection, the other values of settings read only by the
  longest run (rare paths) are tried too, because a rare dead end can carry most of the cost.

Measurement (784 scenarios, against the verified best): Cheap 93%, Balanced 90%, Premium 89% the same strategy, an
equivalent result or better; for most of the rest the difference is under 10%. On the same 150 scenarios the old search
was worse in 25% (Cheap), 27% (Balanced) and 71% (Premium) of them; the new one in 5%, 8% and 9%. Time per item didn't
change (median ~25 seconds).

## Price pipeline

1. `.github/workflows/prices.yml` runs `fetch_prices.py` every 3 hours (UTC :20). The sources are the official Currency
   Exchange digest (24-hour volume-weighted median) and Exiled Exchange 2's poe.ninja data. If EE2's prices drift
   systematically from the official digest (median ratio outside 0.75–1.33), that league stays on the official data.
2. The documents are published to the npm package `poe2-craft-assistant-prices` (npm trusted publishing, no stored
   key). When npm lists the new version, the workflow purges the jsDelivr cache.
3. The page loads the package from jsDelivr (or unpkg if that fails) with an hourly suffix, inside a separate Web
   Worker, and takes only the data. The Artifact page can't send requests to other sites; it can only load scripts from
   these CDNs.
4. If the package can't be loaded, the page uses the last copy in the artifact database or the `prices-snapshot.json`
   file that comes with the page.
5. The package also carries the current game data version of the RePoE PoE2 export the knowledge base is built from
   (`meta.gameData`). If that version is newer than the knowledge base's, a "data may be stale" banner appears on the
   page; it goes away once the knowledge base is rebuilt with `scripts/kb_update.py`.

## Price check (adapted from Exiled Exchange 2)

- **Price check** in the Value panel is an adaptation of Exiled Exchange 2's search-building code (MIT, © 2020 Alexander
  Drozdov and contributors) (`app/pricecheck.js`): presets ("Pseudo" for finished Magic/Rare/Unique items, "Base item"
  for Normal items and items with craft value), item filters (category or base, rarity, item level, corrupted,
  mirrored, sanctified, fractured, rune socket, quality, required level, unrevealed desecrated), pseudo totals
  (resistances, attributes, life, mana, ES, movement speed), armour/evasion/ES at 20% quality and DPS, a ±10% search
  range (for uniques, a share of the roll range), the "# Empty Modifier" count and the trade2 query.
- Adaptations: the page can't read the trade site (the Artifact's CSP and GGG ToS 7i), so the search opens on the
  official site; Corruption Enchantments are on by default (twice-corrupted items are priced with them); a sanctified
  item is compared with sanctified items. PoE Overlay II is closed source, so only the same kind of search behaviour was
  taken from it.
- Works for every kind of item: unique (name + base, variable lines), normal base, magic ("magic" rarity on jewels),
  rare, corrupted, twice corrupted, sanctified, desecrated (revealed and unrevealed), fractured.
- The price list shows only the craft materials of wearable items (no fragments, gems, tablets, waystones or
  flask/charm materials).

## Workbench (inspired by Craft of Exile)

- The **Workbench** button in the Item panel works on a copy of the item: **Emulator** (pick a currency, orb tier and
  omen and see a random outcome, undo it, and move it to the main item with "Use as my item" if you like) and
  **Calculator** (All/Any/At least N/None requirement groups, the chance of a single use; the groups start from the
  targets).
- When a Bone (desecrate) is used, the emulator offers 3 Desecrated mods as the Well of Souls does; the default is the
  highest-level one (the planner takes it too), and another can be chosen. With Omen of Abyssal Echoes selected the
  first three can be drawn again once; the lich omens (Blackblooded, Liege, Sovereign) can be selected too. The same use
  replays with the same seed, so the rest of the item doesn't change when the choice changes.
- In the stat picker, next to every stat is the chance that the next random mod is that stat (within its side; in the
  tooltip, within any new mod).
- **Strategy** (like Craft of Exile's Simulator): the currency picked in the Emulator is added as a step; each step's
  rules are tried in order ("if this group hits → next step / this step again / new base (start over) / stop / step
  N"); if none hits it goes to "Otherwise", and if the currency can't be used to "If it cannot be used"; a maximum
  number of uses per step can be set. Conditions can be stats (with a tier limit), an open prefix/suffix slot and
  rarity. The target is the Calculator's groups; a run ends when it reaches the target. 2,000 runs go in slices (at most
  15 s), and the result is: success rate (95% interval), cost per run and per finished item, median and 90th-percentile
  cost, uses per step, and how runs ended. A new base costs the White base price from the plan settings; with a budget,
  a run stops there. At the Well of Souls, if the Desecrated mod the target or a rule wants is offered it is taken;
  otherwise Abyssal Echoes draws again, and then the highest-level one is taken. Steps are remembered in this browser
  per item class.
- Planner functions: `P.emulate`, `P.chanceOf`, `P.familyChances`, `P.runStrategy`, `P.runStrategyAsync`, `P.groupsMet`.

## Known gaps

Goal: whatever state the pasted item is in, present the craft steps to the target item in the most efficient order.
The scope is only high-impact items the character wears, and jewels.

- Out of scope (the user's decision): flask and charm crafting, tablets, waystones, amulet anointing, the Verisium
  Anvil, non-crafting materials and pulling live trade listings. Flask and charm stats on other items (e.g. Flask
  Recovery on belts) are planned like other stats.
- Soul mods (Medved's Tending) are not supported (the user, 28 Sept 2026: their numbers can only be rerolled with an
  omen + Divine Orb; not confirmed by a second source). The planner doesn't roll them or offer them as targets; they are
  read on a pasted item.
- Desecration (R_DESECRATE_REVEAL): the side of the unrevealed mod is set when the bone is used. The Well of Souls
  offers 3 options from that side's normal mods and the mods that only come from desecration: the number of special
  ones is 1/2/3 with chances of 80%/15%/5% (Craft of Exile), and a lich omen makes the first option that lich's. Gnawed
  bones and sceptres give only normal mods.
- Routes with every slot targeted (`scripts/selftest/full_targets.js`, `reports/full-targets.md`): 3 prefixes + 3
  suffixes on normal items, 5 targets on jewels (three suffixes, a prefix and the liquid emotion mod; recipe c15,
  `jewelFive`). Measured 6 Oct 2026: on all 56 bases, from white and Rare starts, in all three profiles a route is
  found; if no run finishes within 600 uses, the planner tries the same routes with 3,000 uses. Costs are very high
  (median 2,400–6,800 div on normal items), in 37 scenarios some profiles finish less than half of their runs, and
  the calculation takes a median of 152 seconds per item. Classes that take the Serle's Triumph rune (+1 Suffix
  Modifier allowed) and can open a socket have a fourth suffix target row (7 mods): the planner sockets the rune once
  three suffix targets are on the Rare item, using an Artificer's Orb first if there is no empty socket. Measured with
  `full_targets.js --seven` (6 Oct 2026): on all 43 bases that can take the rune, from white and Rare starts, in all
  three profiles a route is found (median finish chance 66–85%, 2,200–4,300 div); the calculation takes minutes per
  item.
- Runes need an empty augment socket (Serle's Triumph, Astrid's Creativity, Rune of Aldur); sockets go first to runes
  that open slots. The mod pools runes open ("Can roll Marksman / Berserking / Decay / Destruction / Chronomancy / Soul
  modifiers") are not supported as targets: they are read on a pasted item, not planned.
- Materials not in the game (`legacy_or_disabled`): the Homogenising, Alchemy, Coronation, Greater Annulment and
  Corruption omens don't enter plans or the Workbench; on jewels only the Preserved Cranium exists (the player, 6 Oct
  2026; consistent with the game data and the price list).
- Grasping Mail: poe2db gives the armour mods a single weight and the ring mods real weights; no source gives the ratio
  between the two. The armour mods were scaled to the median weight of the ring page (an estimate).
- A material without a price is not counted as free. Optional omens (direction omens, Greater, Catalysing,
  Homogenising, Whittling, Crystallisation, Abyssal Echoes) are taken out of a plan and reported if they have no
  price; a plan that uses a required material without a price (a bone, an essence) is ranked behind every plan whose
  prices are fully known. Without a price on 6 Oct 2026: the Homogenising, Coronation, Alchemy, Greater Annulment and
  Corruption omens, Gnawed and Ancient Cranium, Essence of Battle, Lesser Essence of Ruin. The first full sweep was
  invalid because it counted the Homogenising omen as free; it was fixed and run again.
- The rules rely as far as possible on the game's own texts (`game_keywords`): one crafted mod, desecration on a full
  item, the fractured lock, the Sanctify range, Minimum Modifier Level, Maximum Item Level, socket-bound augments (17
  runes/cores whose description says "cannot be retrieved or replaced"; Orb of Extraction destroys the item and does not
  give them back).
- From the game's tables: liquid emotion outcomes, catalyst quality types, Greater/Perfect minimum levels, the tags mods
  add to an item (on caster weapons one element's spell mod blocks the others; Grasping Mail opens the ring mods).
- Probabilities are estimates: mod weights are poe2db's community data; Craft of Exile gives the same probability for
  8,929 of 8,987 tiers and differs on 58 (selectable on the page). Desecrated mods are equally weighted (Craft of Exile
  does the same). The Catalysing Exaltation multiplier is x25: the player's test (t8, an attribute mod on 4 of 4 rings);
  x6 and above fits that result; it can be adjusted.
- Without full data in the sources (estimated): Vaal Orb outcome rates (~25% each, Maxroll/Game8) and the distribution
  of its "1-3 mods", Architect's Orb 50/50, how much Orb of Sacrifice raises a value, Orb of Chance's rates per base
  (the emulator lists the possible uniques), Altered Collarbone's "otherworldly" mods, quality per catalyst (1%, 2%
  under item level 50), and the "equivalent mod" mapping of Rune of Aldur and Void Flux.
- In plans that start from a white base, going back to a new base is often cheaper than repairing with expensive
  omens, but it needs many bases. The base price and the limit of bases per item are the player's input.
- A Rare item's value is estimated from the prices the user has saved. Price check (adapted from Exiled Exchange 2)
  builds the search and opens it on the official site; no listings are pulled.
- Unique prices come from poe.ninja; there is no listing count, so for rare uniques they can be far from real sales.
- Ctrl+C (simple) text has no tiers or sides; hybrid and local/global mods that match the same text, and mods whose
  line can be either a prefix or a suffix (Mark of the Abyssal Lord), are flagged for you to choose.
  `scripts/selftest/reader_check.js` writes every mod that 1,617 bases can carry (natural, Desecrated,
  essence/alloy/liquid, rune pool; with fractured and Corrupted markers) in both formats and reads it back: in
  Alt+Ctrl+C all 141,968 mods are read correctly (10 are asked about), in Ctrl+C none are read wrong and 691 are asked
  about. Rune pool mods on an item whose rune was changed later are read too.
- The price package is public on npm; in Standard, the gap between EE2 and the official digest is close to the safety
  limit.
- The data is locked to 0.5.5. When new game data comes out a warning banner appears on the page; rebuilding the
  knowledge base is done by hand: `kb_update.py build`, `check`, `approve`, then publish.
- The self-test checks that the simulator follows the data and the rules, not the game's behaviour. All the in-game
  tests (t1–t31) are closed.

## Desktop program (Windows)

> **Local change (12 Oct 2026, this copy only):** the program now opens the page in **Firefox** by default, in a
> separate Firefox profile with the tab and address bars hidden. The `browser` setting in `config.json` picks
> `"firefox"` (default), `"edge"` (the original Edge app window) or `"default"` (a tab in the default browser).
> The Edge text below describes the original behaviour.

`desktop\build.cmd` builds `desktop\out\PoE2CraftAssistant.exe` with the C# compiler that ships with Windows (nothing is
downloaded) and puts a copy of the page next to it. Run the exe: a tray icon appears and the Craft Assistant opens in its
own window (Edge's app mode), kept above the game.

- With Path of Exile 2 in front, hover an item and press the hotkey (default `Alt+D`). The program presses the game's
  own copy keys (Alt+Ctrl+C) for that item, reads the clipboard and hands the text to the page, which loads the item.
  One key press, one copy; nothing else is read from the game, and the program asks nothing of any web site.
- While a route is running, the same item coming back changed counts as the result of the route's next step: after
  each craft, press the hotkey on the item and the assistant is up to date, with no copy and paste.
- The route's steps on the game screen: after "Find craft route", click one of the three routes and the program draws
  that route over the game in a small panel of its own: the steps in order with their uses, the step to use now
  marked, with what it does, its chance per use and a warning when it cannot be undone. After each step, the hotkey on
  the item moves it on at once (the route's own rule on the item as it is now; "updating..." until the route is
  simulated again) and says how the step went (on plan, no hit yet, off plan). The panel has no frame, never takes the
  keyboard and lets every click through to the game. It is shown while the game is the window in front, or the
  assistant's window with the game behind it (a second screen); any other program in front hides it. It goes when the
  route is dropped (other targets, another item, Cancel) or with "Hide" under the routes.
- Where it is: top middle of the game's picture by default, as large as the game draws its own interface (by the
  picture's height). "Move" under the routes, or the tray menu, lets the panel take the mouse: drag it, then
  right-click it. The tray menu turns it off altogether.
- With the steps on the game screen, the hotkey leaves a minimised assistant window minimised, and the page keeps
  planning while its window is minimised or covered (the browser's background throttling is off for this window).
- An item the assistant does not craft (currency, gems, waystones and the like) is not loaded: the item being worked
  on stays.
- The hotkey is taken only while the game window is in front (a browser tab whose title merely starts with the
  game's name does not count). Settings are in `config.json` next to the exe (`hotkey`, `port`, `topmost`,
  `advancedCopy`, `gameTitle`, `watchClipboard`, and for the steps panel `stepsOverlay`, `stepsX` and `stepsY` in
  percent of the game's picture, `stepsScale` and `stepsOpacity` in percent); the tray menu opens it.
- Other tools: an item copied in game by any means (Ctrl+C, another tool's own copy) is loaded as well
  (`watchClipboard`). With a route running, only the route's own item comes in that way.
- The browser does not offer to translate the program's page (it is in English on purpose): the page is marked "do
  not translate", and translation is turned off in the program's own browser profile.
- "Search on trade" in the page opens the official trade site with the search prefilled, on the player's click.
- The price check window the program had for a day (6 and 7 Oct 2026: a panel over the game with the trade site's
  listings) was taken out again at the player's wish, with everything that asked the trade site; the hotkey only loads
  the item. What it left behind on purpose: the search builders in `app/pricecheck.js` for every kind of item, the
  reader of listed items and their tests (`app/tests/pricecheck.test.js`, `app/data/trade_items_0.5.5.json`,
  `scripts/trade_items.py`), which the page does not use; and three corrections the page's own trade search uses: a
  defence at 20% quality is the shown value x 1.2 (the trade site's own numbers), a stat written on two lines of the
  item text is one line of the search, and "Grants Skill: Level # ..." is a line of the search.
- Tested by the author: the page is served, an item text pushed to `POST /push` is loaded, counted as a step result and
  the route goes on; the window opens and stays on top; after the price check was taken out, the page loads and shows
  its item, and the program answers with the new hotkey. The player confirmed the hotkey in game earlier (as Alt+E).
  The steps panel (7 Oct 2026), with a test copy of the program on its own port: nothing is sent before a route is
  clicked; the click sends the route (the same next step, uses and chance as the page shows); a step result pushed to
  `POST /push` changes the step within 0.1 s and the simulated route follows; Hide, another route and another item
  do what they should; the panel as a real window is where the settings put it, 507 pixels wide on a 1440 pixels high
  screen, without a frame, click-through, never the window in front (the window in front stayed the same), and "Move"
  switches the click-through off and on. Its look was checked from a picture the program draws itself
  (`PoE2CraftAssistant.exe --render-steps steps.json out.png`), not from the screen.
  Not tested: the panel over the game itself (shown and hidden with the game in front, dragging it), the hotkey as
  Alt+D in game, and the clipboard watcher with another tool.
