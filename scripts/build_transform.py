from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    s = p.read_text(encoding="utf-8")
    if old not in s:
        raise SystemExit(f"Expected transform target not found in {path}: {old[:120]!r}")
    p.write_text(s.replace(old, new, 1), encoding="utf-8")


# Instil research: already-allocated nodes should still show their raw standalone
# estimated contribution. The actual planner continues to dedupe tree + instil.
replace_once(
    "site/v38-skills-research.js",
    "{n:'Arcane Intensity',kind:'manaInc',v:.0003,note:'3% Spell Damage per 100 max Mana. Duplicate = zero if already allocated.'}",
    "{n:'Arcane Intensity',kind:'manaInc',v:.0003,note:'3% Spell Damage per 100 max Mana. If already allocated, Research still shows its raw standalone estimated contribution; actual duplicate instilling does not stack.'}"
)
replace_once(
    "site/v38-skills-research.js",
    "{n:'Invocated Efficiency',kind:'triggerInc',v:.40,note:'40% increased Triggered Spell Damage. Duplicate = zero if already allocated.'}",
    "{n:'Invocated Efficiency',kind:'triggerInc',v:.40,note:'40% increased Triggered Spell Damage. If already allocated, Research still shows its raw standalone estimated contribution; actual duplicate instilling does not stack.'}"
)
replace_once(
    "site/v38-skills-research.js",
    "function v38AnointResult(a){const base=v38Model();if(v38Duplicate(a.n))return{a,base,post:base,dup:true,hitGain:0,dpsGain:0};const post=v38Model(a);return{a,base,post,dup:false,hitGain:(post.hit/base.hit-1)*100,dpsGain:(post.dps/base.dps-1)*100}}",
    "function v38AnointResult(a){const base=v38Model(),dup=v38Duplicate(a.n),post=v38Model(a);return{a,base,post,dup,hitGain:(post.hit/base.hit-1)*100,dpsGain:(post.dps/base.dps-1)*100}}"
)
replace_once(
    "site/v38-skills-research.js",
    "If a notable is already allocated on the tree, the table gives it zero rather than double-counting it.",
    "If a notable is already allocated on the tree, the table still shows its raw standalone estimated contribution so you can compare node strength. The actual equipped planner still dedupes tree + instil, so the same notable cannot stack twice."
)
replace_once(
    "site/v39-front-guide.js",
    "Forecast uses the same simplified planner buckets for these modelled notables. Tree duplicates still do not stack; if you choose a notable already allocated, the planner's dedupe rule should make it a zero-value instil.",
    "Forecast uses the same simplified planner buckets for these modelled notables. For comparison, an already-allocated node is still shown at its raw estimated standalone value. The actual equipped planner continues to dedupe tree + instil, so duplicate allocation never grants the node twice."
)

# v41 was an overlay that only replaced v40 reward cards. v40 now owns the exact
# Act/area/action data, so no runtime overlay is needed.
