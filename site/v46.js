(() => {
'use strict';
const $ = id => document.getElementById(id);
const fmt = x => Math.round(x).toLocaleString();

function addCalcStat(beforeId, id, label) {
  if ($(id)) return;
  const before = $(beforeId)?.closest('div');
  if (!before) return;
  const d = document.createElement('div');
  d.innerHTML = `<span>${label}</span><b id="${id}">—</b>`;
  before.insertAdjacentElement('beforebegin', d);
}

function upgradeTwoFlareCalc() {
  addCalcStat('oFlask', 'oTwoNeed', 'Recovery for 2.00 Flare/s');
  addCalcStat('oFlask', 'oTwoGap', '2.00/s recovery gap');
  addCalcStat('oFlask', 'oTwoRegenPct', 'Pure regen increase needed @ 2.00/s');

  const render = () => {
    if (!window.v44GetCfg || !window.v44Model) return;
    const c = window.v44GetCfg();
    const r = window.v44Model(c);
    const current = Math.max(1, c.mana * c.cp);
    const need = 0.25 * current * 2;
    const gap = Math.max(0, need - r.recovery);
    const recoveryRateMult = 1 + Math.max(-0.95, c.rr || 0);
    const momMult = c.mom ? 0.5 : 1;
    const basePerSec = Math.max(1e-9, c.base * c.mana * recoveryRateMult * momMult);
    const incNeeded = Math.max(0, need / basePerSec - 1);
    if ($('oTwoNeed')) $('oTwoNeed').textContent = fmt(need);
    if ($('oTwoGap')) $('oTwoGap').textContent = gap <= 1 ? 'COVERED' : fmt(gap);
    if ($('oTwoRegenPct')) $('oTwoRegenPct').textContent = `+${Math.round(incNeeded * 100).toLocaleString()}%`;
  };
  window.addEventListener('v44calc', render);
  ['cMana','cCurrent','cBaseRegen','cRecoveryRate','cMom','cOtherRec','cLeech','cRegen'].forEach(id => {
    $(id)?.addEventListener('input', render);
    $(id)?.addEventListener('change', render);
  });
  render();
}

function upgradeRegenResearch() {
  const sec = $('rRegen');
  if (!sec || sec.querySelector('.v46RecoveryResearch')) return;
  const wrap = document.createElement('div');
  wrap.className = 'v46RecoveryResearch';
  wrap.innerHTML = `
    <h3 class="subhead">Recovery ceiling: can regen outrun 2 Mana Flares per second?</h3>
    <div class="grid3">
      <article class="card accentBlue"><h3>2 Flares/s is a 50%-pool refill target</h3><p>If you want to return to the <strong>same pre-Flare Mana</strong> before every 0.5-second proc, recovery must replace 25% twice per second. At 2,636 Mana that is <strong>1,318 Mana/s</strong> at full pool. Two unrecovered Flares do not literally remove 50% of the starting pool: 75% × 75% leaves <strong>56.25%</strong>, so the raw loss is 43.75%.</p></article>
      <article class="card"><h3>Pure regen under MoM is not realistic</h3><p>With 4% base Mana regeneration and Mind Over Matter's <strong>50% less Mana Recovery Rate</strong>, pure regen needs roughly <strong>+2,400% increased Mana Regeneration Rate</strong> to refill a full pool fast enough for 2.00 Flares/s before other Recovery Rate modifiers. Arcane Blossom lowers that requirement, but not remotely enough by itself.</p></article>
      <article class="card"><h3>The realistic answer is blended recovery</h3><p>Stack regeneration, Mana Recovery Rate, Remnants, flasks/Overflow, recoup and any real leech source together. The calculator now shows the exact 2.00-Flare recovery target and the remaining recovery gap at the selected current-Mana level.</p></article>
    </div>

    <h3 class="subhead">Entangle + Mana leech: Physical is not enough</h3>
    <div class="deepGrid">
      <article class="deepCard highlightBlue"><h3>Entangle is Physical — but it is a Spell</h3><p>Entangle is tagged <b>Spell · AoE · Sustained · Physical · Duration · Plant</b> and its fissures/vines Hit. Normal Mana Leech support still <strong>cannot support it</strong>, because Mana Leech explicitly supports <strong>Attacks</strong> and leeches 8% of Physical <strong>Attack</strong> Damage. The Physical tag alone does not qualify Entangle.</p></article>
      <article class="deepCard"><h3>Oisín's Oath does not create leech</h3><p>Oisín's Oath only changes an <em>existing</em> Mana Leech calculation from Physical to Elemental damage. It does not grant Mana Leech, so socketing it into Entangle without a valid leech source still gives zero Mana leech.</p></article>
      <article class="deepCard"><h3>Mana Drain remains the caster leech tool</h3><p>Your Attuned Wand's Mana Drain costs 0 Mana and at level 15 leeches 258 Mana, but its leech is 70% slower. Treat it as supplemental recovery rather than the engine that funds a 2-Flare/s loop.</p></article>
      <article class="deepCard"><h3>Weird option: Font of Mana</h3><p>Font of Mana supports Totem skills. A supported Totem creates a 4m Font, and Allies in the Font leech Mana equal to <strong>12% of Physical Damage dealt by the supported Totem</strong>. This is a legitimate side-engine worth testing if a low-maintenance Physical Totem fits the build; it does not make Entangle itself leech.</p></article>
    </div>

    <h3 class="subhead">Mana Cost Efficiency: useful, but not on the Flare consumption</h3>
    <div class="callout"><strong>Mana Flare has 0 Mana cost and consumes 25% of current Mana.</strong> Mana Cost Efficiency does not reduce that 25% consumption. It still helps the carrier skills because Eldritch Battery doubles Mana costs, so cheaper Frost Darts / Entangle / utility spells preserve more current Mana for the next Flare.</div>

    <h3 class="subhead">Recovery gear worth testing before chasing leech</h3>
    <div class="tableWrap"><table><thead><tr><th>Source</th><th>Recovery value</th><th>Why it matters here</th></tr></thead><tbody>
      <tr><td><b>Nightscale</b></td><td>150% increased Mana Regen after a recent crit</td><td>Excellent fit for a build already trying to crit constantly. The downside is zero regen when you have not crit recently.</td></tr>
      <tr><td><b>Threaded Light</b></td><td>30–40% Mana Regen + 8–12% Spell Damage per 10 Spirit</td><td>At 140 Spirit, the damage line is roughly 112–168% increased Spell Damage while also helping regen. Very strong offhand test versus Rathpith / Eternal Spark.</td></tr>
      <tr><td><b>The Eternal Spark</b></td><td>40% Mana Regen + another 40% while stationary</td><td>Up to 80% increased regen for planted bossing, plus +5% max Lightning resistance.</td></tr>
      <tr><td><b>2× Dream Fragments</b></td><td>30–50% Mana Regen each</td><td>60–100% increased regen across both rings while also scaling maximum Mana.</td></tr>
      <tr><td><b>Arcane Blossom</b></td><td>15% increased Mana Recovery Rate</td><td>Scales regen and other recovery together, so its value rises as the recovery engine gets broader.</td></tr>
      <tr><td><b>Kurgal's Gaze · helmet augment</b></td><td>Life Regen Rate increases also apply to Mana Regen Rate</td><td>Level-60 weird-tech. Opens a second modifier pool: Life Regeneration Rate can now scale Mana regeneration too. This deserves a dedicated late-game test.</td></tr>
      <tr><td><b>Uhtred + Waistgate</b></td><td>Large flask recovery + Overflow</td><td>Unlike leech, Overflow can push current Mana above maximum, increasing the next Mana Flare base as well as refilling the pool.</td></tr>
      <tr><td><b>Cloak of Defiance · Lv65</b></td><td>50–100% Mana Regen + 100–150 Mana + 50% damage from Mana before Life</td><td>Potential mature transition: drop full MoM's 50% less recovery while retaining partial Mana-before-Life defence from the body armour.</td></tr>
    </tbody></table></div>
    <div class="callout"><strong>Amulet slot warning:</strong> Everlasting Gaze and Fireflower can add substantial Mana regeneration, but using either means giving up Strugglescream's four instils. For this build, the comparison must include the passive points and dead pathing Strugglescream can skip, not just the amulet's tooltip regen.</div>
  `;
  sec.appendChild(wrap);
}

function upgradeAnointEfficiency() {
  const sec = $('anoints');
  if (!sec || sec.querySelector('.v46PathingEfficiency')) return;
  const h2 = sec.querySelector('h2');
  if (h2) h2.textContent = 'Use Strugglescream to skip bad pathing, not just chase tooltip DPS';
  const intro = sec.querySelector('.sectionIntro');
  if (intro) intro.textContent = 'Four instils are most valuable when they bypass dead or low-value travel. Rank each notable by its effect plus the passive points it saves; a slightly weaker notable can be the better instil if its natural route is bad.';
  const wrap = document.createElement('div');
  wrap.className = 'v46PathingEfficiency';
  wrap.innerHTML = `
    <div class="grid3">
      <article class="card accentBlue"><h3>Ruinic Helm = prime instil candidate</h3><p>The notable itself is live: it creates +1 maximum ES per 8 Item Armour on the equipped helmet, and that flat maximum ES can become Mana through Eldritch Battery. <strong>Global % increased ES on the path does not scale the EB-converted Mana.</strong> If the two lead-in passives are global/% ES nodes, those are dead points for this build — exactly what Strugglescream should skip.</p></article>
      <article class="card"><h3>Good pathing should stay on the tree</h3><p>Invocated Efficiency is the opposite case: the 14% Triggered Spell Damage small passives around that route directly scale Mana Flare. When the smalls are useful, path naturally and save the instil for something remote or surrounded by junk.</p></article>
      <article class="card"><h3>Score split-value nodes honestly</h3><p>Under EB, only count the parts that still work. Armour, Evasion, INT, Mana and recovery can remain live; <strong>global increased maximum ES is dead as a Mana scaler after conversion</strong>. Do not give a mixed node full credit just because half its tooltip says Energy Shield.</p></article>
    </div>
    <div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Node</th><th>Live part under EB</th><th>Dead / weak part</th><th>Instil view</th></tr></thead><tbody>
      <tr><td><b>Ruinic Helm</b></td><td>Flat max ES generated from helmet Item Armour → EB Mana</td><td>Global %ES lead-in pathing does not scale the converted Mana</td><td><span class="tier s">HIGH</span> if it skips the two ES-tax points</td></tr>
      <tr><td><b>Ancient Aegis</b></td><td>Armour from body armour</td><td>Its increased ES-from-body component is not a Mana multiplier after EB conversion</td><td><span class="tier test">MIXED</span> — score Armour value only</td></tr>
      <tr><td><b>Spiral into Depression</b></td><td>25% Armour</td><td>25% increased maximum ES does not scale EB Mana</td><td><span class="tier test">MIXED</span></td></tr>
      <tr><td><b>Mindful Awareness</b></td><td>24% Evasion</td><td>24% increased max ES is dead for EB Mana; current character has negligible Evasion</td><td><span class="tier b">LOW NOW</span></td></tr>
      <tr><td><b>Inner Faith</b></td><td>Evasion + reduced curse effect</td><td>20% increased max ES is dead for EB Mana</td><td><span class="tier b">LOW / SITUATIONAL</span></td></tr>
      <tr><td><b>Insightfulness</b></td><td>6% INT + Mana regen</td><td>% increased ES component does not scale converted Mana</td><td><span class="tier a">VALUE THE LIVE HALF</span></td></tr>
      <tr><td><b>Invocated Efficiency</b></td><td>40% triggered spell damage</td><td>None relevant; nearby Triggered Spell Damage smalls are also good</td><td><span class="tier a">PATH NATURALLY</span> when route is efficient</td></tr>
      <tr><td><b>Arcane Blossom</b></td><td>15% Mana Recovery Rate</td><td>No dead stat</td><td><span class="tier s">HIGH</span> if remote / awkward to reach</td></tr>
    </tbody></table></div>
    <div class="callout"><strong>New Strugglescream rule:</strong> raw DPS ranking is only step one. Final ranking = notable value + passive points saved + quality of skipped small nodes. Ruinic Helm can beat a higher-paper-DPS instil when it saves two dead ES points.</div>
  `;
  const hero = sec.querySelector('.frontAnointHero');
  if (hero) hero.insertAdjacentElement('afterend', wrap);
  else sec.appendChild(wrap);
}

function updateNodeNotes() {
  const D = window.MANA_GEYSER_V44;
  if (!D?.nodes) return;
  const notes = {
    'Ruinic Helm': ' + INSTIL NOTE: the notable creates flat max ES from helmet Item Armour, which EB can convert to Mana. Global %ES lead-in nodes do not scale the converted Mana, so Strugglescream can efficiently skip that pathing tax.',
    'Ancient Aegis': ' EB NOTE: count the Armour portion; increased ES-from-body does not act as a Mana multiplier after EB conversion.',
    'Spiral into Depression': ' EB NOTE: the Armour half is live; the increased maximum ES half does not scale EB-converted Mana.',
    'Mindful Awareness': ' EB NOTE: the Evasion half is live, but the increased maximum ES half does not scale EB-converted Mana.',
    'Inner Faith': ' EB NOTE: Evasion and curse mitigation are live; increased maximum ES does not scale EB-converted Mana.',
    'Insightfulness': ' EB NOTE: value INT and Mana regen; do not count the increased ES component as extra EB Mana.'
  };
  D.nodes.forEach(row => {
    const extra = notes[row[0]];
    if (extra && !String(row[1]).includes('EB NOTE') && !String(row[1]).includes('INSTIL NOTE')) row[1] += extra;
  });
  $('nodeSearch')?.dispatchEvent(new Event('input', {bubbles:true}));
}

function updateSources() {
  const list = document.querySelector('#rSources .sourceList');
  if (!list) return;
  const sources = [
    ['https://poe2db.tw/us/Entangle','PoE2DB — Entangle','Physical Spell carrier; Physical tag does not make it an Attack for Mana Leech support.'],
    ['https://poe2db.tw/us/Mana_Drain','PoE2DB — Mana Drain','Flat caster Mana leech; Lv15 = 258 Mana with 70% slower leech rate.'],
    ['https://poe2db.tw/us/Font_of_Mana','PoE2DB — Font of Mana','Totem side-engine: Allies in the Font leech Mana from 12% of supported Totem Physical Damage.'],
    ['https://poe2db.tw/us/Kurgals_Gaze','PoE2DB — Kurgal\'s Gaze','Helmet augment: Life Regeneration Rate increases also apply to Mana Regeneration Rate.'],
    ['https://poe2db.tw/us/Nightscale','PoE2DB — Nightscale','150% increased Mana Regen after a recent crit.'],
    ['https://poe2db.tw/us/Threaded_Light','PoE2DB — Threaded Light','Mana regen plus Spell Damage per 10 Spirit.'],
    ['https://poe2db.tw/us/The_Eternal_Spark','PoE2DB — The Eternal Spark','40% Mana Regen plus another 40% while stationary.'],
    ['https://poe2db.tw/us/Cloak_of_Defiance','PoE2DB — Cloak of Defiance','Mana, regen and 50% damage taken from Mana before Life.']
  ];
  sources.forEach(([href,title,small]) => {
    if ([...list.querySelectorAll('a')].some(a => a.href === href)) return;
    const a = document.createElement('a');
    a.href = href; a.target = '_blank';
    a.innerHTML = `${title}<small>${small}</small>`;
    list.appendChild(a);
  });
}

function install() {
  upgradeTwoFlareCalc();
  upgradeRegenResearch();
  upgradeAnointEfficiency();
  updateNodeNotes();
  updateSources();
}

install();
})();
