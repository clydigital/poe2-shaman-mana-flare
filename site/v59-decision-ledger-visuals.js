(() => {
'use strict';
const $=id=>document.getElementById(id);
const norm=s=>String(s||'').replace(/\s+/g,' ').trim().toLowerCase();
const wikiFile=name=>`https://www.poe2wiki.net/wiki/Special:Redirect/file/${encodeURIComponent(name)}`;

const MORIOR_ART='https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL01vcmlvckludmljdHVzX00iLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/6674aa4ff6/MoriorInvictus_M.png';
const ITEM_ART={
  'morior invictus':[MORIOR_ART],
  'morior invictus exceptional grand regalia':[MORIOR_ART],
  'strugglescream':[wikiFile('Strugglescream inventory icon.png')],
  'ghostmarch':[wikiFile('Ghostmarch inventory icon.png')],
  'wondertrap':[wikiFile('Wondertrap inventory icon.png')],
  'powertread':[wikiFile('Powertread inventory icon.png')],
  'ab aeterno':[wikiFile('Ab Aeterno inventory icon.png')],
  'decree of flight':[wikiFile('Decree of Flight inventory icon.png')],
  'windscream':[wikiFile('Windscream inventory icon.png')],
  'wake of destruction':[wikiFile('Wake of Destruction inventory icon.png')],
  "atziri’s step":[wikiFile("Atziri's Step inventory icon.png")],
  "atziri's step":[wikiFile("Atziri's Step inventory icon.png")],
  'bones of ullr':[wikiFile('Bones of Ullr inventory icon.png')],
  'wanderlust':[wikiFile('Wanderlust inventory icon.png')],
  'rathpith globe':['https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9Gb2NpL1VuaXF1ZXMvUmF0aHBpdGhHbG9iZSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/51e4da7cb9/RathpithGlobe.png'],
  'dream fragments':['https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvUmluZ3MvVW5pcXVlcy9EcmVhbUZyYWdtZW50cyIsInciOjEsImgiOjEsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/9cec05becb/DreamFragments.png'],
  'visage of ayah':['https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9IZWxtZXRzL1VuaXF1ZXMvVmlzYWdlT2ZBeWFoIiwidyI6MiwiaCI6Miwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/2dca37cc27/VisageOfAyah.png'],
  'waveshaper':['https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1dhdmVzaGFwZXIiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/73f7dcf704/Waveshaper.png'],
  'temporalis':['https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1BpbGdyaW1zSW1hZ2UiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/69db95b9aa/PilgrimsImage.png']
};
const SKILL_ART={
  'entangle':[wikiFile('Entangle skill icon.png'),wikiFile('Entangle inventory icon.png')],
  'frost darts':[wikiFile('Frost Darts skill icon.png'),wikiFile('Frost Darts inventory icon.png')],
  'orb of storms':[wikiFile('Orb of Storms skill icon.png'),wikiFile('Orb of Storms inventory icon.png')],
  'mana flare':[wikiFile('Mana Flare inventory icon.png')],
  'archmage':[wikiFile('Archmage inventory icon.png')],
  'eternal rage':[wikiFile('Eternal Rage skill icon.png'),wikiFile('Eternal Rage inventory icon.png')],
  'mana remnants':[wikiFile('Mana Remnants skill icon.png'),wikiFile('Mana Remnants inventory icon.png')],
  'detonate dead':[wikiFile('Detonate Dead skill icon.png'),wikiFile('Detonate Dead inventory icon.png')],
  'time of need':[wikiFile('Time of Need skill icon.png'),wikiFile('Time of Need inventory icon.png')],
  'mana drain':[wikiFile('Mana Drain skill icon.png'),wikiFile('Mana Drain inventory icon.png')]
};

function resilientImg(sources,alt,cls=''){
  const im=document.createElement('img');
  im.alt=alt;im.className=cls;im.loading='lazy';im.decoding='async';
  const list=[...new Set((sources||[]).filter(Boolean))];let i=0;
  const next=()=>{if(i>=list.length){im.classList.add('v59ImageFailed');return;}im.src=list[i++];};
  im.addEventListener('error',next);next();return im;
}
function itemSources(name){
  const n=norm(name).replace(/\s*·.*$/,'');
  const key=Object.keys(ITEM_ART).find(k=>n===k||n.includes(k)||k.includes(n));
  return key?ITEM_ART[key]:[];
}
function skillSources(name){return SKILL_ART[norm(name)]||[]}

function css(){
 if($('v59Css'))return;
 const s=document.createElement('style');s.id='v59Css';s.textContent=`
 .v59SkillImg{width:38px;height:38px;object-fit:cover;border-radius:9px;display:block}.skillicon.v59Visual{padding:0;overflow:hidden;background:#0b0807!important}
 .v59ItemImg{display:block;width:54px;height:64px;object-fit:contain;filter:drop-shadow(0 7px 10px rgba(0,0,0,.42));margin:0 auto 5px}.v59TableImg{width:34px;height:40px;object-fit:contain;vertical-align:middle;margin-right:7px;filter:drop-shadow(0 4px 7px rgba(0,0,0,.38))}
 .v59ImageFailed{display:none!important}
 #v59Morior,#v59SwapLedger{margin-top:15px;border:1px solid rgba(217,179,112,.26);border-radius:18px;padding:15px;background:linear-gradient(180deg,rgba(35,24,17,.98),rgba(17,12,9,.98))}
 .v59MoriorGrid{display:grid;grid-template-columns:150px minmax(0,1fr);gap:15px;align-items:center}.v59MoriorArt{width:138px;height:180px;object-fit:contain;filter:drop-shadow(0 15px 22px rgba(0,0,0,.5))}
 .v59MoriorFacts{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:10px 0}.v59Fact{border:1px solid var(--line);border-radius:11px;padding:8px;background:#15100c}.v59Fact b{display:block;font-size:16px;color:#e2c492}.v59Fact span{font-size:7.5px;color:#958875;text-transform:uppercase;letter-spacing:.05em}
 .v59Compare{font-size:9px;line-height:1.5;color:#b9ad98;border-left:3px solid #b88c52;background:#120d0a;padding:10px 12px;margin-top:9px}.v59Compare strong{color:#ead4ad}
 #v59SwapLedger h3{font-size:27px;margin:0 0 4px}.v59Lead{font-size:9px;line-height:1.5;color:#a99b87;max-width:920px}.v59SwapTable td small{display:block;margin-top:4px;color:#8f8270}.v59SwapTable td strong{color:#e5c998}.v59Status{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:3px 6px;font-size:7px;font-weight:900;white-space:nowrap}.v59Status.keep{color:#acd6ae;border-color:rgba(139,181,136,.34)}.v59Status.review{color:#e2c08d;border-color:rgba(217,179,112,.4)}.v59Status.swap{color:#9fc4d9;border-color:rgba(123,174,201,.38)}
 .v59CoreStrip{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;margin:10px 0}.v59CoreChip{display:flex;align-items:center;gap:7px;border:1px solid var(--line);border-radius:11px;background:#15100c;padding:7px;min-width:0}.v59CoreChip img{width:34px;height:34px;border-radius:8px;object-fit:cover}.v59CoreChip b{font-size:8.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 @media(max-width:900px){.v59MoriorGrid{grid-template-columns:1fr}.v59MoriorArt{margin:auto}.v59MoriorFacts{grid-template-columns:1fr 1fr}.v59CoreStrip{grid-template-columns:repeat(3,1fr)}}
 @media(max-width:520px){.v59MoriorFacts{grid-template-columns:1fr 1fr}.v59CoreStrip{grid-template-columns:1fr 1fr}}
 `;document.head.appendChild(s);
}

function patchData(){
 try{
   if(typeof items!=='undefined'&&Array.isArray(items)){
     const m=items.find(x=>x.name==='Morior Invictus');
     if(m&&!/unidentified/i.test(m.desc||''))m.desc+=' While unidentified it appears as “Exceptional Grand Regalia”; that label does not guarantee a fifth socket.';
   }
 }catch(e){}
 try{
   if(typeof bodyGuideData!=='undefined'&&Array.isArray(bodyGuideData)){
     const m=bodyGuideData.find(x=>x.name==='Morior Invictus');
     if(m){m.text='Morior Invictus · Exceptional Grand Regalia. Normally 4 hidden Augment Sockets and 3 random per-socket modifiers. +50–60 maximum Mana per filled socket is the premium roll for this build. “Exceptional Grand Regalia” is also what the item shows as while unidentified; it does not itself mean 5 sockets. A fifth socket is a corruption outcome.';m.img=MORIOR_ART;}
   }
 }catch(e){}
 try{
   if(typeof researchItems!=='undefined'&&Array.isArray(researchItems)&&!researchItems.some(r=>String(r[1]).includes('Exceptional Grand Regalia / Morior'))){
     researchItems.push(['item','Exceptional Grand Regalia / Morior Invictus','Body','Unidentified Morior displays as Exceptional Grand Regalia; 4 hidden Augment Sockets; 3 random socket modifiers','Search/trade alias for Morior. Fifth socket is corruption, not guaranteed by the Exceptional label.','HIGH / VARIABLE']);
   }
 }catch(e){}
}

function forceSkillIcons(){
 document.querySelectorAll('.skill').forEach(card=>{
   const name=card.querySelector('h3')?.textContent?.trim();const srcs=skillSources(name);const slot=card.querySelector('.skillicon');
   if(!name||!srcs.length||!slot)return;
   if(slot.dataset.v59Skill===norm(name))return;
   slot.textContent='';slot.classList.add('v59Visual');slot.dataset.v59Skill=norm(name);slot.appendChild(resilientImg(srcs,name,'v59SkillImg'));
 });
}
function forceKeyItemArt(){
 document.querySelectorAll('.item').forEach(card=>{
   const name=card.querySelector('b')?.textContent?.trim();const srcs=itemSources(name);if(!srcs.length)return;
   let im=card.querySelector(':scope > img');
   if(!im){im=resilientImg(srcs,name,'v59ItemImg');card.prepend(im);}else if(norm(name).includes('morior')){im.src=MORIOR_ART;im.style.display='block';}
 });
 document.querySelectorAll('.guideItem').forEach(card=>{
   const name=card.querySelector('h3')?.textContent?.trim();const srcs=itemSources(name);if(!srcs.length)return;
   let im=card.querySelector('img');
   if(!im){im=resilientImg(srcs,name,'v59ItemImg');card.appendChild(im);}else if(norm(name).includes('morior')){im.src=MORIOR_ART;im.style.display='block';}
 });
}
function addTableArt(){
 const roots=['#v58Boots','#v49BodyLab'];
 roots.forEach(sel=>document.querySelectorAll(`${sel} tbody tr`).forEach(tr=>{
   const cell=tr.cells?.[0];if(!cell||cell.querySelector('.v59TableImg'))return;
   const label=cell.textContent.replace(/^\s*\d+\.\s*/,'').trim();const srcs=itemSources(label);if(!srcs.length)return;
   cell.prepend(resilientImg(srcs,label,'v59TableImg'));
 }));
}
function addCoreStrip(){
 const guide=document.querySelector('.appPage[data-page="guide"]');const hero=guide?.querySelector('.guideHero');if(!hero||$('v59CoreStrip'))return;
 const names=['Mana Flare','Entangle','Frost Darts','Orb of Storms','Archmage','Mana Remnants'];
 const strip=document.createElement('div');strip.id='v59CoreStrip';strip.className='v59CoreStrip';
 names.forEach(name=>{const srcs=skillSources(name);if(!srcs.length)return;const c=document.createElement('div');c.className='v59CoreChip';c.appendChild(resilientImg(srcs,name));const b=document.createElement('b');b.textContent=name;c.appendChild(b);strip.appendChild(c)});
 hero.insertAdjacentElement('afterend',strip);
}

function patchMoriorLabels(){
 document.querySelectorAll('#v49BodyRows strong').forEach(el=>{
   const t=el.textContent;if(/Morior Invictus/i.test(t)&&!/Exceptional Grand Regalia/i.test(t))el.textContent=t.replace(/Morior Invictus/i,'Morior Invictus · Exceptional Grand Regalia');
 });
 document.querySelectorAll('.guideItem h3').forEach(el=>{if(/^Morior Invictus$/i.test(el.textContent.trim()))el.textContent='Morior Invictus · Exceptional Grand Regalia'});
}

function parseNum(s){const m=String(s||'').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);return m?Number(m[0]):NaN}
function bodyRows(){
 return [...document.querySelectorAll('#v49BodyRows tr')].map(tr=>{
   const c=tr.cells;if(!c||c.length<7)return null;
   return{name:c[0].textContent.replace(/^\s*\d+\.\s*/,'').trim(),es:parseNum(c[1].textContent),raw:parseNum(c[2].textContent),mana:parseNum(c[3].textContent),hit:parseNum(c[4].textContent),rate:parseNum(c[5].textContent),dps:parseNum(c[6].textContent)};
 }).filter(Boolean);
}
function renderMoriorCompare(){
 const out=$('v59BodyCompare');if(!out)return;
 const rows=bodyRows();if(!rows.length){out.innerHTML='<strong>Body Lab linkage:</strong> open the Experiment Hub once and the Morior vs rare comparison will populate from the same live body-armour model.';return;}
 const moriors=rows.filter(x=>/Morior/i.test(x.name)).sort((a,b)=>b.dps-a.dps);const rares=rows.filter(x=>/Vile Robe|Flowing Raiment|Feathered Raiment/i.test(x.name)).sort((a,b)=>b.dps-a.dps);
 const m=moriors[0],r=rares[0];if(!m||!r)return;
 const d=r.dps?((m.dps/r.dps-1)*100):0;
 const sign=d>=0?'+':'';
 out.innerHTML=`<strong>Direct live-model comparison:</strong> ${m.name} = <strong>${Math.round(m.dps).toLocaleString()} realised DPS</strong> vs ${r.name} = <strong>${Math.round(r.dps).toLocaleString()}</strong> under the Body Lab's current controls (${sign}${d.toFixed(1)}%). Morior is better here only because its socket Mana/Attribute package outweighs the rare's extra displayed ES at these assumptions. Change the inputs and the winner can flip; that is the comparison, not a blanket “Morior always wins” claim.`;
}
function addMoriorCard(){
 if($('v59Morior'))return;
 const guide=document.querySelector('.appPage[data-page="guide"]');if(!guide)return;
 const blocks=[...guide.querySelectorAll('.sectionBlock')];const body=blocks.find(x=>/Body armour progression/i.test(x.querySelector('h3')?.textContent||''));
 const anchor=body||guide.querySelector('.guideHero');if(!anchor)return;
 const sec=document.createElement('section');sec.id='v59Morior';sec.innerHTML=`
 <div class="kicker">MORIOR · EXCEPTIONAL GRAND REGALIA</div>
 <div class="v59MoriorGrid"><div><img class="v59MoriorArt" src="${MORIOR_ART}" alt="Morior Invictus"></div><div><h3 style="font-size:28px;margin:0 0 5px">Morior is a first-class body option, not a footnote.</h3><p class="v59Lead">When Morior is unidentified it displays as <b>Exceptional Grand Regalia</b>. That is a recognition/search clue, not proof of a fifth socket. The unique normally has 4 hidden Augment Sockets; corruption can add a fifth.</p><div class="v59MoriorFacts"><div class="v59Fact"><b>4</b><span>normal hidden sockets</span></div><div class="v59Fact"><b>5</b><span>possible after corruption</span></div><div class="v59Fact"><b>3</b><span>random socket modifiers</span></div><div class="v59Fact"><b>+50–60</b><span>Mana / filled socket roll</span></div></div><div class="v59Compare"><b>Versus a high-ES rare:</b> Morior wins when you hit the Mana/socket roll plus useful Attributes/resists/Spirit and the total socket package beats the rare's extra local ES and affixes. A rare wins when it has enough displayed local ES + flat Mana + useful suffixes that Morior's random rolls cannot compensate. <b>We compare both numerically below instead of deleting one from the list.</b></div><div class="v59Compare" id="v59BodyCompare"></div></div></div>`;
 anchor.insertAdjacentElement('afterend',sec);renderMoriorCompare();
}

function marginal(name){
 const rows=[...document.querySelectorAll('#v55Rows tr')];const tr=rows.find(r=>norm(r.cells?.[0]?.querySelector('b')?.textContent)===norm(name));if(!tr)return null;
 const t=tr.cells?.[2]?.textContent||'';const m=t.match(/([+-]?\d+(?:\.\d+)?)%/);return m?Number(m[1]):null;
}
function bestPayload(){
 const names=['Mystical Rage','Electric Amplification','Pure Chaos','Cooked','Dynamism','Shredding Force'];
 return names.map(name=>({name,g:marginal(name)})).filter(x=>Number.isFinite(x.g)).sort((a,b)=>b.g-a.g)[0]||{name:'best live payload instill',g:null};
}
function status(cls,text){return `<span class="v59Status ${cls}">${text}</span>`}
function renderSwapLedger(){
 const host=$('v59SwapRows');if(!host)return;
 const bootCdr=parseNum($('v58CdrOut')?.textContent);const temp=marginal('Temporal Mastery');const best=bestPayload();
 const tempState=Number.isFinite(bootCdr)&&bootCdr>=34?'review':'keep';
 const tempWhy=tempState==='review'
   ?`Boots are currently showing ~${bootCdr.toFixed(0)}% CDR. Temporal adds 16% more CDR, while ${best.name}${Number.isFinite(best.g)?` is showing about +${best.g.toFixed(1)}% marginal DPS in the live instill table`:''}. Swap only if realised Flare/s stays essentially unchanged after removing Temporal.`
   :`Boot CDR is ${Number.isFinite(bootCdr)?bootCdr.toFixed(0):'not yet'}%. Temporal still buys 16% CDR; keep it in the package until another source makes cooldown cease to be the active cap.`;
 const rows=[
  ['Temporal Mastery',best.name,'16% CDR',Number.isFinite(best.g)?`~+${best.g.toFixed(1)}% live marginal payload under current lab assumptions`:'payload scaling',tempWhy,status(tempState,tempState==='review'?'REVIEW SWAP':'KEEP / TEST')],
  ['Mind Over Matter','Partial mana-before-life + Armour/Evasion/Life/resists','All damage currently routes through Mana','Removes MoM\'s 50% less Mana Recovery penalty; keeps only the amount of mana-before-life you actually need','Better only once conventional defences are strong enough. If recovery is stopping the 2/s engine, full MoM becomes an offensive tax; if survival still depends on it, keep it.',status('review','LATE SWAP')],
  ['Desensitisation','Throatseeker only after trigger saturation','25% CDB + 25% reduced incoming enemy CDB','Throatseeker gives 60% CDB, a net +35 CDB before considering its 20% reduced Crit Chance','Throatseeker is better only if its reduced crit does not lower carrier-trigger saturation enough to erase the extra crit payload. Otherwise Desensitisation is the better whole-build node.',status('review','CONDITIONAL')],
  ['Throatseeker','Shredding Force when trigger-starved','45 CDB versus Shredding Force','+15% Spell Crit, removes Throatseeker\'s 20% reduced Crit penalty, still keeps +15% CDB','If the recovered crit raises realised Flares/s enough, Shredding wins despite lower per-crit payload. If triggers are already saturated, Throatseeker has the higher ceiling.',status('review','RATE VS PAYLOAD')],
  ['Ghostmarch','Chronomancy Sekhema rare','30–50 Mana, Chaos res, roll-through utility','Much higher movement, potentially 34–40% boot CDR, larger EB ES budget, attribute/resist suffix control','Replace when the rare actually solves CDR/attributes without breaking Chaos res. Ghostmarch remains the better cheap transition if those affixes are not affordable yet.',status('swap','RARE ENDGAME')],
  ['Wondertrap','Chronomancy or Mana/EB rare','Up to +20 STR/DEX/INT simultaneously','Far more movement, CDR, local ES/Mana and resist flexibility','Do not remove Wondertrap until the 41/41/41 Regalia requirement and your lowest-Attribute plan are solved elsewhere. After that, the rare gives far more performance per boot slot.',status('swap','AFTER STATS')],
  ['Powertread','Chronomancy rare unless Power Charges are a real package','+1 max Power Charge and 12% CDB per charge','Boot CDR/Mana/ES/resists and freedom from charge setup','Keep Powertread if reliable charge uptime plus Flare crit makes its expected CDB outperform the rate/sustain gained from the rare. Otherwise the rare is more complete.',status('review','CHARGE CHECK')],
  ['Perfect Mind Rune on boots','Farrul / Uhtred CDR route when frequency is the cap','~70 direct Mana-equivalent with Bonded active','Farrul: +5% move +10% CDR. Uhtred path: enables 24–30% Chronomancy plus 10% Bonded CDR','Mind is better when payload/current-Mana is the limiter. CDR rune tech is better when recovery is solved and cooldown is still capping realised Flares/s.',status('review','CAP DEPENDENT')],
  ['High-ES rare body','Morior Invictus · Exceptional Grand Regalia when socket rolls win','Predictable high local ES + rare affixes','4–5 filled sockets, Mana/socket, all-Attribute/resist/Spirit possibilities','Use the Body Lab delta above. We do not remove the rare merely because Morior exists, and we do not remove Morior merely because a rare can show more ES.',status('review','DIRECT MODEL')]
 ];
 host.innerHTML=rows.map(r=>`<tr><td><strong>${r[0]}</strong></td><td><strong>${r[1]}</strong></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('');
 const read=$('v59SwapRead');if(read)read.innerHTML=`<b>No silent removals:</b> every recommendation now has a named replacement, the stat/mechanic being surrendered, the stat/mechanic being gained, and the condition that makes the swap worthwhile.${Number.isFinite(temp)?` Temporal Mastery currently shows about <strong>${temp>=0?'+':''}${temp.toFixed(1)}%</strong> marginal DPS through rate in the instill lab.`:''}`;
}
function addSwapLedger(){
 if($('v59SwapLedger'))return;
 const anchor=$('v58Boots')||$('v56Flex')||$('v55InstillLab');if(!anchor)return;
 const sec=document.createElement('section');sec.id='v59SwapLedger';sec.innerHTML=`
 <div class="kicker">REPLACEMENT LEDGER · NO SILENT REMOVALS</div><h3>If we remove something, what beats it?</h3><p class="v59Lead">Every removal/swap needs an explicit A-vs-B argument. “Not recommended” is not enough: the table states what replaces it, what is lost, what is gained, and the condition under which the replacement is actually superior.</p>
 <div class="tableWrap"><table class="v59SwapTable"><thead><tr><th>Remove / challenge</th><th>Direct replacement</th><th>You give up</th><th>You gain</th><th>Why the replacement can be better</th><th>Status</th></tr></thead><tbody id="v59SwapRows"></tbody></table></div><div class="v59Compare" id="v59SwapRead"></div>`;
 anchor.insertAdjacentElement('afterend',sec);renderSwapLedger();
}

let queued=false;
function enhance(){
 css();patchData();forceSkillIcons();forceKeyItemArt();addCoreStrip();patchMoriorLabels();addTableArt();addMoriorCard();addSwapLedger();renderMoriorCompare();renderSwapLedger();
}
function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhance()})}
const obs=new MutationObserver(m=>{if(m.some(x=>!x.target?.closest?.('#v59SwapLedger')))queue()});
obs.observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
setTimeout(enhance,350);setTimeout(enhance,1100);setTimeout(enhance,2400);
window.addEventListener('v44calc',()=>setTimeout(enhance,0));
})();
