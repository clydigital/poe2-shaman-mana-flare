"""Value-aware topology wrapper for the Mana Geyser guide.

The base topology builder already measures exact distance from the current poe.ninja
PoB allocation over GGG's official graph. This wrapper fixes the remaining subtle
problem: plain BFS can choose an arbitrary route when two routes use the same number
of new passive points. We still minimise NEW POINTS first, but ties are broken by
lead-in value for this EB Mana-Flare build.
"""

import heapq
import json
from pathlib import Path

import build_topology as base

OUT = Path("site/data/topology.json")

ADVANCED_DAMAGE_CANDIDATES = [
    "Temporal Mastery",
    "Cremation",
    "Electric Amplification",
    "Pure Chaos",
    "Wild Storm",
    "Molten Being",
    "Bond of the Owl",
    "Marked for Sickness",
    "Melting Flames",
    "Harmonic Generator",
    "Breaking Point",
    "Power Conduction",
    "Pure Power",
    "Lightning Rod",
    "Stormwalker",
    "Flamewalker",
    "Glaciation",
    "Exposed to the Storm",
]
for candidate in ADVANCED_DAMAGE_CANDIDATES:
    if candidate not in base.CANDIDATES:
        base.CANDIDATES.append(candidate)


def utility(node_id, nodes, target_ids):
    """0..1 build value for an unallocated travel node; target itself is neutral."""
    if node_id in target_ids:
        return 0.0
    node = nodes.get(node_id) or {}
    name = str(node.get("name") or "").casefold()
    stats_raw = node.get("stats") or []
    if isinstance(stats_raw, str):
        stats_raw = [stats_raw]
    stats = " ".join(str(x) for x in stats_raw).casefold()

    if "jewel" in name and "socket" in name:
        return 1.00
    if "mana regeneration" in stats:
        return 1.00
    if "triggered" in stats and "spell" in stats and "damage" in stats:
        return 1.00
    if "gain" in stats and "extra" in stats and "damage" in stats:
        return 1.00
    if "penetrates" in stats and "resistance" in stats:
        return 0.95
    if "critical hit chance" in stats and "spell" in stats:
        return 0.85
    if "critical spell damage" in stats or "critical damage bonus" in stats:
        return 0.75
    if "shock" in stats and "magnitude" in stats:
        return 0.80

    # EB-specific defence tie-break. Maximum ES remains useful because EB converts it
    # to Mana. ES recharge speed does not refill the converted pool, while Armour
    # applying to Elemental Damage is real mitigation for MoM/current-Mana stability.
    has_armour = "armour" in stats
    has_max_es = "maximum" in stats and "energy shield" in stats
    armour_to_elemental = "armour" in stats and "elemental damage" in stats
    recharge = "energy shield recharge" in stats
    if has_armour and has_max_es and armour_to_elemental:
        return 0.95
    if has_armour and has_max_es:
        return 0.75
    if has_armour and recharge:
        return 0.30

    if name == "attribute" or "+5 to any" in stats:
        return 0.35
    if "physical damage" in stats:
        return 0.00
    return 0.20


def shortest_route_value_aware(allocated, target_ids, nodes, adj):
    """Minimum-new-point route; among equal distances choose highest-value lead-ins."""
    targets = set(target_ids)
    already = targets & allocated
    if already:
        return [sorted(already)[0]]

    sources = sorted(allocated & set(nodes))
    if not sources:
        raise RuntimeError("No PoB allocated node ids matched the official GGG tree export")

    # Cost is lexicographic: fewer NEW points always wins; for equal point count,
    # higher cumulative travel utility wins. Every allocated node is a zero-cost
    # source, so walking around the existing tree is never miscounted as new travel.
    heap = []
    best = {}
    previous = {}
    for source in sources:
        best[source] = (0, 0.0)
        previous[source] = None
        heapq.heappush(heap, (0, 0.0, source))

    target = None
    while heap:
        points, neg_value, current = heapq.heappop(heap)
        if best.get(current) != (points, neg_value):
            continue
        if current in targets:
            target = current
            break
        for neighbour in sorted(adj.get(current, ())):
            is_new = neighbour not in allocated
            next_points = points + (1 if is_new else 0)
            add_value = utility(neighbour, nodes, targets) if is_new else 0.0
            next_neg_value = neg_value - add_value
            candidate = (next_points, next_neg_value)
            if neighbour not in best or candidate < best[neighbour]:
                best[neighbour] = candidate
                previous[neighbour] = current
                heapq.heappush(heap, (next_points, next_neg_value, neighbour))

    if target is None:
        return None

    path = []
    cursor = target
    while cursor is not None:
        path.append(cursor)
        cursor = previous[cursor]
    path.reverse()
    return path


# Replace the one ambiguous piece of the base builder; all PoB decoding, node-ID
# reconciliation, graph authority and candidate payloads remain unchanged.
base.shortest_route = shortest_route_value_aware
base.main()

# Record the exact selection rule in the deployed artifact so the page/research can
# distinguish "shortest" from "arbitrary shortest".
if OUT.exists():
    data = json.loads(OUT.read_text(encoding="utf-8"))
    data["routeSelectionRule"] = (
        "Minimise new passive points from the current allocated PoB tree; among equal-point routes, "
        "maximise EB Mana-Flare lead-in utility. Mana regen, gain-as-extra, penetration, Triggered Spell Damage "
        "and Jewel sockets rank highest; useful spell crit/CDB and Shock magnitude follow; maximum ES and "
        "Armour-to-Elemental are preferred over Energy Shield recharge; attributes are minor and Physical Damage "
        "is dead travel for this spell build."
    )
    data["routeSelectionVersion"] = 3
    data["advancedDamageCandidates"] = ADVANCED_DAMAGE_CANDIDATES
    OUT.write_text(json.dumps(data, indent=2), encoding="utf-8")
