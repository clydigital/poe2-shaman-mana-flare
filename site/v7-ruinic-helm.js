// Correct the planner assumption: Ruinic Helm notable, not a flat Runic Ward toggle.
// Ruinic Helm: +1 Maximum Energy Shield per 8 Item Armour on Equipped Helmet.
(function(){
  const priorEvaluate=window.evaluate;
  const priorCalc=window.calc;

  function jewelEsPct(){
    return (state.jewels||[]).reduce((sum,j)=>{
      if(!j || j.enabled===false) return sum;
      if(j.mode==='heroic') return sum + 40*(+j.natural||0);
      if(j.mode==='undying'){
        const tribute=+j.tribute||0;
        return sum + (+j.desecratedEsSmalls||0)*(+j.desecratedEsEach||0) + (j.ancient?Math.floor(tribute/10)*4:0);
      }
      if(j.mode==='custom') return sum + (+j.incES||0);
      return sum;
    },0);
  }

  function recalcMana(x){
    x.normal=(x.characterBase+x.flat+x.ebFuel)*(1+x.inc/100);
    x.flareCost=x.normal*.25;
    x.overflowExtra=Math.min(x.potential,x.normal*.5);
    x.overflowTotal=x.normal+x.overflowExtra;
    x.overflowFlare=x.overflowTotal*.25;
    x.recoveryLimited=x.flareCost?x.projectedRecovery/x.flareCost:0;
    x.sustainable=Math.min(x.cooldownLimited,x.recoveryLimited);
    x.bottleneck=x.recoveryLimited<x.cooldownLimited?'Recovery':'Cooldown';
  }

  window.evaluate=function(){
    const x=priorEvaluate();
    const helm=getLocalDef('helmet');
    const enabled=state.mechanics.runic!==false; // keep old build-code key for compatibility
    const flatEs=enabled?Math.floor((helm.itemA||0)/8):0;
    const esScale=1+(x.globalDefPct+jewelEsPct())/100;
    const finalContribution=flatEs*esScale;

    x.ruinicHelmItemArmour=helm.itemA||0;
    x.ruinicHelmFlat=flatEs;
    x.ruinicHelmFinal=finalContribution;
    x.finalES+=finalContribution;
    if(state.mechanics.eb) x.ebFuel+=finalContribution;
    recalcMana(x);
    return x;
  };

  function fixMechanicLabel(){
    document.querySelectorAll('#mechanics button').forEach(btn=>{
      if(/runic ward/i.test(btn.textContent||'') || btn.dataset.mechanic==='runic'){
        btn.textContent=(btn.textContent||'').replace(/runic ward/i,'Ruinic Helm');
        if(!/ruinic helm/i.test(btn.textContent||'')) btn.textContent='Ruinic Helm';
        btn.title='+1 Maximum Energy Shield per 8 Item Armour on Equipped Helmet';
      }
    });
  }

  window.calc=function(){
    priorCalc();
    const x=window.evaluate();

    const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
    set('mana',fmt(x.normal));
    set('overflow','+'+fmt(x.overflowExtra));
    set('overflowTotal',fmt(x.overflowTotal));
    set('flareHit',fmt(x.flareCost));
    set('overflowHit',fmt(x.overflowFlare));
    set('es',fmt(x.finalES));
    set('ward','+'+fmt(x.ruinicHelmFinal));
    set('recoveryRate',x.recoveryLimited.toFixed(2)+'/s');
    set('flareRate',x.sustainable.toFixed(2)+'/s');
    set('bottleneck',x.bottleneck);

    const wardStat=document.getElementById('ward')?.closest('.stat');
    const wardLabel=wardStat?.querySelector('.k');
    if(wardLabel) wardLabel.textContent='Ruinic Helm → ES';

    const def=document.getElementById('defBreakdown');
    if(def) def.innerHTML=[
      ['Local body Evasion used by Spectral',fmt(x.bodyLocal.itemE)],
      ['Spectral flat ES','+'+fmt(x.spectralFlat)],
      ['Helmet Item Armour used by Ruinic',fmt(x.ruinicHelmItemArmour)],
      ['Ruinic Helm flat ES','+'+fmt(x.ruinicHelmFlat)],
      ['Ruinic Helm final ES contribution','+'+fmt(x.ruinicHelmFinal)],
      ['Morior global defence bucket',x.globalDefPct.toFixed(1)+'%'],
      ['Final Armour',fmt(x.finalArmour)],
      ['Final Evasion',fmt(x.finalEvasion)],
      ['Final Energy Shield',fmt(x.finalES)],
      ['Overflow potential',fmt(x.potential)],
      ['Overflow hard cap',fmt(x.normal*1.5)]
    ].map(r=>`<div class="row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('');

    const notes=document.getElementById('notes');
    if(notes && !notes.querySelector('[data-ruinic-note]')){
      notes.insertAdjacentHTML('beforeend','<div class="row" data-ruinic-note><span>Ruinic Helm notable</span><b>+1 ES / 8 helmet Item Armour</b></div>');
    }
    fixMechanicLabel();
  };

  fixMechanicLabel();
  window.calc();
})();
