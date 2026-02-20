#!/bin/bash

# Script de instalación rápida para MultiplicaApp
# Uso: bash setup.sh

echo "🧮 MultiplicaApp - Setup Script"
echo "================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "   Descargalo desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo ""
echo "================================"
echo "✅ Setup completado!"
echo ""
echo "🚀 Para iniciar el desarrollo:"
echo "   npm run dev"
echo ""
echo "📦 Para compilar para producción:"
echo "   npm run build"
echo ""
echo "🌐 Abre: http://localhost:5173"
echo ""
