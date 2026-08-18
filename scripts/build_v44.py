from pathlib import Path
import re

src = Path('site/v43-index.html')
out = Path('site/index.html')
s = src.read_text(encoding='utf-8')
s = s.replace('./v43.css', './v44.css', 1)

# The final product no longer ships a simulator/sidebar. Keep only the static guide + Research shell.
s = re.sub(r'\s*<aside class="calcRail".*?</aside>', '', s, flags=re.S)
s = s.replace(
    'This is the long-form page. No simulator UI — only research tables plus the same compact DPS/recovery calculator on the right.',
    'This is the long-form reference page: mechanics, node and item libraries, detailed comparisons, edge cases and source notes.'
)
s = s.replace(
    '<div class="callout"><strong>Important distinction:</strong> increased Mana Regeneration Rate, Mana Recovery Rate, recoup, Remnants and flask recovery are different levers. The calculator exposes regen plus “other recovery / second” so we do not pretend all recovery is one additive stat.</div>',
    '<div class="callout"><strong>Important distinction:</strong> increased Mana Regeneration Rate, Mana Recovery Rate, recoup, Remnants and flask recovery are different levers. Treat them separately when comparing sustain; do not collapse them into one additive number.</div>'
)
s = s.replace(
    '<section id="rInstil" class="section"><div class="kicker">6 · STRUGGLESCREAM</div><h2>One instil versus four</h2><p class="sectionIntro">The lightweight calculator below ranks a few modelled candidates. Already-allocated nodes are shown at their estimated standalone contribution rather than 0%, while actual duplicate instilling still does not stack.</p><div id="instilTable" class="tableWrap"></div></section>',
    '<section id="rInstil" class="section"><div class="kicker">8 · STRUGGLESCREAM</div><h2>Instil candidates and edge cases</h2><p class="sectionIntro">The front page carries the recommended four-slot packages. Research keeps the wider candidate pool, conditional interactions and reasons a notable can win or lose. Duplicate instilling still does not stack with the same naturally allocated notable.</p></section>'
)

oldnav = '<nav class="sectionNav"><a href="#rMana">Mana</a><a href="#rRegen">Recovery</a><a href="#rDamage">Damage</a><a href="#rDefence">Defence</a><a href="#rTrigger">BRRR</a><a href="#rInstil">Instils</a><a href="#rSkills">Skills</a><a href="#rGear">Gear</a></nav>'
newnav = '<nav class="sectionNav"><a href="#rMana">Mana</a><a href="#rRegen">Recovery</a><a href="#rNodes">Node Library</a><a href="#rDamage">Damage</a><a href="#rDefence">Defence</a><a href="#rFlasks">Flasks</a><a href="#rTrigger">BRRR</a><a href="#rInstil">Instils</a><a href="#rSkills">Skills</a><a href="#rItems">Item Library</a><a href="#rGear">Item Levels</a><a href="#rSources">Sources</a></nav>'
if oldnav not in s:
    raise SystemExit('research nav marker missing')
s = s.replace(oldnav, newnav, 1)

node_lib = '''
      <section id="rNodes" class="section"><div class="kicker">3 · NODE LIBRARY</div><h2>The full working node list</h2><p class="sectionIntro">Searchable working catalogue from the research log. <b>CURRENT CORE</b> marks foundational nodes for this Mana-Flare Shaman; Research rows are promising or conditional and should be checked against the final route before a large respec.</p><div class="libraryToolbar"><input id="nodeSearch" placeholder="Search nodes, effects, categories…"><select id="nodeCat"><option>All</option><option>Mana</option><option>Recovery</option><option>Damage</option><option>CDR</option><option>Defence</option><option>Spirit</option><option>Ascendancy</option><option>Weird</option></select><span id="nodeCount" class="libCount"></span></div><div class="tableWrap"><table><thead><tr><th>Node</th><th>Bucket</th><th>Effect / build use</th><th>Grade</th><th>Status</th></tr></thead><tbody id="nodeLibrary"></tbody></table></div><div class="callout"><strong>Routing rule:</strong> Mana and recovery nodes come first; crit reliability next; CDR only becomes premium once the build can actually refill the 25%-current-Mana Flare spend.</div></section>
'''
mark = '      <section id="rDamage" class="section">'
if mark not in s:
    raise SystemExit('rDamage marker missing')
s = s.replace(mark, node_lib + '\n' + mark, 1)

flasks = '''
      <section id="rFlasks" class="section"><div class="kicker">6 · FLASK ENGINE</div><h2>Flasks can be part of the damage engine</h2><p class="sectionIntro">Mana Flare cares about <b>current Mana</b>, so flask recovery is not merely comfort. Uhtred's Chalice can Overflow maximum Mana during its effect; that can increase the base of the next Flare. Waistgate can equip Mana flasks in either flask slot and adds Mana-flask recovery rate.</p><div id="flaskLibrary" class="flaskStrip"></div><div class="deepGrid" style="margin-top:12px"><article class="deepCard highlightBlue"><h3>Uhtred + Waistgate</h3><p><b>Uhtred's Chalice:</b> 200–300% increased Amount Recovered, 70% reduced Recovery rate, 50–60% reduced Charges, and Mana recovery can Overflow. <b>Waistgate:</b> +50–80 Mana, 20–30% increased Mana-flask Recovery rate and two-Mana-flask legality.</p><p>That makes a real burst route: recover above maximum → Flare samples the larger current-Mana value → use the second flask / regen / Remnants to restore the pool again.</p></article><article class="deepCard"><h3>Flask danger</h3><p>Uhtred drains 5% Life per second while you have no Runic Ward during its effect. Melting Maelstrom hits you for 25% of current Mana as Chaos when its effect ends. These are not free buttons on a build that already uses Mana defensively.</p><p>Glowswarm is the interesting defensive variant: Mana-flask recovery also creates Guard for 4 seconds and the ring passively generates Mana-flask charges.</p></article></div><div class="formula">Sustained flask contribution ≈ recovery per use × realistic uses per second × flask-recovery modifiers × Mana-Recovery-rate modifiers × any recovery penalty.\n\nOverflow is separate: if current Mana rises above maximum, Mana Flare samples that larger current-Mana value.</div></section>
'''
mark = '      <section id="rTrigger" class="section">'
if mark not in s:
    raise SystemExit('rTrigger marker missing')
s = s.replace(mark, flasks + '\n' + mark, 1)

item_lib = '''
      <section id="rItems" class="section"><div class="kicker">10 · ITEM LIBRARY</div><h2>Items, variants and experiments</h2><p class="sectionIntro">Long-form item catalogue with required level when known, role, and confidence. This is intentionally broader than the front-page key-item and alternative-item recommendations.</p><div class="libraryToolbar"><input id="itemSearch" placeholder="Search items, slots, roles…"><select id="itemSlot"><option>All</option><option>Ring</option><option>Amulet</option><option>Body</option><option>Helmet</option><option>Gloves</option><option>Boots</option><option>Belt</option><option>Wand</option><option>Focus</option><option>Mana Flask</option><option>Jewel</option><option>Rune</option><option>Augment</option><option>Idol</option><option>Armour</option></select><span id="itemCount" class="libCount"></span></div><div class="tableWrap"><table><thead><tr><th>Item</th><th>Slot</th><th>Req Lv</th><th>Role / interaction</th><th>Grade</th><th>Status</th></tr></thead><tbody id="itemLibrary"></tbody></table></div></section>
'''
mark = '      <section id="rGear" class="section">'
if mark not in s:
    raise SystemExit('rGear marker missing')
s = s.replace(mark, item_lib + '\n' + mark, 1)

sources = '''
      <section id="rSources" class="section"><div class="kicker">12 · SOURCE MAP</div><h2>What the research is grounded on</h2><div class="sourceList"><a href="https://poe2db.tw/us/Mana_Flare" target="_blank">PoE2DB — Mana Flare<small>Current skill mechanics and trigger payload.</small></a><a href="https://poe2db.tw/us/Uhtreds_Chalice" target="_blank">PoE2DB — Uhtred's Chalice<small>Overflow flask mechanics.</small></a><a href="https://poe2db.tw/us/Waistgate" target="_blank">PoE2DB — Waistgate<small>Dual Mana-flask legality and recovery scaling.</small></a><a href="https://poe2db.tw/Glowswarm" target="_blank">PoE2DB — Glowswarm<small>Mana-flask charges, recovery and Guard.</small></a><a href="https://poe2db.tw/us/Notable" target="_blank">PoE2DB — Notables<small>Current notable wording cross-checks.</small></a><a href="https://www.poe2wiki.net/" target="_blank">PoE2 Wiki<small>Item, passive, quest and icon cross-checks.</small></a></div></section>
'''
close = '    </section>\n  </main>'
pos = s.rfind(close)
if pos < 0:
    raise SystemExit('research close marker missing')
s = s[:pos] + sources + '\n' + s[pos:]

# Static Research needs data + library renderer only. No character sync, calculator or optimizer runtime.
s = s.replace('<script src="./v43.js"></script>', '<script src="./v44-data.js"></script>\n<script src="./v44-research.js"></script>')
out.write_text(s, encoding='utf-8')
print('built static v44 research foundation', len(s))
