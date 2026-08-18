(() => {
'use strict';
const $=id=>document.getElementById(id);
function page(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  const target=$(p==='research'?'researchPage':'guidePage');
  if(target)target.classList.add('active');
  window.scrollTo({top:0,behavior:'instant'});
  history.replaceState(null,'',p==='research'?'#research':'#guide');
}
function bind(){
  document.querySelectorAll('[data-page]').forEach(b=>{
    if(b.dataset.v60Bound)return;b.dataset.v60Bound='1';
    b.addEventListener('click',()=>page(b.dataset.page));
  });
}
window.v44ShowPage=page;
bind();
new MutationObserver(bind).observe(document.documentElement,{childList:true,subtree:true});
if(location.hash==='#research')page('research');
})();
