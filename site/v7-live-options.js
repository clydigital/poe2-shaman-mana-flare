// Live current-league jewel comparison logic retained; UI block intentionally removed.
(function(){
  state.liveJewel=Object.assign({mode:'owned',force:0,natural:0,runic:0,war:0,survival:0,scorched:0,som:true,tribute:100,lavish:false,ravenous:false,unrestrained:false,ancient:false,worthy:false,desecratedIntNodes:0,desecratedIntEach:6,desecratedEsSmalls:0,desecratedEsEach:3,desecratedRegenSmalls:0,desecratedRegenEach:2.5},state.liveJewel||{});

  function recalc(x){x.normal=(x.characterBase+x.flat+x.ebFuel)*(1+x.inc/100);x.flareCost=x.normal*.25;x.overflowExtra=Math.min(x.potential,x.normal*.5);x.overflowTotal=x.normal+x.overflowExtra;x.overflowFlare=x.overflowTotal*.25;x.recoveryLimited=x.flareCost>0?x.projectedRecovery/x.flareCost:0;x.sustainable=Math.min(x.cooldownLimited,x.recoveryLimited);x.bottleneck=x.recoveryLimited<x.cooldownLimited?'Recovery':'Cooldown';}

  const baseEvaluate=window.evaluate;
  window.evaluate=function(){
    const s=state.liveJewel;
    state.timeless.enabled=s.mode==='owned';
    const x=baseEvaluate();
    x.liveJewelManaPct=0;x.liveJewelInt=0;x.liveJewelEsPct=0;x.liveJewelRegenPct=0;x.liveJewelFlaskPct=0;x.liveJewelNote='';
    if(s.mode==='heroic'){
      x.liveJewelManaPct=2*s.force;x.liveJewelInt=15*s.scorched;x.liveJewelEsPct=40*s.natural;x.liveJewelRegenPct=30*s.runic+20*s.war;x.liveJewelFlaskPct=40*s.survival;x.inc+=x.liveJewelManaPct;x.totalInt+=x.liveJewelInt;x.characterBase+=2*x.liveJewelInt;if(x.liveJewelEsPct>0){const raw=x.finalES/(1+x.globalDefPct/100);x.finalES=raw*(1+(x.globalDefPct+x.liveJewelEsPct)/100);x.ebFuel=state.mechanics.eb?x.finalES:0;}if(x.liveJewelRegenPct>0){const base=state.customRecovery/(1+REF_ITEM_REGEN/100);x.projectedRecovery=base*(1+(x.itemRegen+x.liveJewelRegenPct)/100);}if(x.liveJewelFlaskPct>0)x.potential*=1+x.liveJewelFlaskPct/100;
    }
    if(s.mode==='undying'){
      const tribute=s.tribute,desecratedInt=s.desecratedIntNodes*s.desecratedIntEach,desecratedEs=s.desecratedEsSmalls*s.desecratedEsEach,desecratedRegen=s.desecratedRegenSmalls*s.desecratedRegenEach,unrestrainedInt=s.unrestrained?Math.floor(tribute/25)*2:0,ancientEs=s.ancient?Math.floor(tribute/10)*4:0,ravenousRecovery=s.ravenous?Math.floor(tribute/10)*2:0,lavishMana=(s.lavish&&tribute>=100)?5:0;x.liveJewelManaPct=lavishMana;x.liveJewelInt=desecratedInt+unrestrainedInt;x.liveJewelEsPct=desecratedEs+ancientEs;x.liveJewelRegenPct=desecratedRegen;x.inc+=lavishMana;x.totalInt+=x.liveJewelInt;x.characterBase+=2*x.liveJewelInt;if(x.liveJewelEsPct>0){const raw=x.finalES/(1+x.globalDefPct/100);x.finalES=raw*(1+(x.globalDefPct+x.liveJewelEsPct)/100);x.ebFuel=state.mechanics.eb?x.finalES:0;}if(desecratedRegen>0){const base=state.customRecovery/(1+REF_ITEM_REGEN/100);x.projectedRecovery=base*(1+(x.itemRegen+desecratedRegen)/100);}if(ravenousRecovery>0)x.projectedRecovery*=1+ravenousRecovery/100;if(s.unrestrained)x.cdr+=Math.floor(tribute/10);if(s.som){x.projectedRecovery*=.5;x.potential=Math.max(x.potential,x.normal*.5);}
    }
    recalc(x);if(s.mode==='undying'&&s.som){x.potential=Math.max(x.potential,x.normal*.5);recalc(x);}return x;
  };

  const baseCalc=window.calc;
  window.calc=function(){baseCalc();const x=window.evaluate();document.getElementById('mana').textContent=fmt(x.normal);document.getElementById('overflow').textContent='+'+fmt(x.overflowExtra);document.getElementById('overflowTotal').textContent=fmt(x.overflowTotal);document.getElementById('flareHit').textContent=fmt(x.flareCost);document.getElementById('overflowHit').textContent=fmt(x.overflowFlare);document.getElementById('es').textContent=fmt(x.finalES);document.getElementById('recoveryOut').textContent=fmt(x.projectedRecovery)+'/s';document.getElementById('cooldownRate').textContent=x.cooldownLimited.toFixed(2)+'/s';document.getElementById('recoveryRate').textContent=x.recoveryLimited.toFixed(2)+'/s';document.getElementById('flareRate').textContent=x.sustainable.toFixed(2)+'/s';document.getElementById('bottleneck').textContent=x.bottleneck;};
  window.calc();
})();