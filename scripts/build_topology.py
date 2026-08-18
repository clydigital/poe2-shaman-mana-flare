import base64
import datetime
import html as html_lib
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
import zlib
from collections import deque
from pathlib import Path

ACCOUNT = "DaSilkRoad-5508"
CHARACTER = "ToaBBMcy"
LEAGUE_SLUG = "runesofaldur"
PROFILE_URL = f"https://poe.ninja/poe2/profile/{ACCOUNT}/{LEAGUE_SLUG}/character/{CHARACTER}"
POB_RAW_URL = f"https://poe.ninja/poe2/pob/raw/profile/code/{ACCOUNT}/{LEAGUE_SLUG}/{CHARACTER}"
GRAPH_URL = "https://raw.githubusercontent.com/grindinggear/poe2-skilltree-export/main/data.json"
OUT = Path("site/data/topology.json")
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/json,text/plain,*/*",
    "Referer": PROFILE_URL,
}

CANDIDATES = [
    "Ruinic Helm",
    "Arcane Blossom",
    "Dynamism",
    "Controlling Magic",
    "Invocated Efficiency",
    "Throatseeker",
    "Shredding Force",
    "Desensitisation",
]


def get_text(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=45) as response:
        return response.read().decode("utf-8", errors="replace")


def extract_pob_import(page):
    for match in re.finditer(r"<input\b[^>]*>", page, flags=re.I | re.S):
        tag = match.group(0)
        if not re.search(r"aria-label\s*=\s*(['\"])Import code for Path of Building\1", tag, flags=re.I):
            continue
        value = re.search(r"\bvalue\s*=\s*(['\"])(.*?)\1", tag, flags=re.I | re.S)
        if not value:
            raise RuntimeError("poe.ninja PoB import input exists but has no value")
        code = html_lib.unescape(value.group(2)).strip()
        if len(code) < 100:
            raise RuntimeError("poe.ninja PoB import code is unexpectedly short")
        return code
    raise RuntimeError("Could not find poe.ninja Path of Building import code")


def current_pob_code():
    try:
        code = get_text(POB_RAW_URL).strip()
        if len(code) >= 100:
            return code, POB_RAW_URL
    except Exception:
        pass
    page = get_text(PROFILE_URL)
    return extract_pob_import(page), PROFILE_URL


def decode_pob(code):
    payload = base64.urlsafe_b64decode(code + "=" * (-len(code) % 4))
    xml_bytes = None
    errors = []
    for wbits in (zlib.MAX_WBITS, -zlib.MAX_WBITS):
        try:
            xml_bytes = zlib.decompress(payload, wbits)
            break
        except Exception as exc:
            errors.append(str(exc))
    if xml_bytes is None:
        raise RuntimeError("Could not decompress PoB import: " + " | ".join(errors))
    return ET.fromstring(xml_bytes.decode("utf-8-sig"))


def active_spec_nodes(root):
    tree = root.find(".//Tree")
    if tree is None:
        raise RuntimeError("PoB import has no Tree element")
    specs = list(tree.findall("./Spec")) or list(root.findall(".//Spec"))
    if not specs:
        raise RuntimeError("PoB import has no passive-tree Spec")
    try:
        active_index = max(0, int(tree.attrib.get("activeSpec", "1")) - 1)
    except Exception:
        active_index = 0
    spec = specs[min(active_index, len(specs) - 1)]
    node_text = spec.attrib.get("nodes", "")
    allocated = {str(int(x)) for x in re.findall(r"\d+", node_text)}
    if len(allocated) < 10:
        raise RuntimeError(f"PoB active spec yielded only {len(allocated)} allocated node ids")
    return allocated, {
        "activeSpec": active_index + 1,
        "treeVersion": spec.attrib.get("treeVersion"),
        "classId": spec.attrib.get("classId"),
        "ascendClassId": spec.attrib.get("ascendClassId"),
    }


def graph_nodes(raw):
    source = raw.get("nodes")
    if isinstance(source, dict):
        return {str(k): v for k, v in source.items() if isinstance(v, dict)}
    if isinstance(source, list):
        out = {}
        for node in source:
            if not isinstance(node, dict):
                continue
            node_id = node.get("skill", node.get("id"))
            if node_id is not None:
                out[str(node_id)] = node
        return out
    raise RuntimeError("Official GGG passive-tree export has no usable nodes collection")


def build_adjacency(nodes):
    adj = {node_id: set() for node_id in nodes}
    for node_id, node in nodes.items():
        for field in ("out", "in"):
            neighbours = node.get(field) or []
            if isinstance(neighbours, dict):
                neighbours = neighbours.keys()
            for neighbour in neighbours:
                neighbour = str(neighbour)
                if neighbour in nodes and neighbour != node_id:
                    adj[node_id].add(neighbour)
                    adj[neighbour].add(node_id)
    return adj


def norm(value):
    return re.sub(r"\s+", " ", str(value or "")).strip().casefold()


def node_name(node_id, nodes):
    node = nodes.get(node_id) or {}
    return str(node.get("name") or f"Unnamed node {node_id}")


def node_stats(node_id, nodes):
    stats = (nodes.get(node_id) or {}).get("stats") or []
    if isinstance(stats, str):
        return [stats]
    return [str(x) for x in stats if x]


def shortest_route(allocated, target_ids, nodes, adj):
    targets = set(target_ids)
    if targets & allocated:
        target = sorted(targets & allocated)[0]
        return [target]

    sources = sorted(allocated & set(nodes))
    if not sources:
        raise RuntimeError("No PoB allocated node ids matched the official GGG tree export")

    queue = deque(sources)
    previous = {source: None for source in sources}
    target = None
    while queue:
        current = queue.popleft()
        if current in targets:
            target = current
            break
        for neighbour in adj.get(current, ()):
            if neighbour in previous:
                continue
            previous[neighbour] = current
            queue.append(neighbour)
    if target is None:
        return None

    path = []
    cursor = target
    while cursor is not None:
        path.append(cursor)
        cursor = previous[cursor]
    path.reverse()
    return path


def classification(new_points, allocated):
    if allocated or new_points == 0:
        return "allocated"
    if new_points <= 3:
        return "natural"
    if new_points <= 5:
        return "nearby"
    return "remote"


def route_payload(name, path, allocated, nodes):
    if not path:
        return {
            "name": name,
            "found": True,
            "reachable": False,
            "classification": "unreachable",
        }
    target = path[-1]
    newly_allocated = [node_id for node_id in path if node_id not in allocated]
    lead_ins = newly_allocated[:-1] if newly_allocated and newly_allocated[-1] == target else newly_allocated
    is_allocated = target in allocated
    new_points = len(newly_allocated)
    return {
        "name": name,
        "nodeId": target,
        "found": True,
        "reachable": True,
        "allocated": is_allocated,
        "newPoints": new_points,
        "classification": classification(new_points, is_allocated),
        "boundaryNode": {
            "id": path[0],
            "name": node_name(path[0], nodes),
            "stats": node_stats(path[0], nodes),
        },
        "path": [
            {"id": node_id, "name": node_name(node_id, nodes), "stats": node_stats(node_id, nodes), "alreadyAllocated": node_id in allocated}
            for node_id in path
        ],
        "leadIns": [
            {"id": node_id, "name": node_name(node_id, nodes), "stats": node_stats(node_id, nodes)}
            for node_id in lead_ins
        ],
    }


def main():
    previous = None
    if OUT.exists():
        try:
            previous = json.loads(OUT.read_text(encoding="utf-8"))
        except Exception:
            previous = None

    try:
        code, pob_source = current_pob_code()
        root = decode_pob(code)
        allocated, pob_meta = active_spec_nodes(root)

        raw_graph = json.loads(get_text(GRAPH_URL))
        nodes = graph_nodes(raw_graph)
        adj = build_adjacency(nodes)
        matched_allocated = allocated & set(nodes)
        if len(matched_allocated) < 10:
            raise RuntimeError(
                f"Only {len(matched_allocated)} of {len(allocated)} allocated PoB nodes match the official GGG export"
            )

        by_name = {}
        for node_id, node in nodes.items():
            by_name.setdefault(norm(node.get("name")), []).append(node_id)

        candidates = {}
        for name in CANDIDATES:
            target_ids = by_name.get(norm(name), [])
            if not target_ids:
                candidates[name] = {
                    "name": name,
                    "found": False,
                    "reachable": False,
                    "classification": "not-found",
                }
                continue
            route = shortest_route(matched_allocated, target_ids, nodes, adj)
            candidates[name] = route_payload(name, route, matched_allocated, nodes)

        now = datetime.datetime.now(datetime.timezone.utc).isoformat()
        data = {
            "generatedAt": now,
            "status": "verified",
            "profileUrl": PROFILE_URL,
            "treeSource": pob_source,
            "graphSource": GRAPH_URL,
            "pob": pob_meta,
            "allocatedNodeCount": len(allocated),
            "matchedAllocatedNodeCount": len(matched_allocated),
            "classificationRule": {
                "allocated": "already on tree; never instil",
                "natural": "1-3 new passive points from the current allocated tree; path it instead of spending a Strugglescream slot",
                "nearby": "4-5 new passive points; compare effect value against remote instil candidates",
                "remote": "6+ new passive points; strong topology case for instilling if the effect is valuable",
            },
            "candidates": candidates,
        }
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(json.dumps(data, indent=2), encoding="utf-8")
        print(json.dumps({
            "ok": True,
            "allocated": len(allocated),
            "matched": len(matched_allocated),
            "routes": {name: {"points": value.get("newPoints"), "class": value.get("classification")} for name, value in candidates.items()},
        }, indent=2))
    except Exception as exc:
        if previous and previous.get("candidates"):
            previous["status"] = "stale-fallback"
            previous["syncError"] = str(exc)
            previous["syncAttemptedAt"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
            OUT.write_text(json.dumps(previous, indent=2), encoding="utf-8")
            print(json.dumps({"ok": False, "usingPreviousTopology": True, "error": str(exc)}, indent=2))
            return
        raise


if __name__ == "__main__":
    main()
