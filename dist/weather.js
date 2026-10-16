// Consulta voluntaria a Open-Meteo. No usa geolocalización ni altera sensores simulados.
let exterior=null;
function compareWeather(){if(exterior)document.getElementById('difference').textContent=(current.temp-exterior.temperature_2m).toFixed(1)+' °C';}
window.addEventListener('readingchange',compareWeather);
document.getElementById('city').addEventListener('change',()=>{exterior=null;document.getElementById('weatherResult').hidden=true;document.getElementById('weatherStatus').textContent='Ubicación cambiada. Consulte de nuevo.';});
document.getElementById('weatherLoad').addEventListener('click',async()=>{
 const button=document.getElementById('weatherLoad'),status=document.getElementById('weatherStatus'),city=document.getElementById('city');
 const [latitude,longitude]=city.value.split(',');const label=city.options[city.selectedIndex].text;
 button.disabled=true;city.disabled=true;exterior=null;document.getElementById('weatherResult').hidden=true;status.textContent='Consultando Open-Meteo…';
 try{const url=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m&timezone=America%2FBogota`;
 const response=await fetch(url,{signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error('HTTP '+response.status);const data=await response.json();const d=data.current;
 if(!d||!Number.isFinite(d.temperature_2m)||!Number.isFinite(d.relative_humidity_2m)||!d.time)throw Error('Respuesta incompleta');
 exterior=d;document.getElementById('outsideTemp').textContent=d.temperature_2m+' °C';document.getElementById('outsideHumidity').textContent=d.relative_humidity_2m+' %';document.getElementById('weatherTime').textContent='Hora del dato: '+d.time.replace('T',' ')+' · '+data.timezone+' · '+label;compareWeather();document.getElementById('weatherResult').hidden=false;status.textContent='Consulta recibida. Estimación meteorológica exterior; no es una medición del cultivo.';
 }catch(error){status.textContent='No fue posible consultar el clima exterior. Revise su conexión e inténtelo de nuevo. El prototipo interior sigue disponible. ('+error.message+')';}
 finally{button.disabled=false;city.disabled=false;}
});
