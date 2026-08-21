// Slot 3 is the current owned Timeless Jewel used by the build.
(function(){
  if(!state.jewels || !state.jewels[2]) return;
  const t=state.timeless || {notables:3,intPerNotable:3,smalls:10,manaPerSmall:10};
  Object.assign(state.jewels[2],{
    mode:'owned',
    enabled:true,
    notables:t.notables ?? 3,
    intPerNotable:t.intPerNotable ?? 3,
    smalls:t.smalls ?? 10,
    manaPerSmall:t.manaPerSmall ?? 10
  });
  const set=(id,v,check=false)=>{const el=document.getElementById(id);if(!el)return;if(check)el.checked=!!v;else el.value=v;};
  set('j3Enabled',true,true);
  set('j3Mode','owned');
  set('j3Notables',state.jewels[2].notables);
  set('j3IntPerNotable',state.jewels[2].intPerNotable);
  set('j3Smalls',state.jewels[2].smalls);
  set('j3ManaPerSmall',state.jewels[2].manaPerSmall);
  const h=document.querySelector('#jewelPanel3 .jewelHead h3');
  if(h) h.textContent='Jewel Slot 3 · Current Timeless';
  const note=document.querySelector('#j3Owned .small');
  if(note) note.textContent='Current Timeless Jewel used by the build. Defaults to 3 × +3% INT notables and 10 × +10 Mana small passives.';
  window.calc();
})();