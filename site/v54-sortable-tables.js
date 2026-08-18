(() => {
'use strict';

const SORT_STATE = new WeakMap();
const SORTING = new WeakSet();

function css(){
  if(document.getElementById('v54SortCss')) return;
  const style=document.createElement('style');
  style.id='v54SortCss';
  style.textContent=`
    table.v54Sortable thead th{position:relative}
    .v54SortBtn{
      display:inline-grid;place-items:center;
      width:18px;height:18px;margin-left:5px;padding:0;
      border:1px solid rgba(217,179,112,.28);border-radius:6px;
      background:rgba(19,13,10,.72);color:#9f907a;
      font:700 10px/1 system-ui,sans-serif;vertical-align:middle;
      cursor:pointer;transition:.15s ease;
    }
    .v54SortBtn:hover,.v54SortBtn:focus-visible{color:#ead7b5;border-color:rgba(217,179,112,.62);background:#1d140e;outline:none}
    .v54SortBtn.active{color:#ead7b5;border-color:#b88c52;background:#24170f}
    table.v54Sortable thead th[aria-sort="ascending"],table.v54Sortable thead th[aria-sort="descending"]{color:#ead7b5}
  `;
  document.head.appendChild(style);
}

function textOf(cell){
  const explicit=cell?.dataset?.sortValue;
  return String(explicit ?? cell?.textContent ?? '').replace(/\s+/g,' ').trim();
}

function numericValue(text){
  if(!text || /^(?:—|-|n\/a|na|∞)$/i.test(text)) return null;
  const cleaned=text
    .replace(/,/g,'')
    .replace(/[−–—]/g,'-')
    .replace(/^[^\d+\-.]*([+\-]?\d)/,'$1');
  const m=cleaned.match(/[+\-]?(?:\d+(?:\.\d+)?|\.\d+)/);
  if(!m) return null;
  const n=Number(m[0]);
  return Number.isFinite(n)?n:null;
}

function valueFor(cell, numeric){
  const text=textOf(cell);
  if(numeric){
    const n=numericValue(text);
    return {empty:n==null,num:n??0,text:text.toLocaleLowerCase()};
  }
  return {empty:!text,num:0,text:text.toLocaleLowerCase()};
}

function columnLooksNumeric(rows,index){
  const vals=rows.map(r=>numericValue(textOf(r.cells[index]))).filter(v=>v!=null);
  const nonEmpty=rows.filter(r=>textOf(r.cells[index])).length;
  return nonEmpty>0 && vals.length/nonEmpty>=0.6;
}

function updateIndicators(table,index,dir){
  const headers=[...(table.tHead?.rows?.[0]?.cells||[])];
  headers.forEach((th,i)=>{
    const btn=th.querySelector(':scope > .v54SortBtn');
    const active=i===index;
    th.setAttribute('aria-sort',active?(dir==='asc'?'ascending':'descending'):'none');
    if(btn){
      btn.classList.toggle('active',active);
      btn.textContent=active?(dir==='asc'?'↑':'↓'):'⇅';
      btn.title=active
        ? `Sorted ${dir==='asc'?'ascending':'descending'} · click to reverse`
        : 'Sort this column';
    }
  });
}

function sortTable(table,index,dir,remember=true){
  const tbody=table.tBodies?.[0];
  if(!tbody || SORTING.has(table)) return;
  const rows=[...tbody.rows].filter(r=>r.cells.length>index && !r.cells[0]?.hasAttribute('colspan'));
  if(rows.length<2){ updateIndicators(table,index,dir); return; }

  const numeric=columnLooksNumeric(rows,index);
  const decorated=rows.map((row,original)=>({row,original,v:valueFor(row.cells[index],numeric)}));
  decorated.sort((a,b)=>{
    if(a.v.empty!==b.v.empty) return a.v.empty?1:-1;
    let cmp=0;
    if(numeric) cmp=a.v.num-b.v.num;
    else cmp=a.v.text.localeCompare(b.v.text,undefined,{numeric:true,sensitivity:'base'});
    if(cmp===0) cmp=a.original-b.original;
    return dir==='asc'?cmp:-cmp;
  });

  SORTING.add(table);
  const frag=document.createDocumentFragment();
  decorated.forEach(x=>frag.appendChild(x.row));
  tbody.appendChild(frag);
  updateIndicators(table,index,dir);
  if(remember) SORT_STATE.set(table,{index,dir});
  setTimeout(()=>SORTING.delete(table),0);
}

function enhanceTable(table){
  if(!(table instanceof HTMLTableElement) || table.classList.contains('v54Sortable')) return;
  const headerRow=table.tHead?.rows?.[0];
  if(!headerRow || !table.tBodies?.length) return;
  table.classList.add('v54Sortable');

  [...headerRow.cells].forEach((th,index)=>{
    if(th.colSpan>1 || th.dataset.noSort==='true') return;
    th.setAttribute('aria-sort','none');
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='v54SortBtn';
    btn.textContent='⇅';
    btn.title='Sort this column';
    btn.setAttribute('aria-label',`Sort by ${textOf(th) || `column ${index+1}`}`);
    btn.addEventListener('click',ev=>{
      ev.preventDefault();ev.stopPropagation();
      const current=SORT_STATE.get(table);
      const dir=current?.index===index && current.dir==='asc'?'desc':'asc';
      sortTable(table,index,dir,true);
    });
    th.appendChild(btn);
  });
}

function enhanceAll(root=document){
  if(root instanceof HTMLTableElement) enhanceTable(root);
  root.querySelectorAll?.('table').forEach(enhanceTable);
}

let refreshQueued=false;
function queueRefresh(){
  if(refreshQueued) return;
  refreshQueued=true;
  requestAnimationFrame(()=>{
    refreshQueued=false;
    enhanceAll();
    document.querySelectorAll('table.v54Sortable').forEach(table=>{
      const state=SORT_STATE.get(table);
      if(state && !SORTING.has(table)) sortTable(table,state.index,state.dir,false);
    });
  });
}

function mount(){
  css();
  enhanceAll();
  const observer=new MutationObserver(mutations=>{
    if(mutations.some(m=>{
      const table=m.target?.closest?.('table');
      return !table || !SORTING.has(table);
    })) queueRefresh();
  });
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('v44calc',queueRefresh);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
else mount();
})();

// v55: load the Strugglescream instill-first optimizer after the shared table enhancer.
(() => {
  if(document.querySelector('script[data-v55-instills]')) return;
  const s=document.createElement('script');
  s.src='./v55-instills-lab.js';
  s.dataset.v55Instills='1';
  s.defer=true;
  document.head.appendChild(s);
})();

// v56: custom four-slot mix/match + Grand Regalia attribute solutions.
(() => {
  if(document.querySelector('script[data-v56-flex]')) return;
  const s=document.createElement('script');
  s.src='./v56-flex-instills-attributes.js';
  s.dataset.v56Flex='1';
  s.defer=true;
  document.head.appendChild(s);
})();
