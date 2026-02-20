# 🚀 Primeros Pasos - MultiplicaApp

## ⚡ En 5 minutos tendrás la app corriendo

### Paso 1: Clonar/Descargar el proyecto

```bash
# Si tienes Git
git clone <tu-repo>
cd multiplicapp

# O simplemente copia todos los archivos a una carpeta llamada "multiplicapp"
```

### Paso 2: Instalar dependencias

```bash
npm install
```

Este comando descargará:
- React 18
- Vite 5
- TypeScript
- idb (librería IndexedDB)

⏱️ Tiempo: ~2 minutos (depende de tu conexión)

### Paso 3: Ejecutar en desarrollo

```bash
npm run dev
```

**Resultado**:
```
✓ ready in 523ms

➜  Local:   http://localhost:5173/
➜  Press h + enter to show help
```

### Paso 4: Abre tu navegador

Ve a: **http://localhost:5173**

🎉 **¡La app está funcionando!**

---

## 🎮 Primer Test

1. Abre el navegador en http://localhost:5173
2. Deberías ver: Menu Principal con gradiente morado
3. Haz click en "Tablas 1-5" en Modo Aprendizaje
4. Resuelve una pregunta (ej: 3 × 5 = 15)
5. Presiona "Responder"
6. ¡Deberías ver feedback positivo!

**Si todo funciona**: ✅ Ambiente listo para desarrollar

---

## 📝 Próximos Pasos (Opcionales)

### A. Personalizar

1. Abre `src/components/Menu.css`
2. Cambia el color del gradiente:
   ```css
   background: linear-gradient(135deg, #FF6B9D 0%, #FEC860 100%);
   ```
3. Guarda (Vite recarga automáticamente ✨)

### B. Cambiar Nombre

En `public/manifest.json`:
```json
{
  "name": "Tu Nombre Aquí - Aprende Tablas",
  "short_name": "Tu App"
}
```

### C. Agregar tu logo

Reemplaza los iconos en `public/`:
- icon-192.png
- icon-512.png
- icon-192-maskable.png
- icon-512-maskable.png

(Busca "PWA Icon Generator" en Google)

---

## 🏗️ Compilar para Producción

Cuando esté listo para desplegar:

```bash
npm run build
```

**Resultado**:
```
dist/
├── index.html
├── assets/
│   ├── index-abc123.js
│   └── index-def456.css
├── sw.js
└── manifest.json
```

La carpeta `dist/` contiene todo listo para producción.

---

## 🌐 Desplegar (3 opciones rápidas)

### Opción A: Vercel (⭐ Recomendada)

```bash
npm install -g vercel
vercel
```

Seguir prompts y ¡Listo! URL en 30 segundos.

### Opción B: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Opción C: Servir localmente

```bash
npm install -g serve
serve -s dist -l 3000
```

Abre: http://localhost:3000

---

## 🐛 Troubleshooting

### "npm: command not found"
→ Instala Node.js desde https://nodejs.org

### "Port 5173 already in use"
→ Ejecuta: `npm run dev -- --port 5174`

### "Module not found"
→ Elimina `node_modules` y `package-lock.json`, luego `npm install`

### La app se ve rara en móvil
→ Abre DevTools (F12) → Click en dispositivo móvil → Refresca

### IndexedDB no guarda datos
→ Abre Console (F12) y copia:
```javascript
indexedDB.deleteDatabase('MultiplicaAppDB')
location.reload()
```

### Service Worker no funciona
→ En DevTools → Application → Service Workers → Unregister all → Refresca

---

## 📁 Estructura Rápida

```
multiplicapp/
├── src/              ← TODO tu código aquí
│   ├── components/   ← Menú y Juego
│   ├── hooks/        ← Lógica del juego
│   └── types.ts      ← Tipos TypeScript
├── public/           ← Assets estáticos
├── package.json      ← Dependencias
├── index.html        ← HTML principal
└── README.md         ← Documentación
```

---

## 🎯 Comandos Útiles

```bash
npm run dev          # Desarrollo local
npm run build        # Compilar producción
npm run preview      # Preview de build
npm install          # Instalar dependencias
npm update           # Actualizar dependencias
npm audit fix        # Arreglar vulnerabilidades
```

---

## 🔍 Verificar Instalación

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Verificar React
console.log(React.version)

// Verificar Service Worker
navigator.serviceWorker.getRegistrations()

// Verificar IndexedDB
indexedDB.databases()
```

Deberías ver información sin errores.

---

## 📱 Instalar como App

### En Chrome/Android:
1. Abre http://localhost:5173
2. Click en menú (⋮) → "Instalar app"
3. Confirma

### En Safari/iOS:
1. Abre http://localhost:5173
2. Click Compartir (↗️)
3. "Añadir a pantalla de inicio"

---

## 💡 Tips

- **Live reload**: Los cambios se ven automáticamente (Vite es rápido ⚡)
- **TypeScript**: Errores mostrados en consola en tiempo real
- **Devtools**: F12 → Application → IndexedDB para ver datos guardados
- **Network**: F12 → Network → Offline para probar modo offline

---

## ✅ Checklist

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funciona
- [ ] http://localhost:5173 carga
- [ ] Menú principal visible
- [ ] Puedo jugar (responder preguntas)
- [ ] Las respuestas dan feedback
- [ ] Las estadísticas se guardan

**Si todo está ✅**: ¡Listo para desarrollar!

---

## 🎓 Próximo: Personalización

Una vez verificado que todo funciona, puedes:

1. **Cambiar colores**: `src/components/*.css`
2. **Modificar preguntas**: `src/questionGenerator.ts`
3. **Ajustar dificultad**: `src/hooks/useGameLogic.ts`
4. **Agregar niveles**: `src/types.ts`

---

## 📞 Necesitas Help?

1. **Documentación**: Revisa `README.md`, `DEPLOYMENT.md`, `ARQUITECTURA.md`
2. **Consola**: F12 → Console (aquí aparecen los errores)
3. **Network**: F12 → Network (para ver peticiones)
4. **Application**: F12 → Application → IndexedDB (ver datos guardados)

---

## 🚀 Listo para el Siguiente Nivel?

Cuando domines lo básico:

- [ ] Lee `ARQUITECTURA.md` para entender el proyecto
- [ ] Lee `DEPLOYMENT.md` para desplegar
- [ ] Personaliza según tus necesidades
- [ ] ¡Comparte con estudiantes!

---

**Estado**: ✅ Todo listo para comenzar

**Tiempo estimado**: 5 minutos hasta ver la app corriendo

**Siguiente**: Ejecuta `npm install` y `npm run dev` 🚀

---

*¿Algo no funciona? Revisa los logs en la consola (F12). La mayoría de problemas tienen solución en `DEPLOYMENT.md`*
