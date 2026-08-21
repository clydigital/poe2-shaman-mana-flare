// Live current-league jewel comparison layer for PoE2 Runes of Aldur.
(function(){
  state.liveJewel=Object.assign({mode:'owned',force:0,natural:0,runic:0,war:0,survival:0,scorched:0,som:true,tribute:100,lavish:false,ravenous:false,unrestrained:false,ancient:false,worthy:false,desecratedIntNodes:0,desecratedIntEach:6,desecratedEsSmalls:0,desecratedEsEach:3,desecratedRegenSmalls:0,desecratedRegenEach:2.5},state.liveJewel||{});

  const lab=document.querySelector('.labgrid');
  if(lab){
    const panel=document.createElement('div');
    panel.className='panel';
    panel.innerHTML=`<h3>Current-league Jewel comparison</h3>
      <div class="small">PoE2 Runes of Aldur only. No Glorious Vanity / Ritual of Memory assumptions.</div>
      <div class="field"><span>Jewel branch</span><select id="liveJewelMode"><option value="owned">Current owned jewel</option><option value="heroic">Heroic Tragedy</option><option value="undying">Undying Hate · Kurgal</option></select></div>
      <div id="heroicFields">
        <div class="field"><span>Force of Will notables</span><input id="htForce" type="number" min="0" value="0"></div>
        <div class="field"><span>Natural Energies notables</span><input id="htNatural" type="number" min="0" value="0"></div>
        <div class="field"><span>Runic Tattoos notables</span><input id="htRunic" type="number" min="0" value="0"></div>
        <div class="field"><span>War Tactics notables</span><input id="htWar" type="number" min="0" value="0"></div>
        <div class="field"><span>Survival Plan notables</span><input id="htSurvival" type="number" min="0" value="0"></div>
        <div class="field"><span>Scorched Earth notables</span><input id="htScorched" type="number" min="0" value="0"></div>
      </div>
      <div id="undyingFields">
        <div class="field"><span>Sacrifice of Mind</span><input id="uhSom" type="checkbox" checked></div>
        <div class="field"><span>Tribute</span><input id="uhTribute" type="number" min="0" value="100"></div>
        <div class="field"><span>Lavish Soul</span><input id="uhLavish" type="checkbox"></div>
        <div class="field"><span>Ravenous Mind</span><input id="uhRavenous" type="checkbox"></div>
        <div class="field"><span>Unrestrained Intellect</span><input id="uhUnrestrained" type="checkbox"></div>
        <div class="field"><span>Ancient Bastion</span><input id="uhAncient" type="checkbox"></div>
        <div class="field"><span>Worthy Tithes</span><input id="uhWorthy" type="checkbox"></div>
        <div class="field"><span>Desecrated INT nodes</span><input id="uhIntNodes" type="number" min="0" value="0"></div>
        <div class="field"><span>INT per node</span><input id="uhIntEach" type="number" min="4" max="8" step="1" value="6"></div>
        <div class="field"><span>Desecrated ES smalls</span><input id="uhEsSmalls" type="number" min="0" value="0"></div>
        <div class="field"><span>ES % per small</span><input id="uhEsEach" type="number" min="2" max="4" step="0.5" value="3"></div>
        <div class="field"><span>Desecrated regen smalls</span><input id="uhRegenSmalls" type="number" min="0" value="0"></div>
        <div class="field"><span>Mana regen % per small</span><input id="uhRegenEach" type="number" min="2" max="3" step="0.5" value="2.5"></div>
      </div>
      <div class="row"><span>Jewel Mana effect</span><b id="liveJewelMana">—</b></div>
      <div class="row"><span>Jewel EB/ES effect</span><b id="liveJewelEs">—</b></div>
      <div class="row"><span>Jewel recovery effect</span><b id="liveJewelRecovery">—</b></div>
      <div class="small" id="liveJewelNote"></div>`;
    lab.appendChild(panel);
  }

  function read(){
    const g=id=>document.getElementById(id),v=id=>+g(id)?.value||0,c=id=>!!g(id)?.checked;
    const s=state.liveJewel;
    s.mode=g('liveJewelMode')?.value||'owned';s.force=v('htForce');s.natural=v('htNatural');s.runic=v('htRunic');s.war=v('htWar');s.survival=v('htSurvival');s.scorched=v('htScorched');
    s.som=c('uhSom');s.tribute=v('uhTribute');s.lavish=c('uhLavish');s.ravenous=c('uhRavenous');s.unrestrained=c('uhUnrestrained');s.ancient=c('uhAncient');s.worthy=c('uhWorthy');s.desecratedIntNodes=v('uhIntNodes');s.desecratedIntEach=v('uhIntEach');s.desecratedEsSmalls=v('uhEsSmalls');s.desecratedEsEach=v('uhEsEach');s.desecratedRegenSmalls=v('uhRegenSmalls');s.desecratedRegenEach=v('uhRegenEach');
    state.timeless.enabled=s.mode==='owned';
    const h=document.getElementById('heroicFields'),u=document.getElementById('undyingFields');if(h)h.style.display=s.mode==='heroic'?'block':'none';if(u)u.style.display=s.mode==='undying'?'block':'none';
    return s;
  }

  function recalc(x){
    x.normal=(x.characterBase+x.flat+x.ebFuel)*(1+x.inc/100);
    x.flareCost=x.normal*.25;
    x.overflowExtra=Math.min(x.potential,x.normal*.5);
    x.overflowTotal=x.normal+x.overflowExtra;
    x.overflowFlare=x.overflowTotal*.25;
    x.recoveryLimited=x.flareCost>0?x.projectedRecovery/x.flareCost:0;
    x.sustainable=Math.min(x.cooldownLimited,x.recoveryLimited);
    x.bottleneck=x.recoveryLimited<x.cooldownLimited?'Recovery':'Cooldown';
  }

  const baseEvaluate=window.evaluate;
  window.evaluate=function(){
    const s=read();
    const x=baseEvaluate();
    x.liveJewelManaPct=0;x.liveJewelInt=0;x.liveJewelEsPct=0;x.liveJewelRegenPct=0;x.liveJewelFlaskPct=0;x.liveJewelNote='';

    if(s.mode==='heroic'){
      x.liveJewelManaPct=2*s.force;
      x.liveJewelInt=15*s.scorched;
      x.liveJewelEsPct=40*s.natural;
      x.liveJewelRegenPct=30*s.runic+20*s.war;
      x.liveJewelFlaskPct=40*s.survival;
      x.inc+=x.liveJewelManaPct;
      x.totalInt+=x.liveJewelInt;x.characterBase+=2*x.liveJewelInt;
      if(x.liveJewelEsPct>0){const raw=x.finalES/(1+x.globalDefPct/100);x.finalES=raw*(1+(x.globalDefPct+x.liveJewelEsPct)/100);x.ebFuel=state.mechanics.eb?x.finalES:0;}
      if(x.liveJewelRegenPct>0){const base=state.customRecovery/(1+REF_ITEM_REGEN/100);x.projectedRecovery=base*(1+(x.itemRegen+x.liveJewelRegenPct)/100);}
      if(x.liveJewelFlaskPct>0)x.potential*=1+x.liveJewelFlaskPct/100;
      x.liveJewelNote='Heroic Tragedy values are live transformed notable outcomes; seed/location decides how many you actually get.';
    }

    if(s.mode==='undying'){
      const tribute=s.tribute;
      const desecratedInt=s.desecratedIntNodes*s.desecratedIntEach;
      const desecratedEs=s.desecratedEsSmalls*s.desecratedEsEach;
      const desecratedRegen=s.desecratedRegenSmalls*s.desecratedRegenEach;
      const unrestrainedInt=s.unrestrained?Math.floor(tribute/25)*2:0;
      const ancientEs=s.ancient?Math.floor(tribute/10)*4:0;
      const ravenousRecovery=s.ravenous?Math.floor(tribute/10)*2:0;
      const lavishMana=(s.lavish&&tribute>=100)?5:0;
      x.liveJewelManaPct=lavishMana;x.liveJewelInt=desecratedInt+unrestrainedInt;x.liveJewelEsPct=desecratedEs+ancientEs;x.liveJewelRegenPct=desecratedRegen;
      x.inc+=lavishMana;x.totalInt+=x.liveJewelInt;x.characterBase+=2*x.liveJewelInt;
      if(x.liveJewelEsPct>0){const raw=x.finalES/(1+x.globalDefPct/100);x.finalES=raw*(1+(x.globalDefPct+x.liveJewelEsPct)/100);x.ebFuel=state.mechanics.eb?x.finalES:0;}
      if(desecratedRegen>0){const base=state.customRecovery/(1+REF_ITEM_REGEN/100);x.projectedRecovery=base*(1+(x.itemRegen+desecratedRegen)/100);}
      if(ravenousRecovery>0)x.projectedRecovery*=1+ravenousRecovery/100;
      if(s.unrestrained)x.cdr+=Math.floor(tribute/10);
      if(s.som){x.projectedRecovery*=.5;x.potential=Math.max(x.potential,x.normal*.5);x.liveJewelNote='Sacrifice of Mind: regeneration can overflow maximum Mana; 50% less Mana regeneration. Planner permits regen to fill the existing 1.5× overflow cap.';}else{x.liveJewelNote='Undying Hate branch without Sacrifice of Mind overflow.';}
      if(s.worthy)x.liveJewelNote+=` Worthy Tithes: +${Math.floor(tribute/10)*2}% Remnant effect (shown as utility; not converted into fake flat recovery).`;
    }

    recalc(x);
    if(s.mode==='undying'&&s.som){x.potential=Math.max(x.potential,x.normal*.5);recalc(x);}
    return x;
  };

  const baseCalc=window.calc;
  window.calc=function(){
    baseCalc();
    const x=window.evaluate();
    const m=document.getElementById('liveJewelMana'),e=document.getElementById('liveJewelEs'),r=document.getElementById('liveJewelRecovery'),n=document.getElementById('liveJewelNote');
    if(m)m.textContent=state.liveJewel.mode==='owned'?'uses owned jewel lab':`+${x.liveJewelManaPct.toFixed(1)}% max Mana · +${fmt(x.liveJewelInt,0)} INT`;
    if(e)e.textContent=state.liveJewel.mode==='owned'?'uses owned jewel lab':`+${x.liveJewelEsPct.toFixed(1)}% max ES`;
    if(r)r.textContent=state.liveJewel.mode==='owned'?'uses owned jewel lab':`${fmt(x.projectedRecovery)}/s projected`;
    if(n)n.textContent=x.liveJewelNote||'Your current owned jewel is active.';
    document.getElementById('mana').textContent=fmt(x.normal);document.getElementById('overflow').textContent='+'+fmt(x.overflowExtra);document.getElementById('overflowTotal').textContent=fmt(x.overflowTotal);document.getElementById('flareHit').textContent=fmt(x.flareCost);document.getElementById('overflowHit').textContent=fmt(x.overflowFlare);document.getElementById('es').textContent=fmt(x.finalES);document.getElementById('recoveryOut').textContent=fmt(x.projectedRecovery)+'/s';document.getElementById('cooldownRate').textContent=x.cooldownLimited.toFixed(2)+'/s';document.getElementById('recoveryRate').textContent=x.recoveryLimited.toFixed(2)+'/s';document.getElementById('flareRate').textContent=x.sustainable.toFixed(2)+'/s';document.getElementById('bottleneck').textContent=x.bottleneck;
  };

  ['liveJewelMode','htForce','htNatural','htRunic','htWar','htSurvival','htScorched','uhSom','uhTribute','uhLavish','uhRavenous','uhUnrestrained','uhAncient','uhWorthy','uhIntNodes','uhIntEach','uhEsSmalls','uhEsEach','uhRegenSmalls','uhRegenEach'].forEach(id=>document.getElementById(id)?.addEventListener('input',()=>window.calc()));
  read();window.calc();
})();
