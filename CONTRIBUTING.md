# Guía de contribución — El Konstructo

¡Gracias por proponer mejoras! Este documento explica **cómo contribuir sin romper la versión
estable**. Está pensado para perfiles de negocio que quizá usan Git por primera vez: hay comandos
exactos y, casi siempre, una alternativa con interfaz gráfica (GitHub Desktop / web).

> **Lo único que de verdad tienes que recordar**
>
> 1. **Nunca** trabajes ni hagas commit directamente sobre `main`.
> 2. **Sincroniza antes de empezar** cada mejora.
> 3. **Una mejora = una rama = un Pull Request pequeño.**
> 4. **Antes de cada commit, abre la app y mira la consola (F12): sin errores rojos.**

---

## ⚠️ Por qué hay que tener cuidado: un solo archivo gigante

Toda la app vive en **un único archivo** (`index.html`, ~10.700 líneas). Eso significa que casi
cualquier cambio toca el mismo fichero que tocan los demás, así que **los conflictos de fusión son
frecuentes**. Además, como `React` se monta **al final** de un `<script>` enorme, **un solo error de
tecleo deja la pantalla en blanco**. Por eso trabajamos con ramas cortas, cambios pequeños y revisión.

**Puntos calientes** (coordina por Issue antes de tocarlos para no chocar con otra persona):

- El bloque `<style>` con `:root` y las reglas de **temas/universos** (colores).
- El `<script>` principal (componentes y lógica).
- Los **datos del temario** (`DEFAULT_OBJECTIVES`, `MODULE_TITLES`): están en **líneas físicas
  larguísimas**, donde un cambio mínimo marca toda la línea como conflicto.

---

## 🔄 El flujo, paso a paso (modelo Fork + Pull Request)

### 1. Abre un Issue para proponer la mejora

Pestaña **Issues → New issue**. Describe *qué* mejora, *por qué* y *qué zona* del archivo tocarás.
Sirve para debatirla y **"reservar" la zona**. Espera un visto bueno antes de empezar.

### 2. Haz un *fork* y clónalo (solo la primera vez)

Pulsa **Fork** (arriba a la derecha en la web del repo). Luego, en tu ordenador:

```bash
git clone https://github.com/TU-USUARIO/KONSTRUCTO.git
cd KONSTRUCTO
# Registra el repo ORIGINAL como "upstream" para traerte sus novedades:
git remote add upstream https://github.com/raulotero88-lgtm/KONSTRUCTO.git
git remote -v        # debes ver "origin" (tu fork) y "upstream" (el original)
```

### 3. Sincroniza con el original ANTES de empezar

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main        # actualiza también tu fork (o usa el botón "Sync fork" en la web)
```

### 4. Crea una rama para tu mejora

Nombre claro, en minúsculas y sin acentos: `feature/...` o `mejora/iniciales-...`

```bash
git checkout -b mejora/nuevo-universo-oceano
```

### 5. Edita y prueba (¡esto es el "test"!)

Abre `index.html` con tu editor, haz **una sola mejora** acotada a la zona reservada. Tras cada cambio:

- Abre `index.html` en el navegador (doble clic o Live Server).
- **F12 → Console: cero errores rojos.** `#root` con contenido (no pantalla en blanco).
- Prueba la función concreta que tocaste.
- *(Opcional, si tienes Node)* `node check-js.js` caza errores de sintaxis del JS antes de commitear.

### 6. Guarda tus cambios (commits con prefijo)

Usa **Conventional Commits**: `feat:` (función nueva), `fix:` (corrección), `docs:`, `style:` (visual).

```bash
git add index.html
git commit -m "feat: añade universo Océano con paleta azul"
```

### 7. Sube tu rama y abre el Pull Request

```bash
git push -u origin mejora/nuevo-universo-oceano
gh pr create --base main --title "feat: universo Océano" --body "Cierra #12. Probado en navegador, consola limpia."
```

*(O el botón **Compare & pull request** que aparece en la web tras el push.)*
La plantilla del PR se rellena sola: complétala (qué cambia, cómo lo probaste, capturas).

### 8. Atiende la revisión

El mantenedor probará tu cambio y la CI correrá automáticamente. Si pide ajustes, haz más commits en
la **misma rama** y se actualizarán solos en el PR. Cuando esté aprobado, lo fusionará.

### 9. Para la siguiente mejora

Vuelve al **paso 3** (sincroniza) y crea una rama nueva. Borra la rama vieja (`git branch -d ...`).

---

## 🧩 Cómo resolver un conflicto de fusión

Si al sincronizar Git dice `CONFLICT (content): Merge conflict in index.html`, no cunde el pánico:
dos cambios tocan las mismas líneas y Git te pide decidir.

1. Abre `index.html` y busca los marcadores:

   ```text
   <<<<<<< HEAD
     --background: #0f0;     (TU versión)
   =======
     --background: #111;     (la de main)
   >>>>>>> main
   ```

2. Decide qué queda y **borra las tres líneas de marcadores** (`<<<<<<<`, `=======`, `>>>>>>>`).
   Repite en cada bloque (busca `<<<<<<<` para no dejarte ninguno).
3. **Smoke test obligatorio:** abre la app, F12, consola sin errores (al pegar a mano es fácil dejar
   una coma o llave que tumbe el script).
4. Cierra la fusión:

   ```bash
   git add index.html
   git commit
   git push origin mejora/nuevo-universo-oceano
   ```

> **GUI:** en **VS Code** aparecen botones *Accept Current / Incoming / Both* sobre cada conflicto.
> En **GitHub Desktop**, un asistente visual y luego *Continue merge*.

---

## ✅ Reglas que mantienen `main` estable

- **PRs pequeños y enfocados:** una mejora por rama. Cuanto más pequeño el cambio, menos choca y antes
  se fusiona.
- **Ramas de vida corta:** abre el PR el mismo día si puedes.
- **Sincroniza a menudo:** `git fetch upstream && git merge upstream/main` en tu rama mientras trabajas.
- **Verifica siempre en el navegador** antes de commitear.
- **No subas datos personales:** los `.json` de backup del progreso se quedan en tu máquina.

¿Primera vez con Git? Mira [`ONBOARDING.md`](./ONBOARDING.md) para la instalación y una chuleta de comandos.
