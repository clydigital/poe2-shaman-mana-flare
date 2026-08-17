from pathlib import Path

src = Path('site/v43-index.html')
out = Path('site/index.html')
s = src.read_text(encoding='utf-8')
s = s.replace('./v43.css', './v44.css')
s = s.replace('<span>Lv49 snapshot</span><span>2,497 Mana</span>', '<span>Lv<span data-snap-level>49</span> · poe.ninja</span><span><span data-snap-mana>2,497</span> Mana</span>')

snapshot = '''
        <div class="ninjaPanel" id="poeNinjaSnapshot">
          <article class="ninjaCard">
            <div class="ninjaHead"><div><span>CANONICAL CHARACTER SNAPSHOT</span><b>poe.ninja · DaSilkRoad-5508 / ToaBBMcy</b></div><span id="snapStatus">LOADING…</span></div>
            <div class="ninjaMeta"><span>Lv <b id="snapLevel">—</b></span><span>Mana <b id="snapMana">—</b></span><span>INT <b id="snapInt">—</b></span><span>Spirit <b id="snapSpirit">—</b></span><span>Armour <b id="snapArmour">—</b></span><span>Runic Ward <b id="snapWard">—</b></span><span>Passives <b id="snapPassives">—</b></span><span>Resists F/C/L/Ch <b id="snapResists">—</b></span></div>
            <div class="ninjaActions"><button onclick="v44ReloadSnapshot()">Reload deployed snapshot</button><a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank" rel="noopener">Open exact poe.ninja profile ↗</a></div>
          </article>
          <article class="ninjaCard"><span>SNAPSHOT POLICY</span><b class="snapshotBig">poe.ninja first</b><p class="snapshotSmall">The calculator baseline, current-build badges and character summary use the hourly GitHub Pages snapshot pulled from this exact poe.ninja profile. If poe.ninja is unavailable, the page labels the previous snapshot as stale rather than inventing a new baseline.</p><p class="snapshotSmall">Fetched: <b id="snapFetched">—</b></p></article>
        </div>
'''
needle = '        <div class="callout"><strong>Simple priority:</strong> Mana pool → Mana recovery → trigger reliability → crit/CDB → only then aggressive CDR.</div>\n      </section>'
if needle not in s: raise SystemExit('overview insertion marker missing')
s = s.replace(needle, needle.replace('\n      </section>', '\n'+snapshot+'      </section>'), 1)

oldnav = '<nav class="sectionNav"><a href="#rMana">Mana</a><a href="#rRegen">Recovery</a><a href="#rDamage">Damage</a><a href="#rDefence">Defence</a><a href="#rTrigger">BRRR</a><a href="#rInstil">Instils</a><a href="#rSkills">Skills</a><a href="#rGear">Gear</a></nav>'
newnav = '<nav class="sectionNav"><a href="#rMana">Mana</a><a href="#rRegen">Recovery</a><a href="#rNodes">Node Library</a><a href="#rDamage">Damage</a><a href="#rDefence">Defence</a><a href="#rFlasks">Flasks</a><a href="#rTrigger">BRRR</a><a href="#rInstil">Instils</a><a href="#rSkills">Skills</a><a href="#rItems">Item Library</a><a href="#rGear">Item Levels</a><a href="#rSources">Sources</a></nav>'
if oldnav not in s: raise SystemExit('research nav marker missing')
s=s.replace(oldnav,newnav,1)

node_lib='''
      <section id="rNodes" class="section"><div class="kicker">3 · NODE LIBRARY</div><h2>The full working node list</h2><p class="sectionIntro">Searchable working catalogue from the research log. <b>POE.NINJA TREE</b> marks key nodes already known in the imported character baseline; Research rows are promising but should be rechecked before a large respec.</p><div class="libraryToolbar"><input id="nodeSearch" placeholder="Search nodes, effects, categories…"><select id="nodeCat"><option>All</option><option>Mana</option><option>Recovery</option><option>Damage</option><option>CDR</option><option>Defence</option><option>Spirit</option><option>Ascendancy</option><option>Weird</option></select><span id="nodeCount" class="libCount"></span></div><div class="tableWrap"><table><thead><tr><th>Node</th><th>Bucket</th><th>Effect / build use</th><th>Grade</th><th>Status</th></tr></thead><tbody id="nodeLibrary"></tbody></table></div><div class="callout"><strong>Routing rule:</strong> Mana and recovery nodes come first; crit/CDB next; CDR is a late multiplier only after sustainable Flare/s is close to the cooldown ceiling.</div></section>
'''
mark='      <section id="rDamage" class="section">'
if mark not in s: raise SystemExit('rDamage marker missing')
s=s.replace(mark,node_lib+'\n'+mark,1)

flasks='''
      <section id="rFlasks" class="section"><div class="kicker">6 · FLASK ENGINE</div><h2>Flasks can be part of the damage engine</h2><p class="sectionIntro">Mana Flare cares about <b>current Mana</b>, so flask recovery is not merely comfort. Uhtred's Chalice can Overflow maximum Mana during its effect; that can increase the base of the next Flare. Waistgate can equip Mana flasks in either flask slot and adds Mana-flask recovery rate.</p><div id="flaskLibrary" class="flaskStrip"></div><div class="deepGrid" style="margin-top:12px"><article class="deepCard highlightBlue"><h3>Uhtred + Waistgate</h3><p><b>Uhtred's Chalice:</b> 200–300% increased Amount Recovered, 70% reduced Recovery rate, 50–60% reduced Charges, and Mana recovery can Overflow. <b>Waistgate:</b> +50–80 Mana, 20–30% increased Mana-flask Recovery rate and two-Mana-flask legality.</p><p>That makes a real burst route: recover above maximum → Flare samples the larger current-Mana value → use the second flask / regen / Remnants to restore the pool again.</p></article><article class="deepCard"><h3>Flask danger</h3><p>Uhtred drains 5% Life per second while you have no Runic Ward during its effect. Melting Maelstrom hits you for 25% of current Mana as Chaos when its effect ends. These are not free buttons on a build that already uses Mana defensively.</p><p>Glowswarm is the interesting defensive variant: Mana-flask recovery also creates Guard for 4 seconds and the ring passively generates Mana-flask charges.</p></article></div><div class="formula">Flask contribution in the compact calc = recovery per use × realistic uses per second × flask-recovery modifiers × Mana-Recovery-rate modifiers × MoM recovery penalty (if enabled).\n\nOverflow is handled separately by allowing Current Mana % above 100%.</div></section>
'''
mark='      <section id="rTrigger" class="section">'
if mark not in s: raise SystemExit('rTrigger marker missing')
s=s.replace(mark,flasks+'\n'+mark,1)

item_lib='''
      <section id="rItems" class="section"><div class="kicker">10 · ITEM LIBRARY</div><h2>Items, variants and experiments</h2><p class="sectionIntro">Long-form item catalogue with required level when known, role, and confidence. This is intentionally broader than the front-page shopping strip.</p><div class="libraryToolbar"><input id="itemSearch" placeholder="Search items, slots, roles…"><select id="itemSlot"><option>All</option><option>Ring</option><option>Amulet</option><option>Body</option><option>Helmet</option><option>Gloves</option><option>Belt</option><option>Wand</option><option>Focus</option><option>Mana Flask</option><option>Jewel</option><option>Rune</option><option>Idol</option><option>Armour</option></select><span id="itemCount" class="libCount"></span></div><div class="tableWrap"><table><thead><tr><th>Item</th><th>Slot</th><th>Req Lv</th><th>Role / interaction</th><th>Grade</th><th>Status</th></tr></thead><tbody id="itemLibrary"></tbody></table></div></section>
'''
mark='      <section id="rGear" class="section">'
if mark not in s: raise SystemExit('rGear marker missing')
s=s.replace(mark,item_lib+'\n'+mark,1)

sources='''
      <section id="rSources" class="section"><div class="kicker">12 · SOURCE MAP</div><h2>What the page is grounded on</h2><div class="sourceList"><a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank">poe.ninja — canonical character snapshot<small>Exact profile used by the hourly sync and calculator baseline.</small></a><a href="https://poe2db.tw/us/Mana_Flare" target="_blank">PoE2DB — Mana Flare<small>Current skill mechanics / support-granted payload.</small></a><a href="https://poe2db.tw/us/Uhtreds_Chalice" target="_blank">PoE2DB — Uhtred's Chalice<small>Overflow flask mechanics.</small></a><a href="https://poe2db.tw/us/Waistgate" target="_blank">PoE2DB — Waistgate<small>Dual Mana-flask legality and recovery scaling.</small></a><a href="https://poe2db.tw/Glowswarm" target="_blank">PoE2DB — Glowswarm<small>Mana-flask charges, recovery and Guard.</small></a><a href="https://poe2db.tw/us/Notable" target="_blank">PoE2DB — Notables<small>Current node wording cross-checks.</small></a></div></section>
'''
close='    </section>\n  </main>'
pos=s.rfind(close)
if pos<0: raise SystemExit('research close marker missing')
s=s[:pos]+sources+'\n'+s[pos:]

s=s.replace('<label>Maximum Mana<input id="cMana" type="number" value="2497" min="1"></label>', '<label>Maximum Mana<input id="cMana" type="number" value="2497" min="1"></label><label>Base Mana Regen % / sec<input id="cBaseRegen" type="number" value="4" min="0" step="0.1"></label>')
s=s.replace('<label>Other Mana recovery / sec<input id="cOtherRec" type="number" value="0" min="0"></label>', '<label>Other Mana recovery / sec<input id="cOtherRec" type="number" value="0" min="0"></label><label>Mana Recovery rate %<input id="cRecoveryRate" type="number" value="0" min="-95"></label>')
s=s.replace('<label>Current Rage<input id="cRage" type="number" value="43" min="0" max="100"></label>', '''<label>Current Rage<input id="cRage" type="number" value="43" min="0" max="100"></label><div class="calcDivider"></div><div class="calcSectionLabel">Mana Flask model</div><div class="miniPreset"><button onclick="v44PresetFlask('none')">No flask</button><button onclick="v44PresetFlask('rare')">Rare flask</button><button onclick="v44PresetFlask('uhtred')">Uhtred</button><button onclick="v44PresetFlask('double')">Waistgate ×2</button></div><label>Recovery per use<input id="cFlaskPerUse" type="number" value="0" min="0"></label><label>Flask recovery increase %<input id="cFlaskRecInc" type="number" value="0" min="0"></label><label>Realistic flask uses / sec<input id="cFlaskUseRate" type="number" value="0" min="0" step="0.01"></label><label><input id="cOverflow" type="checkbox"> Allow current Mana &gt;100% (Overflow)</label><p class="calcHint">Uhtred's Chalice can Overflow; Waistgate can run two Mana flasks. Enter realistic sustained usage rather than assuming infinite charges.</p>''')
s=s.replace('<div><span>Mana cost / Flare</span><b id="oNeed">—</b></div><div><span>Sustained DPS</span><b id="oDps">—</b></div>', '<div><span>Mana / Flare</span><b id="oNeed">—</b></div><div><span>Flask recovery/s</span><b id="oFlask">—</b></div><div><span>Sustained DPS</span><b id="oDps">—</b></div><div class="wide"><span>Current bottleneck</span><b id="oCap">—</b></div>')
s=s.replace('Transparent comparison model, not PoB. Base regen is modelled at 4% max Mana/sec; full MoM applies its 50% less Mana Recovery penalty. Add Remnants/flask/recoup recovery in “Other recovery/sec”.', 'Transparent comparison model, not PoB. Defaults come from the deployed poe.ninja snapshot. Base regen is editable; full MoM applies its 50% less Mana Recovery penalty. Put Remnants/recoup in Other Recovery, and model flask recovery separately.')
s=s.replace('<script src="./v43.js"></script>', '<script src="./v44-data.js"></script>\n<script src="./v44-core.js"></script>\n<script src="./v44-research.js"></script>\n<script src="./v44-instils.js"></script>')
out.write_text(s,encoding='utf-8')
print('built v44',len(s))
