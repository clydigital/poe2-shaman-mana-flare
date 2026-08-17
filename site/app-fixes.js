(() => {
'use strict';

/* Permanent cleanup/fix layer. This is intentionally not version-numbered: it owns
   cross-version UI cleanup that should survive future content revisions. */

function installCleanupCss(){
  if(document.getElementById('manaGeyserAppFixCss')) return;
  const s=document.createElement('style');
  s.id='manaGeyserAppFixCss';
  s.textContent=`
    #mfBackend:before{display:none!important;content:none!important;height:0!important;padding:0!important;border:0!important}
    .rawForecast{display:inline-block;margin-left:5px;padding:2px 5px;border-radius:999px;border:1px solid rgba(126,178,205,.35);color:#a9d8ef;font-size:7px;letter-spacing:.06em;text-transform:uppercase}
  `;
  document.head.appendChild(s);
}

function normalText(el){
  return (el?.textContent||'').replace(/\s+/g,' ').trim();
}

function removeDuplicateReturnControls(){
  const exact=/^(?:←\s*)?Return to (?:Mana Geyser Shaman|simplified build guide)$/i;
  document.querySelectorAll('a,button,[role="button"],div,p').forEach(el=>{
    const t=normalText(el);
    if(!exact.test(t)) return;
    // Never delete a large parent whose descendants merely contain the phrase.
    if(t.length<70 && el.querySelectorAll('*').length<=2) el.remove();
  });
}

function rawContribution(name){
  let c={M:2497,crit:.23,cdb:1.91};
  try{c={...c,...(window.calc?.()||{})}}catch(e){}
  const M=Math.max(1,c.M||2497);
  const crit=Math.max(0,Math.min(.95,c.crit||.23));
  const cdb=Math.max(0,c.cdb||1.91);
  const spellCritInc=Math.max(0,window.liveSnapshot?.spellCritInc||.26);
  const archGain=.0004*M;
  const fireShare=1/(1+archGain);
  const lightShare=archGain/(1+archGain);
  const critWeighted=(newCrit,newCdb)=>100*((1+newCrit*newCdb)/(1+crit*cdb)-1);
  const critDelta=inc=>crit*(inc/(1+spellCritInc));

  switch(name){
    case 'Dynamism': return {pct:40,label:'raw increased Damage',type:'hit'};
    case 'All Natural': return {pct:30,label:'raw Elemental Damage',type:'hit'};
    case 'Arcane Intensity': return {pct:3*(M/100),label:`raw Spell Damage @ ${Math.round(M).toLocaleString()} Mana`,type:'hit'};
    case 'Invocated Efficiency': return {pct:40,label:'raw Triggered Spell Damage',type:'hit'};
    case 'Burning Nature': return {pct:25*fireShare,label:'raw combined-hit estimate from +25% Fire',type:'hit'};
    case 'Brain Storm': return {pct:20*lightShare,label:'raw combined-hit estimate from +20% Lightning',type:'hit'};
    case 'Insulating Hide': return {pct:6,label:'raw gain-as-extra estimate',type:'hit'};
    case 'Electric Amplification': return {pct:6,label:'raw gain-as-extra estimate; penetration excluded',type:'hit'};
    case 'Wild Storm': return {pct:8,label:'raw 4% Cold + 4% Lightning gain',type:'hit'};
    case 'Desensitisation': return {pct:critWeighted(crit,cdb+.25),label:'crit-weighted estimate from +25% CDB',type:'hit'};
    case 'Critical Overload':
    case 'Shredding Force': return {pct:critWeighted(Math.min(.95,crit+critDelta(.15)),cdb+.15),label:'crit-weighted estimate from 15% inc crit + 15% CDB',type:'hit'};
    case 'Controlling Magic': return {pct:critWeighted(Math.min(.95,crit+critDelta(.25)),cdb),label:'crit-weighted estimate from 25% inc crit',type:'hit'};
    case 'Temporal Mastery': return {pct:16,label:'raw theoretical CDR',type:'rate'};
    case 'Multitasking': return {pct:12,label:'raw theoretical CDR; duration extra',type:'rate'};
    case 'Volatile Catalyst': return {pct:10,label:'raw theoretical CDR; AoE extra',type:'rate'};
    case 'Wildsurge Incantation': return {pct:50,label:'more native Plant/Storm damage; 0% direct Flare',type:'native'};
    default:return null;
  }
}

function patchAllocatedInstilRows(){
  const body=document.getElementById('v38AnointBody');
  if(!body) return;
  body.querySelectorAll('tr').forEach(row=>{
    const badge=[...row.querySelectorAll('.v38Badge')].find(x=>/already allocated/i.test(normalText(x)));
    if(!badge) return;
    const cells=row.querySelectorAll('td');
    if(cells.length<8) return;
    const name=row.querySelector('strong')?.textContent?.trim();
    const raw=rawContribution(name);
    if(!raw) return;

    badge.textContent='already allocated · raw forecast shown';
    const preHit=parseFloat((cells[2].textContent||'').replace(/,/g,''));
    const preRate=parseFloat(cells[5].textContent||'0');
    const p=Math.max(-99,raw.pct||0);

    if(raw.type==='hit' && Number.isFinite(preHit)){
      cells[3].textContent=Math.round(preHit*(1+p/100)).toLocaleString();
      cells[4].innerHTML=`~${p.toFixed(2)}% <span class="rawForecast">RAW*</span>`;
      cells[6].textContent=Number.isFinite(preRate)?preRate.toFixed(2):cells[5].textContent;
      cells[7].innerHTML=`~${p.toFixed(2)}% <span class="rawForecast">RAW*</span>`;
    } else if(raw.type==='rate'){
      cells[3].textContent=cells[2].textContent;
      cells[4].textContent='0.00% hit';
      if(Number.isFinite(preRate)) cells[6].textContent=(preRate*(1+p/100)).toFixed(2);
      cells[7].innerHTML=`~${p.toFixed(2)}% theoretical <span class="rawForecast">RAW*</span>`;
    } else if(raw.type==='native'){
      cells[3].textContent=cells[2].textContent;
      cells[4].textContent='0.00% Flare';
      cells[6].textContent=cells[5].textContent;
      cells[7].innerHTML=`0% Flare · ~${p.toFixed(0)}% native <span class="rawForecast">RAW*</span>`;
    }
    const note=cells[cells.length-1];
    if(note && !/RAW comparison/i.test(note.textContent)) note.innerHTML += `<br><span class="rawForecast">RAW comparison</span> ${raw.label}. Actual instilling still does not stack with the allocated tree notable.`;
  });

  const research=document.getElementById('v38r-anoint');
  if(research){
    const p=[...research.querySelectorAll('p.small')].find(x=>/already allocated|zero rather than double/i.test(x.textContent||''));
    if(p) p.innerHTML='This table recalculates candidate instils. <strong>Already-allocated notables show their RAW standalone estimated contribution for comparison instead of 0%.</strong> The actual planner still deduplicates tree + instil, so you cannot gain the same notable twice.';
  }

  const mini=document.querySelector('#v39Struggle .v39Mini:last-child');
  if(mini && /zero-value instil|duplicates still do not stack/i.test(mini.textContent||'')){
    mini.innerHTML='Forecast rows may show a notable\'s <strong>raw standalone value</strong> even if it is already on the tree, so you can compare candidates. Actual planner state still deduplicates tree + instil and will not grant the notable twice.';
  }
}

function runFixes(){
  installCleanupCss();
  removeDuplicateReturnControls();
  patchAllocatedInstilRows();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(runFixes,1200));
else setTimeout(runFixes,1200);

// Older content layers redraw the research table periodically; re-apply presentation fixes.
setInterval(runFixes,1200);
})();
