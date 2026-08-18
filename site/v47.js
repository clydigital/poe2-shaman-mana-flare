(() => {
'use strict';
const $ = id => document.getElementById(id);

function currentRawCandidates() {
  const rows = [...document.querySelectorAll('#frontAnointTable tbody tr')];
  return rows.map(row => {
    const cells = row.querySelectorAll('td');
    const name = cells[1]?.querySelector('b')?.textContent?.trim();
    const allocated = !!row.querySelector('.anointAllocated') || /TREE|ALLOCATED/i.test(row.textContent || '');
    return {name, allocated};
  }).filter(x => x.name && !x.allocated);
}

function efficiencyPackage() {
  const fixed = ['Ruinic Helm', 'Arcane Blossom'];
  const extras = currentRawCandidates().map(x => x.name).filter(n => !fixed.includes(n)).slice(0, 2);
  return [...fixed, ...extras].slice(0, 4);
}

function upgradeCoreLoop() {
  const sec = $('overview');
  if (!sec || sec.querySelector('.v47RegenRageLoop')) return;
  const target = sec.querySelector('.callout');
  const wrap = document.createElement('div');
  wrap.className = 'v47RegenRageLoop';
  wrap.innerHTML = `
    <h3 class="subhead">The Shaman feedback loop: recovery is also offence</h3>
    <div class="grid4">
      <article class="card accentBlue"><h3>1 · Stack Mana regen</h3><p>Jewellery, Nightscale, Clarity II, Arcane Surge, passives and Recovery Rate rebuild the pool between Mana Flare procs.</p></article>
      <article class="card"><h3>2 · Sustain more Flares</h3><p>More effective recovery raises the recovery-limited Flare/s ceiling. At 2.00 Flares/s the refill target is 50% of the desired current-Mana level per second.</p></article>
      <article class="card"><h3>3 · Furious Wellspring double-dips</h3><p>Increases and reductions to Mana Regeneration Rate also apply to Rage Regeneration Rate, so the same additive regen investment helps stabilise Rage.</p></article>
      <article class="card"><h3>4 · Druidic Champion pays it back</h3><p>Every 2 Rage grants 1% more Spell Damage. Recovery therefore supports both <strong>Flare frequency</strong> and the Shaman's multiplicative spell-damage layer.</p></article>
    </div>
    <div class="callout"><strong>Build identity:</strong> Mana regen → Flare sustain + Rage regen → Druidic Champion more Spell Damage. That makes recovery a first-class offensive stat rather than a tax paid after damage is built.</div>`;
  if (target) target.insertAdjacentElement('afterend', wrap);
  else sec.appendChild(wrap);
}

function upgradeStrugglescreamScoring() {
  const sec = $('anoints');
  if (!sec || sec.querySelector('.v47PathScore')) return;
  const wrap = document.createElement('div');
  wrap.className = 'v47PathScore';
  wrap.innerHTML = `
    <h3 class="subhead">Path-efficiency score · effect + points saved + dead path skipped</h3>
    <div class="frontAnointHero">
      <article class="bestPack"><span>EFFICIENCY-FIRST 4-SLOT PACKAGE</span><b id="v47EffCombo">—</b><p id="v47EffNames">Ruinic Helm · Arcane Blossom · Dynamism · Controlling Magic</p></article>
      <article><span>SCORING RULE</span><b>Do not reward dead travel</b><p>Confirmed dead lead-ins get a strong instil bonus. Useful lead-ins reduce the instil score. Unknown routes stay provisional rather than receiving invented pathing value.</p></article>
    </div>
    <div class="tableWrap"><table><thead><tr><th>Candidate</th><th>Effect value</th><th>Confirmed lead-in tax</th><th>Minimum points avoided</th><th>Path score</th><th>Action</th></tr></thead><tbody>
      <tr><td><b>Ruinic Helm</b><br><small>Instil: Paranoia · Isolation · Fear</small></td><td>4.5 / 5<br><small>Flat max ES from helmet Item Armour → EB Mana</small></td><td><strong>2 dead %ES lead-ins</strong><br><small>Global increased ES does not scale EB-converted Mana.</small></td><td><b>3</b><br><small>2 lead-ins + the notable itself; additional travel from the current tree is extra.</small></td><td><span class="tier s">8.0 / 10 VERIFIED</span></td><td><strong>INSTIL FIRST.</strong> This is exactly the kind of node Strugglescream is meant to steal.</td></tr>
      <tr><td><b>Arcane Blossom</b><br><small>Instil: Envy · Despair · Despair</small></td><td>5 / 5 while recovery-limited<br><small>15% increased Mana Recovery Rate scales the whole recovery engine.</small></td><td>Route not yet topology-verified</td><td><b>1+</b></td><td><span class="tier test">5.5+ / 10 PROVISIONAL</span></td><td>High-priority recovery instil unless its natural route turns out unusually efficient.</td></tr>
      <tr><td><b>Dynamism</b><br><small>Instil: Isolation · Greed · Ire</small></td><td>4.5 / 5<br><small>40% increased Damage after triggering.</small></td><td>Route not yet topology-verified</td><td><b>1+</b></td><td><span class="tier test">5.0+ / 10 PROVISIONAL</span></td><td>Strong damage slot after Ruinic + recovery are secured.</td></tr>
      <tr><td><b>Controlling Magic</b><br><small>Instil: Envy · Fear · Isolation</small></td><td>4 / 5<br><small>Spell crit improves carrier saturation and Flare crit.</small></td><td>Route not yet topology-verified</td><td><b>1+</b></td><td><span class="tier test">4.5+ / 10 PROVISIONAL</span></td><td>Use while trigger reliability still needs help; the live raw-DPS table decides whether another crit/CDB node beats it.</td></tr>
      <tr><td><b>Invocated Efficiency</b></td><td>5 / 5</td><td><strong>Useful</strong> Triggered Spell Damage smalls on the route; also already allocated on the current tree.</td><td>0 for Strugglescream</td><td><span class="tier b">TREE / INELIGIBLE</span></td><td>Do not duplicate it. Good pathing is a reason to spend real passives here rather than an instil slot.</td></tr>
    </tbody></table></div>
    <div class="formula">Verified path score used here = effect value (0–5) + 1.5 × confirmed dead lead-ins + 0.5 × minimum points avoided beyond the notable
Useful lead-ins reduce instil attractiveness instead of being counted as "saved" points.
Unknown topology = provisional score only; no fake dead-point bonus is assigned.</div>
    <div class="callout"><strong>Current rule:</strong> lock Ruinic Helm first because its two dead ES lead-ins are confirmed. Lock Arcane Blossom second while recovery is the bottleneck. Fill the remaining two slots from the live raw-DPS ranking unless route mapping reveals another high-value notable behind equally bad travel.</div>`;
  const oldEfficiency = sec.querySelector('.v46PathingEfficiency');
  if (oldEfficiency) oldEfficiency.insertAdjacentElement('afterend', wrap);
  else {
    const hero = sec.querySelector('.frontAnointHero');
    if (hero) hero.insertAdjacentElement('afterend', wrap);
    else sec.appendChild(wrap);
  }

  const raw = $('frontAnointTable');
  if (raw && !raw.previousElementSibling?.classList?.contains('v47RawHead')) {
    const h = document.createElement('h3');
    h.className = 'subhead v47RawHead';
    h.textContent = 'Raw DPS comparator · secondary to path efficiency';
    raw.insertAdjacentElement('beforebegin', h);
  }
}

function updateEfficiencyPackage() {
  const names = efficiencyPackage();
  const nameEl = $('v47EffNames');
  const combo = $('v47EffCombo');
  if (nameEl) nameEl.textContent = names.join(' · ');
  if (combo) combo.textContent = `${names.length}/4 slots · Ruinic + recovery first`;
}

function markDeadESLeadIns() {
  const rows = [...document.querySelectorAll('tr')];
  rows.forEach(row => {
    const first = row.querySelector('td:first-child');
    if (!first || !/^Ruinic Helm\b/i.test(first.textContent.trim())) return;
    if (first.querySelector('.v47DeadBadge')) return;
    const badge = document.createElement('span');
    badge.className = 'tier test v47DeadBadge';
    badge.style.marginLeft = '6px';
    badge.textContent = 'DEAD ES LEAD-IN ×2';
    first.appendChild(badge);
  });

  const D = window.MANA_GEYSER_V44;
  if (D?.nodes) {
    const row = D.nodes.find(r => r[0] === 'Ruinic Helm');
    if (row && !String(row[1]).includes('DEAD LEAD-IN ×2')) {
      row[1] += ' DEAD LEAD-IN ×2: the current route to this notable passes through two global %ES passives that do not scale EB-converted Mana; this materially increases its Strugglescream value.';
      $('nodeSearch')?.dispatchEvent(new Event('input', {bubbles:true}));
    }
  }
}

function addSources() {
  const list = document.querySelector('#rSources .sourceList');
  if (!list) return;
  const sources = [
    ['https://poe2db.tw/us/Ruinic_Helm','PoE2DB — Ruinic Helm instil','Instil recipe: Paranoia · Isolation · Fear; effect is +1 maximum ES per 8 Item Armour on equipped Helmet.'],
    ['https://poe2db.tw/us/Arcane_Blossom','PoE2DB — Arcane Blossom instil','Instil recipe: Envy · Despair · Despair; 15% increased Mana Recovery Rate.']
  ];
  for (const [href,title,small] of sources) {
    if ([...list.querySelectorAll('a')].some(a => a.href === href)) continue;
    const a = document.createElement('a');
    a.href = href; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = `${title}<small>${small}</small>`;
    list.appendChild(a);
  }
}

function install() {
  upgradeCoreLoop();
  upgradeStrugglescreamScoring();
  markDeadESLeadIns();
  updateEfficiencyPackage();
  addSources();
}

install();
window.addEventListener('v44calc', () => {
  updateEfficiencyPackage();
  markDeadESLeadIns();
});
setTimeout(install, 0);
})();
