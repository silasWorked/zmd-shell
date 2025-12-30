#!/bin/bash

# === НАСТРОЙКИ ===
REPO="https://github.com/silasWorked/zmd-shell.git"
DIR="zmd-shell"

# Цвета
RED='\033[0;31m'
WHITE='\033[1;37m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Очистка и логотип
clear
echo -e "${WHITE}      /    /           /    /"
echo -e "${BLUE}     / Z  /           / V  /"
echo -e "${RED}    /    /___________/    /"
echo -e "${NC}"
echo -e "${RED}[ZMD] ИНИЦИАЛИЗАЦИЯ ПРОТОКОЛА ЗАГРУЗКИ (LINUX)...${NC}"
echo "================================================="

# 1. Проверка зависимостей
echo -e "${WHITE}[CHECK] Проверка системных компонентов...${NC}"

if ! command -v git &> /dev/null; then
    echo -e "${RED}[ОШИБКА] Git не установлен.${NC}"
    echo "Установите: sudo apt install git (или аналог)"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}[ОШИБКА] Node.js не установлен.${NC}"
    echo "Установите: sudo apt install nodejs npm"
    exit 1
fi

# 2. Клонирование
echo -e "${BLUE}[INFO]  Установка соединения с GitHub...${NC}"

if [ -d "$DIR" ]; then
    echo -e "${WHITE}[INFO]  Обнаружена старая версия. Обновляем...${NC}"
    cd "$DIR"
    git pull
else
    git clone "$REPO"
    cd "$DIR" || exit
fi

# 3. Установка пакетов
echo -e "${BLUE}[INFO]  Распаковка боеприпасов (npm install)...${NC}"
npm install --silent

# 4. Линковка (требует sudo)
echo -e "${RED}[ROOT]  Требуется доступ для интеграции в систему (sudo)...${NC}"
sudo npm link --force

# 5. Сброс флага первого запуска (чтобы была ГОЙДА)
rm -f ~/.zmd_installed

# Финал
echo -e "${GREEN}"
echo "=========================================="
echo "   УСТАНОВКА ЗАВЕРШЕНА. РАБОТАЕМ."
echo "   Запустите команду: zmd"
echo "=========================================="
echo -e "${NC}"

# Попытка автозапуска
zmd