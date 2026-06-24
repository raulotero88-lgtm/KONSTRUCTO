# 📌 LÉEME PRIMERO — Cómo publicar y gestionar este repositorio

Este documento es para **ti (el mantenedor)**, no para los alumnos. Explica cómo dejar el
repositorio publicado en GitHub y qué tienes que personalizar. Cuando termines, puedes borrarlo.

---

## 1. ¿Quién aloja el repo? (tu pregunta)

**Lo subes tú con tu usuario, y eres el mantenedor operativo.** Es lo correcto porque la autora
no maneja Git. Reparto de papeles:

| Papel | Quién | Qué hace |
|---|---|---|
| **Autora original** | La alumna | Creó la app. Se la **acredita** en README, CHANGELOG y commit inicial. No necesita tocar Git. |
| **Mantenedor / propietario** | **Tú** | Alojas el repo, revisas los Pull Requests y los fusionas. Eres la única persona que escribe en `main`. |
| **Contribuidores** | El resto de alumnos | Hacen *fork* y proponen mejoras vía Pull Request. |

> **Opción aún mejor para una clase (opcional):** crea una **Organización** de GitHub para el Máster
> (gratis) y aloja el repo ahí, contigo como *owner*. Ventajas: la propiedad no depende de tu cuenta
> personal, puedes añadir a la profesora como co-propietaria y gestionar a los alumnos como miembros.
> Si te parece demasiado, alojarlo en tu cuenta personal es perfectamente válido.

---

## 2. Lo que tienes que personalizar (buscar y reemplazar)

Antes de publicar, sustituye estos marcadores en los archivos indicados:

| Marcador | Reemplázalo por | Archivos donde aparece |
|---|---|---|
| `raulotero88-lgtm` | Tu usuario de GitHub | `README.md`, `.github/CODEOWNERS`, comandos de abajo |
| `KONSTRUCTO` | El nombre que le des al repo | `README.md`, comandos de abajo |
| `Vanesa` | El nombre real de la alumna autora | `README.md`, `CHANGELOG.md` |
| `@SEGUNDO-MANTENEDOR` | (Opcional) un 2º revisor de confianza, o bórralo | `.github/CODEOWNERS` |

> Truco: en VS Code, `Ctrl+Shift+H` busca y reemplaza en toda la carpeta de una vez.

---

## 3. Publicar el repositorio (elige una vía)

### Vía A — con GitHub CLI (`gh`), todo desde la terminal

```bash
cd "c:/Users/raulo/OneDrive/Escritorio/CLAUDE CODE/13-KONSTRUCTO"

git init
git add .
git commit -m "El Konstructo v1.8.10 — versión inicial de Vanesa + gobernanza del repo"
git branch -M main

# Privado (recomendado mientras trabajáis). Cambia --private por --public si quieres Pages gratis.
gh repo create KONSTRUCTO --private --source=. --remote=origin --push
```

### Vía B — web de GitHub + Git

1. En GitHub: **+ → New repository** → nombre `KONSTRUCTO` → **privado** → **NO** marques "Add a README"
   (ya tenemos uno) → **Create repository**.
2. En la terminal:

   ```bash
   cd "c:/Users/raulo/OneDrive/Escritorio/CLAUDE CODE/13-KONSTRUCTO"
   git init
   git add .
   git commit -m "El Konstructo v1.8.10 — versión inicial de Vanesa + gobernanza del repo"
   git branch -M main
   git remote add origin https://github.com/raulotero88-lgtm/KONSTRUCTO.git
   git push -u origin main
   ```

### Vía C — GitHub Desktop (sin comandos)

*File → Add local repository* → elige esta carpeta → "create a repository" → escribe un resumen →
**Commit to main** → **Publish repository** (marca *Keep this code private*).

---

## 4. Después de publicar (configuración en la web, 5 minutos)

1. **Acredita y/o añade a la autora:** *Settings → Collaborators → Add people* (rol *Read* o *Write*).
   No es obligatorio para que funcione, pero asocia su perfil al proyecto.
2. **Invita a la profesora y a los alumnos** que vayan a participar (rol *Read* basta para hacer *fork*).
3. **Protege `main`:** *Settings → Rules → Rulesets → New branch ruleset* (ver `CONTRIBUTING.md` §
   "estabilidad" o la guía completa). Marca: *Require a pull request*, *Required approvals: 1*,
   *Require review from Code Owners*, *Block force pushes*, *Restrict deletions*, *Require status checks*.
4. **Activa la CI:** ya está en `.github/workflows/ci.yml`; correrá sola en el primer Pull Request.
   Luego añade el check `validar` como obligatorio en el Ruleset (*Add checks*).
5. **(Opcional) Publica la app con GitHub Pages:** *Settings → Pages → Deploy from a branch → `main` →
   `/ (root)`*. Servirá `index.html` en `https://raulotero88-lgtm.github.io/KONSTRUCTO/`.
   ⚠️ Pages en repo **privado** requiere plan de pago; en **público** es gratis.

---

## 5. Tu rutina como mantenedor (el día a día)

- Llega un Pull Request → te avisa GitHub.
- `gh pr checkout NUMERO` (o descarga el `index.html` del PR) → ábrelo → **F12, consola sin errores rojos**.
- Si la CI está en verde y la app abre bien → **Merge**. Si no → comentas y pides cambios.
- Cuando acumules varias mejoras estables, crea una versión: `git tag -a v1.9.0 -m "..."` + Release.

¿Dudas? Toda la teoría está en `CONTRIBUTING.md` (para alumnos) y en `ONBOARDING.md` (para incorporar gente).
