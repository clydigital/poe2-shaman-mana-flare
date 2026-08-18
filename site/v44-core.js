(() => {
'use strict';
const $=id=>document.getElementById(id),DATA=window.MANA_GEYSER_V44||{profile:'#'};
const n=(id,f=0)=>{const e=$(id),v=e?+e.value:NaN;return Number.isFinite(v)?v:f},fmt=x=>Math.round(x).toLocaleString();
function cfg(){
  let cp=n('cCurrent',90)/100;
  if(!$('cOverflow')?.checked)cp=Math.min(1,cp);
  const per=n('cFlaskPerUse',0)*(1+n('cFlaskRecInc',0)/100),rate=Math.max(0,n('cFlaskUseRate',0));
  return{
    mana:n('cMana',2497),cp,base:n('cBaseRegen',4)/100,regen:n('cRegen',89)/100,
    other:n('cOtherRec',0)+per*rate+n('cLeech',0),flask:per*rate,leech:n('cLeech',0),
    cdr:n('cCdr',0)/100,carrierCrit:n('cCrit',42)/100,carrierHits:Math.max(0,n('cCarrierHits',4)),
    flareCrit:n('cFlareCrit',23)/100,cdb:n('cCdb',191)/100,inc:n('cInc',0)/100,rage:n('cRage',43),
    arch:$('cArch')?.checked,arc:$('cArcane')?.checked,inv:$('cInvoc')?.checked,druid:$('cDruid')?.checked,
    mom:$('cMom')?.checked,rath:$('cRath')?.checked,rr:n('cRecoveryRate',0)/100
  }
}
function model(c){
  const M=Math.max(1,c.mana),cur=Math.max(1,M*c.cp),fire=.25*cur,raw=fire*(1+(c.arch?.0004*M:0));
  let inc=c.inc+(c.arc?.0003*M:0)+(c.inv?.40:0)+(c.rath?.0006*M:0);
  const carrierCrit=Math.min(.99,Math.max(0,c.carrierCrit)),flareCrit=Math.min(.99,Math.max(0,c.flareCrit));
  const cf=1+flareCrit*Math.max(0,c.cdb),more=c.druid?1+Math.floor(Math.max(0,c.rage)/2)/100:1;
  const hit=raw*(1+inc)*cf*more,theo=1+Math.max(0,c.cdr),cooldown=1/theo;
  const regenRaw=c.base*M*Math.max(0,1+c.regen),rm=1+Math.max(-.95,c.rr),mom=c.mom?.5:1;
  const recovery=(regenRaw+Math.max(0,c.other))*rm*mom,regenEff=regenRaw*rm*mom,flask=c.flask*rm*mom,leech=c.leech*rm*mom;
  const need=.25*cur,recoveryCap=recovery/Math.max(1,need);
  const hitEvents=Math.max(0,c.carrierHits),eventsPerWindow=hitEvents*cooldown;
  const triggerSat=carrierCrit<=0||eventsPerWindow<=0?0:1-Math.pow(1-carrierCrit,eventsPerWindow);
  const triggerCap=theo*triggerSat,real=Math.max(0,Math.min(theo,recoveryCap,triggerCap));
  const hits95=carrierCrit<=0?Infinity:Math.log(.05)/Math.log(1-carrierCrit)/cooldown;
  const recoveryNeeded=need*theo;
  let cap='CDR-LIMITED / SATURATED';
  if(recoveryCap+1e-6<triggerCap&&recoveryCap+1e-6<theo)cap='RECOVERY-LIMITED';
  else if(triggerSat<.95)cap='CRIT / HIT-LIMITED';
  return{fire,hit,theo,cooldown,real,regenEff,recovery,flask,leech,need,dps:hit*real,triggerSat,triggerCap,hits95,recoveryNeeded,recoveryCap,carrierCrit,flareCrit,cap}
}
window.v44GetCfg=cfg;window.v44Model=model;
function render(){
  const r=model(cfg()),m={
    oBase:fmt(r.fire),oHit:fmt(r.hit),oTheo:r.theo.toFixed(2),oTrigger:r.triggerCap.toFixed(2),
    oReal:r.real.toFixed(2),oRegen:fmt(r.regenEff),oRecovery:fmt(r.recovery),oNeed:fmt(r.need),
    oDps:fmt(r.dps),oFlask:fmt(r.flask),oLeech:fmt(r.leech),oSat:(r.triggerSat*100).toFixed(1)+'%',
    oHits95:Number.isFinite(r.hits95)?r.hits95.toFixed(2):'∞',oRecNeed:fmt(r.recoveryNeeded),oCap:r.cap
  };
  Object.entries(m).forEach(([id,v])=>{if($(id))$(id).textContent=v});
  window.dispatchEvent(new CustomEvent('v44calc'))
}
window.v44RenderCalc=render;
window.v44PresetFlask=name=>{
  const p={none:[0,0,0,false],rare:[310,25,.18,false],uhtred:[1015,25,.10,true],double:[1325,25,.20,true]}[name]||[0,0,0,false];
  $('cFlaskPerUse').value=p[0];$('cFlaskRecInc').value=p[1];$('cFlaskUseRate').value=p[2];$('cOverflow').checked=p[3];render()
};
function page(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  $(p==='research'?'researchPage':'guidePage').classList.add('active');
  scrollTo({top:0,behavior:'instant'});history.replaceState(null,'',p==='research'?'#research':'#guide')
}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.page)));
document.querySelectorAll('.calcBody input').forEach(e=>e.addEventListener('input',render));
document.querySelectorAll('.calcBody input[type=checkbox]').forEach(e=>e.addEventListener('change',render));
$('calcCollapse')?.addEventListener('click',()=>{
  const r=$('calcRail');r.classList.toggle('collapsed');$('calcCollapse').textContent=r.classList.contains('collapsed')?'+':'−'
});
async function snapshot(){
  const s=$('snapStatus');if(s){s.textContent='SYNCING…';s.className=''}
  try{
    const r=await fetch(`./data/character.json?t=${Date.now()}`,{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json();
    if($('cMana'))$('cMana').value=d.mana||2497;
    const carrier=d.crit?.frostDarts?.chance||.42;
    if($('cCrit'))$('cCrit').value=Math.round(carrier*100);
    if($('cFlareCrit'))$('cFlareCrit').value=Math.round(Math.min(.99,carrier*(7/13))*100);
    if($('cCdb'))$('cCdb').value=Math.round((d.crit?.frostDarts?.cdb||1.91)*100);
    if($('cRegen'))$('cRegen').value=Math.round((d.treeStats?.manaRegen||.89)*100);
    const v={
      snapLevel:d.level??'—',snapMana:(d.mana??'—').toLocaleString?.()||d.mana,snapInt:d.intelligence??'—',
      snapSpirit:d.spirit??'—',snapArmour:(d.armour??'—').toLocaleString?.()||d.armour,snapWard:d.ward??'—',
      snapPassives:d.tree?.passivePoints??'—',snapFetched:d.fetchedAt?new Date(d.fetchedAt).toLocaleString():'unknown'
    };
    Object.entries(v).forEach(([id,x])=>{if($(id))$(id).textContent=x});
    if($('snapResists'))$('snapResists').textContent=Array.isArray(d.resists)?d.resists.join(' / '):'—';
    if(s){s.textContent=(d.syncStatus||'POE.NINJA SNAPSHOT').replaceAll('-',' ').toUpperCase();s.className=d.syncStatus==='stale-fallback'?'syncStale':'syncGood'}
    document.querySelectorAll('[data-snap-mana]').forEach(x=>x.textContent=(d.mana||2497).toLocaleString());
    document.querySelectorAll('[data-snap-level]').forEach(x=>x.textContent=d.level||49);
    render()
  }catch(e){if(s){s.textContent='SNAPSHOT LOAD FAILED';s.className='syncBad'}}
}
window.v44ReloadSnapshot=snapshot;
if(location.hash==='#research')page('research');
snapshot();render();
})();
