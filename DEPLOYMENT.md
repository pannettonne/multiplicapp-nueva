# Guía de Despliegue - MultiplicaApp

## Opción 1: Vercel (Recomendado - El más fácil) ⚡

### Pasos:

1. **Conectar repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Selecciona tu repositorio de GitHub

2. **Configuración automática**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./`

3. **Deploy**
   - Haz clic en "Deploy"
   - En 2-3 minutos tu PWA estará online

4. **URL personalizada (opcional)**
   - En Project Settings > Domains
   - Añade tu propio dominio

### Ventajas:
✅ Gratis para proyectos pequeños  
✅ Deploy automático en cada push a main  
✅ HTTPS automático  
✅ CDN global  
✅ Edge Functions disponibles

---

## Opción 2: Netlify 🌐

### Pasos:

1. **Conectar repositorio**
   - Ve a [netlify.com](https://netlify.com)
   - Haz clic en "New site from Git"
   - Autoriza y selecciona repositorio

2. **Configuración de build**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Netlify detectará automáticamente la configuración
   - El deploy ocurrirá en 1-2 minutos

4. **Dominio personalizado**
   - Site settings > Change site name
   - O conecta un dominio personalizado

### Ventajas:
✅ Gratis  
✅ Deploy automático  
✅ Preview deploys para PRs  
✅ Forms de Netlify

---

## Opción 3: GitHub Pages 📄

### Pasos:

1. **Crear rama gh-pages**
```bash
git checkout -b gh-pages
```

2. **Configurar en vite.config.ts**
```typescript
export default defineConfig({
  base: '/multiplicapp/', // Si el repo se llama multiplicapp
  plugins: [react()],
  // ...
})
```

3. **Build y deploy**
```bash
npm run build
npx gh-pages -d dist
```

4. **Habilitar Pages en GitHub**
   - Repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

### Ventajas:
✅ Gratis para repositorios públicos  
✅ Integrado con GitHub  
⚠️ Sin soporte para rewrites (problemas con router)

---

## Opción 4: Despliegue Manual 🏠

### En cualquier servidor con Node.js:

1. **Compilar**
```bash
npm run build
```

2. **Servir archivos estáticos**
```bash
# Con http-server
npx http-server dist -p 8080 -c-1

# Con Python
python3 -m http.server 8080 --directory dist

# Con Node.js
npm install -g serve
serve -s dist -l 8080
```

3. **HTTPS (requerido para PWA)**
```bash
# Usar Let's Encrypt + Certbot
sudo certbot certonly --standalone -d tu-dominio.com
```

4. **Nginx config de ejemplo**
```nginx
server {
  listen 443 ssl http2;
  server_name tu-dominio.com;

  ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;

  root /var/www/multiplicapp/dist;
  index index.html;

  # Para PWA - cache busting
  location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Service Worker - no cachear
  location = /sw.js {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate";
  }

  # HTML - no cachear
  location = /index.html {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate";
  }

  # Reescribir rutas para SPA
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## Checklist Pre-Despliegue ✓

- [ ] `npm run build` compila sin errores
- [ ] No hay warnings en la consola
- [ ] Los iconos están en `public/`
- [ ] El manifest.json es válido
- [ ] El Service Worker está registrado
- [ ] Funciona offline (Devtools > Network > Offline)
- [ ] Responsive en móvil (F12 > Device mode)
- [ ] PWA instalable (Chrome > Instalar app)

---

## Testing en Producción 🧪

### Después del deploy:

1. **Validar PWA**
   - Abre en Chrome DevTools > Application
   - Verifica Service Worker está active
   - Revisa el manifest.json

2. **Probar offline**
   - DevTools > Network > Offline
   - Recarga la página
   - Debe mostrar contenido del caché

3. **Lighthouse**
   - Chrome DevTools > Lighthouse
   - Ejecuta auditoría PWA
   - Objetivo: Score > 90

4. **Cross-browser**
   - Chrome ✓
   - Firefox ✓
   - Safari (iOS) ✓
   - Edge ✓

---

## URLs Útiles

| Herramienta | URL |
|---|---|
| PWA Builder | https://www.pwabuilder.com |
| Lighthouse | https://developers.google.com/web/tools/lighthouse |
| Can I use | https://caniuse.com |
| MDN Web Docs | https://developer.mozilla.org |
| WebDevChecklist | https://www.webdevchecklist.com |

---

## Solución de Problemas 🔧

### El Service Worker no se registra
```javascript
// En la consola del navegador
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(r => r.unregister()))
  .then(() => location.reload())
```

### Los iconos no aparecen
- Verifica que los archivos están en `public/`
- Limpia caché: `Ctrl+Shift+Delete` (Chrome)
- Revisa que el manifest.json tiene rutas correctas

### CORS errors
- Asegúrate que tu servidor devuelve headers CORS correctos
- El manifest.json debe ser servido con `Content-Type: application/manifest+json`

### PWA no instalable
- Debe servirse con HTTPS
- El manifest.json debe ser válido
- Debe tener icono 192x192 mínimo
- Debe tener una descripción
- El Service Worker debe estar activo

---

## Monitoreo en Producción 📊

### Analytics recomendados:
- Google Analytics (gratuito)
- Mixpanel (freemium)
- Plausible (privacidad-first)

### Ejemplo con Google Analytics:
```typescript
// En index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Mantenimiento 🔄

- **Actualizar dependencias**: `npm update` mensualmente
- **Monitorizar errores**: Integra Sentry o similar
- **Backup de datos**: Exporte estadísticas periódicamente
- **Security updates**: npm audit fix

---

Última actualización: Febrero 2026
