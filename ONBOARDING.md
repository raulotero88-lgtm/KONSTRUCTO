# Onboarding — incorporarte como colaborador de El Konstructo

Bienvenido/a. Esta guía te pone a punto para **proponer mejoras** sobre El Konstructo. No necesitas
ser ingeniero ni haber usado Git antes. Si en algún paso te atascas, vuelve aquí.

> Objetivo: que hagas tu **primer Pull Request pequeño** sin miedo. La rama `main` está protegida, así
> que **no puedes romper la app de la autora**: como mucho, tu propuesta no se acepta hasta arreglarla.

---

## Fase 0 — Instala esto una sola vez

| Qué | Para qué | Dónde |
|---|---|---|
| **Cuenta de GitHub** | Imprescindible | [github.com](https://github.com) (usa tu correo del máster) |
| **Git** | Control de versiones | [git-scm.com](https://git-scm.com/downloads) — deja las opciones por defecto |
| **GitHub Desktop** *(recomendado si no eres técnico)* | Todo con botones, sin comandos | [desktop.github.com](https://desktop.github.com) |
| **VS Code + Live Server** | Editar el HTML y verlo recargarse solo | [code.visualstudio.com](https://code.visualstudio.com) + extensión «Live Server» |

Configura tu identidad (firma tus cambios). En GitHub Desktop se hace solo al iniciar sesión; por
terminal:

```bash
git config --global user.name "Tu Nombre Apellido"
git config --global user.email "tu-correo@del-master.com"   # el mismo de tu cuenta de GitHub
```

---

## Fase 1 — Tu primer día (deja el entorno funcionando)

1. **Acepta la invitación** al repositorio (te llega por email) o entra al repo y pulsa **Fork**.
2. **Clona tu fork** y entra en la carpeta (o usa *Code → Open with GitHub Desktop*):

   ```bash
   git clone https://github.com/TU-USUARIO/KONSTRUCTO.git
   cd KONSTRUCTO
   ```

3. **Abre la app**: doble clic en `index.html`, o ábrela con **Live Server** en VS Code.
4. **Aprende a detectar si está rota**: pulsa **F12 → pestaña Console**. Si **no hay errores rojos** y
   ves la app (universos, módulos, sets), está sana. Si la pantalla está **en blanco**, hay un error: el
   primer mensaje rojo de la consola te dice qué pasa. **Esta es la habilidad nº 1 del colaborador.**

---

## Fase 2 — Entiende el "mapa" del archivo (es uno solo, gigante)

Todo vive en `index.html` (~10.700 líneas). No hace falta entenderlo entero; sí saber **dónde tocar**:

| Zona | Qué es | Riesgo |
|---|---|---|
| Bloque `<style>` + `:root` | Sistema de temas (colores de cada universo, modo día/noche) | Bajo–medio (visual) |
| `<script>` principal | Componentes (`React.createElement`) y lógica de la app | **Alto** (cuidado) |
| Datos del temario | `DEFAULT_OBJECTIVES`, `MODULE_TITLES`, banco de preguntas | Medio (líneas muy largas) |
| Script de *tooltips* (al final) | Posiciona los *tooltips* en JS vanilla | Bajo |

- **Estado:** se guarda en `localStorage` (claves `quiz_*`). En DevTools puedes "Borrar datos del sitio"
  para probar desde cero. Antes, **usa el backup** de la app para no perder tu progreso real.
- **Sin compilación:** se edita y se abre. No hay que "construir" nada.

---

## Fase 3 — Tu primera contribución (de un Issue a un Pull Request)

Ideas de **primeras tareas pequeñas y de bajo riesgo**:

- ✏️ Corregir una errata o mejorar la redacción de un objetivo del temario.
- 🎨 Mejorar el contraste de un elemento en el modo día.
- ➕ Añadir preguntas a un set de un módulo concreto.
- 🌌 Añadir un universo temático nuevo replicando la estructura de uno existente.

El flujo exacto (fork → rama → commit → Pull Request) está en [`CONTRIBUTING.md`](./CONTRIBUTING.md).
**Meta del primer PR:** que sea tan pequeño que sea imposible que rompa nada y fácil de revisar.

Documenta tu mejora copiando [`propuestas/_PLANTILLA.md`](./propuestas/_PLANTILLA.md) a un archivo con
tu nombre dentro de `propuestas/`.

---

## Fase 4 — Hitos (en lugar de un plan de empresa a 90 días)

- **Listo para contribuir (primeros días):** entorno funcionando, app abierta sin errores de consola,
  mapa del archivo entendido, **primer PR pequeño fusionado**.
- **Contribuidor autónomo:** una mejora propia de principio a fin; sabes **resolver un conflicto de
  fusión**; empiezas a **revisar PRs de compañeros**.
- **Colaborador maduro:** encadenas mejoras sin desestabilizar `main`, documentas tu aportación y
  acompañas a alguien más nuevo.

---

## Errores típicos de principiante (y solución rápida)

- **Pantalla en blanco al abrir el HTML** → no es Git, es tu edición. F12 → Console: el error rojo te
  da la línea. Suele ser una coma, llave o paréntesis. Verifica la consola limpia **antes** de commitear.
- **"Tengo mil conflictos"** → empezaste sin sincronizar. Para la próxima: sincroniza (`git fetch
  upstream && git merge upstream/main`) **antes** de crear la rama. Más detalle en `CONTRIBUTING.md`.
- **Me pide usuario/contraseña al hacer push** → usa **GitHub Desktop** o `gh auth login`; o crea un
  **Personal Access Token** y pégalo como contraseña.
- **Hice commits en `main` por error** → mira la solución (con sus avisos) en `CONTRIBUTING.md`.

¿Atascado/a? Abre un Issue con tu duda o pregunta al mantenedor. Nadie nace sabiendo Git. 🙂
