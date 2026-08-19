(() => {
'use strict';

function css(){
  if(document.getElementById('v68ResearchCss'))return;
  const s=document.createElement('style');
  s.id='v68ResearchCss';
  s.textContent=`
  #researchPage .v68Theory{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:50px 18px;border-top:1px solid var(--v64-border,var(--line));scroll-margin-top:100px}
  #researchPage .v68Theory h2{font-size:clamp(34px,4.5vw,60px);line-height:.96;letter-spacing:-.045em;margin:0 0 12px}
  #researchPage .v68Theory h3{font-size:16px;margin:24px 0 8px}
  #researchPage .v68Intro{max-width:920px;font-size:11px;line-height:1.62;color:var(--v64-muted,#a79a86)}
  #researchPage .v68Stats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:15px 0}
  #researchPage .v68Stat,#researchPage .v68Card{border:1px solid var(--v64-border,var(--line));border-radius:14px;background:linear-gradient(145deg,var(--v64-surface1,#1b130e),var(--v64-surface2,#100b09));padding:12px}
  #researchPage .v68Stat span,#researchPage .v68Card>span{display:block;font-size:7px;letter-spacing:.11em;text-transform:uppercase;color:var(--v64-accent,#82c3e7);font-weight:950}
  #researchPage .v68Stat b{display:block;font-size:23px;color:var(--v64-warm,#e5c88f);margin:4px 0}
  #researchPage .v68Stat p,#researchPage .v68Card p,#researchPage .v68Card li{font-size:8.8px;line-height:1.5;color:var(--v64-muted,#a79a86);margin:0}
  #researchPage .v68Grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:13px 0}
  #researchPage .v68Grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}
  #researchPage .v68Card.hot{border-color:color-mix(in srgb,var(--v64-accent,#7fc4e9) 52%,transparent);box-shadow:inset 0 0 30px color-mix(in srgb,var(--v64-glow,#3286b4) 11%,transparent)}
  #researchPage .v68Card.warn{border-color:rgba(211,164,79,.42)}
  #researchPage .v68Card h3{font-size:13px;margin:5px 0 7px}
  #researchPage .v68Card ul{padding-left:17px;margin:7px 0 0}
  #researchPage .v68Table{width:100%;overflow:auto;margin:12px 0;border:1px solid var(--v64-border,var(--line));border-radius:14px}
  #researchPage .v68Table table{width:100%;min-width:700px;border-collapse:collapse}
  #researchPage .v68Table th,#researchPage .v68Table td{padding:10px 11px;border-bottom:1px solid var(--v64-border,var(--line));font-size:8.5px;text-align:left;vertical-align:top}
  #researchPage .v68Table th{color:var(--v64-accent,#82c3e7);text-transform:uppercase;letter-spacing:.08em;background:rgba(0,0,0,.14)}
  #researchPage .v68Table td{color:var(--v64-muted,#a79a86)}
  #researchPage .v68Table td strong{color:var(--v64-text,#eadfce)}
  #researchPage .v68Verdict{font-size:11px;line-height:1.62;color:var(--v64-text,#eadfce);border-left:3px solid var(--v64-accent,#78bee5);padding:12px 14px;background:color-mix(in srgb,var(--v64-glow,#3788b4) 9%,transparent);border-radius:0 12px 12px 0;margin:13px 0}
  #researchPage .v68Order{counter-reset:v68;display:grid;gap:7px;margin-top:12px}
  #researchPage .v68Order div{position:relative;padding:10px 11px 10px 43px;border:1px solid var(--v64-border,var(--line));border-radius:12px;background:linear-gradient(145deg,var(--v64-surface1,#1b130e),var(--v64-surface2,#100b09));font-size:9px;line-height:1.46;color:var(--v64-muted,#a79a86)}
  #researchPage .v68Order div:before{counter-increment:v68;content:counter(v68);position:absolute;left:10px;top:9px;width:23px;height:23px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,var(--v64-deep,#285d80),var(--v64-accent,#7fc4e9));color:#fff;font-size:8px;font-weight:950}
  #researchPage .v68Order b{color:var(--v64-text,#eadfce)}
  #researchPage .v68Source{font-size:8px;line-height:1.55;color:#887c6c;margin-top:18px}
  #researchPage .v68Source a{color:var(--v64-accent,#82c3e7)}
  @media(max-width:900px){#researchPage .v68Stats{grid-template-columns:repeat(3,1fr)}#researchPage .v68Grid,#researchPage .v68Grid.three{grid-template-columns:1fr 1fr}#researchPage .v68Theory{width:calc(100% - 26px)}}
  @media(max-width:600px){#researchPage .v68Stats,#researchPage .v68Grid,#researchPage .v68Grid.three{grid-template-columns:1fr}}
  `;
  document.head.appendChild(s);
}

function mount(){
  const rp=document.getElementById('researchPage');
  if(!rp||document.getElementById('rBudgetVs20k'))return false;
  css();

  const sec=document.createElement('section');
  sec.id='rBudgetVs20k';
  sec.className='v68Theory';
  sec.innerHTML=`
    <div class="kicker">BUDGET SHAMAN VS 20K · RAGE / DEFENCE / SPIRIT</div>
    <h2>We are not building a smaller Runeseeker character</h2>
    <p class="v68Intro">The 20k Mana Flare endpoint wins by letting Runeseeker's Call multiply six Perfect Mind runes, then surrounding that enormous pool with cultivated Rathpith, premium ES-to-Mana gear and extreme regeneration. Our budget version deliberately gives up that weapon. The compensation is to keep Shaman's Rage engine relevant for longer, use Strugglescream to buy efficient notables, and target a Mana pool that can actually be recovered.</p>

    <div class="v68Stats">
      <article class="v68Stat"><span>Live level</span><b>57</b><p>Fresh poe.ninja checkpoint.</p></article>
      <article class="v68Stat"><span>Current Mana</span><b>2,360</b><p>Permanent displayed pool.</p></article>
      <article class="v68Stat"><span>Maximum Rage</span><b>43</b><p>30 base + 6 tree + 7 Furious Wellspring.</p></article>
      <article class="v68Stat"><span>Current Spirit</span><b>140</b><p>Missing +40 Spirit quest reward.</p></article>
      <article class="v68Stat"><span>Frost Darts crit</span><b>53%</b><p>1.9 casts/s · 191% CDB on poe.ninja.</p></article>
    </div>

    <h3>What actually differs</h3>
    <div class="v68Grid">
      <article class="v68Card"><span>20K ENDPOINT</span><h3>Runeseeker makes Mana the whole answer</h3><p>Six Perfect Mind runes in Runeseeker produce roughly 1,620 flat Mana plus 90% increased maximum Mana through Wisdom of the Maji. The build can then afford to abandon Rage for Reactive Growth + Avatar because its Mana-linked damage is already absurd.</p></article>
      <article class="v68Card hot"><span>OUR ~50D THESIS</span><h3>Use more independent multipliers</h3><p>We lean on Rage, Mystical Rage, gain-as-extra, triggered-spell damage, penetration and later Rathpith to make 6–7k Mana hit above its raw pool size. The goal is not 20k; it is the strongest recoverable Mana pool we can afford.</p></article>
    </div>

    <h3>Realistic permanent Mana</h3>
    <div class="v68Table"><table><thead><tr><th>Mana</th><th>Read</th><th>Decision</th></tr></thead><tbody>
      <tr><td><strong>4k</strong></td><td>First permanent Archmage / Strugglescream checkpoint.</td><td>Functional transition, not finished.</td></tr>
      <tr><td><strong>5.5–6.5k</strong></td><td>Strong budget endpoint with recovery and defence still funded.</td><td><strong>Realistic target band.</strong></td></tr>
      <tr><td><strong>6.5–7.5k</strong></td><td>Excellent Exceptional wand, ES conversion, jewellery and runes all land efficiently.</td><td><strong>Optimised stretch.</strong></td></tr>
      <tr><td><strong>~8k</strong></td><td>Several pieces overperform for the budget.</td><td>Jackpot/stretch, not baseline promise.</td></tr>
      <tr><td>10k+</td><td>Permanent pool without Runeseeker.</td><td>Do not sacrifice recovery/defence chasing the headline.</td></tr>
    </tbody></table></div>
    <div class="v68Verdict"><strong>Target the character around 6k first, 7k when optimised, and treat 8k as stretch.</strong> Temporary 10k current-Mana overflow for farming Runeseeker is a different objective from the permanent build.</div>

    <h3>Mystical Rage: yes, this is where it is actually good</h3>
    <p class="v68Intro">At 43 Rage, Mystical Rage contributes <strong>86% increased Spell Damage</strong>. Druidic Champion simultaneously supplies about <strong>21% more Spell Damage</strong>. Mystical is additive, so its marginal benefit falls as the Rathpith + Arcane Intensity Mana-linked increased-damage bucket grows; that means it is strongest precisely in our budget range.</p>
    <div class="v68Table"><table><thead><tr><th>Max Mana</th><th>Arcane + Rathpith increased bucket</th><th>Mystical Rage marginal gain</th><th>With 21% more Druidic</th></tr></thead><tbody>
      <tr><td>4k</td><td>+360%</td><td><strong>+18.7%</strong></td><td><strong>~+43.6%</strong> combined</td></tr>
      <tr><td>5k</td><td>+450%</td><td>+15.6%</td><td>~+39.9%</td></tr>
      <tr><td>6k</td><td>+540%</td><td><strong>+13.4%</strong></td><td><strong>~+37.3%</strong></td></tr>
      <tr><td>7k</td><td>+630%</td><td>+11.8%</td><td>~+35.3%</td></tr>
      <tr><td>8k</td><td>+720%</td><td>+10.5%</td><td>~+33.7%</td></tr>
      <tr><td>20k</td><td>+1800%</td><td>+4.5%</td><td>~+26.5%</td></tr>
    </tbody></table></div>
    <p class="v68Intro">Those combined figures isolate the Mana-linked increased bucket, so a fully geared character with other increased Spell Damage will get somewhat less. The qualitative answer does not change: <strong>Mystical Rage is a budget compensator, not bait.</strong></p>

    <h3>The catch: can we actually keep 43 Rage?</h3>
    <div class="v68Grid">
      <article class="v68Card"><span>FURIOUS WELLSPRING</span><h3>Current passive-only supply</h3><p>43 maximum Rage × 6% = 2.58 base Rage/s. With the current tree's Mana-regeneration-rate modifiers, that is roughly 6.68/s while moving or 4.75/s while stationary before gear.</p></article>
      <article class="v68Card warn"><span>CURRENT FROST DARTS</span><h3>Carrier alone can demand 9.5/s</h3><p>At 1.9 casts/s, the +5 Rage skill cost is already 9.5 Rage/s if each manual cast pays it. Any additional paid skill events make the budget tighter. Full-Rage uptime needs a live boss test.</p></article>
    </div>

    <h3>Defensive ascendancy: the late-game respec is enormous</h3>
    <p class="v68Intro">Reactive Growth gives 10% less Elemental Damage taken and Adaptation. Avatar of Evolution doubles each matching Adaptation to 20% less, lets stacks persist for 5 seconds, and converts 15% of Physical Damage taken into elemental types.</p>
    <div class="v68Table"><table><thead><tr><th>Repeated same-element state</th><th>Damage received</th><th>Effective reduction</th><th>Approx max-hit gain</th></tr></thead><tbody>
      <tr><td>First hit / no stack</td><td>90%</td><td>10% less</td><td>×1.11</td></tr>
      <tr><td>1 matching Adaptation</td><td>72%</td><td><strong>28% less</strong></td><td>×1.39</td></tr>
      <tr><td>2 matching Adaptations</td><td>54%</td><td><strong>46% less</strong></td><td>×1.85</td></tr>
      <tr><td>3 matching Adaptations</td><td>36%</td><td><strong>64% less</strong></td><td><strong>×2.78</strong></td></tr>
    </tbody></table></div>
    <div class="v68Grid">
      <article class="v68Card hot"><span>WHEN CAPPED</span><h3>Physical conversion becomes real defence</h3><p>At 75/75/75 elemental resistance, converting 15% of physical damage evenly into elements removes about 11.25% of the raw physical hit before Armour, while also shrinking the physical portion Armour must handle.</p></article>
      <article class="v68Card warn"><span>RIGHT NOW</span><h3>14 / 10 / 55 is the bigger problem</h3><p>With the live Fire/Cold/Lightning resistances, the same conversion is only around 4% less raw physical before Armour. Cap Fire and Cold first. The defensive ascendancy gets dramatically better after that.</p></article>
    </div>
    <div class="v68Verdict"><strong>Keep Rage while damage is budget-constrained.</strong> Once ~7–8k Mana or actual boss damage makes the Rage multiplier unnecessary, Reactive Growth + Avatar is an extremely credible final respec for pinnacle survivability.</div>

    <h3>Apocalypse: real synergy, wrong opportunity cost</h3>
    <div class="v68Grid">
      <article class="v68Card"><span>WHY IT TEMPTS US</span><h3>16-ish triggered disasters per activation</h3><p>Apocalypse requires 100 Glory, lasts 12 seconds and triggers one of three elemental disasters every 0.75s. We generate elemental hits easily, and its Spell/Trigger tags mean our spell and triggered-spell scaling can interact with it. It can even be explored as another Mana-Flare carrier.</p></article>
      <article class="v68Card warn"><span>WHY IT LOSES</span><h3>It costs two major ascendancy notables</h3><p>Bringer of the Apocalypse requires Turning of the Seasons. If Sacred Flow + Wisdom stay locked, Apocalypse replaces the entire Rage pair. Later, when Rage is expendable, it competes with the much stronger Reactive + Avatar defensive package.</p></article>
    </div>
    <div class="v68Verdict"><strong>Apocalypse is a separate caster-Shaman branch, not a free bonus.</strong> Keep it as a niche mapping/burst respec experiment rather than the default Mana Geyser route.</div>

    <h3>Spirit: Arctic Armour vs Eternal Rage vs Cast on Critical + Comet</h3>
    <div class="v68Table"><table><thead><tr><th>Available Spirit</th><th>Baseline before quality/support reservation</th><th>Interpretation</th></tr></thead><tbody>
      <tr><td><strong>140 now</strong></td><td>One 100-Spirit engine + one 30-Spirit utility.</td><td>Very constrained.</td></tr>
      <tr><td><strong>180 after missing quest</strong></td><td>Archmage 100 + Remnants 30 + Arctic 30 = 160.</td><td><strong>Best near-term shell.</strong></td></tr>
      <tr><td><strong>220</strong></td><td>Archmage + CoC or Archmage + Eternal = 200.</td><td>Only 20 remains before efficiency.</td></tr>
      <tr><td><strong>260</strong></td><td>Archmage + one 100-Spirit engine + Remnants + Arctic = 260.</td><td>Possible by fully exploiting Sacred Flow, before support reservation.</td></tr>
    </tbody></table></div>

    <div class="v68Grid three">
      <article class="v68Card hot"><span>#1 · 30 SPIRIT</span><h3>Arctic Armour</h3><p>Best value per Spirit. Chill/Freeze control, melee retaliation, 11% base crit and an extra defensive Mana-Flare trigger path. It asks almost nothing from the resource budget.</p></article>
      <article class="v68Card"><span>#2 · 100 SPIRIT</span><h3>Eternal Rage</h3><p>At gem level 14 it adds 3.5 flat Rage/s. Furious Wellspring lets Mana-regeneration-rate scaling apply to Rage regeneration, making this a strong transition stabiliser if Frost Darts is draining Rage faster than the current engine replaces it.</p></article>
      <article class="v68Card warn"><span>#3 · 100 SPIRIT</span><h3>Cast on Critical + Comet</h3><p>Luxury damage test. CoC Energy gain depends partly on the crit hit's share of enemy Ailment Threshold, not crit chance alone. Our carriers currently have low native hit damage, and Comet creates another Mana-consuming spell inside an already recovery-limited engine.</p></article>
    </div>
    <div class="v68Verdict"><strong>Current order: Arctic Armour → Eternal Rage only if the live Rage bar falls → CoC Comet only after 6k+ Mana and recovery are solved.</strong> Eternal Rage can later be removed when Furious Wellspring plus mature Mana regen sustains full Rage without help.</div>

    <h3>Recommended experiment order</h3>
    <div class="v68Order">
      <div><b>Fix resistances + claim the missing +40 Spirit.</b> Fire/Cold caps are worth more survivability than an ascendancy respec at the current checkpoint.</div>
      <div><b>Add Arctic Armour.</b> This is the cheapest Spirit experiment and improves both defence and trigger redundancy.</div>
      <div><b>Measure Rage during continuous Frost Darts + Mana Flare.</b> Do not assume 43 Rage just because 43 is the maximum.</div>
      <div><b>If Rage falls, test Eternal Rage at level 58.</b> Then evaluate Mystical Rage with actual full-Rage uptime.</div>
      <div><b>Push permanent Mana through 4k → 6k → 7k.</b> Scale percentage recovery alongside the pool.</div>
      <div><b>At 6k+, A/B CoC Comet.</b> Reject it immediately if current Mana or Mana-Flare frequency falls enough to erase the extra spell damage.</div>
      <div><b>At 7–8k or comfortable boss damage, A/B Reactive + Avatar.</b> That is the point where trading Rage damage for enormous repeated-element mitigation becomes rational.</div>
      <div><b>Keep Apocalypse in the lab.</b> It is worth testing, but as a separate ascendancy configuration rather than part of the recommended package.</div>
    </div>

    <div class="v68Source">Sources: <a href="https://www.poe-vault.com/poe2/druid/shaman/mana-flare-build-guide" target="_blank" rel="noopener">POE Vault 20k Mana Flare Shaman</a> · <a href="https://www.poe2wiki.net/wiki/Shaman" target="_blank" rel="noopener">Shaman ascendancy</a> · <a href="https://poe2ref.com/passives/mystical-rage" target="_blank" rel="noopener">Mystical Rage</a> · <a href="https://www.poe2wiki.net/wiki/Apocalypse" target="_blank" rel="noopener">Apocalypse</a> · <a href="https://www.poe2wiki.net/wiki/Coc" target="_blank" rel="noopener">Cast on Critical</a> · <a href="https://poe2db.tw/us/Comet" target="_blank" rel="noopener">Comet</a> · <a href="https://www.poe2wiki.net/wiki/Eternal_Rage" target="_blank" rel="noopener">Eternal Rage</a> · <a href="https://poe2db.tw/us/Arctic_Armour" target="_blank" rel="noopener">Arctic Armour</a> · <a href="https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy" target="_blank" rel="noopener">live character</a>.</div>
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
