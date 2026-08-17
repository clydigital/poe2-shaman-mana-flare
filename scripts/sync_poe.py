import json,re,urllib.request,datetime
PROFILE="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy"
TREE=PROFILE+"/passive-tree"
HEAD={"User-Agent":"Mozilla/5.0 ManaFlareGuide/1.0"}

def get(url):
    req=urllib.request.Request(url,headers=HEAD)
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.read().decode("utf-8","ignore")

def text(html):
    x=re.sub(r"<style[^>]*>.*?</style>"," ",html,flags=re.S|re.I)
    x=re.sub(r"<[^>]+>"," ",x)
    return re.sub(r"\s+"," ",x)

def first(s,*patterns):
    for p in patterns:
        m=re.search(p,s,re.I|re.S)
        if m:return m.group(1)
def n(x):
    try:return float(str(x).replace(",",""))
    except:return None
def skill(t,name):
    m=re.search(re.escape(name)+r".{0,220}?(\d+(?:\.\d+)?)%[\s/|,]+(\d+(?:\.\d+)?)%",t,re.I|re.S)
    return {"chance":float(m.group(1))/100,"cdb":float(m.group(2))/100} if m else None

ph,th=get(PROFILE),get(TREE); pt,tt=text(ph),text(th)
data={
 "fetchedAt":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "source":PROFILE,
 "level":int(n(first(pt,r"\blevel\s+(\d{1,3})\b",r'"level"\s*:\s*(\d+)')) or 0),
 "mana":int(n(first(pt,r"Maximum Mana\s*[:\-]?\s*([0-9,]+)",r'\bMana\s*[:\-]\s*([0-9,]{3,})',r'"mana"\s*:\s*([0-9,]+)')) or 0),
 "intelligence":int(n(first(pt,r"\bIntelligence\s*[:\-]?\s*([0-9,]+)",r'"intelligence"\s*:\s*([0-9,]+)')) or 0),
 "life":int(n(first(pt,r"\bLife\s*[:\-]?\s*([0-9,]+)")) or 0),
 "armour":int(n(first(pt,r"\bArmou?r\s*[:\-]?\s*([0-9,]+)")) or 0),
 "ward":int(n(first(pt,r"Runic Ward\s*[:\-]?\s*([0-9,]+)")) or 0),
 "spirit":int(n(first(pt,r"\bSpirit\s*[:\-]?\s*([0-9,]+)")) or 0),
 "crit":{"frostDarts":skill(pt,"Frost Darts"),"entangle":skill(pt,"Entangle"),"orbOfStorms":skill(pt,"Orb of Storms")},
 "tree":{"passivePoints":int(n(first(tt,r"Passive:\s*(\d+)",r'"total_passive_points"\s*:\s*(\d+)')) or 0),"ascendancyPoints":int(n(first(tt,r"Ascendancy:\s*(\d+)",r'"total_ascendancy_points"\s*:\s*(\d+)')) or 0)}
}
if not data["mana"]: raise SystemExit("Could not parse Mana from poe.ninja")
open("site/data/character.json","w").write(json.dumps(data,indent=2))
print(json.dumps(data,indent=2))
