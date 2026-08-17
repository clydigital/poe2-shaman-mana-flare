from pathlib import Path
import subprocess, sys

subprocess.run([sys.executable, 'scripts/build_v44.py'], check=True)
subprocess.run([sys.executable, 'scripts/build_v44_remnants.py'], check=True)
p = Path('site/index.html')
s = p.read_text(encoding='utf-8')
s = s.replace('./v44.css', './v45.css', 1)

replacements = {
    '<div class="kicker">BUILD / CURRENT DIRECTION</div><h2>Keep the old Mana Geyser idea. Strip the bloat.</h2>': '<div class="kicker">BUILD CORE</div><h2>How Mana Geyser Shaman works</h2>',
    '<p class="sectionIntro">These tables are intentionally outside any planner. They are the shopping list for passive points.</p>': '<p class="sectionIntro">Take Mana and recovery first, then build enough critical consistency to trigger Mana Flare on cooldown. Add aggressive cooldown recovery only after the Mana pool can refill between procs.</p>',
    '<div class="kicker">KEY ITEMS</div><h2>Variants worth keeping on the front page</h2>': '<div class="kicker">KEY ITEMS</div><h2>Gear and upgrade variants</h2>',
    '<div class="kicker">TRICKS / DISCOVERIES</div><h2>Neat things that actually change decisions</h2>': '<div class="kicker">USEFUL INTERACTIONS</div><h2>Interactions worth building around</h2>',
}
for old, new in replacements.items():
    if old not in s:
        raise SystemExit(f'missing guide-copy marker: {old[:60]}')
    s = s.replace(old, new, 1)

nav_old = '<a href="#items">Items</a><a href="#runeseeker">Runeseeker</a>'
nav_new = '<a href="#items">Items</a><a href="#anoints">Strugglescream</a><a href="#runeseeker">Runeseeker</a>'
if nav_old not in s:
    raise SystemExit('front nav marker missing')
s = s.replace(nav_old, nav_new, 1)

anoints = '''
      <section id="anoints" class="section">
        <div class="kicker">STRUGGLESCREAM · 4 INSTILS</div><h2>Start with the highest damage package</h2>
        <p class="sectionIntro">Strugglescream can carry four instilled notables. The ranking recalculates from the Mana Flare inputs on the right, so the best four can change as crit, CDB and Mana improve.</p>
        <div class="frontAnointHero">
          <article class="bestPack"><span>RECOMMENDED 4-SLOT PACKAGE</span><b id="frontAnointCombo">—</b><p id="frontAnointNames">Dynamism · Controlling Magic · Shredding Force · Desensitisation</p></article>
          <article><span>RULE</span><b>Do not duplicate tree notables</b><p>If poe.ninja already shows one allocated, skip it on Strugglescream and use the next-highest unallocated option. An instilled notable does not stack with the same notable on the tree.</p></article>
        </div>
        <div id="frontAnointTable" class="tableWrap anointTable"></div>
        <p class="guideRule">Use the exact Liquid Emotion tiers shown. Diluted, normal and Concentrated versions are not interchangeable for these recipes.</p>
      </section>
'''
marker = '      <section id="runeseeker" class="section">'
if marker not in s:
    raise SystemExit('runeseeker marker missing')
s = s.replace(marker, anoints + '\n' + marker, 1)

refresh_old = '<button onclick="v44ReloadSnapshot()">Reload deployed snapshot</button><a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank" rel="noopener">Open exact poe.ninja profile ↗</a>'
refresh_new = '<button onclick="v44ReloadSnapshot()">Reload deployed snapshot</button><button class="chatRefresh" onclick="v45ChatRefresh()">Refresh with ChatGPT ↗</button><a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank" rel="noopener">Open exact poe.ninja profile ↗</a><span id="chatRefreshStatus" class="refreshStatus"></span>'
if refresh_old not in s:
    raise SystemExit('poe.ninja action marker missing')
s = s.replace(refresh_old, refresh_new, 1)

needle = '<script src="./v44-instils.js"></script>'
if needle not in s:
    raise SystemExit('v44 script marker missing')
s = s.replace(needle, needle + '\n<script src="./v45.js"></script>', 1)

p.write_text(s, encoding='utf-8')
print('built v45', len(s))
