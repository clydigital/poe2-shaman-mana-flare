// Timeless Jewel lab: user-owned jewel defaults.
// Notables: 3% increased Intelligence each. Small passives: +10 maximum Mana each.
(function(){
  const defaults={notables:3,intPerNotable:3,smalls:10,manaPerSmall:10};
  state.timeless=Object.assign({},defaults,state.timeless||{});

  const lab=document.querySelector('.labgrid');
  if(lab){
    const panel=document.createElement('div');
    panel.className='panel';
    panel.innerHTML=`<h3>Timeless Jewel lab</h3>
      <div class="small">Your jewel modifiers. Counts and roll values are adjustable; defaults are 3% increased Intelligence per affected Notable and +10 maximum Mana per affected Small Passive.</div>
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
    const intPct=t.notables*t.intPerNotable;
    const intGain=x.totalInt*(intPct/100);
    const flatGain=t.smalls*t.manaPerSmall;
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
    if(a)a.textContent=`+${x.timelessIntPct.toFixed(1)}% = +${fmt(x.timelessIntGain,1)} INT`;
    if(m)m.textContent=`+${fmt(x.timelessFlatMana)} Mana`;
  };

  ['tjNotables','tjIntPerNotable','tjSmalls','tjManaPerSmall'].forEach(id=>document.getElementById(id)?.addEventListener('input',()=>window.calc()));
  window.calc();
})();