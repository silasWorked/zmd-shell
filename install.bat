@echo off
chcp 65001 >nul
title ZMD INSTALLER :: GOYDA PROTOCOL
color 0C
cls

echo.
echo      /    /           /    /
echo     / Z  /           / V  /
echo    /    /___________/    /
echo.
echo  [ZMD] ИНИЦИАЛИЗАЦИЯ ПРОТОКОЛА УСТАНОВКИ...
echo  ==========================================
echo.

:: 1. ПРОВЕРКА NODE.JS
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не обнаружен!
    echo Сначала установите Node.js: https://nodejs.org/
    pause
    exit
)

:: 2. ПРОВЕРКА GIT
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ОШИБКА] Git не обнаружен!
    echo Сначала установите Git: https://git-scm.com/
    pause
    exit
)

:: === НАСТРОЙКИ ===
set REPO_URL=https://github.com/silasWorked/zmd-shell.git
set INSTALL_DIR=zmd-shell

:: 3. ЗАГРУЗКА
if exist "%INSTALL_DIR%" (
    echo [ИНФО] Папка обнаружена. Обновляем протоколы...
    cd %INSTALL_DIR%
    git pull
) else (
    echo [ИНФО] Клонирование репозитория с GitHub...
    git clone %REPO_URL%
    cd %INSTALL_DIR%
)

:: 4. УСТАНОВКА
echo.
echo [ИНФО] Распаковка боеприпасов (npm install)...
call npm install
if %errorlevel% neq 0 goto :error

:: 5. ЛИНКОВКА
echo.
echo [ИНФО] Интеграция в ядро Windows...
call npm link --force
if %errorlevel% neq 0 goto :error

:: 6. СБРОС ФЛАГА (ЧТОБЫ БЫЛА ГОЙДА)
echo.
echo [ИНФО] Сброс параметров первого запуска...
if exist "%USERPROFILE%\.zmd_installed" (
    del "%USERPROFILE%\.zmd_installed"
)

echo.
echo ==========================================
echo    УСТАНОВКА ЗАВЕРШЕНА. РАБОТАЕМ.
echo    Для запуска нажмите Win+R и введите: zmd
echo ==========================================
echo.
echo Нажмите любую кнопку для первого запуска...
pause >nul

:: ЗАПУСК
zmd
exit

:error
echo.
echo [КРИТИЧЕСКИЙ СБОЙ] Установка прервана.
pause
exit