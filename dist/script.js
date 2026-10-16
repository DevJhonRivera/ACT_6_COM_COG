// Interfaz y síntesis de voz. Los datos se generan localmente, sin sensores físicos.
const $=id=>document.getElementById(id);
let current={temp:24,humidity:60,ph:6}, history=[],lang='es',utterance;
function draw(){
 $('report').textContent=Greenhouse.report(current,lang); $('report').lang=lang; $('readingTime').textContent='Lectura interior simulada · '+new Date().toLocaleString('es-CO'); window.dispatchEvent(new Event('readingchange'));
 const names={low:'Bajo',normal:'En intervalo',high:'Alto'};
 for(const key of ['temp','humidity','ph']){ $(key).value=current[key];$(key+'Status').textContent=names[Greenhouse.classify(current[key],key)];$(key+'Status').dataset.state=Greenhouse.classify(current[key],key); }
 $('history').innerHTML=history.map((v,i)=>`<tr><td>${i+1}</td><td>${v.temp}</td><td>${v.humidity}</td><td>${v.ph}</td></tr>`).join('');
 for(const [key,max] of [['temp',60],['humidity',100],['ph',14]]){
  const points=history.map((v,i)=>`${25+i*350/Math.max(1,history.length-1)},${110-v[key]/max*90}`).join(' ');
  const [lo,hi]=Greenhouse.ranges[key];
  $(key+'Chart').innerHTML=`<rect x="25" y="${110-hi/max*90}" width="350" height="${(hi-lo)/max*90}" fill="#d5e8d4"/><line x1="25" y1="110" x2="375" y2="110" stroke="#68786a"/><polyline points="${points}" fill="none" stroke="#205d43" stroke-width="3"/>`+history.map((v,i)=>`<circle cx="${25+i*350/Math.max(1,history.length-1)}" cy="${110-v[key]/max*90}" r="4" fill="#205d43"/><text x="${25+i*350/Math.max(1,history.length-1)}" y="${100-v[key]/max*90}" text-anchor="middle">${v[key]}</text>`).join('');
 }
}
function add(d){if(!Greenhouse.validate(d)){$('error').textContent='Revise los valores: temperatura de −20 a 60 °C, humedad de 0 a 100 % y pH de 0 a 14. No se aceptan campos vacíos.';return;}$('error').textContent='';current=d;history.push({...d});if(history.length>8)history.shift();draw();}
$('manual').addEventListener('submit',e=>{e.preventDefault();let d={};for(const k of ['temp','humidity','ph'])d[k]=$(k).value.trim()===''?NaN:Number($(k).value);add(d);});
$('simulate').onclick=()=>add({temp:Math.round(15+Math.random()*25),humidity:Math.round(10+Math.random()*90),ph:Math.round((4+Math.random()*4)*10)/10});
$('scenario').onclick=()=>{history=[];for(const d of [{temp:24,humidity:60,ph:6},{temp:18,humidity:35,ph:5},{temp:38,humidity:85,ph:7.2}])add(d);};
$('language').onchange=()=>{lang=$('language').value;window.speechSynthesis?.cancel();draw();};
function voiceStatus(){if(!('speechSynthesis'in window)){$('voiceInfo').textContent='El navegador no ofrece síntesis de voz.';$('speak').disabled=true;return;}const voices=speechSynthesis.getVoices();$('voiceInfo').textContent=voices.length?`Voces disponibles: español ${voices.filter(v=>v.lang.startsWith('es')).length}; inglés ${voices.filter(v=>v.lang.startsWith('en')).length}.`:'El navegador todavía no ha cargado sus voces. El reporte escrito está disponible.';}
if('speechSynthesis'in window)speechSynthesis.addEventListener('voiceschanged',voiceStatus);
$('speak').onclick=()=>{const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith(lang));if(!voice){$('voiceInfo').textContent='No hay una voz disponible para este idioma. Pruebe otro navegador o instale la voz en el sistema.';return;}speechSynthesis.cancel();utterance=new SpeechSynthesisUtterance(Greenhouse.report(current,lang));utterance.lang=voice.lang;utterance.voice=voice;utterance.onstart=()=>{$('voiceInfo').textContent='Reproduciendo reporte…';};utterance.onend=()=>{$('voiceInfo').textContent='Reproducción finalizada.';};utterance.onerror=e=>{$('voiceInfo').textContent='La voz no pudo reproducirse: '+e.error;};speechSynthesis.speak(utterance);};
$('stop').onclick=()=>{window.speechSynthesis?.cancel();$('voiceInfo').textContent='Reproducción detenida.';};
add(current);voiceStatus();
