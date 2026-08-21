// Focus-aware augment routing added after v7-app.js.
const _v7SocketItemType=socketItemType;
socketItemType=function(s){
  if(s==='weapon2'){
    const id=item('weapon2').id;
    if(['rathpith','threaded','serpent','effigy'].includes(id)) return 'focus';
    return 'shield';
  }
  return _v7SocketItemType(s);
};
const _v7ApplyAugments=applyAugments;
applyAugments=function(s,d){
  const out=_v7ApplyAugments(s,d);
  const c=cfg(s),t=socketItemType(s),mult=darknessMultiplier(s);
  if(c&&t==='focus') for(const key of c.runes||[]) if(key==='owl') out.cdr+=12*mult;
  return out;
};
calc();

// Load current-league additions without disturbing the core v7 file order.
// live-data adds equipment candidates; live-options wraps the final calculator after the Timeless lab has initialised.
window.addEventListener('load',()=>{
  const d=document.createElement('script');d.src='v7-live-data.js';d.async=false;
  d.onload=()=>{const j=document.createElement('script');j.src='v7-live-options.js';j.async=false;document.body.appendChild(j);};
  document.body.appendChild(d);
});
