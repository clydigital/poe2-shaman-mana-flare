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
