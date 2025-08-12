@echo off
echo =========================================
echo    POP THE TOTE - PREPARAR HOSTING
echo =========================================
echo.

echo ✅ Verificando archivos necesarios...
echo.

if exist "index.html" (
    echo ✅ index.html encontrado
) else (
    echo ❌ index.html no encontrado
    goto error
)

if exist "styles.css" (
    echo ✅ styles.css encontrado
) else (
    echo ❌ styles.css no encontrado
    goto error
)

if exist "script.js" (
    echo ✅ script.js encontrado
) else (
    echo ❌ script.js no encontrado
    goto error
)

if exist "README.md" (
    echo ✅ README.md encontrado
) else (
    echo ❌ README.md no encontrado
    goto error
)

echo.
echo ========================================
echo        📁 ARCHIVOS LISTOS PARA SUBIR
echo ========================================
echo.
echo Los siguientes archivos están listos:
dir /b *.html *.css *.js *.md *.json
echo.
echo ========================================
echo         🚀 PRÓXIMOS PASOS
echo ========================================
echo.
echo 1. Ve a github.com y regístrate
echo 2. Crea un repositorio llamado "popthetote-website"
echo 3. Sube TODOS los archivos de esta carpeta
echo 4. Activa GitHub Pages en Settings
echo.
echo 💡 Guía completa en: HOSTING-GRATUITO.md
echo.
echo ========================================
echo         📞 INFORMACIÓN IMPORTANTE
echo ========================================
echo.
echo ✅ WhatsApp configurado: +502 4001 1272
echo ✅ Sitio 100%% responsive
echo ✅ Carrito de compras funcional
echo ✅ Formularios integrados con WhatsApp
echo.
pause
echo.
echo ¡Tu sitio estará disponible en minutos! 🎉
echo URL será algo como: https://tu-usuario.github.io/popthetote-website
echo.
goto end

:error
echo.
echo ❌ ERROR: Faltan archivos necesarios
echo Asegúrate de estar en la carpeta correcta
echo.
pause

:end
echo.
echo ¡Gracias por elegir Pop The Tote! 🛍️
pause
