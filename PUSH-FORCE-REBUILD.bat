@echo off
setlocal enabledelayedexpansion

cls
color 0A

echo.
echo FORCE REBUILD - FORZAR QUE VERCEL RECONSTRUYA
echo.

cd /d "C:\Users\david.paniaguadoming\Downloads\multiplicapp"

git config --global user.email "elpaniaguado@gmail.com"
git config --global user.name "pannettonne"

echo Haciendo push con force...
git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ERROR - Intenta manualmente:
    echo git push -u origin main --force
) else (
    echo.
    echo ✅ PUSH COMPLETADO
    echo.
    echo Vercel va a reconstruir desde cero
    echo Espera 5 minutos
    echo.
    echo Ve a: https://multiplicapp-nueva.vercel.app
)

pause

