// check-console.js
// Abre index.html en un navegador headless (Chromium vía Playwright), espera a que React monte
// y FALLA si la consola tiene errores rojos o si #root se queda vacío (la temida "pantalla en blanco").
// Requiere el paquete 'playwright' instalado (lo hace el workflow de CI con `npm install playwright`).
//
// Lo ejecuta la CI en cada Pull Request. (En local solo si has hecho `npm install playwright`.)

const { chromium } = require('playwright');
const path = require('path');

const ARCHIVO = 'index.html';

(async () => {
  const errores = [];
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();

  // Captura errores rojos de consola y excepciones no atrapadas.
  pagina.on('console', (msg) => { if (msg.type() === 'error') errores.push('console.error: ' + msg.text()); });
  pagina.on('pageerror', (err) => errores.push('pageerror: ' + err.message));

  const url = 'file://' + path.resolve(ARCHIVO);
  await pagina.goto(url, { waitUntil: 'load' });

  // Espera (máx. 15s) a que React monte algo dentro de #root.
  let monto = true;
  try {
    await pagina.waitForFunction(
      () => { const r = document.getElementById('root'); return r && r.children.length > 0; },
      { timeout: 15000 }
    );
  } catch (e) {
    monto = false;
  }

  await navegador.close();

  if (!monto) {
    errores.push('#root quedó vacío: React no montó (pantalla en blanco).');
  }

  if (errores.length) {
    console.error('❌ FALLO: la app no arranca limpia:\n - ' + errores.join('\n - '));
    console.error('\nNota: la app descarga React desde un CDN (unpkg). Si el fallo parece de RED y no de');
    console.error('tu código, vuelve a lanzar el job (Re-run failed jobs) antes de dar la PR por mala.');
    process.exit(1); // <-- pone la PR en ROJO y bloquea el merge
  }

  console.log('✅ OK: React montó y la consola está limpia.');
})();
