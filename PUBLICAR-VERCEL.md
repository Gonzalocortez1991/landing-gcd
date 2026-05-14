# Cómo publicar tu web en Vercel gratis

## Requisitos previos

- Cuenta en [github.com](https://github.com)
- Cuenta en [vercel.com](https://vercel.com) (login con GitHub)

---

## Paso 1: Crear repositorio en GitHub

### Opción A: Desde la web de GitHub

1. Entrá a [github.com](https://github.com) → Iniciá sesión
2. Click en **"+"** → **"New repository"**
3. Configurá:
   - **Repository name:** `landing-gcd`
   - **Public** o Private
   - ✅ Initialize with README (opcional, sino lo hacés vos después)
4. Click **"Create repository"**

### Opción B: Desde la terminal (más rápido)

Abrí **PowerShell** o **Git Bash** en tu carpeta del proyecto:

```powershell
cd "G:\Gonzalo Crecimiento Digital"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/landing-gcd.git
git push -u origin main
```

> Reemplazá `TU_USUARIO` con tu usuario de GitHub.

---

## Paso 2: Publicar en Vercel

1. Entrá a [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Elegí **"Continue with GitHub"**
3. Autorizá los permisos
4. Click **"Add New..."** → **"Project"**
5. Buscá tu repo **`landing-gcd`** → Click **"Import"**
6. En **Build and Output Settings**:
   - **Framework Preset:** `Other`
   - **Build Command:** *(dejá vacío)*
   - **Output Directory:** `.` *(o `/` si te lo pide)*
7. Click **"Deploy"**
8. Esperá ~30 segundos
9. ✅ **Listo!** Te da una URL tipo:
   ```
   landing-gcd.vercel.app
   ```

---

## Paso 3: Actualizar tu web después

Cada vez que hagas cambios en tu código:

```powershell
cd "G:\Gonzalo Crecimiento Digital"
git add .
git commit -m "Actualización del hero"
git push
```

Vercel detecta el push automáticamente y redeploya en segundos.

---

## Paso 4: Conectar dominio custom (opcional)

1. Comprá un dominio en [Namecheap](https://namecheap.com) o [Cloudflare](https://cloudflare.com)
2. En Vercel → Tu proyecto → **Settings** → **Domains**
3. Escribí tu dominio (ej: `tudominio.com`)
4. Vercel te dá los **nameservers** o **registros DNS** para configurar
5. Configurá en tu registrador (Namecheap/Cloudflare)
6. Esperá propagación DNS (~24h, usually faster)
7. ✅ Tu weblive en `tudominio.com`

---

## Estructura de archivos esperada

```
G:\Gonzalo Crecimiento Digital\
├── index.html
├── og-image.png       ← (crear después)
├── favicon.png         ← (crear después)
└── Archivos LandingPage\
    └── Foto Perfil Circulo.png
```

> Cuando subas a GitHub, también subí la carpeta `Archivos LandingPage` para que las imágenes funcionen.

---

## Comandos útiles

| Acción | Comando |
|--------|---------|
| Iniciar git | `git init` |
| Agregar archivos | `git add .` |
| Hacer commit | `git commit -m "Mensaje"` |
| Subir a GitHub | `git push` |
| Ver estado | `git status` |

---

## Tips

- Mantené tu `index.html` en la raíz del proyecto
- Las rutas de imágenes usan `%20` para espacios → `Archivos%20LandingPage/Foto%20Perfil%20Circulo.png`
- Vercel da **HTTPS automático** (no tenés que configurar nada)
- El plan **Hobby** es gratis e incluye SSL, CDN y deploys ilimitados