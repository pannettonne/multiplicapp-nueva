@echo off
setlocal enabledelayedexpansion

cls
color 0A

echo.
echo ═════════════════════════════════════════════════════════════
echo PUSH FINAL DEFINITIVO - TODOS LOS FIXES APLICADOS
echo ═════════════════════════════════════════════════════════════
echo.

cd /d "C:\Users\david.paniaguadoming\Downloads\multiplicapp"

git config --global user.email "elpaniaguado@gmail.com"
git config --global user.name "pannettonne"

echo Preparando cambios...
git add .

echo Creando commit...
git commit -m "Fix: Remover moduleResolution duplicado en tsconfig.json" 2>nul

echo.
echo SUBIENDO A GITHUB...
git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ⚠️  ERROR AL HACER PUSH
    echo    Intenta nuevamente o usa: git push -u origin main --force
) else (
    echo.
    echo ✅ CODIGO SUBIDO
)

echo.
echo ═════════════════════════════════════════════════════════════
echo LISTO - ESPERA 3-5 MINUTOS
echo ═════════════════════════════════════════════════════════════
echo.
echo Ve a: https://multiplicapp-nueva.vercel.app
echo.
echo FIXES APLICADOS:
echo ✅ App.css agregado
echo ✅ Imports en useGameLogic.ts arreglados
echo ✅ Minify cambiado a esbuild (sin terser)
echo ✅ moduleResolution duplicado removido de tsconfig.json
echo.

pause

