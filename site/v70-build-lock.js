(() => {
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const A={
 morior:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL01vcmlvckludmljdHVzX00iLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/6674aa4ff6/MoriorInvictus_M.png',
 rath:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9Gb2NpL1VuaXF1ZXMvUmF0aHBpdGhHbG9iZSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/51e4da7cb9/RathpithGlobe.png',
 uhtred:'https://web.poecdn.com/gen/image/WzksMTQseyJmIjoiMkRJdGVtcy9GbGFza3MvVW5pcXVlcy9VaHRyZWRzTGVnYWN5IiwidyI6MSwiaCI6Miwic2NhbGUiOjEsInJlYWxtIjoicG9lMiIsImxldmVsIjoxfV0/870f4285f3/UhtredsLegacy.png',
 waist:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQmVsdHMvVW5pcXVlcy9XYWlzdGdhdGUiLCJ3IjoyLCJoIjoxLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/02bb2a2fb4/Waistgate.png'
};
const img=(src,alt)=>`<img class="v60ItemArt" src="${src}" alt="${alt}" loading="lazy" onerror="this.style.display='none'">`;
function css(){
 if(document.getElementById('v70BuildLockCss'))return;
 const s=document.createElement('style');s.id='v70BuildLockCss';s.textContent=`
 #guidePage #alternatives,#guidePage #currentCheckpoint,#guidePage .sectionNav a[href="#alternatives"],#guidePage .sectionNav a[href="#currentCheckpoint"]{display:none!important}
 .v70LockGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:14px 0}.v70LockCard{border:1px solid var(--v64-border,var(--line));border-radius:15px;background:linear-gradient(145deg,var(--v64-surface1,#19110d),var(--v64-surface2,#0f0b09));padding:14px}.v70LockCard.hot{border-color:color-mix(in srgb,var(--v64-accent,#7fc4e9) 52%,transparent);box-shadow:inset 0 0 30px color-mix(in srgb,var(--v64-glow,#3286b4) 12%,transparent)}.v70LockCard span{display:block;font-size:7px;letter-spacing:.11em;text-transform:uppercase;color:var(--v64-accent,#82c3e7);font-weight:950}.v70LockCard h3{font-size:14px;margin:5px 0 7px}.v70LockCard p,.v70LockCard li{font-size:9px;line-height:1.52;color:var(--v64-muted,#a79a86)}.v70LockCard ul{padding-left:17px;margin:7px 0 0}.v70LockCard strong{color:var(--v64-warm,#e5c88f)}.v70Equation{margin:13px 0;border-left:3px solid var(--v64-accent,#78bee5);padding:12px 14px;background:linear-gradient(135deg,color-mix(in srgb,var(--v64-glow,#3788b4) 13%,var(--v64-surface1,#17100c)),var(--v64-surface2,#0f0b09));font-size:10px;line-height:1.6;color:var(--v64-muted,#b5c6c9)}.v70Equation b{color:var(--v64-text,#eadfce)}.v70ManaBar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:13px 0}.v70ManaBar article{border:1px solid var(--v64-border,var(--line));border-radius:13px;padding:11px;background:var(--v64-surface1,#17100c)}.v70ManaBar span{font-size:7px;color:var(--v64-accent,#82c3e7);font-weight:950;text-transform:uppercase}.v70ManaBar b{display:block;font-size:21px;color:var(--v64-warm,#e5c88f);margin:4px 0}.v70ManaBar p{font-size:8px;line-height:1.4;color:var(--v64-muted,#998c79);margin:0}.v70Source{font-size:7.5px;line-height:1.5;color:#817563;margin-top:10px}.v70Source a{color:var(--v64-accent,#82c3e7)}
 @media(max-width:820px){.v70LockGrid,.v70ManaBar{grid-template-columns:1fr 1fr}}@media(max-width:520px){.v70LockGrid,.v70ManaBar{grid-template-columns:1fr}}
 `;document.head.appendChild(s);
}
function hero(g){
 const sub=$('.hero .subtitle',g),lede=$('.hero .lede',g),pills=$('.v60HeroPills',g),actions=$('.heroActions',g);
 if(sub)sub.innerHTML='Entangle triggers. <span>Rage multiplies.</span> Armour feeds the Mana chassis.';
 if(lede)lede.innerHTML='Locked direction: <b>Armour + Eldritch Battery</b>, <b>Entangle-first Mana Flare</b>, permanent Rage scaling, <b>Morior Invictus + Spectral Ward</b>, and a double-Mana-cultivated <b>Rathpith Globe</b>. The first hard target is not 6k Mana — it is <b>6,667+</b>, because that is the generic 1.5× Overflow breakpoint for charging Runeseeker at 10,000 current Mana.';
 if(pills)pills.innerHTML='<span><strong>CHASSIS</strong> · Armour + EB</span><span><strong>CARRIER</strong> · Entangle first</span><span><strong>RAGE</strong> · 43 max / +86% Spell</span><span><strong>RUNE GATE</strong> · 6,667+ Mana</span>';
 if(actions)actions.innerHTML='<a href="#verdict">Locked thesis</a><a href="#lockedArchitecture">Architecture</a><a href="#runeseeker">Runeseeker gate</a><button data-page="research">Research / details</button>';
}
function verdict(g){
 const v=$('#verdict',g);if(!v)return;
 v.innerHTML=`<div class="kicker">LOCKED BUILD THESIS</div><h2>Armour outside. Mana inside. Entangle everywhere.</h2><p class="v60Intro">The front page now describes one build rather than a menu of alternatives. Research keeps the experiments. This character stacks flat Mana and item Energy Shield, converts that ES through Eldritch Battery, turns Morior's Evasion into still more flat ES through Spectral Ward, then multiplies the resulting Mana with Rage and cultivated Rathpith scaling.</p><div class="v60Verdicts">
 <article class="v60Verdict rec"><span>LOCKED CHASSIS</span><h3>Morior + EB + Armour</h3><p>Morior gives all three defences at once. Its <b>200–250 item ES</b> becomes Mana through EB, while <b>660–825 item Evasion</b> feeds Spectral Ward for roughly <b>+55–69 flat ES</b>, which also becomes Mana.</p><ul><li>Target the +50–60 maximum Mana per filled socket roll</li><li>All Attributes per socket is premium because INT is more Mana</li><li>Armour remains the actual hit-mitigation layer after EB consumes ES as a shield</li></ul></article>
 <article class="v60Verdict rec"><span>PRIMARY DELIVERY</span><h3>Entangle first</h3><p>Entangle is the mapping carrier. Its persistent fissures keep hitting enemies inside the field, giving Mana Flare repeated opportunities to trigger on cooldown without turning the character into a stop-start Frost Darts turret.</p><ul><li>Entangle = mapping / field control / repeated trigger density</li><li>Frost Darts stays the focused boss fallback</li><li>Mana Remnants supports recovery and Overflow fill, not the Overflow cap</li></ul></article>
 <article class="v60Verdict rec"><span>SHAMAN MULTIPLIER</span><h3>Keep the Rage package</h3><p>At <b>43 maximum Rage</b>, Mystical Rage contributes <b>86% increased Spell Damage</b>. Druidic Champion adds roughly <b>21% more Spell Damage</b> at full Rage, while Furious Wellspring lets the build's Mana-regeneration investment help keep Rage full.</p><ul><li>Mystical Rage stays in the Strugglescream package</li><li>Rageforged II remains a powerful boss support</li><li>We only consider dropping Rage after damage is excessive</li></ul></article>
 </div>`;
}
function architecture(g){
 if(document.getElementById('lockedArchitecture'))return;
 const v=$('#verdict',g);if(!v)return;
 const sec=document.createElement('section');sec.id='lockedArchitecture';sec.className='v60Section';sec.innerHTML=`
 <div class="kicker">LOCKED ARCHITECTURE · WHY 6.67K IS REALISTIC</div><h2>Morior is not just armour. It is a Mana item.</h2><p class="v60Intro">The important interaction is that Eldritch Battery cares about flat maximum Energy Shield, while Spectral Ward creates flat maximum ES from the body armour's <em>item Evasion</em>. Morior supplies both. Its socket rolls and runes then add flat Mana on top.</p>
 <div class="v70ManaBar"><article><span>MORIOR ITEM ES</span><b>200–250</b><p>Converted 1:1 into maximum Mana by EB.</p></article><article><span>SPECTRAL WARD</span><b>~55–69</b><p>660–825 item Evasion ÷ 12, then converted by EB.</p></article><article><span>MANA / SOCKET ROLL</span><b>+200–240</b><p>Four filled sockets at +50–60 maximum Mana each.</p></article><article><span>4× PERFECT MIND</span><b>+280</b><p>4 × (+50 Mana + Bonded +20 Mana) with Wisdom of the Maji.</p></article></div>
 <div class="v70LockGrid">
  <article class="v70LockCard hot"><span>MAX-MANA MORIOR</span><h3>Rough gross contribution: ~775–895 raw Mana-equivalent</h3><p>With the <strong>Mana/socket</strong> and <strong>All Attributes/socket</strong> rolls, four Perfect Mind Runes, Morior's own item ES and Spectral Ward, the body can contribute roughly <strong>775–895</strong> raw maximum-Mana-equivalent before your global increased-maximum-Mana scaling. The Attribute roll adds another ~40–56 Mana through INT.</p></article>
  <article class="v70LockCard hot"><span>ARMOURED MORIOR · LIKELY FINAL</span><h3>Legacy of Blackbraid + 3 Perfect Mind</h3><p>Swap one Perfect Mind for <strong>Legacy of Blackbraid</strong>. You give up about <strong>70 raw Mana</strong> from that rune slot, but gain <strong>+50% of Armour also applies to Elemental Damage</strong> and, through Wisdom's Bonded effect, <strong>+15% to all Elemental Resistances</strong>. That is a very efficient defensive trade if the 6.67k gate is still met.</p></article>
  <article class="v70LockCard"><span>IMPORTANT ARMOUR NUANCE</span><h3>50% applying ≠ 50% less elemental damage</h3><p>It means half of your Armour rating participates in Armour's hit-size-dependent reduction calculation against Fire, Cold and Lightning hits. It is strongest against small and medium hits and weaker against huge hits. This layers <em>after</em> resistance rather than replacing resistance.</p></article>
  <article class="v70LockCard hot"><span>LOCKED OFFHAND · CULTIVATED RATHPITH</span><h3>Mana becomes damage and crit again</h3><p>The target Rathpith has both Mana cultivations: <strong>6% increased Spell Damage per 100 maximum Mana</strong> and <strong>3% increased Spell Critical Hit Chance per 100 maximum Mana</strong>. At 6,667 Mana that is about <strong>+400% increased Spell Damage</strong> and <strong>+200% increased Spell Crit Chance</strong>. Its 129–162 item ES is also more Mana through EB.</p></article>
 </div>
 <div class="v70Equation"><b>Body + focus alone:</b> a max-Mana Morior package (~775–895 raw Mana-equivalent) plus Rathpith's ~129–162 item ES is roughly <b>904–1,057 raw Mana-equivalent</b> before global % maximum-Mana scaling. The final build still wants high ES/Mana/INT on helm, gloves, boots, wand and jewellery; Morior + Rathpith do not have to carry the entire 6.67k target by themselves.</div>
 <div class="v70Source">Mechanic references: <a href="https://www.poe2wiki.net/wiki/Morior_Invictus" target="_blank" rel="noopener">Morior Invictus</a> · <a href="https://www.poe2wiki.net/wiki/Evasion" target="_blank" rel="noopener">Spectral Ward</a> · <a href="https://www.poe2wiki.net/wiki/Rathpith_Globe" target="_blank" rel="noopener">Rathpith Globe</a> · <a href="https://www.poe2wiki.net/wiki/Rune" target="_blank" rel="noopener">Perfect Mind / Legacy runes</a>.</div>`;
 v.insertAdjacentElement('afterend',sec);
}
function math(g){
 const m=$('#math',g);if(!m||$('#v70QuestMath',m))return;
 const d=document.createElement('div');d.id='v70QuestMath';d.className='v70Equation';d.innerHTML='<b>Runeseeker gate:</b> generic Overflow is capped at 1.5× maximum Mana. Two Uhtred\'s Chalices and Mana Remnants can all help <em>fill</em> the same overflowed pool, but they do not stack the ceiling. Therefore <b>6,000 → 9,000 current Mana</b>, while <b>6,667 × 1.5 ≈ 10,000</b>. The build target is 6.67k+, not 6k.';
 const intro=$('.v60Intro',m);(intro||m.firstElementChild)?.insertAdjacentElement('afterend',d);
}
function budget(g){
 const b=$('#budget',g);if(!b)return;
 b.innerHTML=`<div class="kicker">LOCKED PURCHASE / CRAFT ORDER</div><h2>Build 6.67k first. Polish damage second.</h2><p class="v60Intro">The exact market price can move; the order does not. Every purchase should either raise permanent Mana, preserve Rage/Entangle uptime, or make the Armour+EB chassis survive harder content.</p><div class="v60Budget">
 <article><span>1 · BODY</span><b>Morior</b><p><strong>Prioritise +50–60 Mana/socket.</strong> All Attributes/socket is the dream second roll. Spirit, elemental resists or global defences are useful third rolls. Fill all four sockets.</p></article>
 <article><span>2 · SOCKETS</span><b>Mind ×4 → 3+Blackbraid</b><p>Use four Perfect Mind Runes while chasing the 6.67k Runeseeker gate. Once the gate is secure, test <strong>Legacy of Blackbraid + three Perfect Mind</strong> for the Armour-to-elemental layer.</p></article>
 <article><span>3 · OFFHAND</span><b>Cultivated Rathpith</b><p>Do not buy it for the name. The target is the <strong>Mana-based damage</strong> cultivation plus the <strong>Mana-based crit</strong> cultivation. Its local ES also feeds EB.</p></article>
 <article><span>4 · SUPPORTING GEAR</span><b>ES + Mana + INT</b><p>Helm, gloves, boots, wand and jewellery finish the number. Mana regen and Arcane Surge matter because a 6.67k pool that empties itself is not a finished Mana-Flare engine.</p></article>
 </div><div class="v70Equation"><b>Quest-push version:</b> Waistgate + two Uhtred's + Mana Remnants is excellent for rapidly filling the 1.5× overflowed pool. <b>It does not change the 1.5× cap.</b> Think of the two Uhtreds as fill-rate/reliability, not a higher maximum.</div>`;
}
function progression(g){
 const p=$('#progression',g);if(!p)return;
 p.innerHTML=`<div class="kicker">FROM HERE → RUNE GATE → ENDGAME</div><h2>No more chassis pivots</h2><p class="v60Intro">The remaining progression is now one continuous build. We are not testing Cloak, rare-body or non-Rathpith endgames on the front page.</p><div class="v60Progress">
 <article class="v60Stage"><span>NOW → 65</span><div><h3>Entangle + Rage while banking ES/Mana gear</h3><p>Keep Entangle as the mapping carrier, preserve 43-Rage uptime, cap elemental resistances and accumulate the pieces that convert cleanly into the Morior/EB chassis.</p></div><div class="v60MiniArts">${img(A.waist,'Waistgate')}${img(A.uhtred,"Uhtred's Chalice")}</div></article>
 <article class="v60Stage"><span>65 · MORIOR</span><div><h3>Turn the body into a Mana engine</h3><p>Equip the correct Morior, fill all four sockets, and activate Spectral Ward. Four Perfect Mind Runes are the pure quest-push version; Blackbraid + three Mind is the armoured end-state once Mana allows it.</p></div><div class="v60MiniArts">${img(A.morior,'Morior Invictus')}</div></article>
 <article class="v60Stage"><span>75 · RATHPITH</span><div><h3>Add the Mana-cultivated offhand</h3><p>Rathpith monetises every additional 100 Mana as damage and crit. Keep improving flat ES/Mana and regeneration rather than pivoting to generic spell-damage gear.</p></div><div class="v60MiniArts">${img(A.rath,'Cultivated Rathpith Globe')}</div></article>
 <article class="v60Stage"><span>6,667+ MANA</span><div><h3>Charge the Depleted Mana Rune</h3><p>Enter the quest setup with Waistgate, two Uhtred's and Mana Remnants. Fill to the generic 1.5× overflow cap: 6,667+ permanent Mana is enough to cross 10,000 current.</p></div><div class="v60MiniArts">${img(A.waist,'Waistgate')}${img(A.uhtred,"Uhtred's Chalice")}${img(A.uhtred,"Uhtred's Chalice")}</div></article>
 </div>`;
}
function gear(g){
 const sec=$('#gear',g);if(!sec)return;
 sec.innerHTML=`<div class="kicker">LOCKED ENDGAME GEAR CORE</div><h2>Four pieces define the character</h2><p class="v60Intro">Everything else exists to complete Mana, Energy Shield, Intelligence, resistances, regeneration and Entangle/Rage uptime around these pieces.</p><div class="v60Items">
 <article class="v60Item best">${img(A.morior,'Morior Invictus')}<div class="v60ItemBody"><span>LOCKED BODY</span><h3>Morior Invictus</h3><p>Armour + Evasion + ES in one slot. Target Mana/socket and Attributes/socket. Evasion drives Spectral Ward; ES drives Eldritch Battery.</p><div class="v60Swap"><b>Socket plan:</b> 4× Perfect Mind for the Runeseeker push; Legacy of Blackbraid + 3× Perfect Mind for the armoured final version if 6.67k remains intact.</div></div></article>
 <article class="v60Item best">${img(A.rath,'Cultivated Rathpith Globe')}<div class="v60ItemBody"><span>LOCKED OFFHAND</span><h3>Cultivated Rathpith Globe</h3><p>Require the maximum-Mana versions of both spell-damage and spell-crit scaling. Local ES is extra maximum Mana through EB.</p><div class="v60Swap"><b>At 6,667 Mana:</b> roughly +400% increased Spell Damage and +200% increased Spell Crit Chance from the two Mana cultivations.</div></div></article>
 <article class="v60Item best">${img(A.waist,'Waistgate')}<div class="v60ItemBody"><span>RUNESKEEKER FARM TOOL</span><h3>Waistgate</h3><p>Keep it for the quest/farm phase because two Mana flasks materially improve how quickly and reliably the overflowed pool is filled.</p><div class="v60Swap"><b>Important:</b> it improves refill logistics, not the 1.5× Overflow ceiling.</div></div></article>
 <article class="v60Item best">${img(A.uhtred,"Uhtred's Chalice")}<div class="v60ItemBody"><span>YOU HAVE TWO</span><h3>Uhtred's Chalice ×2</h3><p>Both can be used through Waistgate to overflow Mana from flask recovery. They make the 10k charging step much easier once permanent Mana reaches the correct breakpoint.</p><div class="v60Swap"><b>Cap:</b> two Chalices still share generic Overflow's 1.5× maximum.</div></div></article>
 </div>`;
}
function instills(g){
 const sec=$('#instills',g);if(!sec)return;
 sec.innerHTML=`<div class="kicker">STRUGGLESCREAM · LOCKED PACKAGE</div><h2>Rage + Morior + Mana Flare</h2><p class="v60Intro">The fourth slot is no longer a generic flex slot on the front page. Spectral Ward is part of the chassis because Morior's item Evasion turns directly into flat ES, then EB turns that ES into Mana.</p><div class="v60Instill">
 <article class="core"><span>LOCKED · MORIOR/EB</span><h3>Spectral Ward</h3><p>+1 maximum ES per 12 item Evasion on equipped body armour. On current Morior values this is roughly +55–69 ES, then Mana via EB.</p></article>
 <article class="core"><span>LOCKED · RAGE</span><h3>Mystical Rage</h3><p>2% increased Spell Damage per Rage. 43 Rage = <strong>86% increased Spell Damage</strong>.</p></article>
 <article class="core"><span>LOCKED · FLARE</span><h3>Invocated Efficiency</h3><p>40% increased Spell Damage for Triggered Spells. Direct Mana-Flare scaling with no travel cost.</p></article>
 <article class="core"><span>LOCKED · LIGHTNING</span><h3>Electric Amplification</h3><p>18% Lightning penetration + 6% Elemental as extra Lightning. Archmage and cultivated Rathpith make the Lightning axis increasingly important.</p></article>
 </div><div class="v70Equation"><b>Arcane Surge:</b> solve it on gloves / other gear rather than spending one of the four locked Strugglescream slots. Temporary alternatives remain documented in Research.</div>`;
}
function skills(g){
 const sec=$('#skills',g);if(!sec)return;
 const h=$('h2',sec);if(h)h.textContent='Entangle is the field engine; Frost Darts is the boss button';
 const intro=$('.v60Compare',sec);if(intro)intro.innerHTML='<article><h3>Primary mapping loop · Entangle</h3><p><strong>Entangle → repeated fissure hits → critical hits → Mana Flare.</strong> The persistent field is what makes the build feel like a Mana geyser rather than a stationary caster. Mana Remnants helps refill/overflow during packs.</p></article><article><h3>Focused single-target · Frost Darts + Rageforged</h3><p>Keep Frost Darts as the boss carrier when you want controlled hit frequency and the strongest Rageforged single-target package. Rage is a permanent build multiplier, not just a mapping gimmick.</p></article>';
}
function runeseeker(g){
 const sec=$('#runeseeker',g);if(!sec)return;
 sec.innerHTML=`<div class="kicker">THE ACTUAL RUNE GATE</div><h2>6,667 permanent Mana is the number</h2><div class="v60Runeseeker"><div class="steps">
 <div><i>1</i><p><b>Reach 6,667+ maximum Mana.</b><br>6k is a strong build milestone, but it only reaches 9k under generic 1.5× Overflow.</p></div>
 <div><i>2</i><p><b>Equip Waistgate + both Uhtred's Chalices.</b><br>Use the two flask slots to fill the overflowed pool quickly and safely.</p></div>
 <div><i>3</i><p><b>Keep Mana Remnants active.</b><br>Remnants can also Overflow Mana and help maintain the pool, but they do not raise the cap above 1.5×.</p></div>
 <div><i>4</i><p><b>Cross 10,000 current Mana and charge the Depleted Mana Rune.</b><br>6,667 × 1.5 ≈ 10,000.5, so the generic Overflow ceiling is sufficient.</p></div>
 <div><i>5</i><p><b>Runeseeker is unlocked.</b><br>The permanent character remains the Armour + EB + Entangle + Rage + Morior + Rathpith build; what you do with the quest wand is separate from the chassis.</p></div>
 </div><aside class="v60Sell"><span>FEASIBILITY CHECK</span><b>Yes — 6.67k is realistic.</b><p>Current public EB builds already demonstrate roughly <strong>6.2k–7.0k Mana</strong> with about <strong>1.75k–1.97k gear ES</strong>. Our Morior package has unusually high raw-Mana density because the same body supplies item ES, Spectral-Ward ES, per-socket Mana and four rune sockets.</p><p><strong>The constraint is quality of the supporting gear, not a mechanical ceiling.</strong> Helm/gloves/boots/wand/jewellery still need ES, Mana, INT and regeneration.</p></aside></div>
 <div class="v70Equation"><b>Overflow rule:</b> Uhtred + Uhtred + Mana Remnants = more ways to reach the cap, <em>not</em> three separate caps. Generic Overflow remains <b>1.5× maximum Mana</b>.</div>`;
}
function nav(g){
 const n=$('.sectionNav',g);if(!n)return;
 $$('a',n).forEach(a=>{if(a.getAttribute('href')==='#alternatives'||a.getAttribute('href')==='#currentCheckpoint')a.remove()});
 if(!$('a[href="#lockedArchitecture"]',n)){const a=document.createElement('a');a.href='#lockedArchitecture';a.textContent='Architecture';const m=$('a[href="#math"]',n);m?.before(a)}
}
function lock(){
 const g=document.getElementById('guidePage');if(!g)return false;css();hero(g);verdict(g);architecture(g);math(g);budget(g);progression(g);gear(g);instills(g);skills(g);runeseeker(g);nav(g);return true;
}
function start(){lock();setTimeout(lock,350);setTimeout(lock,1000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
