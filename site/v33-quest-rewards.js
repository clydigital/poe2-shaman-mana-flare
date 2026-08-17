(() => {
"use strict";

const QUEST_REWARDS = [
  {id:"navaliMana",name:"Navali's Rest",area:"Eye of Hinekora",effect:"5% increased maximum Mana",kind:"manaPct",value:.05,rec:"HIGH",note:"Directly scales the build's core resource."},
  {id:"clarityRegen",name:"Venom Draught of Clarity",area:"The Slithering Dead",effect:"25% increased Mana Regeneration Rate",kind:"regen",value:.25,rec:"HIGH",note:"Permanent choice; excellent for Flare recovery and Furious Wellspring."},
  {id:"justiceManaFlask",name:"Goddess of Justice",area:"Abandoned Prison",effect:"30% increased Mana Recovery from Flasks",kind:"flaskRecovery",value:.30,rec:"BRANCH",note:"Useful only when flask/overflow recovery is part of the engine."},
  {id:"whakaGlobal",name:"Great White One — Global Defences",area:"Whakapanu Island",effect:"30% increased Armour, Evasion and Energy Shield",kind:"globalDef",value:.30,group:"whakapanu",rec:"DEFENCE",note:"Strong generic defensive choice; global ES does not automatically become local EB conversion fuel."},
  {id:"whakaHybrid",name:"Great White One — Hybrid Defences",area:"Whakapanu Island",effect:"15% of Armour also applies to Elemental Damage; Deflection from Evasion; faster ES recharge start",kind:"armourElem",value:.15,group:"whakapanu",rec:"DEFENCE",note:"Especially interesting for the Armour / ES route."},
  {id:"halaniCdr",name:"Seven Pillars — Halani's Boon",area:"Qimah",effect:"12% increased Cooldown Recovery Rate",kind:"cdr",value:.12,group:"pillars",rec:"LATE",note:"Good only when recovery and Rage can support the extra Flare frequency."},
  {id:"kochAttributes",name:"Seven Pillars — Kochai's Boon",area:"Qimah",effect:"+5 to all Attributes",kind:"attributes",value:5,group:"pillars",rec:"SOLID",note:"Adds Intelligence and therefore Mana in component mode."},
  {id:"ahkeliGlobal",name:"Seven Pillars — Ahkeli's Boon",area:"Qimah",effect:"15% increased Global Defences",kind:"globalDef",value:.15,group:"pillars",rec:"DEFENCE",note:"Broad defensive choice."},
  {id:"tabanaRes",name:"Seven Pillars — Tabana's Boon",area:"Qimah",effect:"+5% to all Elemental Resistances",kind:"resists",value:.05,group:"pillars",rec:"DEFENCE",note:"Useful for easing gear pressure; does not directly change Flare DPS."}
];

const questState = Object.fromEntries(QUEST_REWARDS.map(q=>[q.id,"off"]));

function questCss(){
 const s=document.createElement("style");
 s.textContent=`
 .questGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.questCard{border:1px solid var(--line);border-radius:13px;padding:10px;background:#1a120e}.questCard b{font-size:10px}.questCard .qarea{font-size:7.5px;color:#8f816d;text-transform:uppercase;letter-spacing:.08em;margin:3px 0}.questCard .qeffect{font-size:9px;color:#d7c8ae;line-height:1.35;margin:5px 0}.questCard .qnote{font-size:8.5px;color:#9d907d;line-height:1.35}.questCard select{width:100%;background:#100b08;color:#e9dec9;border:1px solid var(--line);border-radius:8px;padding:7px;font-size:9px;margin-top:7px}.questTag{display:inline-block;font-size:7px;padding:3px 5px;border:1px solid rgba(217,179,112,.28);border-radius:999px;color:#d7bd8a;margin-left:5px}.questSummary{margin-top:9px}.questBreak{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:8px}.questBreak div{border:1px solid var(--line);border-radius:10px;padding:8px;background:#15100c}.questBreak b{display:block;font-size:13px}.questBreak span{font-size:7px;color:#8f816d;text-transform:uppercase}@media(max-width:900px){.questGrid,.questBreak{grid-template-columns:1fr}}
 `;
 document.head.appendChild(s);
}

function enforceQuestGroup(changed){
 const q=QUEST_REWARDS.find(x=>x.id===changed); if(!q?.group||questState[changed]==="off") return;
 QUEST_REWARDS.filter(x=>x.group===q.group&&x.id!==changed).forEach(x=>questState[x.id]="off");
}

function questTotals(mode){
 const t={manaPct:0,regen:0,cdr:0,int:0,flaskRecovery:0,globalDef:0,armourElem:0,resists:0};
 QUEST_REWARDS.forEach(q=>{
  const st=questState[q.id];
  const applies = mode==="full" ? st==="planned" : st!=="off";
  if(!applies)return;
  if(q.kind==="manaPct")t.manaPct+=q.value;
  if(q.kind==="regen")t.regen+=q.value;
  if(q.kind==="cdr")t.cdr+=q.value;
  if(q.kind==="attributes")t.int+=q.value;
  if(q.kind==="flaskRecovery")t.flaskRecovery+=q.value;
  if(q.kind==="globalDef")t.globalDef+=q.value;
  if(q.kind==="armourElem")t.armourElem+=q.value;
  if(q.kind==="resists")t.resists+=q.value;
 });
 return t;
}

function injectQuestSection(){
 questCss();
 const build=document.getElementById("buildPage"); if(!build||document.getElementById("questRewards"))return;
 const load=[...build.querySelectorAll(".card")].find(c=>c.querySelector("h3")?.textContent.includes("Loadout state"));
 const passive=[...build.querySelectorAll(".card")].find(c=>c.querySelector("h3")?.textContent.includes("Passive picker"));
 const host=document.createElement("div"); host.className="card"; host.id="questRewards"; host.style.marginTop="12px";
 host.innerHTML=`<h3>Permanent Quest Rewards</h3><p class="small">These are <strong>not passive nodes</strong> and consume <strong>zero passive points</strong>. Use <em>Current</em> for rewards already baked into the imported character, <em>Planned</em> for a reward you still intend to obtain, and <em>Not taken</em> to exclude it.</p><div class="questGrid" id="questGrid"></div><div class="questSummary call" id="questSummary"></div><div class="questBreak" id="questBreak"></div>`;
 (passive||load)?.before(host); renderQuestSection();
}

function renderQuestSection(){
 const grid=document.getElementById("questGrid");if(!grid)return;
 grid.innerHTML=QUEST_REWARDS.map(q=>`<div class="questCard"><b>${q.name}<span class="questTag">${q.rec}</span></b><div class="qarea">${q.area}</div><div class="qeffect">${q.effect}</div><div class="qnote">${q.note}</div><select data-q="${q.id}"><option value="off" ${questState[q.id]==="off"?"selected":""}>Not taken / exclude</option><option value="current" ${questState[q.id]==="current"?"selected":""}>Current · already in imported baseline</option><option value="planned" ${questState[q.id]==="planned"?"selected":""}>Planned · add to build</option></select></div>`).join("");
 grid.querySelectorAll("select[data-q]").forEach(s=>s.onchange=()=>{questState[s.dataset.q]=s.value;enforceQuestGroup(s.dataset.q);renderQuestSection();render()});
 const mode=document.getElementById("manaMode")?.value||"full",t=questTotals(mode),cur=QUEST_REWARDS.filter(q=>questState[q.id]==="current"),plan=QUEST_REWARDS.filter(q=>questState[q.id]==="planned");
 document.getElementById("questSummary").innerHTML=`<strong>Quest layer:</strong> ${cur.length} marked Current · ${plan.length} Planned. ${mode==="full"?"Current rewards add no delta because the imported displayed stats already contain them; only Planned rewards are added.":"Component mode rebuilds the character, so Current + Planned rewards both apply."}`;
 document.getElementById("questBreak").innerHTML=`<div><b>+${Math.round(t.manaPct*100)}%</b><span>max Mana</span></div><div><b>+${Math.round(t.regen*100)}%</b><span>Mana regen</span></div><div><b>+${Math.round(t.cdr*100)}%</b><span>CDR</span></div><div><b>+${t.int}</b><span>Int from quests</span></div>`;
}

function hookQuestCalc(){
 const baseCalc=calc;
 calc=function(){
  const c=baseCalc(), mode=document.getElementById("manaMode")?.value||"full", q=questTotals(mode);
  // Apply only quest deltas after the v32 character/loadout model.
  const oldM=c.M;
  if(q.int) c.M += 2*q.int;
  if(q.manaPct) c.M *= (1+q.manaPct);
  const manaScale = oldM>0 ? c.M/oldM : 1;
  c.current *= manaScale;
  c.arch=1+.0004*c.M;
  // Regen is rebuilt from the resulting pool plus the permanent regen modifier.
  c.regenInc=(c.regenInc||0)+q.regen;
  c.regen=.04*c.M*(1+c.regenInc)*(c.momOn?.5:1);
  c.theo += q.cdr;
  const critMult=1+c.crit*c.cdb; c.critMult=critMult;
  // Re-evaluate Mana-derived damage while preserving the existing increased-damage bucket.
  c.expected=.25*c.current*c.arch*c.inc*c.critMult*(selectedNodes.has("Druidic Champion")?1+43/200:1);
  const sustainable=c.regen/(.25*Math.max(c.current,1));
  c.realised=Math.max(0,Math.min(c.theo,sustainable+.22));
  const rageRegen=selectedNodes.has("Furious Wellspring")?.06*43*(1+c.regenInc):0;
  const paid=selectedNodes.has("Furious Wellspring")?5*(1+c.realised):0;
  c.rageSurplus=rageRegen-paid;c.dps=c.expected*c.realised;
  c.armour*=1+q.globalDef;
  c.quest=q;
  return c;
 };
 const oldRender=render;
 render=function(){oldRender();renderQuestSection();const c=calc(),b=document.getElementById("manaBreakdown");if(b&&c.quest)b.insertAdjacentHTML("beforeend",`<div class="small" style="margin-top:7px"><strong>Permanent rewards:</strong> +${Math.round(c.quest.manaPct*100)}% max Mana · +${Math.round(c.quest.regen*100)}% Mana regen · +${Math.round(c.quest.cdr*100)}% CDR · +${c.quest.int} INT. Quest rewards use no passive points.</div>`)};
}

function initQuestLayer(){injectQuestSection();hookQuestCalc();const mode=document.getElementById("manaMode");if(mode)mode.addEventListener("change",renderQuestSection);render()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(initQuestLayer,0));else setTimeout(initQuestLayer,0);
})();