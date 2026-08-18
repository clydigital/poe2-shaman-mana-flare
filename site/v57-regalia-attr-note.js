(() => {
'use strict';
function mount(){
  const host=document.getElementById('v56Flex');
  const tbody=host?.querySelector('.v56Attr table tbody');
  if(!host||!tbody)return setTimeout(mount,250);
  if(!document.getElementById('v57MoriorAttr')){
    const tr=document.createElement('tr');tr.id='v57MoriorAttr';
    tr.innerHTML='<td>Morior all-Attribute socket roll</td><td>Body modifier</td><td>+5–7 all Attributes per filled socket</td><td>+20–28 on 4 sockets; +25–35 on corrupted 5 sockets. Excellent secondary roll beside max Mana. Treat it as post-equip stat budget rather than the source you depend on to enable the chest itself.</td>';
    tbody.prepend(tr);
  }
  if(!document.getElementById('v57RegaliaNote')){
    const read=document.getElementById('v56AttrRead');
    const note=document.createElement('div');note.id='v57RegaliaNote';note.className='v56AttrRead';
    note.innerHTML='<b>If “41 all around” means the requirement:</b> current snapshot values are loaded above and only 41 STR / 41 DEX / 41 INT are needed. <b>If you mean the Grand Regalia base is spread across three weak defence types:</b> attribute gear does not fix that. Morior\'s 300–400% local defence roll raises the listed Armour/Evasion/ES; Spectral Ward specifically reads the listed Item Evasion, while Eldritch Battery reads the listed/base ES. Global Evasion/ES bonuses do not increase those two conversion inputs.';
    read.insertAdjacentElement('afterend',note);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
setTimeout(mount,700);
})();

// v58: rare/unique boots, attribute fixing and boot-based CDR paths.
(() => {
  if(document.querySelector('script[data-v58-boots]')) return;
  const s=document.createElement('script');
  s.src='./v58-boots-lab.js';
  s.dataset.v58Boots='1';
  s.defer=true;
  document.head.appendChild(s);
})();