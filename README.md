# Invernadero de rosas con reporte bilingüe

Proyecto académico de la **Actividad 6 de Computación cognitiva en big data**, de la Corporación Universitaria Iberoamericana.

- **Autor:** Jhon Alexander Rivera Aranda.
- **Docente:** Karla Yohana Sánchez Mojica.
- **Grupo:** 31082026_C2_202607.
- **Repositorio:** https://github.com/DevJhonRivera/ACT_6_COM_COG

## Propósito

La aplicación permite interpretar temperatura, humedad y pH del suelo de un invernadero de rosas mediante reportes escritos en español e inglés y síntesis de voz. Incluye una consulta independiente del clima exterior para complementar el caso de estudio.

**Las lecturas interiores son simuladas.** No hay sensores físicos conectados ni acciones automáticas sobre el cultivo. Los intervalos son parámetros didácticos, no recomendaciones agronómicas universales.

## Funcionalidades

- Interfaz ambientada como invernadero e indicadores con texto y color.
- Generación de lecturas simuladas y evaluación manual de valores.
- Tres escenarios reproducibles: valores dentro del intervalo, bajos y altos.
- Gráficas y tabla de las últimas ocho lecturas de la sesión.
- Reportes escritos en español e inglés.
- Lectura del reporte mediante Web Speech API, si existe una voz compatible.
- Consulta de temperatura y humedad relativa exteriores con Open-Meteo para ubicaciones de ejemplo.
- Validación de entradas y mensajes cuando la consulta meteorológica falla.

## Ejecutar sin instalar herramientas de desarrollo

1. Abra [el repositorio](https://github.com/DevJhonRivera/ACT_6_COM_COG).
2. Seleccione **Code → Download ZIP**.
3. Extraiga el ZIP en una carpeta de su equipo. No ejecute los archivos dentro del ZIP.
4. Abra el archivo **`index.html` de la raíz** con Chrome o Edge. Si aparece como texto, use **Abrir con → Google Chrome / Microsoft Edge**.
5. Pulse **Cargar tres escenarios** para revisar los ejemplos. También puede usar **Simular nueva lectura** o introducir valores y pulsar **Evaluar valores**.

El `index.html` entregado es autónomo: incorpora estilos, lógica e ilustración. No requiere `npm install`, claves de API ni un servidor de base de datos. La consulta del clima necesita internet; las voces dependen del navegador y del sistema y algunas pueden necesitar conexión.

## Descargar con Git

Si tiene Git instalado:

```bash
git clone https://github.com/DevJhonRivera/ACT_6_COM_COG.git
cd ACT_6_COM_COG
```

Después abra `index.html` con el navegador o use un servidor local.

## Ejecutar desde Visual Studio Code

1. Abra en VS Code la carpeta extraída o clonada que contiene `index.html`.
2. Puede abrir ese archivo en el navegador directamente.
3. Si ya dispone de la extensión **Live Server**, haga clic derecho en `index.html` y seleccione **Open with Live Server**.

Como alternativa, si tiene Python instalado, abra una terminal en la raíz del proyecto y ejecute:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

En Windows también puede utilizar `py -m http.server 8000 --bind 127.0.0.1`. Abra **http://127.0.0.1:8000/** y mantenga la terminal abierta. Para detener el servidor, pulse **Ctrl+C**. Esta dirección solo corresponde a su equipo; no es un enlace público de entrega. Si el puerto está ocupado, cambie `8000` por `8001` tanto en el comando como en la dirección.

## Comprobar los reportes y el clima

1. Pulse **Cargar tres escenarios**: la última lectura debe mostrar 38 °C, 85 % y pH 7,2, todos por encima de los intervalos de prueba.
2. Cambie **Idioma del reporte** a **English**. El reporte cambia de idioma y conserva las mediciones.
3. Pulse **Escuchar reporte / Listen**. Si no hay una voz compatible, la aplicación informa la limitación y conserva el texto. **Detener / Stop** cancela la lectura.
4. En **El entorno también cuenta**, seleccione una ubicación de ejemplo y pulse **Consultar clima exterior**.
5. Revise la hora y la fuente. La diferencia mostrada combina una temperatura interior simulada con una estimación meteorológica exterior; no demuestra el efecto real del invernadero.

## Estructura

```text
ACT_6_COM_COG/
├── index.html          # Aplicación autónoma e informe
├── dist/
│   ├── logic.js        # Clasificación y generación de reportes
│   ├── script.js       # Interfaz, gráficas y síntesis de voz
│   ├── weather.js      # Consulta de clima exterior
│   ├── style.css       # Estilos
│   └── invernadero.svg # Ilustración propia
├── tests.cjs           # Pruebas de la lógica de dist/logic.js
├── pruebas.txt         # Registro de una ejecución previa
├── LEEME.txt           # Nota inicial del paquete
└── README.md           # Estas instrucciones
```

**Nota para editar:** `index.html` contiene copias integradas del código y los estilos. Modificar solo `dist/` no actualiza la aplicación autónoma. Para conservar esta distribución, sincronice los cambios correspondientes dentro de `index.html`. Las pruebas usan `dist/logic.js`; si modifica la lógica, mantenga ambas versiones coherentes y revise también la interfaz.

## Pruebas automatizadas

Requieren Node.js instalado. Desde la raíz:

```bash
node tests.cjs
```

La versión preparada superó **20 pruebas** de clasificación, límites, valores inválidos y reportes bilingües. La salida esperada termina con `20 pruebas completadas.`. Una ejecución posterior debe comprobarse por su propia salida; `pruebas.txt` registra la ejecución anterior. Estas pruebas no verifican el audio, el diseño visual ni la disponibilidad de la API meteorológica.

## Intervalos de prueba

| Variable | Bajo | Dentro del intervalo | Alto |
|---|---|---|---|
| Temperatura | Menor que 20 °C | De 20 a 35 °C, incluidos | Mayor que 35 °C |
| Humedad | Menor que 40 % | De 40 a 80 %, incluidos | Mayor que 80 % |
| pH del suelo | Menor que 5,5 | De 5,5 a 6,5, incluidos | Mayor que 6,5 |

Los límites de temperatura y humedad parten del código de la guía, corrigiendo sus comparaciones. El intervalo de pH es un supuesto didáctico. Antes de un uso real deben definirse el medio de medición de humedad, los sensores, la calibración y los criterios agronómicos del cultivo.

## Alcance de las APIs

La síntesis usa `speechSynthesis` y `SpeechSynthesisUtterance`. La clasificación se realiza con reglas y el idioma con plantillas; no se entrenó un modelo ni se implementó traducción automática. No hay una integración con Google Cloud o IBM Watson.

Open-Meteo entrega estimaciones meteorológicas exteriores. Los datos del proveedor se atribuyen a [Open-Meteo](https://open-meteo.com/) bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). La consulta no proporciona pH ni sustituye sensores internos.

## Publicación y entrega

El código está alojado en este repositorio de GitHub. **Un repositorio y una página web publicada son recursos diferentes.** Este README no confirma que GitHub Pages esté activado. Para una entrega mediante página web, debe habilitarse el alojamiento y comprobarse el enlace resultante. También deben incorporarse las capturas finales y registrarse los integrantes y aportes reales del equipo según la actividad.

La voz y las capturas finales todavía requieren comprobación en el navegador del equipo de entrega. Los datos de sesión no se guardan al cerrar o recargar la página. El enlace de descarga que aparece dentro de la aplicación puede no encontrar el ZIP si no está alojado junto a ella; utilice **Code → Download ZIP** en GitHub para descargar el repositorio completo.

## Solución de problemas

- **Se ve el código en GitHub:** descargue el proyecto; la vista de un archivo HTML en el repositorio no ejecuta la aplicación.
- **No abre una dirección 127.0.0.1:** inicie el servidor y compruebe el puerto, o abra `index.html` directamente.
- **No se oye el reporte:** revise volumen, voces del idioma y mensajes de la aplicación; pruebe otro navegador. No cambie el idioma solo para ocultar el problema.
- **No carga el clima:** compruebe internet y vuelva a consultar. Un fallo externo no convierte los datos simulados en datos reales.
- **Los cambios no aparecen:** revise que editó el `index.html` que está abriendo y sincronizó las copias de `dist/`.

## Referencias

- Corporación Universitaria Iberoamericana. (s. f.). *Guía de trabajo Uso de API cognitiva Caso de estudio* [Material de clase].
- Corporación Universitaria Iberoamericana. (s. f.). *Caso de estudio del invernadero* [Presentación]. https://docs.google.com/presentation/d/1tYi30aOGbe3HQbhh_q_uyhjCjlSd3Zuv/edit
- Corporación Universitaria Iberoamericana. (s. f.). *Proyecto base del invernadero* [Código fuente]. https://drive.google.com/drive/folders/12phhhys6IRDb20wqu2tXDGBN4pxhpI9B
- MDN Web Docs. (s. f.). *SpeechSynthesisUtterance*. https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
- MDN Web Docs. (s. f.). *SpeechSynthesis: getVoices() method*. https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
- Open-Meteo. (s. f.). *Weather Forecast API*. https://open-meteo.com/en/docs
