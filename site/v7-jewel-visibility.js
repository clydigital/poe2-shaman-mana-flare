// Keep each jewel panel focused: only show modifiers for its selected jewel type.
(function(){
  const groups={owned:'Owned',heroic:'Heroic',undying:'Undying',custom:'Custom'};
  function syncSlot(n){
    const select=document.getElementById(`j${n}Mode`);
    if(!select)return;
    const mode=select.value||'owned';
    Object.entries(groups).forEach(([key,suffix])=>{
      const el=document.getElementById(`j${n}${suffix}`);
      if(!el)return;
      const active=key===mode;
      el.classList.toggle('active',active);
      el.style.display=active?'block':'none';
    });
  }
  function syncAll(){for(let n=1;n<=3;n++)syncSlot(n)}
  for(let n=1;n<=3;n++){
    const select=document.getElementById(`j${n}Mode`);
    if(select){
      select.addEventListener('change',()=>{syncSlot(n);if(window.calc)window.calc()});
      select.addEventListener('input',()=>syncSlot(n));
    }
  }
  syncAll();
})();