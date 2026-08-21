// Default planner loadout supplied by user on 2026-08-21.
(function(){
  const DEFAULT_BUILD_CODE='eyJtb2RlIjoidmFsdWUiLCJjaGFyTGV2ZWwiOjgyLCJwcmVzZXQiOiJncmFuZCIsIm1lY2hhbmljcyI6eyJlYiI6dHJ1ZSwic3BlY3RyYWwiOnRydWUsInJ1bmljIjp0cnVlLCJ3aXNkb20iOnRydWV9LCJnZWFyIjp7IndlYXBvbjEiOiJleHdhbmQiLCJoZWxtZXQiOiJoZWxtQXJtRVMiLCJ3ZWFwb24yIjoicmF0aHBpdGgiLCJyaW5nMSI6ImRyZWFtQSIsImJvZHkiOiJtb3Jpb3JDb21iaW5lZCIsImFtdWxldCI6InN0cnVnZ2xlc2NyZWFtIiwicmluZzIiOiJkcmVhbUIiLCJnbG92ZXMiOiJzdXJnZVJhcmUiLCJiZWx0IjoiZGFya25lc3NIZWxtZXQiLCJib290cyI6InJhcmVCb290cyIsImZsYXNrMSI6ImxpZmVmbGFzayIsImZsYXNrMiI6InVodHJlZCJ9LCJhdWdtZW50VGFyZ2V0IjoiYm9keSIsImF1Z21lbnRDb25maWdzIjp7IndlYXBvbjEiOnsibW9kZSI6ImNvcnJ1cHRlZCIsInJ1bmVzIjpbIm1pbmQiLCJtaW5kIiwibWluZCJdfSwiYm9keSI6eyJtb2RlIjoiY29ycnVwdGVkIiwicnVuZXMiOlsibWluZCIsIm1pbmQiLCJtaW5kIiwibWluZCIsIm1pbmQiXX0sImhlbG1ldCI6eyJtb2RlIjoiY29ycnVwdGVkIiwicnVuZXMiOlsibWluZCIsIm1pbmQiLCJtaW5kIl19LCJ3ZWFwb24yIjp7Im1vZGUiOiJjb3JydXB0ZWQiLCJydW5lcyI6WyJtaW5kIiwibWluZCIsIm1pbmQiXX0sImdsb3ZlcyI6eyJtb2RlIjoiY29ycnVwdGVkIiwicnVuZXMiOlsibWluZCIsIm1pbmQiLCJtaW5kIl19LCJiZWx0Ijp7Im1vZGUiOiJub3JtYWwiLCJydW5lcyI6WyJtaW5kIiwibWluZCJdfSwiYm9vdHMiOnsibW9kZSI6ImNvcnJ1cHRlZCIsInJ1bmVzIjpbIm1pbmQiLCJtaW5kIiwibWluZCJdfX0sImRhcmtuZXNzRWZmZWN0IjoxMDAsImN1c3RvbVJlY292ZXJ5IjozMTksImtoYXRhbFN0YWNrcyI6NCwidGltZWxlc3MiOnsiZW5hYmxlZCI6dHJ1ZSwibm90YWJsZXMiOjMsImludFBlck5vdGFibGUiOjMsInNtYWxscyI6MTAsIm1hbmFQZXJTbWFsbCI6MTB9LCJsaXZlSmV3ZWwiOnsibW9kZSI6Im93bmVkIiwiZm9yY2UiOjAsIm5hdHVyYWwiOjAsInJ1bmljIjowLCJ3YXIiOjAsInN1cnZpdmFsIjowLCJzY29yY2hlZCI6MCwic29tIjp0cnVlLCJ0cmlidXRlIjoxMDAsImxhdmlzaCI6ZmFsc2UsInJhdmVub3VzIjpmYWxzZSwidW5yZXN0cmFpbmVkIjpmYWxzZSwiYW5jaWVudCI6ZmFsc2UsIndvcnRoeSI6ZmFsc2UsImRlc2VjcmF0ZWRJbnROb2RlcyI6MCwiZGVzZWNyYXRlZEludEVhY2giOjYsImRlc2VjcmF0ZWRFc1NtYWxscyI6MCwiZGVzZWNyYXRlZEVzRWFjaCI6MywiZGVzZWNyYXRlZFJlZ2VuU21hbGxzIjowLCJkZXNlY3JhdGVkUmVnZW5FYWNoIjoyLjV9fQ==';
  try{
    const o=JSON.parse(decodeURIComponent(escape(atob(DEFAULT_BUILD_CODE))));
    Object.assign(state,o);
    // Backward-compatible alias: current UI module uses state.timeless.
    if(o.timeless) state.timeless=Object.assign({},state.timeless||{},o.timeless,{enabled:o.timeless.enabled!==false});
    if(o.liveJewel) state.liveJewel=Object.assign({},state.liveJewel||{},o.liveJewel);
    const set=(id,v)=>{const el=document.getElementById(id);if(el!=null)el.value=v;};
    set('charLevel',state.charLevel||82);set('preset',state.preset||'grand');set('customRecovery',state.customRecovery??319);set('khatalStacks',state.khatalStacks??4);set('darknessEffect',String(state.darknessEffect??100));
    if(state.timeless){set('tjNotables',state.timeless.notables??3);set('tjIntPerNotable',state.timeless.intPerNotable??3);set('tjSmalls',state.timeless.smalls??10);set('tjManaPerSmall',state.timeless.manaPerSmall??10);}
    if(state.liveJewel){set('liveJewelMode',state.liveJewel.mode||'owned');}
    const code=document.getElementById('buildCode');if(code)code.value=DEFAULT_BUILD_CODE;
    window.calc();
  }catch(e){console.error('Default build load failed',e);}
})();