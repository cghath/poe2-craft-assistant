---
name: poe2-crafting
description: Plan and price Path of Exile 2 (0.5.5) item crafts with this repo's craft solver - routes from a base or a pasted item to target modifiers, Well of Souls desecration odds, what a base can roll, profit checks, and trade/poe.ninja research. Use when the player asks how to craft, finish, fix or price a PoE2 item, which desecrated modifier or omen to use, or what to craft for profit.
---

# PoE2 crafting with the craft assistant

The repo's solver (`app/network.js`, the page's "Find craft route") works out the cheapest expected way to reach
target modifiers, using live prices. The scripts in `scripts/cli/` run it from the command line. The game facts
it rests on, and where it is wrong, are in `reference/`.

## Before anything

- Run node at idle priority, one process: the player works on the same PC. In PowerShell:
  `(Get-Process -Id $PID).PriorityClass = 'Idle'; node scripts/cli/route.js ...`
- Prices: `node scripts/cli/prices.js --check`; if older than about 6 hours, `node scripts/cli/prices.js`
  (fetches the price package the page itself uses, from jsDelivr). League default: `forbidden-rites`.
- Items: save what the player pastes (Alt+Ctrl+C in game gives tiers) to a file in the scratchpad and pass `--item`.
  Screenshots and trade copies have no tiers: match values with `mods.js --find`.

## Scripts

| Script | Answers |
|---|---|
| `node scripts/cli/route.js --base "<Base>" --ilvl 82 --want "<side>:<what>[:<tier>]" ... --base-limit 20 --trace` | Cheapest route, expected cost and spread, materials, stages by spend. `--item <file>` to start from an item (`--restart item --item-cost <ex>` or `--restart never`). Options in the file header: `--quality use|raise --cat-mult 5`, `--exclude "<item>"`, `--no-bones`, `--json`. |
| `node scripts/cli/well.js --item <file> [--side prefix\|suffix]` | Well of Souls: chance each modifier is offered, without a lich omen and with each lich, plus one Abyssal Echoes reroll. |
| `node scripts/cli/mods.js --base "<Base>" [--ilvl 82] [--find "<words>"] [--side ...]` | Families and tiers (level, weight), desecrated-only mods with their lich, the class's essences and alloys, trade stat ids. |
| `node scripts/cli/prices.js [--check]` | Refresh or check prices. |
| `node scripts/profit_recipes.js` | The recipe library's profit crafts (sell prices from videos, dated). |

`--want` sides are `prefix`, `suffix`, `des` (a desecrated modifier). `what` is a family name or words from the
modifier text; ambiguous words print the candidates. Tier 2 means T2 or better.

## How to work

1. Follow `reference/workflows.md` for the task: plan a craft, choose a desecration, profit crafts, trade checks,
   poe.ninja research.
2. Check every route against `reference/tool-gaps.md` before presenting it. The big ones: Catalysing Exaltation
   (run `--cat-mult 5`, not the default ×25), alloys with Crystallisation omens, two crafted mods via Astrid's
   Creativity, runes replacing runes, Altered Collarbone, Genesis-only mods.
3. Explain with `reference/mechanics.md` and carry its confidence tags: say when a fact rests on one source or is open.
   The full sourced notes are in `reference/research/`.
4. Give results as steps the player can follow: what to use, until when, what a miss means, the shopping list,
   expected cost in divines and its spread (often ±60-100%). Offer to re-solve from the item after each stage.
5. Dropping one target tier often halves the cost: show both when it does.

## Limits

- Weights are community estimates (nobody can datamine them); odds are estimates, not promises.
- Asking prices are not sales. Never call a craft profitable from asking prices alone.
- The player buys, trades, whispers and signs in. Trade and poe.ninja reads happen only with their go-ahead, at a
  person's pace (see workflows §4-5).
- Ask before downloading anything new. Don't change the tool's code unless the player asks; note new gaps in
  `reference/tool-gaps.md`.
- Facts are for 0.5.5 (Forbidden Rites, Oct 2026). After a patch, check the patch notes against `mechanics.md`.
