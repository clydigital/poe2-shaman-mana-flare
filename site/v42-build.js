(() => {
'use strict';

const $ = (s,r=document) => r.querySelector(s);
const $$ = (s,r=document) => [...r.querySelectorAll(s)];
const fmt = n => Number.isFinite(+n) ? Math.round(+n).toLocaleString() : '—';

function frontMode(){
  document.body.classList.add('v42FrontMode');
  document.body.classList.remove('v42BackendMode');
  window.scrollTo({top:0,behavior:'auto'});
}

function revealBackend(){
  document.body.classList.remove('v42FrontMode');
  document.body.classList.add('v42BackendMode');
}

function clickMode(names){
  for(const name of names){
    const b=$(`.modebtn[data-mode="${name}"]`);
    if(b){b.click();return true;}
  }
  return false;
}

function openBackend(target){
  revealBackend();
  setTimeout(()=>{
    if(target==='research'){
      $('#research')?.scrollIntoView({behavior:'auto',block:'start'});
      return;
    }
    if(target==='storm'){
      clickMode(['experiments','experiment','storm','stormlab']);
      ($('#app')||$('#mg-storm')||$('#stormLab'))?.scrollIntoView({behavior:'auto',block:'start'});
      return;
    }
    if(target==='instils'){
      clickMode(['guide','build']);
      const instil=$('#v39Struggle')||$('#v38r-anoint')||$('#v32Instils');
      (instil||$('#app'))?.scrollIntoView({behavior:'auto',block:'start'});
      return;
    }
    clickMode(['build','guide','mybuild']);
    ($('#app')||$('.plannerShell')||$('.planner'))?.scrollIntoView({behavior:'auto',block:'start'});
  },180);
}

function bindOpeners(){
  $$('[data-v42-open]').forEach(btn=>btn.addEventListener('click',e=>{
    e.preventDefault();openBackend(btn.dataset.v42Open);
  }));
  $('#v42Return')?.addEventListener('click',frontMode);
}

function bindTabs(){
  const links=$$('.v42Tabs a[href^="#v42-"]');
  links.forEach(a=>a.addEventListener('click',()=>{
    links.forEach(x=>x.classList.remove('active'));a.classList.add('active');
  }));
  if(!('IntersectionObserver' in window))return;
  const pairs=links.map(a=>({a,el:$(a.getAttribute('href'))})).filter(x=>x.el);
  const io=new IntersectionObserver(entries=>{
    const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    const p=pairs.find(x=>x.el===visible.target);if(!p)return;
    links.forEach(x=>x.classList.toggle('active',x===p.a));
  },{rootMargin:'-18% 0px -68% 0px',threshold:[0,.15,.4]});
  pairs.forEach(x=>io.observe(x.el));
}

async function loadSnapshot(){
  try{
    const r=await fetch('./data/character.json',{cache:'no-store'});
    if(!r.ok)return;
    const s=await r.json();
    if(s.level) $('#v42rLevel').textContent=s.level;
    if(s.mana) $('#v42rMana').textContent=fmt(s.mana);
    if(s.armour!=null) $('#v42rArmour').textContent=fmt(s.armour);
    if(s.spirit!=null) $('#v42rSpirit').textContent=fmt(s.spirit);
    const fc=s.crit?.frostDarts;
    if(fc?.chance!=null) $('#v42rCrit').textContent=`${Math.round(fc.chance*100)}%`;
    if(fc?.cdb!=null) $('#v42rCdb').textContent=`${Math.round(fc.cdb*100)}%`;
  }catch(e){}
}

function readCalc(){
  try{
    if(typeof window.calc!=='function')return null;
    const c=window.calc();
    if(!c||!Number.isFinite(+c.M))return null;
    return c;
  }catch(e){return null}
}

function updateRail(){
  const c=readCalc();if(!c)return;
  $('#v42rMana').textContent=fmt(c.M);
  $('#v42rCurrent').textContent=fmt(c.current);
  if(Number.isFinite(+c.crit)) $('#v42rCrit').textContent=`${Math.round(c.crit*100)}%`;
  if(Number.isFinite(+c.cdb)) $('#v42rCdb').textContent=`${Math.round(c.cdb*100)}%`;
  $('#v42rHit').textContent=fmt(c.expected ?? c.flareHit);
  if(Number.isFinite(+c.realised)) $('#v42rRate').textContent=(+c.realised).toFixed(2);
  else if(Number.isFinite(+c.flareRate)) $('#v42rRate').textContent=(+c.flareRate).toFixed(2);
  $('#v42rDps').textContent=fmt(c.dps ?? c.flareDps);
  $('#v42rRegen').textContent=fmt(c.regen ?? c.effectiveRegen);
}

function protectFrontFromLegacy(){
  // Old front-end layers can still exist in cached builds. Never let them replace the v42 first-paint page.
  const oldFront=$('#mfFront');if(oldFront)oldFront.setAttribute('aria-hidden','true');
  $$('.mfNav,.nav,.mobileNav').forEach(n=>n.setAttribute('aria-hidden','true'));
}

function init(){
  bindOpeners();bindTabs();loadSnapshot();protectFrontFromLegacy();
  setTimeout(updateRail,450);setInterval(updateRail,2200);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
