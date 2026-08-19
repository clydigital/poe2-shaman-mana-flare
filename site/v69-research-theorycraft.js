(() => {
'use strict';

function css(){
  if(document.getElementById('v69ResearchCss'))return;
  const s=document.createElement('style');
  s.id='v69ResearchCss';
  s.textContent=`
  #researchPage .v69Theory{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:50px 18px;border-top:1px solid var(--v64-border,var(--line));scroll-margin-top:100px}
  #researchPage .v69Theory h2{font-size:clamp(34px,4.5vw,60px);line-height:.96;letter-spacing:-.045em;margin:0 0 12px}
  #researchPage .v69Theory h3{font-size:16px;margin:24px 0 8px}
  #researchPage .v69Intro{max-width:920px;font-size:11px;line-height:1.62;color:var(--v64-muted,#a79a86)}
  #researchPage .v69Stats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:15px 0}
  #researchPage .v69Stat,#researchPage .v69Card{border:1px solid var(--v64-border,var(--line));border-radius:14px;background:linear-gradient(145deg,var(--v64-surface1,#1b130e),var(--v64-surface2,#100b09));padding:12px}
  #researchPage .v69Stat span,#researchPage .v69Card>span{display:block;font-size:7px;letter-spacing:.11em;text-transform:uppercase;color:var(--v64-accent,#82c3e7);font-weight:950}
  #researchPage .v69Stat b{display:block;font-size:23px;color:var(--v64-warm,#e5c88f);margin:4px 0}
  #researchPage .v69Stat p,#researchPage .v69Card p{font-size:8.8px;line-height:1.5;color:var(--v64-muted,#a79a86);margin:0}
  #researchPage .v69Grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:13px 0}
  #researchPage .v69Grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}
  #researchPage .v69Card.hot{border-color:color-mix(in srgb,var(--v64-accent,#7fc4e9) 52%,transparent);box-shadow:inset 0 0 30px color-mix(in srgb,var(--v64-glow,#3286b4) 11%,transparent)}
  #researchPage .v69Card.warn{border-color:rgba(211,164,79,.42)}
  #researchPage .v69Card h3{font-size:13px;margin:5px 0 7px}
  #researchPage .v69Table{width:100%;overflow:auto;margin:12px 0;border:1px solid var(--v64-border,var(--line));border-radius:14px}
  #researchPage .v69Table table{width:100%;min-width:700px;border-collapse:collapse}
  #researchPage .v69Table th,#researchPage .v69Table td{padding:10px 11px;border-bottom:1px solid var(--v64-border,var(--line));font-size:8.5px;text-align:left;vertical-align:top}
  #researchPage .v69Table th{color:var(--v64-accent,#82c3e7);text-transform:uppercase;letter-spacing:.08em;background:rgba(0,0,0,.14)}
  #researchPage .v69Table td{color:var(--v64-muted,#a79a86)}
  #researchPage .v69Table td strong{color:var(--v64-text,#eadfce)}
  #researchPage .v69Verdict{font-size:11px;line-height:1.62;color:var(--v64-text,#eadfce);border-left:3px solid var(--v64-accent,#78bee5);padding:12px 14px;background:color-mix(in srgb,var(--v64-glow,#3788b4) 9%,transparent);border-radius:0 12px 12px 0;margin:13px 0}
  #researchPage .v69Order{counter-reset:v69;display:grid;gap:7px;margin-top:12px}
  #researchPage .v69Order div{position:relative;padding:10px 11px 10px 43px;border:1px solid var(--v64-border,var(--line));border-radius:12px;background:linear-gradient(145deg,var(--v64-surface1,#1b130e),var(--v64-surface2,#100b09));font-size:9px;line-height:1.46;color:var(--v64-muted,#a79a86)}
  #researchPage .v69Order div:before{counter-increment:v69;content:counter(v69);position:absolute;left:10px;top:9px;width:23px;height:23px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,var(--v64-deep,#285d80),var(--v64-accent,#7fc4e9));color:#fff;font-size:8px;font-weight:950}
  #researchPage .v69Order b{color:var(--v64-text,#eadfce)}
  #researchPage .v69Source{font-size:8px;line-height:1.55;color:#887c6c;margin-top:18px}
  #researchPage .v69Source a{color:var(--v64-accent,#82c3e7)}
  @media(max-width:900px){#researchPage .v69Stats{grid-template-columns:repeat(3,1fr)}#researchPage .v69Grid,#researchPage .v69Grid.three{grid-template-columns:1fr 1fr}#researchPage .v69Theory{width:calc(100% - 26px)}}
  @media(max-width:600px){#researchPage .v69Stats,#researchPage .v69Grid,#researchPage .v69Grid.three{grid-template-columns:1fr}}
  `;
  document.head.appendChild(s);
}

function mount(){
  const rp=document.getElementById('researchPage');
  if(!rp||document.getElementById('rBudgetVs20kV69'))return false;
  css();
  document.getElementById('rBudgetVs20k')?.remove();

  const sec=document.createElement('section');
  sec.id='rBudgetVs20kV69';
  sec.className='v69Theory';
  sec.innerHTML=`
    <div class="kicker">BUDGET SHAMAN VS 20K · RAGE / DEFENCE / SPIRIT</div>
    <h2>Why our smaller Mana stack can still work</h2>
    <p class="v69Intro">The 20k Mana Flare endpoint wins by letting Runeseeker's Call multiply six Perfect Mind runes, then surrounding that pool with cultivated Rathpith, premium ES-to-Mana gear and extreme regeneration. Our Runeseeker-free version deliberately gives up that shortcut. The compensation is Rage, Mystical Rage, gain-as-extra, triggered-spell damage, penetration, Strugglescream flexibility and a Mana pool we can realistically refill.</p>

    <div class="v69Stats">
      <article class="v69Stat"><span>Live level</span><b>57</b><p>Fresh poe.ninja checkpoint.</p></article>
      <article class="v69Stat"><span>Current Mana</span><b>2,360</b><p>Permanent displayed pool.</p></article>
      <article class="v69Stat"><span>Maximum Rage</span><b>43</b><p>30 base + 6 tree + 7 Furious Wellspring.</p></article>
      <article class="v69Stat"><span>Current Spirit</span><b>140</b><p>Missing +40 Spirit quest reward.</p></article>
      <article class="v69Stat"><span>Frost Darts crit</span><b>53%</b><p>1.9 casts/s · 191% CDB.</p></article>
    </div>

    <h3>What our build does differently from the 20k version</h3>
    <div class="v69Grid">
      <article class="v69Card"><span>20K ENDPOINT</span><h3>Mana itself becomes the whole engine</h3><p>Six Perfect Mind runes in Runeseeker contribute roughly 1,620 flat Mana plus 90% increased maximum Mana through Wisdom of the Maji. Once that much Mana-linked damage exists, the Rage ascendancy pair becomes expendable and can be traded for defence.</p></article>
      <article class="v69Card hot"><span>OUR ~50D THESIS</span><h3>Stack independent multipliers instead</h3><p>We keep Druidic Champion + Furious Wellspring longer, add Mystical Rage, preserve gain-as-extra and trigger scaling, then add Rathpith only when recovery can support it. The target is not 20k Mana; it is the strongest recoverable 6–7k pool we can actually fund.</p></article>
    </div>

    <h3>Realistic permanent Mana target</h3>
    <div class="v69Table"><table><thead><tr><th>Permanent Mana</th><th>Read</th><th>Decision</th></tr></thead><tbody>
      <tr><td><strong>4k</strong></td><td>First proper Archmage / Strugglescream checkpoint.</td><td>Functional transition.</td></tr>
      <tr><td><strong>5.5–6.5k</strong></td><td>Strong budget endpoint while still funding recovery, resists and crit.</td><td><strong>Realistic target band.</strong></td></tr>
      <tr><td><strong>6.5–7.5k</strong></td><td>Excellent wand, ES conversion, jewellery and rune outcomes all land efficiently.</td><td><strong>Optimised target.</strong></td></tr>
      <tr><td><strong>~8k</strong></td><td>Several pieces overperform for the budget.</td><td>Stretch/jackpot.</td></tr>
      <tr><td>10k+</td><td>Permanent pool without Runeseeker.</td><td>Do not sacrifice recovery or defence chasing the headline.</td></tr>
    </tbody></table></div>
    <div class="v69Verdict"><strong>Plan around 6k first, optimise toward 7k, and treat 8k as stretch.</strong> Temporary 10k current-Mana overflow for farming Runeseeker is a separate objective from the permanent build.</div>

    <h3>Mystical Rage: effective or nah?</h3>
    <p class="v69Intro">At 43 Rage, Mystical Rage gives <strong>86% increased Spell Damage</strong>. Druidic Champion simultaneously gives about <strong>21% more Spell Damage</strong>. Mystical is additive, so its marginal value shrinks as the Rathpith + Arcane Intensity increased-damage bucket grows. That makes it especially attractive in our budget Mana range.</p>
    <div class="v69Table"><table><thead><tr><th>Max Mana</th><th>Arcane + Rathpith increased bucket</th><th>Mystical +86% marginal gain</th><th>With Druidic's ~21% more</th></tr></thead><tbody>
      <tr><td>4k</td><td>+360%</td><td><strong>+18.7%</strong></td><td><strong>~+43.6%</strong> combined</td></tr>
      <tr><td>5k</td><td>+450%</td><td>+15.6%</td><td>~+39.9%</td></tr>
      <tr><td>6k</td><td>+540%</td><td><strong>+13.4%</strong></td><td><strong>~+37.3%</strong></td></tr>
      <tr><td>7k</td><td>+630%</td><td>+11.8%</td><td>~+35.3%</td></tr>
      <tr><td>8k</td><td>+720%</td><td>+10.5%</td><td>~+33.7%</td></tr>
      <tr><td>20k</td><td>+1800%</td><td>+4.5%</td><td>~+26.5%</td></tr>
    </tbody></table></div>
    <div class="v69Verdict"><strong>Mystical Rage is not bait for this build.</strong> It is a budget compensator. A sensible Strugglescream package can therefore include Invocated Efficiency + Mystical Rage once sustain nodes are sufficient.</div>

    <h3>The catch: can we actually stay at 43 Rage?</h3>
    <div class="v69Grid">
      <article class="v69Card"><span>FURIOUS WELLSPRING</span><h3>Current passive-only supply</h3><p>43 maximum Rage × 6% = 2.58 base Rage/s. Using the current tree's Mana-regeneration-rate modifiers gives roughly 6.68 Rage/s while moving or 4.75/s while stationary before gear.</p></article>
      <article class="v69Card warn"><span>CURRENT FROST DARTS</span><h3>Carrier can demand 9.5 Rage/s</h3><p>At 1.9 casts/s, the +5 Rage skill cost is already 9.5 Rage/s if every manual cast pays it. Full-Rage uptime therefore has to be measured in a real boss test rather than assumed from the 43 maximum.</p></article>
    </div>

    <h3>Defensive ascendancy: what do we gain?</h3>
    <p class="v69Intro">Reactive Growth gives 10% less Elemental Damage taken and Adaptation. Avatar of Evolution doubles each matching Adaptation to 20% less, keeps stacks for 5 seconds and converts 15% of Physical Damage taken into elemental types.</p>
    <div class="v69Table"><table><thead><tr><th>Repeated same-element state</th><th>Damage received</th><th>Effective reduction</th><th>Approx max-hit gain</th></tr></thead><tbody>
      <tr><td>First hit / no stack</td><td>90%</td><td>10% less</td><td>×1.11</td></tr>
      <tr><td>1 matching Adaptation</td><td>72%</td><td><strong>28% less</strong></td><td>×1.39</td></tr>
      <tr><td>2 matching Adaptations</td><td>54%</td><td><strong>46% less</strong></td><td>×1.85</td></tr>
      <tr><td>3 matching Adaptations</td><td>36%</td><td><strong>64% less</strong></td><td><strong>×2.78</strong></td></tr>
    </tbody></table></div>
    <div class="v69Grid">
      <article class="v69Card hot"><span>WHEN RESISTS ARE CAPPED</span><h3>Physical conversion becomes real defence</h3><p>At 75/75/75 elemental resistance, converting 15% of physical damage evenly into elements removes about 11.25% of the raw physical hit before Armour and leaves Armour handling a smaller physical portion.</p></article>
      <article class="v69Card warn"><span>RIGHT NOW</span><h3>14 / 10 / 55 is still the bigger issue</h3><p>At the current Fire/Cold/Lightning resistances, the same conversion only removes around 4% of the raw physical hit before Armour. Cap Fire and Cold first; the defensive ascendancy becomes much more valuable after that.</p></article>
    </div>
    <div class="v69Verdict"><strong>Keep Rage while damage is budget-constrained.</strong> Once ~7–8k Mana or actual boss damage makes the Rage multiplier unnecessary, Reactive Growth + Avatar becomes a very credible final pinnacle-defence respec.</div>

    <h3>Spirit: Arctic Armour vs Eternal Rage vs Cast on Critical + Comet</h3>
    <div class="v69Table"><table><thead><tr><th>Available Spirit</th><th>What cleanly fits before quality/support reservation</th><th>Interpretation</th></tr></thead><tbody>
      <tr><td><strong>140 now</strong></td><td>One 100-Spirit engine + one 30-Spirit utility.</td><td>Very constrained.</td></tr>
      <tr><td><strong>180 after missing quest</strong></td><td>Archmage 100 + Remnants 30 + Arctic Armour 30 = 160.</td><td><strong>Best near-term shell.</strong></td></tr>
      <tr><td><strong>220</strong></td><td>Archmage + CoC or Archmage + Eternal Rage = 200.</td><td>Only 20 remains before efficiency.</td></tr>
      <tr><td><strong>260</strong></td><td>Archmage + one 100-Spirit engine + Remnants + Arctic = 260.</td><td>Possible through Sacred Flow if enough Charm slots are empty.</td></tr>
    </tbody></table></div>

    <div class="v69Grid three">
      <article class="v69Card hot"><span>#1 · 30 SPIRIT</span><h3>Arctic Armour</h3><p>Best value per Spirit. Chill/Freeze control, melee retaliation, 11% base crit and another safe Mana-Flare trigger path. It improves defence without creating a new Mana sink.</p></article>
      <article class="v69Card"><span>#2 · 100 SPIRIT</span><h3>Eternal Rage</h3><p>At gem level 14 it adds 3.5 flat Rage/s. This is a strong transition stabiliser only if Frost Darts is actually draining Rage faster than Furious Wellspring replaces it. Its value is the damage it protects by keeping Druidic Champion and Mystical Rage near full.</p></article>
      <article class="v69Card warn"><span>#3 · 100 SPIRIT</span><h3>Cast on Critical + Comet</h3><p>Late luxury damage branch. CoC Energy depends partly on how much of the enemy's Ailment Threshold the crit represents, so our high crit chance does not automatically guarantee fast boss Comets. Comet also introduces another Mana-consuming spell into an already recovery-limited engine.</p></article>
    </div>
    <div class="v69Verdict"><strong>Current ranking: Arctic Armour first → Eternal Rage only if the live Rage bar falls → CoC Comet after 6k+ Mana and recovery are solved.</strong> Eternal Rage can later be removed if mature Mana regen keeps 43 Rage up without help.</div>

    <h3>Recommended test order</h3>
    <div class="v69Order">
      <div><b>Fix Fire/Cold resistance and claim the missing +40 Spirit.</b></div>
      <div><b>Add Arctic Armour.</b> It is the cheapest, lowest-risk Spirit improvement.</div>
      <div><b>Measure Rage during continuous Frost Darts + Mana Flare.</b> Do not assume full Rage.</div>
      <div><b>If Rage falls, test Eternal Rage from level 58.</b> Then test Mystical Rage with real full-Rage uptime.</div>
      <div><b>Push permanent Mana through 4k → 6k → 7k while scaling percentage recovery.</b></div>
      <div><b>At 6k+, A/B CoC Comet.</b> Reject it if it lowers current Mana or Flare frequency enough to erase the extra spell damage.</div>
      <div><b>At 7–8k or comfortable boss DPS, A/B Reactive + Avatar against the Rage pair.</b></div>
    </div>

    <div class="v69Source">Sources: <a href="https://www.poe-vault.com/poe2/druid/shaman/mana-flare-build-guide" target="_blank" rel="noopener">POE Vault 20k Mana Flare Shaman</a> · <a href="https://www.poe2wiki.net/wiki/Shaman" target="_blank" rel="noopener">Shaman ascendancy</a> · <a href="https://poe2ref.com/passives/mystical-rage" target="_blank" rel="noopener">Mystical Rage</a> · <a href="https://www.poe2wiki.net/wiki/Cast_on_Critical" target="_blank" rel="noopener">Cast on Critical</a> · <a href="https://poe2db.tw/us/Comet" target="_blank" rel="noopener">Comet</a> · <a href="https://www.poe2wiki.net/wiki/Eternal_Rage" target="_blank" rel="noopener">Eternal Rage</a> · <a href="https://poe2db.tw/us/Arctic_Armour" target="_blank" rel="noopener">Arctic Armour</a> · <a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank" rel="noopener">live character</a>.</div>
  `;

  const thesis=document.getElementById('rThesis');
  if(thesis)thesis.after(sec);else rp.appendChild(sec);
  return true;
}

if(!mount()){
  const obs=new MutationObserver(()=>{if(mount())obs.disconnect()});
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>obs.disconnect(),7000);
}
})();