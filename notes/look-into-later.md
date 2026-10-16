# To look into later

## PoE2 MCP servers (found 2026-10-16)

Community tools that let Claude work with Path of Exile 2 data. None of them plans crafts; they are about builds.

- **deepwa7er/poe2-mcp**: loads a Path of Building build (export code or link) and exposes its stats,
  passives, items and skills as tools. Installed from a git clone with uv; Claude Code setup is one
  `claude mcp add` command.
- **MaxWilk/poe2-build-mcp**: game data plus calculations that match Path of Building; 38 tools and a
  test suite. Imports a PoB share code, a pobb.in or pastebin link, or raw PoB XML.
- **HivemindOverlord/poe2-mcp**: build optimizer with item modifier lookups (search modifiers by stat,
  get modifier tiers), gem validation and Path of Building integration; reads characters from
  poe.ninja. On PyPI as `poe2-mcp`. Glama marks its activity as "stale".
  https://glama.ai/mcp/servers/@HivemindOverlord/poe2-mcp

Before installing any of them: check the repository, its last update, and which patch it covers.
