import json
import datetime
import html as html_lib
import re
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
    "fetchedAt": "2026-08-18T04:21:00Z",
    "observedAt": "2026-08-18T04:21:00Z",
    "source": "verified poe.ninja rendered snapshot",
    "profileUrl": PROFILE_URL,
    "snapshotAuthority": "poe.ninja",
    "syncStatus": "verified-rendered-snapshot",
    "poeNinjaLastFetchedText": "47 minutes ago",
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
    "tree": {
        "passivePoints": 69,
        "normalPassivePoints": 68,
        "weaponSetPassivePoints": 1,
        "ascendancyPoints": 8,
        "displayedCounters": [68, 1, 8],
    },
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
    "explicitCurrentNamedNodes": [
        "Eldritch Battery", "Mind Over Matter", "Druidic Champion",
        "Furious Wellspring", "Sacred Flow", "Wisdom of the Maji",
    ],
    "aggregateEffectMatches": ["Raw Mana", "Arcane Intensity", "Invocated Efficiency"],
    "knownNodesStatus": "Six keystone/ascendancy names are explicit on the current poe.ninja page. Raw Mana, Arcane Intensity and Invocated Efficiency are retained as aggregate-effect matches because their current effects are exposed even when their names are not.",
    "knownNodes": [
        "Eldritch Battery", "Mind Over Matter", "Raw Mana", "Arcane Intensity",
        "Invocated Efficiency", "Druidic Champion", "Furious Wellspring",
        "Sacred Flow", "Wisdom of the Maji",
    ],
    "gear": {
        "status": "partial",
        "verifiedNamedItems": ["Against the Darkness Time-Lost Diamond"],
        "observedSocketedRuneTypes": {
            "Lightning Rune Tier 2": 3,
            "Fire Rune Tier 2": 2,
            "Enhance Rune Tier 2": 3,
        },
        "materialManaFlareModifiers": "unavailable",
        "note": "The rendered poe.ninja page exposes the base jewel and rune socket types, but not trustworthy names/modifier text for the equipped weapon, armour, rings, amulet or belt. No Mana, crit, CDB, CDR or recovery gear modifiers are guessed.",
    },
    "calculatorDefaults": {
        "carrier": "Frost Darts",
        "carrierHitsPerSecond": 4.0,
        "carrierHitsStatus": "manual preserved estimate; poe.ninja does not expose eligible Mana Flare trigger events per second",
        "otherRecoveryPerSecond": 0,
        "otherRecoveryStatus": "manual; 9% Mana recoup is conditional and is not auto-counted",
        "manaLeechPerSecond": 0,
        "manaLeechStatus": "manual; no qualifying attack-based Mana leech source verified",
        "archmageVerified": False,
        "archmageStatus": "not exposed on the current poe.ninja character page; disabled by default rather than guessed",
    },
}


def get_text(url, accept=None):
    headers = dict(HEADERS)
    if accept:
        headers["Accept"] = accept
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")


def get_json(url):
    return json.loads(get_text(url, "application/json,text/plain,*/*"))


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


def strip_tags(value):
    value = re.sub(r"<script\b.*?</script>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<style\b.*?</style>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html_lib.unescape(value)).strip()


def number_from_text(value):
    match = re.search(r"-?[\d,]+(?:\.\d+)?", value or "")
    if not match:
        return None
    number = float(match.group(0).replace(",", ""))
    return int(number) if number.is_integer() else number


def stat_block(page, label):
    pattern = rf"<dt[^>]*>\s*{re.escape(label)}\s*</dt>\s*<dd[^>]*>(.*?)</dd>"
    match = re.search(pattern, page, flags=re.I | re.S)
    return match.group(1) if match else None


def stat_number(page, label):
    block = stat_block(page, label)
    return number_from_text(strip_tags(block)) if block else None


def extract_rendered_skill(page, skill_name):
    pattern = (
        rf'aria-label="Show {re.escape(skill_name)} details".*?'
        r'([\d.]+)\s*</span>\s*/s\s*·\s*'
        r'<span[^>]*>\s*([\d.]+)%\s*</span>\s*/\s*'
        r'<span[^>]*>\s*([\d.]+)%\s*</span>\s*crit'
    )
    match = re.search(pattern, page, flags=re.I | re.S)
    if not match:
        return None
    return {"chance": float(match.group(2)) / 100, "cdb": float(match.group(3)) / 100}


def infer_crit_model(crit):
    bases = {"frostDarts": 0.13, "entangle": 0.10, "orbOfStorms": 0.10}
    multipliers = []
    for key, base in bases.items():
        chance = (crit.get(key) or {}).get("chance")
        if chance:
            multipliers.append(chance / (base * 1.60))
    shared_multiplier = sum(multipliers) / len(multipliers) if multipliers else 1.0
    generic_inc = max(-0.99, shared_multiplier - 1)
    cdbs = [(crit.get(key) or {}).get("cdb") for key in bases]
    cdbs = [x for x in cdbs if x is not None]
    payload_proxy = round(sum(cdbs) / len(cdbs), 4) if cdbs else None
    return {
        "manaFlareBaseCrit": 0.07,
        "pinpointMoreCritOnCarriers": 0.60,
        "genericSpellCritIncEstimate": generic_inc,
        "flareCritEstimate": 0.07 * (1 + generic_inc),
        "payloadCdbProxy": payload_proxy,
        "payloadCdbStatus": "unavailable on poe.ninja; using the common carrier CDB as a labelled calculator proxy" if payload_proxy is not None else "unavailable",
        "method": "Shared crit multiplier inferred from displayed Frost Darts / Entangle / Orb of Storms crit after dividing out Pinpoint Critical's 60% more Critical Hit Chance; applied to Mana Flare's own 7% base crit.",
    }


def scrape_rendered_profile(previous):
    page = get_text(PROFILE_URL, "text/html,application/xhtml+xml")
    text = strip_tags(page)
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()

    level_match = re.search(r"\bLevel\s+([\d,]+)\s+Shaman\b", text, flags=re.I)
    level = int(level_match.group(1).replace(",", "")) if level_match else None

    attrs_block = stat_block(page, "Attributes") or ""
    attributes = [int(x.replace(",", "")) for x in re.findall(r">\s*([\d,]+)\s*<", attrs_block)]
    attributes = attributes[:3] if len(attributes) >= 3 else []

    res_block = stat_block(page, "Resistances") or ""
    resists = [int(x) for x in re.findall(r"(-?\d+)%", strip_tags(res_block))]
    resists = resists[:4] if len(resists) >= 4 else []

    last_fetch = None
    last_match = re.search(r"Last fetched\s+(\d+\s+\w+\s+ago)", text, flags=re.I)
    if last_match:
        last_fetch = last_match.group(1).strip()

    crit = {}
    for key, skill in (
        ("frostDarts", "Frost Darts"),
        ("entangle", "Entangle"),
        ("orbOfStorms", "Orb of Storms"),
        ("detonateDead", "Detonate Dead"),
    ):
        found = extract_rendered_skill(page, skill)
        if found:
            crit[key] = found

    counter_match = re.search(r"Passive tree.*?(\d+)\s*/\s*(\d+)\s*/\s*(\d+)", text, flags=re.I)
    normal = weapon = asc = None
    if counter_match:
        normal, weapon, asc = map(int, counter_match.groups())

    explicit_names = [
        name for name in (
            "Eldritch Battery", "Mind Over Matter", "Druidic Champion",
            "Furious Wellspring", "Sacred Flow", "Wisdom of the Maji",
        )
        if re.search(rf"\b{re.escape(name)}\b", text, flags=re.I)
    ]

    mana_regen_values = [int(x) for x in re.findall(r"(\d+)% increased Mana Regeneration Rate", text, flags=re.I)]
    spell_crit_values = [int(x) for x in re.findall(r"(\d+)% increased Critical Hit Chance for Spells", text, flags=re.I)]
    cdb_values = [int(x) for x in re.findall(r"(\d+)% increased Critical Spell Damage Bonus", text, flags=re.I)]
    recoup_values = [int(x) for x in re.findall(r"(\d+)% of Damage taken Recouped as Mana", text, flags=re.I)]
    flask_values = [int(x) for x in re.findall(r"(\d+)% increased Life and Mana Recovery from Flasks", text, flags=re.I)]

    tree_stats = dict((previous or VERIFIED_RENDERED).get("treeStats") or {})
    if mana_regen_values:
        tree_stats["manaRegen"] = max(mana_regen_values) / 100
    if spell_crit_values:
        tree_stats["spellCritInc"] = max(spell_crit_values) / 100
    if cdb_values:
        tree_stats["cdbInc"] = max(cdb_values) / 100
    if recoup_values:
        tree_stats["manaRecoup"] = max(recoup_values) / 100
    if flask_values:
        tree_stats["flaskRecoveryInc"] = max(flask_values) / 100
    if "50% increased Mana Regeneration Rate while moving" in text:
        tree_stats["manaRegenMovingBonus"] = 0.50
    if "25% reduced Mana Regeneration Rate while stationary" in text:
        tree_stats["manaRegenStationaryPenalty"] = 0.25

    data = dict(previous or VERIFIED_RENDERED)
    data.update({
        "fetchedAt": now,
        "observedAt": now,
        "source": PROFILE_URL,
        "profileUrl": PROFILE_URL,
        "snapshotAuthority": "poe.ninja",
        "syncStatus": "live-rendered",
        "poeNinjaLastFetchedText": last_fetch or data.get("poeNinjaLastFetchedText"),
        "level": level if level is not None else data.get("level"),
        "intelligence": attributes[2] if len(attributes) >= 3 else data.get("intelligence"),
        "attributesDisplayed": attributes or data.get("attributesDisplayed"),
        "life": stat_number(page, "Life") or data.get("life"),
        "armour": stat_number(page, "Armour") or data.get("armour"),
        "evasion": stat_number(page, "Evasion rating") or stat_number(page, "Evasion") or data.get("evasion"),
        "block": stat_number(page, "Block") or data.get("block"),
        "ward": stat_number(page, "Runic Ward") or data.get("ward"),
        "mana": stat_number(page, "Mana") or data.get("mana"),
        "spirit": stat_number(page, "Spirit") or data.get("spirit"),
        "resists": resists or data.get("resists"),
        "crit": crit or data.get("crit"),
        "treeStats": tree_stats,
    })

    if normal is not None:
        data["tree"] = {
            "passivePoints": normal + weapon,
            "normalPassivePoints": normal,
            "weaponSetPassivePoints": weapon,
            "ascendancyPoints": asc,
            "displayedCounters": [normal, weapon, asc],
        }

    if crit:
        data["critModel"] = infer_crit_model(crit)

    if explicit_names:
        data["explicitCurrentNamedNodes"] = explicit_names
    aggregate = []
    if "8% increased maximum Mana" in text and "10% increased Mana Cost of Skills" in text:
        aggregate.append("Raw Mana")
    if re.search(r"3% increased Spell Damage per 100 maximum Mana", text, flags=re.I):
        aggregate.append("Arcane Intensity")
    if re.search(r"Triggered\s*Spells deal 40% increased Spell Damage", text, flags=re.I):
        aggregate.append("Invocated Efficiency")
    if aggregate:
        data["aggregateEffectMatches"] = aggregate
    data["knownNodes"] = list(dict.fromkeys((explicit_names or []) + aggregate))
    data["knownNodesStatus"] = "Current poe.ninja explicit keystone/ascendancy names plus aggregate-effect matches; no absent node names are invented."

    rune_counts = {}
    for raw_name in re.findall(r"/([^/\"']*RuneTier2)\.png", page, flags=re.I):
        pretty = re.sub(r"(?<!^)([A-Z])", r" \1", raw_name).replace(" Tier2", " Tier 2")
        rune_counts[pretty] = rune_counts.get(pretty, 0) + 1
    jewel = "Against the Darkness Time-Lost Diamond" if "Against the Darkness Time-Lost Diamond" in text else None
    data["gear"] = {
        "status": "partial" if jewel or rune_counts else "unavailable",
        "verifiedNamedItems": [jewel] if jewel else [],
        "observedSocketedRuneTypes": rune_counts,
        "materialManaFlareModifiers": "unavailable",
        "note": "poe.ninja exposes only partial equipment identity in rendered HTML. No Mana, crit, CDB, CDR or recovery modifier is inferred from hidden tooltips.",
    }

    defaults = dict(data.get("calculatorDefaults") or {})
    defaults.update({
        "carrier": "Frost Darts",
        "carrierHitsPerSecond": defaults.get("carrierHitsPerSecond", 4.0),
        "carrierHitsStatus": "manual preserved estimate; poe.ninja does not expose eligible Mana Flare trigger events per second",
        "otherRecoveryPerSecond": 0,
        "otherRecoveryStatus": "manual; Mana recoup is conditional and is not auto-counted",
        "manaLeechPerSecond": 0,
        "manaLeechStatus": "manual; no qualifying attack-based Mana leech source verified",
        "archmageVerified": "Archmage" in text,
        "archmageStatus": "exposed on current poe.ninja page" if "Archmage" in text else "not exposed on the current poe.ninja character page; disabled by default rather than guessed",
    })
    data["calculatorDefaults"] = defaults

    if not data.get("mana") or not data.get("level") or not data.get("crit"):
        raise RuntimeError("Rendered poe.ninja page did not expose enough character data")
    return data


def best_fallback(previous):
    verified = json.loads(json.dumps(VERIFIED_RENDERED))
    if previous and parse_iso(previous.get("fetchedAt")) > parse_iso(verified.get("fetchedAt")):
        return dict(previous), "stale-fallback"
    return verified, "verified-rendered-fallback"


def try_live_api(previous):
    index_state = get_json(INDEX_URL)
    snap = find_snapshot(index_state)
    version = snap.get("version")
    overview = snap.get("snapshotName") or snap.get("snapshot_name") or snap.get("name") or LEAGUE_SLUG
    if not version:
        raise RuntimeError("poe.ninja snapshot is missing version")

    params = urllib.parse.urlencode({"overview": overview, "account": ACCOUNT, "name": CHARACTER})
    char_url = f"https://poe.ninja/poe2/api/builds/{version}/character?{params}"
    raw = get_json(char_url)

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
    values = {
        "level": first_number(raw, "level", "characterLevel"),
        "mana": first_number(raw, "mana", "maximumMana", "maxMana") or first_string_number(raw, "mana", "maximumMana", "maxMana"),
        "intelligence": first_number(raw, "intelligence", "int"),
        "life": first_number(raw, "life", "maximumLife", "maxLife"),
        "armour": first_number(raw, "armour", "armor"),
        "evasion": first_number(raw, "evasion", "evasionRating") or first_string_number(raw, "evasion", "evasionRating"),
        "ward": first_number(raw, "runicWard", "ward"),
        "spirit": first_number(raw, "spirit", "maximumSpirit", "maxSpirit"),
    }
    for key, value in values.items():
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
    if crit:
        data["critModel"] = infer_crit_model(crit)
    data["fetchedFields"] = sorted(set(fetched_fields))
    data["preservedFromLastVerifiedPoeNinjaSnapshot"] = [
        k for k in ("resists", "tree", "treeStats", "knownNodes", "gear", "calculatorDefaults") if k in data
    ]
    if not data.get("mana"):
        raise RuntimeError("Character API returned no usable Mana value")
    return data


def main():
    previous = {}
    if OUT.exists():
        try:
            previous = json.loads(OUT.read_text(encoding="utf-8"))
        except Exception:
            previous = {}

    api_error = None
    try:
        data = try_live_api(previous)
    except Exception as exc:
        api_error = str(exc)
        try:
            data = scrape_rendered_profile(previous)
            data["apiSyncError"] = api_error
        except Exception as rendered_exc:
            fallback, status = best_fallback(previous)
            fallback["profileUrl"] = PROFILE_URL
            fallback["snapshotAuthority"] = "poe.ninja"
            fallback["syncStatus"] = status
            fallback["syncError"] = f"API: {api_error}; rendered HTML: {rendered_exc}"
            fallback["syncAttemptedAt"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
            OUT.write_text(json.dumps(fallback, indent=2), encoding="utf-8")
            print(json.dumps({"ok": False, "profile": PROFILE_URL, "status": status, "error": fallback["syncError"]}, indent=2))
            return

    OUT.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(json.dumps({
        "ok": True,
        "profile": PROFILE_URL,
        "character": CHARACTER,
        "syncStatus": data.get("syncStatus"),
        "mana": data.get("mana"),
        "level": data.get("level"),
    }, indent=2))


if __name__ == "__main__":
    main()
