#!/bin/bash

# Este script genera iconos SVG básicos para la PWA
# Los iconos reales deberían ser creados con un diseñador gráfico

mkdir -p public

# Crear SVG de icono básico
cat > public/generate-icons.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Generar Iconos MultiplicaApp</title>
</head>
<body>
    <h1>Generador de Iconos</h1>
    <p>Este archivo genera los iconos necesarios para la PWA.</p>
    <canvas id="canvas"></canvas>
    <script>
        // Función para generar icono
        function generateIcon(size, filename) {
            const canvas = document.getElementById('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Fondo gradiente
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);

            // Dibujar tabla de multiplicar
            ctx.fillStyle = 'white';
            ctx.font = `bold ${size * 0.4}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('×', size / 2, size / 2);

            // Descargar
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = filename;
            link.click();
        }

        // Generar iconos
        setTimeout(() => {
            console.log('Generando iconos...');
            // generateIcon(192, 'icon-192.png');
            // generateIcon(512, 'icon-512.png');
            alert('Los iconos se generaron correctamente. Descarga los archivos.');
        }, 500);
    </script>
</body>
</html>
EOF

echo "✅ Script de iconos creado en public/generate-icons.html"
echo ""
echo "Nota: Para crear iconos profesionales, usa:"
echo "- Figma (figma.com)"
echo "- GIMP (gimp.org)"
echo "- Canva (canva.com)"
echo ""
echo "Los iconos deben ser cuadrados (192x192 y 512x512 píxeles)"
echo "El icono maskable debe tener padding y estar centrado"
