const assert=require('node:assert/strict');const g=require('./dist/logic.js');let count=0;function test(name,fn){fn();console.log('PASS '+name);count++;}
for(const key of Object.keys(g.ranges)){const [lo,hi]=g.ranges[key];for(const [v,expected] of [[lo-.1,'low'],[lo,'normal'],[hi,'normal'],[hi+.1,'high']])test(`${key} ${v} => ${expected}`,()=>assert.equal(g.classify(v,key),expected));}
for(const bad of [NaN,Infinity,-1,15])test(`pH inválido ${bad}`,()=>assert.equal(g.validate({temp:24,humidity:60,ph:bad}),false));
test('Rechaza cadena numérica',()=>assert.equal(g.validate({temp:24,humidity:60,ph:'6'}),false));
test('Reporte español incluye pH',()=>assert.match(g.report({temp:38,humidity:85,ph:7.2}),/pH/));
test('Reporte inglés completo',()=>assert.match(g.report({temp:38,humidity:85,ph:7.2},'en'),/Soil pH: 7.2, above range/));
test('Lectura inválida no produce reporte',()=>assert.throws(()=>g.report({temp:24,humidity:101,ph:6})));
console.log(`${count} pruebas completadas.`);
