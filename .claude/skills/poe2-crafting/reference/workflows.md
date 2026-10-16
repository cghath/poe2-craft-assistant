# Workflows

Worked out with the player in October 2026 (Forbidden Rites, 0.5.5). Each is a recipe; adapt it.

## 1. Plan a craft (from a pasted item or a white base)

1. `node scripts/cli/prices.js --check`; refresh with `node scripts/cli/prices.js` if older than ~6 h.
2. Read the item: what each line is (tier, prefix/suffix, fractured/desecrated/crafted, rune, implicit, quality). Trade
   copies and screenshots have no tiers: match the numbers with `node scripts/cli/mods.js --base "<base>" --find "<words>"`.
   Lines the base cannot roll come from somewhere else: an essence or alloy (crafted), a desecration, a rune, a
   corruption, the Genesis Tree (see reference/mechanics.md).
3. Agree the targets with the player: which modifiers are must-haves, which tier is good enough. Dropping one tier
   (e.g. +2/+3 instead of only +3 Spell Skills) often halves the cost; show both.
4. Run the route, always with a base limit unless the player really can buy hundreds of bases:
   `node scripts/cli/route.js --base "<base>" --ilvl 82 --want "prefix:to Spirit:1" --want "suffix:Level of all Spell Skills:2" --base-limit 20 --trace`
   Starting from a bought item: `--item <file> --restart item --item-cost <ex>`; a one-of-a-kind item: `--restart never`.
5. Explain the trace as stages (what to do, until when, what a miss means), with the shopping list and the expected
   cost and its spread. Divines = ex / the divine price the script prints. Say the spread plainly (often +/-60-100%).
6. Check the route against reference/tool-gaps.md before presenting it (crafted/alloy limits, sockets, Genesis, the
   one-Desecrated rule when the route uses a bone and the item also needs a later desecration: rerun with --no-bones).
7. Offer to re-solve after each stage from the item the player pastes.

## 2. Choose a desecration

`node scripts/cli/well.js --item <file>` shows, per lich omen, the chance each modifier is offered (and with one
Omen of Abyssal Echoes). Recommend the lich whose list holds the wanted modifier; Abyssal Echoes is usually worth it.
One Desecrated modifier per item; removing it costs an Omen of Light + Orb of Annulment (expensive), so treat a
desecration as one shot and name the best fallback options.

## 3. Profit crafts

1. Find demand: poe.ninja builds (see 5) for the league; which slots popular builds fill with rares and which mods.
2. Price the craft with route.js (and well.js for one-shot desecrations).
3. Price the finished item and the input on trade (see 4). Asking prices are not sales; thin markets (a handful of
   listings) cannot absorb many copies.
4. Report: cost per try, hit chance, expected cost per finished item, sell price, margin, risk. Break-even sell price
   when no sale price is known. Never call something profitable from the asking price alone.
The recipe library's profit crafts: `node scripts/profit_recipes.js` (sell prices are the videos', dated).

## 4. Trade checks (only with the player's go-ahead)

- Use the player's own Chrome (Claude in Chrome extension), a tab of its own, the player signed in. Never sign in,
  never whisper, never buy: the player clicks "Travel to Hideout" themselves.
- A handful of searches per question, ~4 s apart, through the page's own search (fetch from the trade tab to
  `/api/trade2/search/poe2/<League>` then `/api/trade2/fetch/<ids>?query=<id>`); then navigate the tab to
  `/trade2/search/poe2/<League>/<id>` so the player sees the same list. GGG's terms restrict automated access: keep
  it to what a person browsing would do; never loop or scrape.
- Status: `securable` = Instant Buyout ("Travel to Hideout", what the player prefers); `online`; `any` includes
  offline sellers, whose cheap listings are usually stale.
- Stat ids: `mods.js --find` prints them (explicit/fractured/desecrated/crafted/rune/implicit variants). Use a
  `count` group to accept several kinds of the same stat. Item mods in fetch results are objects
  (`description`, `domain`, `mods[].tier`); runes are in `runeMods`, sockets in `sockets`.
- Category filter for rings: `type_filters.filters.category.option = "accessory.ring"`.

## 5. Build and gear research on poe.ninja

- League builds: `https://poe.ninja/poe2/builds/<league>` (e.g. forbiddenrites). Filters in the URL: `class=`,
  `allskills=` (any skill), `spiritgems=`, `items=` (e.g. `Rare Wand`). The sidebar's search box filters the lists;
  its text (Items, Main skills, Spirit skills, Weapon configuration) gives the shares.
- Character gear: open a character page, then in the page read the API resource the page loaded
  (`performance.getEntriesByType('resource')`, the `api/builds/...character` entry) and fetch it in the page; items
  are in `items[].itemData` with `inventoryId`, `runeMods`, `fracturedMods`, `explicitMods`, `desecratedMods`,
  `craftedMods`, `socketedItems`, `sockets`, `corrupted`. Do not print URLs with query strings (blocked); print data.
- Screenshots for the player: hover the item slot, `zoom` the tooltip with save_to_disk, send the files.
- poe.ninja rate-limits bursts (HTTP 429): a few characters at a time.

## 6. Keep the player in charge

Purchases, trades, whispers, posts: the player does them. Ask before downloading anything new (prices.js fetches the
price package the page itself uses). Keep CPU low on the player's PC: run node at idle priority, one process.
