@echo off
setlocal enabledelayedexpansion

cls
color 0A

echo.
echo PUSH FINAL
echo.

cd /d "%USERPROFILE%\Downloads\multiplicapp"

if errorlevel 1 (
    echo ERROR: No se encontro la carpeta
    pause
    exit /b 1
)

git config --global user.email "elpaniaguado@gmail.com"
git config --global user.name "pannettonne"

echo Haciendo push...
git push -u origin main --force

echo.
echo ✅ PUSH COMPLETADO
echo.
echo Ve a: https://multiplicapp-nueva.vercel.app
echo Espera 5 minutos
echo.

pause

