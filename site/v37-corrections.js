(() => {
'use strict';
function patch(){
  document.title='Mana Geyser Shaman';
  const hybrid=document.querySelector('#mg-hybrid');
  if(hybrid){
    const table=hybrid.querySelector('.mgRouteTable');
    if(table)table.innerHTML=`
      <div></div><strong>Easy hybrid · L35</strong><strong>L36 stretch</strong><strong>Premium / special-craft</strong>
      <span>Entangle gem</span><b>21</b><b>21</b><b>21</b>
      <span>Wand package</span><b>+5 Physical Spell Skills</b><b>+5 Physical Spell Skills</b><b>Special crafted +levels</b>
      <span>Focus</span><b>+2 all Spell Skills</b><b>+2 all Spell Skills</b><b>+2 all Spell Skills</b>
      <span>Amulet package</span><b>+4</b><b>+4</b><b>+4</b>
      <span>Prism</span><b>+2 Entangle</b><b>+3 Entangle</b><b>+2 / +3 Entangle</b>
      <span>Physical Mastery</span><b>+1</b><b>+1</b><b>+1</b>
      <span>Result</span><b class="mgGood">L35</b><b class="mgGood">L36</b><b>Verify exact craft</b>`;
    const fine=hybrid.querySelector('.mgFine');
    if(fine)fine.innerHTML=`<strong>Safer wand arithmetic:</strong> a normal rare wand can reach +5 to all Physical Spell Skills, while a Focus can reach +2 all Spell Skills. The ordinary +all-spell and +Physical-spell wand level modifiers appear in the same modifier group, so this guide does <em>not</em> assume they stack on a standard rare. That gives a clean L35 with a +2 Prism, or L36 with a +3 Prism: <strong>21 + 5 + 2 + 4 + 3 + 1 = 36</strong>. Any +6/+9 wand shown on trade should be treated as a special-craft case and verified individually rather than used as the baseline.`;
    const h2=hybrid.querySelector('h2');
    if(h2)h2.innerHTML='L35 is easy with a wand. <em>L36 is still possible.</em>';
  }
  const l36=document.querySelector('#mg-l36');
  if(l36){
    const call=l36.querySelector('.mgCall');
    if(call)call.insertAdjacentHTML('beforeend','<p><strong>Wand-hybrid takeaway:</strong> you do not need a staff for the native-Entangle experiment. A +5 Physical wand + +2 Focus keeps the offhand architecture alive; L36 then needs the premium +3 Entangle Prism under the conservative arithmetic.</p>');
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(patch,50));else setTimeout(patch,50);
})();