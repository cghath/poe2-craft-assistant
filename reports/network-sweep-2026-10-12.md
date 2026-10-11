# Craft network: the ninth deep run (12 Oct 2026)

Run [38145423953](https://github.com/katxjhuun/poe2-craft-assistant/actions/runs/38145423953), commit 70b0ea9 (what
survives Omen of Whittling; three classes of levels where they fit; the play solves again as the page does, with the
full route): deep, 16 runners with four processes each, 325 minutes, the drawn scenarios.

## What came back

61 of the 64 processes wrote a report; three did not end before their job's limit. None ran out of memory.

| | eighth run (a0722c7) | this run (70b0ea9) |
|---|---|---|
| Scenarios | 816 | 795 |
| Checked against the simulator | 769 | 740 |
| Agree | 726 (94.4%) | 703 (95.0%) |
| Do not agree | 43 | 37 |
| of those: cost off by more than 15% | 4 | 6 |
| Outside the network | 47 | 55: impossible 8, already done 14, not solved within ten minutes 33 |
| Old routes clearly cheaper | 0 of 89 | 0 of 86 |
| Crafts played | 46.1 million | 43.5 million |

The eighth run's Tenebrous Amulet with six targets and Lament Amulet with five are in line. 27 of the 37 are again
items that are never given up whose cost agrees (x0.95 to x1.04) and where a few crafts did not end: this run's play
solved again with the full route, which does not come in a minute and a half for such an item; the play of the next
run uses the small network (e54c9ca).

## What does not agree, and why

- **Gloam Amulet, three targets, from a Magic item: x1.41.** A mistake of the commit before the run. The edge that lets
  the player pick the Flux at a twin also offered the Flux of an *earlier* target. A modifier is counted as the twin of
  the first target it can become, so the twin of a later target is none that the earlier one could have had: the
  model promised a T1 Chaos Resistance from a Void Flux one time in three, the play got it never (360 uses).
  Only later targets now. Here: 4,660 promised, 5,211 +- 248 played.
- **Dusk Amulet with five targets: x1.32** (x1.61 here). A loop of Greater Chaos Orbs on an item whose lowest
  modifier came with the pasted item. Under the orb's level floor no modifier of that lowest class rolls, and the
  formula for "the removed one was the only one of its class" took that case for "the class cannot rise" where it
  means "it surely was the only one". Here: 374,387 promised, 395,335 +- 25,486 played; the route itself played at
  517,295 before.
- **Tenebrous Amulet as a bought start: 5,891 of 100,000 crafts left the network** (44% here). The flag "the pasted
  item's own other modifiers are all still there" was dropped whenever any modifier was removed, also one that had
  rolled later (a Desecrated one taken off by a tool essence); the item, whose reader sees its own modifiers in
  place, was then no node. The flag stays unless a modifier of a kind the pasted item has is removed. Here: no
  craft leaves, 284,211 promised, 274,052 +- 15,646 played.
- **Dusk Amulet as a bought start with catalyst quality: x1.16** (x1.19 here): the route's network follows no
  blocker (four targets with Omen of Whittling), and on a bought start the pasted item comes back at every restart.
  510 detours in 300 crafts for a modifier that keeps Evasion Rating out. Open with the general point below.
- **Gloam Ring as an only item x1.79**, values not settled: as before, open.
- **Too careful**: Wrath Sceptre as a bought start x0.80, Dueling Wand with a fractured target x0.81. Open (for the
  wand: a twin's own tags are not applied to the pools, see the report of the eighth run).
- 28 uses of a bone the rules refuse on a wand's Mark; three crafts left the network after a bone on boots.
- **Not solved within ten minutes: 33 scenarios** (28, 23, 7 in the runs before), and three processes cut at the job
  limit. The networks have grown with every fix of the last three days (230,000 states followed, 100,000 with level
  classes). This is the next thing to look at: it is also what a player waits for.

## The next run

Started after these fixes: see the run list of the repository (the tenth run).
