// Timeless Jewel lab: user-owned jewel defaults.
// Notables: 3% increased Intelligence each. Small passives: +10 maximum Mana each.
(function(){
  const defaults={enabled:true,notables:3,intPerNotable:3,smalls:10,manaPerSmall:10};
  state.timeless=Object.assign({},defaults,state.timeless||{});

  const lab=document.querySelector('.labgrid');
  if(lab){
    const panel=document.createElement('div');
    panel.className='panel';
    panel.id='ownedTimelessPanel';
    panel.innerHTML=`<h3>Your Timeless Jewel lab</h3>
      <div class="small">Your owned jewel modifiers. This panel is used when Current owned jewel is selected in the live-jewel comparison.</div>
      <div class="field"><span>Affected Notables</span><input id="tjNotables" type="number" min="0" value="${state.timeless.notables}"></div>
      <div class="field"><span>% INT per Notable</span><input id="tjIntPerNotable" type="number" min="0" step="0.1" value="${state.timeless.intPerNotable}"></div>
      <div class="field"><span>Affected Small Passives</span><input id="tjSmalls" type="number" min="0" value="${state.timeless.smalls}"></div>
      <div class="field"><span>Max Mana per Small</span><input id="tjManaPerSmall" type="number" min="0" step="1" value="${state.timeless.manaPerSmall}"></div>
      <div class="row"><span>Timeless increased INT</span><b id="tjIntOut">—</b></div>
      <div class="row"><span>Timeless flat Mana</span><b id="tjManaOut">—</b></div>`;
    lab.appendChild(panel);
  }

  function readTJ(){
    const g=id=>document.getElementById(id);
    state.timeless.notables=Math.max(0,+g('tjNotables')?.value||0);
    state.timeless.intPerNotable=Math.max(0,+g('tjIntPerNotable')?.value||0);
    state.timeless.smalls=Math.max(0,+g('tjSmalls')?.value||0);
    state.timeless.manaPerSmall=Math.max(0,+g('tjManaPerSmall')?.value||0);
    return state.timeless;
  }

  const baseEvaluate=window.evaluate;
  window.evaluate=function(){
    const x=baseEvaluate();
    const t=readTJ();
    const intPct=t.enabled?t.notables*t.intPerNotable:0;
    const intGain=t.enabled?x.totalInt*(intPct/100):0;
    const flatGain=t.enabled?t.smalls*t.manaPerSmall:0;
    x.timelessIntPct=intPct;
    x.timelessIntGain=intGain;
    x.timelessFlatMana=flatGain;
    x.totalInt+=intGain;
    x.characterBase+=2*intGain;
    x.flat+=flatGain;
    x.normal=(x.characterBase+x.flat+x.ebFuel)*(1+x.inc/100);
    x.flareCost=x.normal*.25;
    x.overflowExtra=Math.min(x.potential,x.normal*.5);
    x.overflowTotal=x.normal+x.overflowExtra;
    x.overflowFlare=x.overflowTotal*.25;
    x.recoveryLimited=x.flareCost>0?x.projectedRecovery/x.flareCost:0;
    x.sustainable=Math.min(x.cooldownLimited,x.recoveryLimited);
    x.bottleneck=x.recoveryLimited<x.cooldownLimited?'Recovery':'Cooldown';
    return x;
  };

  const baseCalc=window.calc;
  window.calc=function(){
    baseCalc();
    const x=window.evaluate();
    const a=document.getElementById('tjIntOut'),m=document.getElementById('tjManaOut');
    if(a)a.textContent=state.timeless.enabled?`+${x.timelessIntPct.toFixed(1)}% = +${fmt(x.timelessIntGain,1)} INT`:'inactive';
    if(m)m.textContent=state.timeless.enabled?`+${fmt(x.timelessFlatMana)} Mana`:'inactive';
    const p=document.getElementById('ownedTimelessPanel');if(p)p.style.opacity=state.timeless.enabled?'1':'0.55';
  };

  ['tjNotables','tjIntPerNotable','tjSmalls','tjManaPerSmall'].forEach(id=>document.getElementById(id)?.addEventListener('input',()=>window.calc()));
  window.calc();
})();
