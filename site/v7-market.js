// 2026-08-21 MYT snapshot. Loaded after v7-data.js so the latest same-day FX quote wins.
MARKET.exPerDiv=375.8;
MARKET.snapshot='2026-08-21';
MARKET.source='Divindex';
MARKET.sourceClock='06:48 PM source refresh';

// Same snapshot: fill current prices that were missing from the first v7 data capture.
RUNES.medved.price=P(86.54,null,'Divindex','2026-08-21','Current currency snapshot');
RUNES.greatwolf.price=P(25.48,null,'Divindex','2026-08-21','Current currency snapshot');
RUNES.owl={name:'Owl Idol',level:1,price:P(17.30,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'idol',only:['focus']};
