import json
import datetime
import urllib.parse
import urllib.request
from pathlib import Path

ACCOUNT = "DaSilkRoad-5508"
CHARACTER = "ToaBBMcy"
LEAGUE_SLUG = "runesofaldur"
PROFILE_URL = "https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy"
INDEX_URL = "https://poe.ninja/poe2/api/data/index-state"
OUT = Path("site/data/character.json")
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
    "Accept": "application/json,text/plain,*/*",
    "Referer": PROFILE_URL,
}

VERIFIED_RENDERED = {
    "fetchedAt": "2026-08-18T04:00:44Z",
    "observedAt": "2026-08-18T04:00:44Z",
    "source": "verified poe.ninja rendered snapshot",
    "profileUrl": PROFILE_URL,
    "snapshotAuthority": "poe.ninja",
    "syncStatus": "verified-rendered-snapshot",
    "poeNinjaLastFetchedText": "22 minutes ago",
    "level": 53,
    "attributesDisplayed": [175, 130, 299],
    "intelligence": 299,
    "life": 1331,
    "energyShieldDisplay": "-",
    "armour": 2487,
    "evasion": 8,
    "block": 25,
    "ward": 119,
    "mana": 2669,
    "spirit": 140,
    "resists": [37, 38, 73, 0],
    "crit": {
        "frostDarts": {"chance": 0.46, "cdb": 1.91},
        "entangle": {"chance": 0.35, "cdb": 1.91},
        "orbOfStorms": {"chance": 0.35, "cdb": 1.91},
        "detonateDead": {"chance": 0.18, "cdb": 2.30},
    },
    "critModel": {
        "manaFlareBaseCrit": 0.07,
        "pinpointMoreCritOnCarriers": 0.60,
        "genericSpellCritIncEstimate": 1.1955128205,
        "flareCritEstimate": 0.1536858974,
        "payloadCdbProxy": 1.91,
        "payloadCdbStatus": "unavailable on poe.ninja; using the common 191% carrier CDB as a labelled calculator proxy",
        "method": "Average shared crit multiplier inferred from Frost Darts 46% at 13% base and Entangle/Orb of Storms 35% at 10% base after dividing out Pinpoint Critical's 60% more Critical Hit Chance.",
    },
    "tree": {"passivePoints": 69, "ascendancyPoints": 8, "displayedCounters": [69, 0, 0, 8]},
    "treeStats": {
        "manaPct": 0.08,
        "flatMana": 30,
        "manaRegen": 1.09,
        "manaRegenMovingBonus": 0.50,
        "manaRegenStationaryPenalty": 0.25,
        "spellCritInc": 0.46,
        "cdbInc": 0.30,
        "manaRecoup": 0.09,
        "flaskRecoveryInc": 0.12,
    },
    "explicitCurrentNamedNodes": ["Eldritch Battery", "Mind Over Matter"],
    "knownNodesStatus": "Eldritch Battery and Mind Over Matter are explicitly named in the current poe.ninja passive view; the remaining named nodes are preserved from the last verified named-node snapshot because the current view exposes their aggregate effects without their names.",
    "knownNodes": [
        "Eldritch Battery", "Mind Over Matter", "Raw Mana", "Arcane Intensity",
        "Invocated Efficiency", "Druidic Champion", "Furious Wellspring",
        "Sacred Flow", "Wisdom of the Maji",
    ],
    "gear": {
        "status": "unavailable",
        "note": "The current poe.ninja rendered snapshot did not expose trustworthy equipped item names/modifier text. No gear changes were guessed.",
    },
    "calculatorDefaults": {
        "carrier": "Frost Darts",
        "carrierHitsPerSecond": 4.0,
        "carrierHitsStatus": "manual preserved estimate; poe.ninja does not expose eligible Mana Flare trigger events per second",
        "otherRecoveryPerSecond": 0,
        "otherRecoveryStatus": "manual; 9% Mana recoup is conditional and is not auto-counted",
        "manaLeechPerSecond": 0,
        "manaLeechStatus": "manual; no qualifying attack-based Mana leech source verified",
    },
}


def get_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def walk(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk(child)


def first_number(root, *keys):
    wanted = {k.lower() for k in keys}
    for obj in walk(root):
        for key, value in obj.items():
            if str(key).lower() in wanted and isinstance(value, (int, float)):
                return value
    return None


def first_string_number(root, *keys):
    wanted = {k.lower() for k in keys}
    for obj in walk(root):
        for key, value in obj.items():
            if str(key).lower() in wanted:
                try:
                    return float(str(value).replace(",", ""))
                except Exception:
                    pass
    return None


def find_snapshot(index_state):
    versions = index_state.get("snapshotVersions") or index_state.get("snapshot_versions") or []
    for entry in versions:
        if str(entry.get("url", "")).lower() == LEAGUE_SLUG:
            return entry
    for entry in versions:
        text = " ".join(str(entry.get(k, "")) for k in ("url", "snapshotName", "name"))
        if "runes" in text.lower() and "aldur" in text.lower():
            return entry
    raise RuntimeError("Could not locate Runes of Aldur snapshot in poe.ninja index-state")


def extract_skill(character_json, skill_name):
    target = skill_name.lower()
    for obj in walk(character_json):
        text = " ".join(str(obj.get(k, "")) for k in ("name", "skill", "skillName", "displayName"))
        if target not in text.lower():
            continue
        chance = None
        cdb = None
        for key in ("critChance", "criticalStrikeChance", "crit", "criticalChance"):
            if key in obj:
                try:
                    chance = float(obj[key])
                    if chance > 1:
                        chance /= 100
                except Exception:
                    pass
        for key in ("criticalDamageBonus", "critDamageBonus", "cdb"):
            if key in obj:
                try:
                    cdb = float(obj[key])
                    if cdb > 10:
                        cdb /= 100
                except Exception:
                    pass
        if chance is not None or cdb is not None:
            return {"chance": chance, "cdb": cdb}
    return None


def parse_iso(text):
    try:
        return datetime.datetime.fromisoformat(str(text).replace("Z", "+00:00"))
    except Exception:
        return datetime.datetime.min.replace(tzinfo=datetime.timezone.utc)


def best_fallback(previous):
    verified = json.loads(json.dumps(VERIFIED_RENDERED))
    if previous and parse_iso(previous.get("fetchedAt")) > parse_iso(verified.get("fetchedAt")):
        return dict(previous), "stale-fallback"
    return verified, "verified-rendered-fallback"


def main():
    previous = {}
    if OUT.exists():
        try:
            previous = json.loads(OUT.read_text(encoding="utf-8"))
        except Exception:
            previous = {}

    try:
        index_state = get_json(INDEX_URL)
        snap = find_snapshot(index_state)
        version = snap.get("version")
        overview = snap.get("snapshotName") or snap.get("snapshot_name") or snap.get("name") or LEAGUE_SLUG
        if not version:
            raise RuntimeError("poe.ninja snapshot is missing version")

        params = urllib.parse.urlencode({"overview": overview, "account": ACCOUNT, "name": CHARACTER})
        char_url = f"https://poe.ninja/poe2/api/builds/{version}/character?{params}"
        raw = get_json(char_url)

        level = first_number(raw, "level", "characterLevel")
        mana = first_number(raw, "mana", "maximumMana", "maxMana") or first_string_number(raw, "mana", "maximumMana", "maxMana")
        intelligence = first_number(raw, "intelligence", "int")
        life = first_number(raw, "life", "maximumLife", "maxLife")
        armour = first_number(raw, "armour", "armor")
        evasion = first_number(raw, "evasion", "evasionRating") or first_string_number(raw, "evasion", "evasionRating")
        ward = first_number(raw, "runicWard", "ward")
        spirit = first_number(raw, "spirit", "maximumSpirit", "maxSpirit")

        data = dict(previous or VERIFIED_RENDERED)
        data.update({
            "fetchedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "source": char_url,
            "profileUrl": PROFILE_URL,
            "snapshotAuthority": "poe.ninja",
            "poeNinjaVersion": version,
            "poeNinjaOverview": overview,
            "syncStatus": "live-api",
        })
        fetched_fields = []
        for key, value in {
            "level": level, "mana": mana, "intelligence": intelligence, "life": life,
            "armour": armour, "evasion": evasion, "ward": ward, "spirit": spirit,
        }.items():
            if value is not None:
                data[key] = int(value) if float(value).is_integer() else value
                fetched_fields.append(key)

        crit = dict(data.get("crit") or {})
        for out_key, skill in (("frostDarts", "Frost Darts"), ("entangle", "Entangle"), ("orbOfStorms", "Orb of Storms")):
            found = extract_skill(raw, skill)
            if found:
                old = crit.get(out_key) or {}
                crit[out_key] = {k: (found.get(k) if found.get(k) is not None else old.get(k)) for k in ("chance", "cdb")}
                fetched_fields.append(f"crit.{out_key}")
        data["crit"] = crit
        data["fetchedFields"] = sorted(set(fetched_fields))
        data["preservedFromLastVerifiedPoeNinjaSnapshot"] = [
            k for k in ("resists", "tree", "treeStats", "knownNodes", "critModel", "gear", "calculatorDefaults") if k in data
        ]

        if not data.get("mana"):
            raise RuntimeError("Character API returned no usable Mana value and there is no previous poe.ninja snapshot")

        OUT.write_text(json.dumps(data, indent=2), encoding="utf-8")
        print(json.dumps({"ok": True, "profile": PROFILE_URL, "character": CHARACTER, "version": version, "mana": data.get("mana"), "level": data.get("level")}, indent=2))
    except Exception as exc:
        fallback, status = best_fallback(previous)
        fallback["profileUrl"] = PROFILE_URL
        fallback["snapshotAuthority"] = "poe.ninja"
        fallback["syncStatus"] = status
        fallback["syncError"] = str(exc)
        fallback["syncAttemptedAt"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        OUT.write_text(json.dumps(fallback, indent=2), encoding="utf-8")
        print(json.dumps({"ok": False, "profile": PROFILE_URL, "usingVerifiedPoeNinjaFallback": status == "verified-rendered-fallback", "error": str(exc)}, indent=2))


if __name__ == "__main__":
    main()
