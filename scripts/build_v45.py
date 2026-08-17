from pathlib import Path
import subprocess, sys

subprocess.run([sys.executable, 'scripts/build_v44.py'], check=True)
p = Path('site/index.html')
s = p.read_text(encoding='utf-8')
s = s.replace('./v44.css', './v45.css', 1)

# Player-facing guide copy: remove implementation / deck-language from the Build page.
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

# Make Strugglescream a first-class front-guide destination.
nav_old = '<a href="#items">Items</a><a href="#runeseeker">Runeseeker</a>'
nav_new = '<a href="#items">Items</a><a href="#anoints">Strugglescream</a><a href="#runeseeker">Runeseeker</a>'
if nav_old not in s:
    raise SystemExit('front nav marker missing')
s = s.replace(nav_old, nav_new, 1)

anoints = '''
      <section id="anoints" class="section">
        <div class="kicker">STRUGGLESCREAM · 4 INSTILS</div><h2>Start with the highest damage package</h2>
        <p class="sectionIntro">Strugglescream can carry four instilled notables. The ranking below recalculates from the same Mana Flare inputs on the right, so the order can change as crit, CDB, Mana and additive spell damage change.</p>
        <div class="frontAnointHero">
          <article class="bestPack"><span>RECOMMENDED 4-SLOT PACKAGE</span><b id="frontAnointCombo">—</b><p id="frontAnointNames">Dynamism · Controlling Magic · Shredding Force · Desensitisation</p></article>
          <article><span>CURRENT RULE</span><b>Do not duplicate tree notables</b><p>If poe.ninja already shows one of these allocated, skip it on Strugglescream and use the next-highest unallocated option. Instilling an allocated notable does not grant the effect twice.</p></article>
        </div>
        <div id="frontAnointTable" class="tableWrap anointTable"></div>
        <p class="guideRule">Liquid tiers matter. The recipes shown here use the current PoE2DB instil recipes, including Diluted / normal / Concentrated prefixes rather than only the emotion name.</p>
      </section>
'''
marker = '      <section id="runeseeker" class="section">'
if marker not in s:
    raise SystemExit('runeseeker marker missing')
s = s.replace(marker, anoints + '\n' + marker, 1)

# Add the ChatGPT-assisted refresh action to the canonical poe.ninja panel.
refresh_old = '<button onclick="v44ReloadSnapshot()">Reload deployed snapshot</button><a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank" rel="noopener">Open exact poe.ninja profile ↗</a>'
refresh_new = '<button onclick="v44ReloadSnapshot()">Reload deployed snapshot</button><button class="chatRefresh" onclick="v45ChatRefresh()">Refresh with ChatGPT ↗</button><a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank" rel="noopener">Open exact poe.ninja profile ↗</a><span id="chatRefreshStatus" class="refreshStatus"></span>'
if refresh_old not in s:
    raise SystemExit('poe.ninja action marker missing')
s = s.replace(refresh_old, refresh_new, 1)

# Load v45 after the existing compact-calculator / research scripts.
needle = '<script src="./v44-instils.js"></script>'
if needle not in s:
    raise SystemExit('v44 script marker missing')
s = s.replace(needle, needle + '\n<script src="./v45.js"></script>', 1)

p.write_text(s, encoding='utf-8')
print('built v45', len(s))
