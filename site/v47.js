(() => {
'use strict';
const $ = id => document.getElementById(id);
let topology = null;

const META = {
  'Ruinic Helm': {
    effect: 4.5,
    recipe: 'Paranoia · Isolation · Fear',
    detail: 'Flat maximum ES from helmet Item Armour becomes EB Mana.'
  },
  'Arcane Blossom': {
    effect: 5.0,
    recipe: 'Envy · Despair · Despair',
    detail: '15% increased Mana Recovery Rate scales the whole recovery engine while recovery-limited.'
  },
  'Dynamism': {
    effect: 4.5,
    recipe: 'Isolation · Greed · Ire',
    detail: '40% increased Damage after triggering.'
  },
  'Controlling Magic': {
    effect: 4.0,
    recipe: 'Envy · Fear · Isolation',
    detail: 'Spell crit improves carrier saturation and the shared crit pool used by Mana Flare.'
  },
  'Throatseeker': {
    effect: 4.0,
    recipe: 'Greed · Envy · Isolation',
    detail: 'Large CDB gain with reduced Critical Hit Chance; compare against current trigger saturation.'
  },
  'Shredding Force': {
    effect: 4.0,
    recipe: 'Guilt · Isolation · Greed',
    detail: 'Spell crit plus Critical Spell Damage Bonus.'
  },
  'Desensitisation': {
    effect: 3.5,
    recipe: 'Envy · Suffering · Greed',
    detail: 'Payload CDB only; no trigger-frequency benefit.'
  },
  'Invocated Efficiency': {
    effect: 5.0,
    recipe: 'Isolation · Envy · Paranoia',
    detail: '10% Mana Cost Efficiency and 40% increased Triggered Spell Damage. Exact PoB topology confirms it is not currently allocated.'
  }
};

const ORDER = [
  'Ruinic Helm', 'Arcane Blossom', 'Dynamism', 'Controlling Magic',
  'Invocated Efficiency', 'Throatseeker', 'Shredding Force', 'Desensitisation'
];

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const clone = value => JSON.parse(JSON.stringify(value));

function currentRawCandidates() {
  const rows = [...document.querySelectorAll('#frontAnointTable tbody tr')];
  return rows.map((row, index) => {
    const cells = row.querySelectorAll('td');
    const name = cells[1]?.querySelector('b')?.textContent?.trim();
    const allocated = !!row.querySelector('.anointAllocated') || /TREE|ALLOCATED/i.test(row.textContent || '');
    const rawGain = Number.parseFloat(cells[3]?.textContent || '0') || 0;
    return {name, allocated, rawGain, rawRank: index + 1};
  }).filter(x => x.name);
}

function topoFor(name) {
  return topology?.candidates?.[name] || null;
}

function rawFor(name) {
  return currentRawCandidates().find(x => x.name === name) || null;
}

function isTopologyVerified() {
  return topology?.status === 'verified';
}

function isNatural(t) {
  return isTopologyVerified() && t?.classification === 'natural';
}

function isAllocated(name, t = topoFor(name)) {
  if (isTopologyVerified() && t) return !!t.allocated || t.classification === 'allocated';
  return !!rawFor(name)?.allocated;
}

function modelGainFor(name) {
  const raw = rawFor(name);
  if (raw) return Math.max(0, raw.rawGain || 0);
  if (name === 'Invocated Efficiency' && window.v44GetCfg && window.v44Model) {
    try {
      const cfg = clone(window.v44GetCfg());
      const before = window.v44Model(cfg);
      cfg.inc = (cfg.inc || 0) + 0.40;
      const after = window.v44Model(cfg);
      return before?.dps > 0 ? Math.max(0, (after.dps / before.dps - 1) * 100) : 0;
    } catch (e) {}
  }
  if (name === 'Arcane Blossom' && window.v44GetCfg && window.v44Model) {
    try {
      const cfg = clone(window.v44GetCfg());
      const before = window.v44Model(cfg);
      cfg.rr = (cfg.rr || 0) + 0.15;
      const after = window.v44Model(cfg);
      return before?.dps > 0 ? Math.max(0, (after.dps / before.dps - 1) * 100) : 0;
    } catch (e) {}
  }
  return 0;
}

function leadInUtility(node) {
  const name = String(node?.name || '').toLowerCase();
  const stats = (node?.stats || []).join(' ').toLowerCase();
  if (name.includes('jewel') && name.includes('socket')) return 1.00;
  if (stats.includes('mana regeneration')) return 1.00;
  if (stats.includes('triggered') && stats.includes('spell') && stats.includes('damage')) return 1.00;
  if (stats.includes('critical hit chance') && stats.includes('spell')) return 0.85;
  if (stats.includes('critical spell damage') || stats.includes('critical damage bonus')) return 0.75;
  if (name === 'attribute' || stats.includes('+5 to any')) return 0.35;
  if (stats.includes('armour') && (stats.includes('energy shield') || stats.includes('recharge'))) return 0.45;
  if (stats.includes('physical damage')) return 0.00;
  return 0.20;
}

function routeQuality(t) {
  const leadIns = t?.leadIns || [];
  if (!leadIns.length) return {count:0, useful:0, deadEq:0, usefulPct:1, label:'DIRECT'};
  const useful = leadIns.reduce((sum, node) => sum + leadInUtility(node), 0);
  const deadEq = Math.max(0, leadIns.length - useful);
  const usefulPct = useful / leadIns.length;
  const label = usefulPct >= 0.72 ? 'HIGH-VALUE PATH' : usefulPct >= 0.42 ? 'MIXED PATH' : 'DEAD-HEAVY PATH';
  return {count:leadIns.length, useful, deadEq, usefulPct, label};
}

function instilScore(name) {
  const meta = META[name];
  const t = topoFor(name);
  if (!meta || isAllocated(name, t)) return null;
  if (isTopologyVerified() && (!t?.reachable || isNatural(t))) return null;
  const q = routeQuality(t);
  const rawGain = modelGainFor(name);
  return meta.effect + Math.min(q.deadEq, 10) * 0.45 + Math.min(rawGain, 25) * 0.08;
}

function efficiencyPackage() {
  return ORDER
    .map(name => ({name, score: instilScore(name), t: topoFor(name)}))
    .filter(x => x.score != null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(x => x.name);
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
    <div class="callout"><strong>Build identity:</strong> Mana regen → Flare sustain + Rage regen → Druidic Champion more Spell Damage. Recovery is therefore a first-class offensive stat rather than a tax paid after damage is built.</div>`;
  if (target) target.insertAdjacentElement('afterend', wrap);
  else sec.appendChild(wrap);
}

function upgradeStrugglescreamScoring() {
  const sec = $('anoints');
  if (!sec || sec.querySelector('.v47PathScore')) return;
  const wrap = document.createElement('div');
  wrap.className = 'v47PathScore';
  wrap.innerHTML = `
    <h3 class="subhead">Verified topology · effect value + dead-equivalent travel actually avoided</h3>
    <div class="frontAnointHero">
      <article class="bestPack"><span>EFFICIENCY-FIRST 4-SLOT PACKAGE</span><b id="v47EffCombo">—</b><p id="v47EffNames">Loading current-tree routes…</p></article>
      <article><span id="v47TopoStatus">TOPOLOGY LOADING</span><b id="v47TopoHeadline">Use the current allocated tree, not guesses</b><p id="v47TopoRule">The page is decoding the live poe.ninja Path of Building tree and measuring each notable against GGG's official passive-tree graph.</p></article>
    </div>
    <div class="tableWrap"><table><thead><tr><th>Candidate</th><th>Effect value</th><th>Exact route from current tree</th><th>New points</th><th>Travel quality / score</th><th>Action</th></tr></thead><tbody id="v47TopoRows"><tr><td colspan="6">Loading verified topology…</td></tr></tbody></table></div>
    <div class="formula" id="v47TopoFormula">Eligibility: already allocated = never instil. 1–3 new points = naturally pathable, so path it. 4–5 = nearby comparison. 6+ = remote.

Topology bonus is NOT raw distance. Each intervening node is weighted for this EB Mana-Flare build: Mana regen / Triggered Spell Damage / Jewel sockets are high-value travel; spell crit and CDB are useful; attributes are minor; Armour/ES branches are partial; Physical Damage and EB-useless recharge are low-value.

Instil score = effect value + 0.45 × dead-equivalent travel avoided + 0.08 × current model-DPS gain. Useful travel reduces the Strugglescream bonus instead of increasing it.</div>
    <div class="callout" id="v47TopoCallout"><strong>No invented travel tax:</strong> exact path length and intervening node stats come from the current PoB allocation plus GGG's official passive-tree export. Controlling Magic is one point directly off an allocated Spell Critical Chance small, so it is a path node, not an instil slot.</div>`;
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
    h.textContent = 'Raw DPS comparator · use only after topology eligibility';
    raw.insertAdjacentElement('beforebegin', h);
  }
}

function compactStats(stats) {
  const text = (stats || []).join('; ');
  return text.length > 180 ? `${text.slice(0, 177)}…` : text;
}

function routeHtml(t) {
  if (!t) return '<span class="tier test">WAITING</span>';
  if (!t.found) return '<span class="tier test">NOT FOUND</span><br><small>GGG graph did not return this exact notable name.</small>';
  if (!t.reachable) return '<span class="tier test">UNREACHABLE</span>';
  if (t.allocated) return '<strong>Already allocated</strong><br><small>No travel required.</small>';
  const path = (t.path || []).map((node, index) => {
    const marker = index === 0 ? 'TREE' : (index === t.path.length - 1 ? 'TARGET' : 'NEW');
    return `${esc(node.name)} <small>[${marker}]</small>`;
  }).join(' → ');
  const lead = (t.leadIns || []).map(node => {
    const stats = compactStats(node.stats);
    const utility = leadInUtility(node);
    const tag = utility >= .72 ? 'useful' : utility >= .35 ? 'partial' : 'low';
    return `<div><b>${esc(node.name)}</b> <small>[${tag}]</small>${stats ? `<small>${esc(stats)}</small>` : ''}</div>`;
  }).join('');
  return `<div class="v47RoutePath">${path}</div>${lead ? `<div class="v47LeadIns"><small>Intervening new nodes:</small>${lead}</div>` : '<small>Directly adjacent to the current allocated tree.</small>'}`;
}

function badgeFor(t) {
  if (!t) return '<span class="tier test">LOADING</span>';
  if (t.classification === 'allocated') return '<span class="tier b">TREE</span>';
  if (t.classification === 'natural') return '<span class="tier a">NATURAL</span>';
  if (t.classification === 'nearby') return '<span class="tier test">NEARBY</span>';
  if (t.classification === 'remote') return '<span class="tier s">REMOTE</span>';
  return '<span class="tier test">CHECK</span>';
}

function actionFor(name, t) {
  if (!t) return 'Waiting for exact route.';
  if (isAllocated(name, t)) return '<strong>TREE — DO NOT INSTIL.</strong> Spend the Strugglescream slot elsewhere.';
  if (t.classification === 'natural') return `<strong>PATH IT — DO NOT INSTIL.</strong> Only ${t.newPoints} new passive point${t.newPoints === 1 ? '' : 's'} from the current allocated tree.`;
  const q = routeQuality(t);
  if (t.classification === 'nearby' && q.usefulPct >= .65) return `<strong>PATH LEAN.</strong> ${t.newPoints} points away, but ${Math.round(q.usefulPct*100)}% of the travel is useful to this build. Do not reward Strugglescream for skipping good nodes.`;
  if (t.classification === 'nearby') return `<strong>COMPARE.</strong> ${t.newPoints} real points away with ${q.deadEq.toFixed(1)} dead-equivalent travel points.`;
  if (t.classification === 'remote' && q.usefulPct >= .72) return `<strong>REMOTE, BUT VALUE-RICH.</strong> ${t.newPoints} points away; much of the route is useful, so compare real passive spend against the instil slot.`;
  if (t.classification === 'remote') return `<strong>INSTIL CANDIDATE.</strong> ${t.newPoints} points away and ${q.deadEq.toFixed(1)} dead-equivalent travel points are actually avoided.`;
  return 'Route could not be verified; do not assign a topology bonus.';
}

function renderTopologyRows() {
  const host = $('v47TopoRows');
  if (!host) return;
  if (!topology?.candidates) {
    host.innerHTML = '<tr><td colspan="6">Topology data unavailable. No provisional path score is being invented.</td></tr>';
    return;
  }

  host.innerHTML = ORDER.map(name => {
    const meta = META[name];
    const t = topoFor(name);
    const q = routeQuality(t);
    const score = instilScore(name);
    const points = Number.isFinite(t?.newPoints) ? t.newPoints : '—';
    const gain = modelGainFor(name);
    const scoreText = score == null
      ? (isAllocated(name, t) ? 'INELIGIBLE' : (isNatural(t) ? 'PATH IT' : '—'))
      : `${score.toFixed(2)} · ${q.deadEq.toFixed(1)} dead-eq · ${gain.toFixed(1)}% model`;
    return `<tr data-topology-name="${esc(name)}">
      <td><b>${esc(name)}</b>${meta.recipe !== '—' ? `<br><small>Instil: ${esc(meta.recipe)}</small>` : ''}</td>
      <td><b>${meta.effect.toFixed(1)} / 5</b><br><small>${esc(meta.detail)}</small></td>
      <td>${routeHtml(t)}</td>
      <td><b>${points}</b>${t?.allocated ? '<br><small>already owned</small>' : '<br><small>including the notable</small>'}</td>
      <td>${badgeFor(t)}<br><small>${esc(q.label)} · ${Math.round(q.usefulPct*100)}% useful travel</small><br><small>${esc(scoreText)}</small></td>
      <td>${actionFor(name, t)}</td>
    </tr>`;
  }).join('');
}

function updateEfficiencyPackage() {
  const names = efficiencyPackage();
  const nameEl = $('v47EffNames');
  const combo = $('v47EffCombo');
  if (nameEl) nameEl.textContent = names.length ? names.join(' · ') : 'No verified non-natural candidates loaded';
  if (combo) combo.textContent = `${names.length}/4 slots · topology-filtered`;

  const cm = topoFor('Controlling Magic');
  const status = $('v47TopoStatus');
  const headline = $('v47TopoHeadline');
  const rule = $('v47TopoRule');
  if (status) status.textContent = isTopologyVerified() ? 'VERIFIED CURRENT-TREE TOPOLOGY' : `${String(topology?.status || 'UNAVAILABLE').toUpperCase()} TOPOLOGY`;
  if (headline) {
    headline.textContent = isNatural(cm)
      ? `Controlling Magic: path it — ${cm.newPoints} point${cm.newPoints === 1 ? '' : 's'}`
      : 'Use the current allocated tree, not guesses';
  }
  if (rule && topology) {
    rule.textContent = `${topology.matchedAllocatedNodeCount ?? '—'} / ${topology.allocatedNodeCount ?? '—'} current PoB node IDs matched against GGG's official graph. Useful lead-ins reduce the instil score; they are not counted as dead travel.`;
  }
}

function annotateRawRows() {
  document.querySelectorAll('#frontAnointTable .v47TopoBadge').forEach(x => x.remove());
  [...document.querySelectorAll('#frontAnointTable tbody tr')].forEach(row => {
    const nameCell = row.querySelector('td:nth-child(2)');
    const name = nameCell?.querySelector('b')?.textContent?.trim();
    if (!name) return;
    const t = topoFor(name);
    if (!t || !isTopologyVerified()) return;
    const badge = document.createElement('span');
    badge.className = 'tier v47TopoBadge';
    badge.style.marginLeft = '6px';
    if (t.classification === 'allocated') {
      badge.classList.add('b'); badge.textContent = 'TREE';
    } else if (t.classification === 'natural') {
      badge.classList.add('a'); badge.textContent = `PATH IT · ${t.newPoints}PT`;
    } else if (t.classification === 'nearby') {
      badge.classList.add('test'); badge.textContent = `NEARBY · ${t.newPoints}PT`;
    } else if (t.classification === 'remote') {
      badge.classList.add('s'); badge.textContent = `REMOTE · ${t.newPoints}PT`;
    } else return;
    nameCell.appendChild(badge);
  });
}

function addSources() {
  const list = document.querySelector('#rSources .sourceList');
  if (!list) return;
  const sources = [
    ['https://github.com/grindinggear/poe2-skilltree-export','GGG — official PoE2 passive-tree export','Authoritative node IDs, connections, names and stats used for exact shortest-path topology.'],
    ['https://poe.ninja/poe2/pob/raw/profile/code/DaSilkRoad-5508/runesofaldur/ToaBBMcy','poe.ninja — current raw PoB','Current allocated passive node IDs used as the topology origin.'],
    ['https://poe2db.tw/us/Invocated_Efficiency','PoE2DB — Invocated Efficiency','Instil recipe and 40% Triggered Spell Damage notable effect.'],
    ['https://poe2db.tw/us/Ruinic_Helm','PoE2DB — Ruinic Helm instil','Instil recipe and notable effect.'],
    ['https://poe2db.tw/us/Arcane_Blossom','PoE2DB — Arcane Blossom instil','Instil recipe and 15% increased Mana Recovery Rate.']
  ];
  for (const [href,title,small] of sources) {
    if ([...list.querySelectorAll('a')].some(a => a.href === href)) continue;
    const a = document.createElement('a');
    a.href = href; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = `${title}<small>${small}</small>`;
    list.appendChild(a);
  }
}

async function loadTopology() {
  try {
    const response = await fetch(`./data/topology.json?t=${Date.now()}`, {cache:'no-store'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    topology = await response.json();
  } catch (error) {
    topology = {status:'unavailable', syncError:String(error), candidates:{}};
  }
  renderTopologyRows();
  updateEfficiencyPackage();
  annotateRawRows();
}

function install() {
  upgradeCoreLoop();
  upgradeStrugglescreamScoring();
  renderTopologyRows();
  updateEfficiencyPackage();
  annotateRawRows();
  addSources();
}

install();
loadTopology();
window.addEventListener('v44calc', () => {
  renderTopologyRows();
  updateEfficiencyPackage();
  annotateRawRows();
});
setTimeout(install, 0);
})();
