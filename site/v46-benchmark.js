(() => {
'use strict';
const $ = id => document.getElementById(id);

function addBenchmark() {
  const sec = $('rRegen');
  if (!sec || sec.querySelector('.v46EndgameBenchmark')) return;
  const wrap = document.createElement('div');
  wrap.className = 'v46EndgameBenchmark';
  wrap.innerHTML = `
    <h3 class="subhead">Endgame precedent: the regen route can get enormous</h3>
    <div class="grid3">
      <article class="card accentBlue"><h3>Published Mana-Flare benchmark</h3><p>A current Mana Flare Shaman endgame guide reports roughly <strong>7–8k Mana regeneration per second</strong> at around <strong>20k maximum Mana</strong>. That proves the regen engine can become huge — but even 8k/s is still below the <strong>10k/s</strong> needed to restore two completely full 20k-Mana Flares every second using regeneration alone.</p></article>
      <article class="card"><h3>How it reaches that number</h3><p>The benchmark stacks almost <strong>300% increased Mana Regeneration Rate from two rings + amulet</strong>, <strong>Clarity II = 50% increased Mana Regen</strong>, and near-permanent <strong>Arcane Surge = 20% more Mana Regeneration Rate</strong>, plus passive-tree scaling. "More" is multiplicative, making Arcane Surge unusually valuable after the additive regen stack is already large.</p></article>
      <article class="card"><h3>The structural trick: remove full MoM</h3><p>The endgame setup does <strong>not</strong> use the Mind Over Matter keystone. Instead it assembles damage-taken-from-Mana-before-Life on gear/jewels so it can keep Mana defence without eating MoM's <strong>50% less Mana Recovery Rate</strong>. That is the clearest long-term path to a genuine high-frequency Mana Geyser.</p></article>
    </div>
    <div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Layer</th><th>What it gives</th><th>Mana Geyser take</th></tr></thead><tbody>
      <tr><td><b>Rare rings + amulet</b></td><td>Benchmark: almost 300% increased Mana Regen combined</td><td>Established endgame route. High-tier jewellery regen is much more scalable than trying to force spell Mana leech.</td></tr>
      <tr><td><b>Clarity II</b></td><td>50% increased Mana Regeneration Rate while supported Persistent Buff is active</td><td>Very efficient additive layer and should be considered part of the mature recovery package.</td></tr>
      <tr><td><b>Arcane Surge</b></td><td>15% increased Cast Speed + 20% <em>more</em> Mana Regeneration Rate</td><td>High priority because it multiplies the regen stack. A crit-heavy carrier setup is naturally good at maintaining Surge through suitable support/passive routes.</td></tr>
      <tr><td><b>Efficient Killing / on-kill recovery</b></td><td>Published setup recovers 4% maximum Mana on kill</td><td>Mapping sustain, not boss sustain. Keep separate from the single-target regen calculation.</td></tr>
      <tr><td><b>Mana Remnants</b></td><td>Additional flat/overflow recovery from pickups</td><td>Another independent layer; good for mapping and burst refill, but pickup cadence should not be treated as guaranteed boss regen.</td></tr>
      <tr><td><b>Mind Over Matter keystone</b></td><td>100% damage from Mana before Life; 50% less Mana Recovery Rate</td><td><strong>Midgame safety / endgame throughput tax.</strong> At some point the 0.5× recovery penalty becomes more expensive than the defence is worth.</td></tr>
      <tr><td><b>Partial Mana-before-Life on gear/jewels</b></td><td>Retains a Mana defensive layer without the MoM recovery penalty</td><td>Long-term direction to test once enough sources can be assembled safely.</td></tr>
    </tbody></table></div>
    <div class="callout"><strong>Strugglescream is not automatically endgame BiS.</strong> The published endgame route uses a rare Corona Amulet with Mana / regeneration / defensive affixes. For us, Strugglescream remains compelling when four instils save enough dead travel points — especially Ruinic Helm — but its real comparison is <em>four remote notables + passive points saved</em> versus a high-end rare amulet's raw Mana and recovery.</div>
    <div class="callout"><strong>Revised recovery hierarchy:</strong> first fix the MoM penalty when the character is ready, then stack jewellery regen + Clarity II + Arcane Surge, then add Recovery Rate / Remnants / situational flask or recoup layers. Mana leech stays an experiment, not the core plan.</div>
  `;
  sec.appendChild(wrap);
}

function addSources() {
  const list = document.querySelector('#rSources .sourceList');
  if (!list) return;
  const sources = [
    ['https://www.poe-vault.com/poe2/druid/shaman/mana-flare-build-guide','PoE Vault — Mana Flare Shaman endgame benchmark','Published recovery precedent: ~7–8k Mana regen/s, ~20k Mana, almost 300% jewellery regen, and no full MoM keystone.'],
    ['https://poe2db.tw/us/Clarity_II','PoE2DB — Clarity II','50% increased Mana Regeneration Rate while a supported Persistent Buff is active.'],
    ['https://poe2db.tw/us/Arcane_Surge','PoE2DB — Arcane Surge','15% increased Cast Speed and 20% more Mana Regeneration Rate.']
  ];
  sources.forEach(([href,title,small]) => {
    if ([...list.querySelectorAll('a')].some(a => a.href === href)) return;
    const a = document.createElement('a');
    a.href = href; a.target = '_blank';
    a.innerHTML = `${title}<small>${small}</small>`;
    list.appendChild(a);
  });
}

addBenchmark();
addSources();
})();
