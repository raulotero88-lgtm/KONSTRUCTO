// check-js.js
// Valida la SINTAXIS del JavaScript embebido en index.html SIN ejecutarlo.
// Es el chequeo más importante y barato: un solo error de sintaxis deja la app en pantalla
// en blanco, y htmlhint no parsea JavaScript, así que este script es quien lo caza.
//
// Uso local (si tienes Node instalado):  node check-js.js
// También lo ejecuta la CI en cada Pull Request.

const fs = require('fs');
const vm = require('vm');

const ARCHIVO = 'index.html';
const html = fs.readFileSync(ARCHIVO, 'utf8');

// Captura el contenido de cada <script> que NO tenga atributo src (ignora los del CDN, p. ej. unpkg).
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

let bloque = 0;
let hayFallo = false;
let m;

while ((m = re.exec(html)) !== null) {
  bloque++;
  const codigo = m[1];
  try {
    // new vm.Script COMPILA el código (sin ejecutarlo). Lanza SyntaxError si no parsea.
    new vm.Script(codigo, { filename: `${ARCHIVO}#script-${bloque}` });
  } catch (e) {
    hayFallo = true;
    console.error(`❌ SyntaxError en el bloque <script> nº ${bloque}: ${e.message}`);
  }
}

if (bloque === 0) {
  console.error('❌ No se encontró ningún <script> inline en index.html. ¿Se renombró/movió el archivo?');
  process.exit(1);
}

if (hayFallo) {
  console.error('\nLa app tiene un error de sintaxis: se vería la pantalla en blanco. PR bloqueada.');
  process.exit(1); // <-- pone la PR en ROJO y bloquea el merge
}

console.log(`✅ OK: ${bloque} bloque(s) <script> inline parsean sin errores de sintaxis.`);
