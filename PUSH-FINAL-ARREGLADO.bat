@echo off
setlocal enabledelayedexpansion

cls
color 0A

echo.
echo PUSH FINAL - CON ARCHIVO APP.CSS ARREGLADO
echo.

cd /d "C:\Users\david.paniaguadoming\Downloads\multiplicapp"

git config --global user.email "elpaniaguado@gmail.com"
git config --global user.name "pannettonne"

echo Preparando cambios...
git add .

echo Creando commit...
git commit -m "Fix: Agregar App.css que faltaba" 2>nul

echo.
echo SUBIENDO A GITHUB...
git push -u origin main --force

echo.
echo ✅ CODIGO SUBIDO
echo.
echo Vercel se actualizará automáticamente en 2-3 minutos
echo.
echo Ve a: https://multiplicapp-nueva.vercel.app
echo.

pause

