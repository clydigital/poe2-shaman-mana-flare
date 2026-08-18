from pathlib import Path

# Source-driven build enrichment: no extra browser/UI layer.
# This runs after build_v44.py and updates both the generated page and the v44 data catalogue.

page = Path('site/index.html')
s = page.read_text(encoding='utf-8')

nav_old = '<a href="#rDefence">Defence</a><a href="#rFlasks">Flasks</a><a href="#rTrigger">BRRR</a>'
nav_new = '<a href="#rDefence">Defence</a><a href="#rRemnants">Remnants</a><a href="#rFlasks">Flasks</a><a href="#rTrigger">BRRR</a>'
if nav_old in s:
    s = s.replace(nav_old, nav_new, 1)

remnants = '''
      <section id="rRemnants" class="section"><div class="kicker">6 · REMNANT ENGINE</div><h2>Remnants are a separate Mana-recovery lever</h2><p class="sectionIntro">Do not fold Remnants into ordinary regeneration. Mana Remnants can Overflow maximum Mana, while the passive notables add extra recovery, duplicate-effect chance and additional-remnant generation. That makes Remnants useful for both sustain and pre-Flare current-Mana spikes.</p>
        <div class="tableWrap"><table><thead><tr><th>Node / support</th><th>Exact / current effect</th><th>Mana Geyser use</th><th>Priority</th></tr></thead><tbody>
          <tr><td><b>Mana Remnants</b></td><td>Persistent buff. Kills on Elemental-Ailment enemies can spawn Mana Remnants; critically hitting an ailment target spawns one every few seconds. Picking one up grants Mana that can Overflow maximum Mana.</td><td>The base engine. Crit-heavy Entangle / Frost / Orb setups can create recovery while continuing to attack.</td><td><span class="tier s">CORE</span></td></tr>
          <tr><td><b>Arcane Remnants</b></td><td>Recover <b>3% of Maximum Mana</b> when you collect a Remnant.</td><td>Every collected Remnant gets a deterministic %max-Mana refill on top of the Remnant's own effect. Scales naturally with a larger Mana pool.</td><td><span class="tier s">S</span></td></tr>
          <tr><td><b>Empowering Remnants</b></td><td><b>15% chance</b> for Remnants you create to grant their effects twice.</td><td>Chance to double the Remnant's own payoff. Especially attractive when Mana Remnants are already frequent and valuable.</td><td><span class="tier a">A</span></td></tr>
          <tr><td><b>Remnant Attraction</b></td><td><b>10% chance</b> to create an additional Remnant; Remnants can be collected from <b>50% further away</b>.</td><td>Both throughput and real-world pickup consistency. More useful in mapping than a paper-only regen number suggests.</td><td><span class="tier a">A</span></td></tr>
          <tr><td><b>Vigorous Remnants</b></td><td>Recover <b>3% of Maximum Life</b> when you collect a Remnant.</td><td>Not a Mana node, but a defensive option if the build moves away from full MoM and needs Life recovery from the same pickup loop.</td><td><span class="tier b">DEF</span></td></tr>
          <tr><td><b>Harmonic Remnants II</b></td><td>Supports Remnant skills: collect from further away, with a chance to create an additional Remnant.</td><td>Potentially improves Remnant density and pickup consistency without pretending it is direct DPS.</td><td><span class="tier test">TEST</span></td></tr>
          <tr><td><b>Remnant Potency I / II / III</b></td><td>Supports Remnant skills to make Remnants more powerful; higher versions introduce delayed effect.</td><td>Could raise recovery per pickup. The delay must be judged against how quickly Mana Flare is consuming current Mana.</td><td><span class="tier test">TEST</span></td></tr>
          <tr><td><b>Magnetic Remnants</b></td><td>Supports Remnant skills so Remnants can be collected from further away.</td><td>QoL becomes sustain when missed pickups are the real bottleneck.</td><td><span class="tier b">B</span></td></tr>
        </tbody></table></div>
        <div class="deepGrid" style="margin-top:12px"><article class="deepCard highlightBlue"><h3>How to estimate Remnants</h3><p>Estimate <b>average Mana recovered from Remnants per second</b> from realistic pickup rate, not theoretical maximum spawn rate. Pickup distance, ailment uptime and the skill's internal spawn timing all decide how much of the paper recovery actually reaches the build.</p></article><article class="deepCard"><h3>Overflow trick</h3><p>Mana Remnants can Overflow maximum Mana. If Remnants or Uhtred push current Mana above maximum, Mana Flare samples that larger current-Mana value directly, so a pre-Flare overflow spike can be real payload rather than mere sustain.</p></article></div>
        <div class="formula">Arcane Remnants contribution alone ≈ 0.03 × Maximum Mana × Remnants collected per second\nExample: 8,000 max Mana × 0.03 × 1.5 pickups/s ≈ 360 Mana/s before other recovery-rate modifiers.\n\nEmpowering Remnants is not blindly multiplied into Arcane Remnants here: its wording doubles the Remnant's effect, while Arcane Remnants is a separate passive recovery-on-collection effect.</div>
      </section>
'''
marker = '      <section id="rFlasks" class="section">'
if marker not in s:
    raise SystemExit('rFlasks marker missing while adding Remnant research')
if 'id="rRemnants"' not in s:
    s = s.replace(marker, remnants + '\n' + marker, 1)
page.write_text(s, encoding='utf-8')

# Correct the working node catalogue itself, so the searchable Node Library is accurate.
data = Path('site/v44-data.js')
d = data.read_text(encoding='utf-8')
d = d.replace("['Eldritch Battery','Keystone','ES on gear becomes Mana; Mana Costs doubled.','Mana','S','Verified']", "['Eldritch Battery','ES on gear becomes Mana; Mana Costs doubled.','Mana','S','Verified']")
d = d.replace("['Arcane Remnants','Improves the Remnant recovery engine.','Recovery','A','Research']", "['Arcane Remnants','Recover 3% of Maximum Mana when you collect a Remnant.','Recovery','S','Verified']")
d = d.replace("['Empowering Remnants','Improves Remnant effect.','Recovery','A','Research']", "['Empowering Remnants','15% chance for Remnants you create to grant their effects twice.','Recovery','A','Verified']")
d = d.replace("['Remnant Attraction','Collect Remnants farther away.','Recovery','B','Research']", "['Remnant Attraction','10% chance to create an additional Remnant; Remnants can be collected from 50% further away.','Recovery','A','Verified']")
if "['Vigorous Remnants'" not in d:
    d = d.replace("['Remnant Attraction','10% chance to create an additional Remnant; Remnants can be collected from 50% further away.','Recovery','A','Verified'],", "['Remnant Attraction','10% chance to create an additional Remnant; Remnants can be collected from 50% further away.','Recovery','A','Verified'],\n    ['Vigorous Remnants','Recover 3% of Maximum Life when you collect a Remnant.','Defence','B','Verified'],")
data.write_text(d, encoding='utf-8')
print('v44 Remnant engine added')
