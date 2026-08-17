from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    s = p.read_text(encoding="utf-8")
    if old not in s:
        raise SystemExit(f"Expected transform target not found in {path}: {old[:120]!r}")
    p.write_text(s.replace(old, new, 1), encoding="utf-8")


# -----------------------------------------------------------------------------
# INSTIL RESEARCH
# -----------------------------------------------------------------------------
# If a notable is already on the imported/selected tree, Research should still
# answer "how much did this node itself give me?".  For those rows we estimate
# the current state WITH the node against a modelled state with that node removed
# once.  The equipped planner still dedupes tree + instil, so this is comparison
# maths only and never grants the notable twice.
replace_once(
    "site/v38-skills-research.js",
    "{n:'Arcane Intensity',kind:'manaInc',v:.0003,note:'3% Spell Damage per 100 max Mana. Duplicate = zero if already allocated.'}",
    "{n:'Arcane Intensity',kind:'manaInc',v:.0003,note:'3% Spell Damage per 100 max Mana. If already allocated, Research estimates the raw contribution it is already giving; actual duplicate instilling does not stack.'}"
)
replace_once(
    "site/v38-skills-research.js",
    "{n:'Invocated Efficiency',kind:'triggerInc',v:.40,note:'40% increased Triggered Spell Damage. Duplicate = zero if already allocated.'}",
    "{n:'Invocated Efficiency',kind:'triggerInc',v:.40,note:'40% increased Triggered Spell Damage. If already allocated, Research estimates the raw contribution it is already giving; actual duplicate instilling does not stack.'}"
)
replace_once(
    "site/v38-skills-research.js",
    "function v38AnointResult(a){const base=v38Model();if(v38Duplicate(a.n))return{a,base,post:base,dup:true,hitGain:0,dpsGain:0};const post=v38Model(a);return{a,base,post,dup:false,hitGain:(post.hit/base.hit-1)*100,dpsGain:(post.dps/base.dps-1)*100}}",
    "function v38AnointResult(a){const dup=v38Duplicate(a.n);if(dup){const without={...a,v:-a.v},base=v38Model(without),post=v38Model();return{a,base,post,dup:true,raw:true,hitGain:(post.hit/base.hit-1)*100,dpsGain:(post.dps/base.dps-1)*100}}const base=v38Model(),post=v38Model(a);return{a,base,post,dup:false,raw:false,hitGain:(post.hit/base.hit-1)*100,dpsGain:(post.dps/base.dps-1)*100}}"
)
replace_once(
    "site/v38-skills-research.js",
    "r.dup?' <span class=\"v38Badge\">already allocated</span>':''",
    "r.dup?' <span class=\"v38Badge\">already allocated · raw contribution</span>':''"
)
replace_once(
    "site/v38-skills-research.js",
    "const best=arr.find(x=>!x.dup),box=document.getElementById('v38AnointSummary');if(box&&best)box.innerHTML=`<strong>Current model winner:</strong> ${best.a.n} · ${best.dpsGain.toFixed(2)}% modelled Flare DPS gain from the current state. CDR instils can rank near zero while recovery/trigger saturation is the bottleneck; that is intentional.`",
    "const best=arr[0],box=document.getElementById('v38AnointSummary');if(box&&best)box.innerHTML=`<strong>Current model winner:</strong> ${best.a.n} · ${best.dpsGain.toFixed(2)}% estimated contribution. ${best.dup?'This node is already allocated, so the number is its modelled WITH-node vs WITHOUT-node contribution; actual instilling cannot stack it twice.':'This is the modelled gain from adding the instil.'} CDR can rank near zero while recovery/trigger saturation is the bottleneck; that is intentional.`"
)
replace_once(
    "site/v38-skills-research.js",
    "If a notable is already allocated on the tree, the table gives it zero rather than double-counting it.",
    "If a notable is already allocated on the tree, the table estimates the raw contribution it is already giving by comparing the model WITH that node against a model with it removed once. The actual equipped planner still dedupes tree + instil, so the same notable cannot stack twice."
)
replace_once(
    "site/v39-front-guide.js",
    "Forecast uses the same simplified planner buckets for these modelled notables. Tree duplicates still do not stack; if you choose a notable already allocated, the planner's dedupe rule should make it a zero-value instil.",
    "Forecast uses the same simplified planner buckets for these modelled notables. An already-allocated node may still be shown at its estimated standalone contribution so you can compare candidates. The actual equipped planner continues to dedupe tree + instil, so duplicate allocation never grants the node twice."
)


# -----------------------------------------------------------------------------
# LEGACY FRONT/BACK NAVIGATION CLEANUP
# -----------------------------------------------------------------------------
# v34 predates the current Mana Geyser navigation.  It created a beige pseudo
# "Return to simplified build guide" strip AND made the top 55 px of the backend
# an invisible click target.  A newer, visible "Return to Mana Geyser Shaman"
# control already exists, so remove the obsolete presentation and click zone.
replace_once(
    "site/v34-front.js",
    "#mfBackend:before{content:'← Return to simplified build guide';display:block;position:sticky;top:0;z-index:999;background:#d1b27d;color:#1b1009;padding:10px 14px;font:bold 11px Inter,system-ui;cursor:pointer}",
    "#mfBackend:before{display:none!important;content:none!important}"
)
replace_once(
    "site/v34-front.js",
    "document.head.appendChild(s);document.addEventListener('click',e=>{if(e.target.closest('#mfBackend')&&e.clientY<55&&getComputedStyle(qs('#mfBackend')).display!=='none')window.mfReturnToFront()})",
    "document.head.appendChild(s)"
)

# v41 used to be a runtime overlay that only replaced v40 reward cards. v40 now
# owns the exact Act / area / action data directly, so there is no v41 transform.
