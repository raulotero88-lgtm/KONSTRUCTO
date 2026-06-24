# El Konstructo

Práctica gamificada para el **Máster de IA aplicada a negocio**. Es una **app web de un solo
archivo** (`index.html`) construida con **React 18 cargado por CDN** (sin compilación, sin
`node_modules`, sin paso de *build*). Todo el progreso se guarda en el `localStorage` del navegador
(claves con prefijo `quiz_`).

> **Autoría:** proyecto creado originalmente por **Vanesa**. Este repositorio lo aloja
> y mantiene **@raulotero88-lgtm** para abrirlo a las mejoras del resto de la clase.
>
> **Versión actual:** ver [`CHANGELOG.md`](./CHANGELOG.md).

---

## ▶️ Cómo abrir la app

No necesita servidor ni instalación. Tres formas:

1. **Doble clic** sobre `index.html` → se abre en el navegador (`file://...`). La más rápida.
2. **Live Server (VS Code):** abre la carpeta en VS Code, instala la extensión *Live Server*, clic
   derecho sobre `index.html` → **Open with Live Server**. Se recarga sola al guardar; ideal si editas.
3. **Versión publicada online:** 👉 **<https://raulotero88-lgtm.github.io/KONSTRUCTO/>**

> Requiere conexión a internet la primera vez, porque React y React-DOM se descargan desde el CDN
> (unpkg). Sin internet, la app no arranca.

---

## ✅ Cómo comprobar que funciona ("estable")

Abre el archivo y pulsa **F12** para ver la consola del navegador:

- **Cero errores rojos** en la pestaña *Console* = el script se cargó y React montó correctamente.
- Debe verse contenido (selección de universo, módulos, sets). Si la pantalla queda **en blanco**,
  algo se rompió: revisa el primer error de la consola.

---

## 🤝 Cómo proponer una mejora

Lee [`CONTRIBUTING.md`](./CONTRIBUTING.md). En resumen: haz un **fork**, crea una rama, edita y abre un
**Pull Request**. Documenta tu mejora en la carpeta [`propuestas/`](./propuestas/). Si es tu primera vez
colaborando, empieza por [`ONBOARDING.md`](./ONBOARDING.md).

**Regla de oro:** nadie escribe directamente en `main`. Toda mejora pasa por un Pull Request revisado,
para que la versión estable **nunca se rompa**.

---

## 💾 No pierdas tu progreso

La app incluye **backup/restore** a fichero `.json` (exporta todas las claves `quiz_` de tu
`localStorage`). Úsalo antes de probar cambios para no perder tu avance. Esos `.json` son **datos
personales y no deben subirse al repositorio** (ya están excluidos en `.gitignore`).

---

## 🧱 Estructura del repositorio

```text
.
├── index.html                      ← la app (un único archivo: HTML + CSS + JS + datos)
├── README.md                       ← este archivo
├── CONTRIBUTING.md                 ← cómo proponer mejoras (flujo fork + Pull Request)
├── ONBOARDING.md                   ← puesta a punto para nuevos colaboradores
├── CHANGELOG.md                    ← historial de versiones
├── .gitignore
├── check-js.js                     ← valida la sintaxis del JS embebido (lo usa la CI)
├── check-console.js                ← detecta "pantalla en blanco" en un navegador headless (CI)
├── .github/
│   ├── CODEOWNERS                  ← quién revisa los Pull Requests
│   ├── PULL_REQUEST_TEMPLATE.md    ← checklist automático al abrir un PR
│   └── workflows/ci.yml            ← Integración Continua
└── propuestas/                     ← una ficha por alumno documentando su mejora
```

## 🛠️ Tecnología (para quien quiera tocar el código)

- **React 18** vía CDN (unpkg, UMD de producción), usando `React.createElement` (**sin JSX, sin Babel**).
- **Estado:** `localStorage`, claves `quiz_*`. Cada acceso va en `try/catch` (tolera JSON corrupto).
- **Datos:** módulos `M1`–`M9` y *tracks* `T1`–`T5`; el módulo/bloque de cada set se **deriva de su
  nombre** (p. ej. `M2-1.1`). Los objetivos del temario están en el objeto `DEFAULT_OBJECTIVES`.
- **Sin build:** verificar un cambio = abrir `index.html` y mirar la consola (F12).
