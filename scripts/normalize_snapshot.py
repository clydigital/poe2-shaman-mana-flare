import json
from pathlib import Path

SNAPSHOT = Path("site/data/character.json")
BASELINE = Path("site/data/verified-baseline.json")


def main():
    data = json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    baseline = json.loads(BASELINE.read_text(encoding="utf-8"))
    preserved = []

    tree = data.get("tree") or {}
    if not tree.get("normalPassivePoints") or "weaponSetPassivePoints" not in tree:
        data["tree"] = baseline["tree"]
        preserved.append("tree allocation breakdown")

    current_explicit = data.get("explicitCurrentNamedNodes") or []
    if len(current_explicit) < len(baseline["explicitCurrentNamedNodes"]):
        data["explicitCurrentNamedNodes"] = baseline["explicitCurrentNamedNodes"]
        preserved.append("named keystones/ascendancy nodes")

    current_matches = data.get("aggregateEffectMatches") or []
    if len(current_matches) < len(baseline["aggregateEffectMatches"]):
        data["aggregateEffectMatches"] = baseline["aggregateEffectMatches"]
        preserved.append("aggregate-effect passive matches")

    current_known = data.get("knownNodes") or []
    if len(current_known) < len(baseline["knownNodes"]):
        data["knownNodes"] = baseline["knownNodes"]
        preserved.append("known node list")

    gear = data.get("gear") or {}
    if gear.get("status") == "unavailable" or not gear.get("verifiedNamedItems"):
        data["gear"] = baseline["gear"]
        preserved.append("partial gear identity")

    if preserved:
        data["preservedFromLastVerifiedPoeNinjaSnapshot"] = preserved
        data["knownNodesStatus"] = (
            "Live poe.ninja stats/crit/recovery were refreshed from the rendered profile; "
            "fields the plain fetch did not expose are explicitly preserved from the last verified rendered poe.ninja snapshot."
        )

    SNAPSHOT.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(json.dumps({"ok": True, "preserved": preserved}, indent=2))


if __name__ == "__main__":
    main()
