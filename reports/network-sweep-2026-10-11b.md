# Craft network: the eighth deep run (11 Oct 2026, midday)

Run [38106479469](https://github.com/katxjhuun/poe2-craft-assistant/actions/runs/38106479469), commit a0722c7 (the
reported cost is the rule set's own; cross-blocks kept per target; another Rune of Aldur; 230,000 states): deep, 16
runners with four processes each, 325 minutes, the drawn scenarios.

## What came back

63 of the 64 processes wrote a report; one did not end before its job's limit (the run shows as cancelled for that).
None ran out of memory with the higher state limit.

| | seventh run (b16f324) | this run (a0722c7) |
|---|---|---|
| Scenarios | 795 | 816 |
| Checked against the simulator | 752 | 769 |
| Agree | 721 (95.9%) | 726 (94.4%) |
| Do not agree | 31 | 43 |
| of those: cost off by more than 15% | 20 | 4 |
| Outside the network | 43 | 47: impossible 8, already done 11, not solved within ten minutes 28 |
| Old routes clearly cheaper | 0 of 88 | 0 of 89 |
| Crafts played | 43.7 million | 46.1 million |

The scenarios that were far off in the seventh run are in line: the items that are never given up (16 scenarios then,
x1.13 to x10.7) now play at x0.95 to x1.04 of their reported cost, the wand whose crafts never ended and the
Permafrost Staff are not in the list any more.

## What does not agree, and why

- **38 of the 43 are "only item" scenarios whose cost agrees** (x0.95 to x1.04) **but where some crafts did not end**
  within sixty times the expected number of uses (0.1 to 3% of the crafts; Desert Buckler: 871 of 100,000, with 15
  million detours). These requests run in a network that follows no blocker (four targets with Omen of Whittling:
  the network with level classes). On an item with a modifier that keeps a target out, the play, which has one
  network for the whole scenario, takes the node's next cheapest step again and again; it no longer gives such an
  item up (there is no other). The page solves again from the item after every step and knows that modifier. So
  this is a finding about the play more than about the route, but it is not shown yet that the page's routes end:
  open.
- **Lament Amulet with five targets x1.18** (no detour). Replayed here: 76,018 promised, 87,581 +- 4,245 played, all
  of it in the node transitions. Two causes. A resistance that is one target's twin (what a Flux turns into it) is
  nearly always another resistance target's twin as well, and the route knew only the Flux of the target the twin
  was counted for: after the other resistance was lost, the item's node and the model's own next state were two
  nodes of different worth. And Omen of Whittling took a Desecrated modifier nobody asked for (level 65) three times
  in ten where the edge said it takes the plain one of level 56 to 74. Fixed: at a twin the player picks the Flux
  (an edge for every resistance target the twin can become), and the levels of a Desecrated or crafted modifier
  nobody asked for count for the omen. The amulet: **48,406 promised (it was 76,018: the route is a third cheaper),
  45,423 +- 1,410 played.**
- **Tenebrous Amulet with six targets x2.00** (24,157 detours, 1,112 items given up): as in the seventh run. Replayed
  here: the model played by its own chances gives its promise (785,258 against 780,740); the play gives a valuable
  item up at the sixth step that can do nothing on it, 51 times in 60 crafts, where the page would solve again from
  the item. Open, with the first point.
- **Gloam Ring as an only item x2.33**, values not settled (161 crafts did not end). A request of that kind where the
  rule set's own values do not settle; it is flagged. Not reproduced here (the local prices give another network,
  which agrees). Open.
- **Dueling Wand with five targets x0.85**: too careful. Open.
- 152 uses of a bone the rules refuse on a wand ("The Well of Souls would have no modifier to offer in the place of
  the Mark"): the node cannot know what that item's modifiers leave the Well to offer. The answer for the page now
  checks its step against the item and gives the next cheapest one the rules allow, with the reason.
- Three crafts left the network (two after a Rune of Aldur on a maul with six targets, one after a bone on boots).
- **Not solved within ten minutes: 28 scenarios** (23 before). Open.

## The next run

Started after these fixes: see the run list of the repository.
