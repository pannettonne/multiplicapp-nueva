# MultiplicaApp 🧮

PWA interactiva para aprender tablas de multiplicar dirigida a estudiantes de segundo de primaria.

## Características ✨

- **Progresión por Niveles**: Tablas 1-5, 6-7, 8-9, 1-10
- **Modo Aprendizaje**: Sin presión, con explicaciones pedagógicas
- **Modo Reto Rápido**: Contra reloj (60 segundos)
- **Gamificación**:
  - Sistema de vidas (❤️)
  - Racha de aciertos (🔥)
  - Puntuación acumulada
- **Estadísticas**: Guardadas localmente con IndexedDB
- **PWA Completa**: Funciona offline, instalable en dispositivos
- **Explicaciones Técnicas**: Estrategias matemáticas para cada tabla

## Tecnologías 🛠️

- React 18 + TypeScript
- Vite (bundler ultrarrápido)
- IndexedDB (base de datos local)
- Service Worker (offline & caché)
- CSS3 con animaciones

## Instalación

### Requisitos
- Node.js 16+ 
- npm o yarn

### Pasos

1. **Clonar o descargar el proyecto**
```bash
cd multiplicapp
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Desarrollo local**
```bash
npm run dev
```
Accede a `http://localhost:5173`

4. **Compilar para producción**
```bash
npm run build
```

Los archivos compilados estarán en `dist/`

## Despliegue 🚀

### Opción 1: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Opción 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Opción 3: GitHub Pages
```bash
npm run build
# Sube la carpeta dist/ a GitHub Pages
```

## Estructura del Proyecto

```
multiplicapp/
├── public/
│   ├── sw.js                 # Service Worker
│   ├── manifest.json         # Manifest PWA
│   └── icon-*.png           # Iconos (192x192, 512x512)
├── src/
│   ├── components/
│   │   ├── Menu.tsx         # Menú principal
│   │   ├── Menu.css
│   │   ├── Game.tsx         # Componente de juego
│   │   └── Game.css
│   ├── hooks/
│   │   └── useGameLogic.ts  # Lógica del juego
│   ├── types.ts             # Tipos TypeScript
│   ├── db.ts                # Base de datos IndexedDB
│   ├── questionGenerator.ts # Generador de preguntas
│   ├── App.tsx              # App principal
│   ├── index.css            # Estilos globales
│   └── main.tsx             # Entry point
├── index.html               # HTML principal
├── vite.config.ts           # Configuración Vite
├── tsconfig.json            # Configuración TypeScript
└── package.json             # Dependencias
```

## Funcionalidades Detalladas

### Modo Aprendizaje 📚
- 5 vidas
- Explicaciones detalladas en cada error
- Técnicas matemáticas para aprender cada tabla
- Sin límite de tiempo
- Perfecto para practicar

### Modo Reto Rápido ⚡
- 60 segundos de juego
- 3 vidas
- Puntuación acumulada
- Racha de aciertos (multiplicador de puntos)
- Ideal para competir y mejorar velocidad

### Técnicas Pedagógicas 💡
Cada tabla tiene estrategias específicas:

**Tabla del 2**: Dobla el número
**Tabla del 3**: Suma triple del número
**Tabla del 4**: Dobla dos veces
**Tabla del 5**: Termina en 5 o 0
**Tabla del 6**: Tabla del 5 + el número
**Tabla del 7**: Tabla del 10 - tabla del 3
**Tabla del 8**: Dobla tres veces
**Tabla del 9**: Tabla del 10 - el número
**Tabla del 10**: Añade un 0

## Almacenamiento Local

Todos los datos se guardan en IndexedDB:
- Estadísticas de juegos
- Progreso del jugador
- Logros desbloqueados

Sin servidor requerido, totalmente offline.

## PWA - Instalación en Dispositivos

### Android
1. Abre la app en Chrome
2. Toca el menú (⋮)
3. Selecciona "Instalar app"

### iOS
1. Abre en Safari
2. Toca Compartir (↗️)
3. Selecciona "Añadir a pantalla de inicio"

## Optimización 🚀

- Minificación automática
- Tree-shaking de dependencias
- Caché de Service Worker
- Compresión de assets
- Tamaño final: ~150KB gzipped

## Personalización 🎨

Puedes customizar:

- **Colores**: Edita `src/components/Menu.css` y `Game.css`
- **Preguntas**: Modifica `src/questionGenerator.ts`
- **Vidas/Tiempo**: Ajusta `src/hooks/useGameLogic.ts`
- **Niveles**: Añade nuevos en `types.ts`

## Debugging

Para ver logs del Service Worker:
```javascript
// En la consola del navegador
navigator.serviceWorker.getRegistrations()
  .then(registrations => console.log(registrations))
```

Borrar base de datos local:
```javascript
// En la consola del navegador
indexedDB.deleteDatabase('MultiplicaAppDB')
```

## Licencia

Libre para uso educativo.

## Contribuciones 🤝

¡Las mejoras son bienvenidas! Algunas ideas:
- Más técnicas de cálculo mental
- Modo multijugador
- Temas visuales adicionales
- Integración con sistemas de puntos escolares
- Sonidos y efectos de vibración

---

Hecho con ❤️ para ayudar a los niños a aprender matemáticas de forma divertida.
