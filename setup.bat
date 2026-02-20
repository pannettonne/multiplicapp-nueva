@echo off
REM Script de instalación rápida para MultiplicaApp en Windows

title MultiplicaApp - Setup

echo.
echo 🧮 MultiplicaApp - Setup Script
echo ================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo    Descargalo desde: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js: %NODE_VERSION%
echo ✅ npm: %NPM_VERSION%
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas
echo.
echo ================================
echo ✅ Setup completado!
echo.
echo 🚀 Para iniciar el desarrollo:
echo    npm run dev
echo.
echo 📦 Para compilar para producción:
echo    npm run build
echo.
echo 🌐 Abre: http://localhost:5173
echo.
pause
