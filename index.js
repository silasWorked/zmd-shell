#!/usr/bin/env node

const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

const USERNAME = os.userInfo().username;
const HOSTNAME = os.hostname();
const IS_WIN = os.platform() === 'win32';
const INSTALL_FLAG = path.join(os.homedir(), '.zmd_installed');

// === БАЗА ЦИТАТ (РАНДОМИЗАТОР) ===
const BASES = [
    "РАБОТАЕМ, БРАТЬЯ",
    "СИЛА В ПРАВДЕ",
    "СВОИХ НЕ БРОСАЕМ",
    "ВЕЖЛИВЫЕ ЛЮДИ",
    "ЗАДАЧУ ПРИНЯЛ, ВЫПОЛНЯЮ",
    "НАС НЕ ОТМЕНИТЬ",
    "ПОБЕДА БУДЕТ ЗА НАМИ",
    "ГДЕ МЫ — ТАМ ПОБЕДА"
];

const getRandomBase = () => BASES[Math.floor(Math.random() * BASES.length)];

// === УТИЛИТЫ ===
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// === ПЕРВИЧНАЯ УСТАНОВКА (MEME SETUP) ===
async function runFirstSetup() {
    console.clear();
    const log = (msg) => console.log(chalk.white(`[ЗАГРУЗКА] ${msg}`));
    const done = () => console.log(chalk.green(`[ШТАТНО]     ВЫПОЛНЕНО`));

    console.log(chalk.red.bold('\n  ОБНАРУЖЕН НОВЫЙ ОПЕРАТОР. ИНИЦИАЛИЗАЦИЯ ZMD...\n'));
    await sleep(1000);

    log('Синхронизация с тактическим центром...');
    await sleep(1200);
    done();

    log('Калибровка систем "Герань-2"...');
    await sleep(1500);
    done();

    log('Проверка запасов гречки и тушенки...');
    await sleep(1000);
    console.log(chalk.yellow('[ИНФО]       ЗАПАСЫ В НОРМЕ (НА 3 ГОДА)'));
    await sleep(800);

    log('Установка VPN (Vежливый Pусский Nетворк)...');
    await sleep(1500);
    done();

    log('Загрузка протоколов вежливости...');
    const width = 30;
    for (let i = 0; i <= width; i++) {
        process.stdout.write(`\r  [${'█'.repeat(i)}${' '.repeat(width - i)}] ${Math.floor(i/width*100)}%`);
        await sleep(40);
    }
    console.log('');
    done();

    await sleep(1000);
    console.clear();
    
    // АРТ ГОЙДА
    const goidaArt = [
        chalk.white('      РУССКИЕ ВПЕРЕД      '),
        chalk.blue ('      РУССКИЕ ВПЕРЕД      '),
        chalk.red  ('      РУССКИЕ ВПЕРЕД      '),
        '',
        chalk.red.bold('   Г О Й Д А ! ! !   ')
    ];
    
    goidaArt.forEach(line => console.log(line));
    console.log(chalk.gray('\n  Нажмите Enter, чтобы приступить к дежурству...'));
    
    fs.writeFileSync(INSTALL_FLAG, 'ZMD_INSTALLED_TRUE');
    
    await new Promise(resolve => {
        process.stdin.once('data', () => resolve());
    });
}

// === ИНТЕРФЕЙС ===

function drawIntro() {
    console.clear();
    
    const w = chalk.white.bold;
    const b = chalk.blue.bold;
    const r = chalk.red.bold;
    
    // Z in V Logo
    console.log(w('      \\    ████████████    /'));
    console.log(w('       \\         ███▀     / '));
    console.log(b('        \\      ███▀      /  '));
    console.log(b('         \\    ███▀      /   '));
    console.log(r('          \\  ████████  /    '));
    console.log(r('           \\          /     '));
    console.log(r('            \\   V    /      '));
    console.log(r('             \\      /       '));
    console.log(r('              \\    /        '));
    console.log(r('               \\  /         '));
    console.log(r('                \\/          '));

    console.log('');
    console.log(chalk.white.bold('  ZMD SHELL: ') + chalk.red.bold('OPERATOR EDITION v5.0'));
    // Рандомная цитата при каждом запуске
    console.log(chalk.gray(`  СТАТУС: ${chalk.green(getRandomBase())}`));
    console.log(chalk.gray('  ========================================'));
}

// === NEOFETCH (ВОЕННАЯ ВЕРСИЯ) ===
function formatUptime() {
    const up = os.uptime();
    const h = Math.floor(up / 3600);
    const m = Math.floor((up % 3600) / 60);
    return `${h}ч ${m}м`;
}

function formatMem() {
    const total = (os.totalmem() / 1024 ** 3).toFixed(1);
    const used = ((os.totalmem() - os.freemem()) / 1024 ** 3).toFixed(1);
    return `${used}/${total} ГБ`;
}

function drawNeofetch() {
    const cpu = os.cpus()[0].model.split('@')[0].trim();
    const logo = [
        chalk.white('   ████████   '),
        chalk.blue ('      ██▀     '),
        chalk.blue ('     ██▀      '),
        chalk.red  ('   ████████   '),
        chalk.gray('              '),
        chalk.white('   [ Z O V ]  ')
    ];

    const key = (k) => chalk.white.bold(k.padEnd(12)); 
    const val = (v) => chalk.cyan(v);

    const info = [
        `${chalk.red.bold('Z')}${chalk.white.bold('M')}${chalk.blue.bold('D')} ${chalk.gray('::')} ${chalk.green('УЗЕЛ СВЯЗИ')}`,
        chalk.gray('-------------------------'),
        `${key('ПОЗЫВНОЙ:')} ${val(USERNAME.toUpperCase())}`,
        `${key('СИСТЕМА:')}  ${val('Z-OS (Based on ' + (IS_WIN ? 'Win' : 'Linux') + ')')}`,
        `${key('КАЛИБР:')}   ${val(cpu)}`,
        `${key('БОЕКОМПЛЕКТ:')}${val(formatMem())}`,
        `${key('ДЕЖУРСТВО:')}${val(formatUptime())}`,
        `${key('НАСТРОЙ:')}  ${chalk.green('БОЕВОЙ')}`,
    ];

    console.log('');
    const maxLines = Math.max(logo.length, info.length);
    for (let i = 0; i < maxLines; i++) {
        const logoLine = logo[i] || '              '; 
        const infoLine = info[i] || '';
        console.log(`  ${logoLine}   ${infoLine}`);
    }
    console.log('');
}

// === КОМАНДЫ ===
const customCommands = {
    'sys': async () => drawNeofetch(),
    'zov': async () => drawNeofetch(),
    'neofetch': async () => drawNeofetch(),
    
    // Пасхалки и мемы
    'goida': async () => console.log(chalk.red.bold('\n  ГОООООООООООЛ! (Z)\n')),
    
    'sila': async () => console.log(chalk.white.bold('\n  В ПРАВДЕ.\n')),
    
    'status': async () => console.log(chalk.green('\n  ВСЁ ИДЕТ ПО ПЛАНУ. ПОТЕРЬ НЕТ.\n')),
    
    'nash': async () => console.log(chalk.blue('\n  СЛОН 🐘\n')),

    'help': async (args) => {
        if (args[0] && args[0].toLowerCase() === '-z') {
            console.log(chalk.bold.white('\n  [ ИНСТРУКТАЖ ZMD ]'));
            console.log(chalk.gray('  -----------------------------'));
            console.log(`  ${chalk.red('zov / sys')}    - Доклад о системе`);
            console.log(`  ${chalk.red('goida')}        - Активация патриотизма`);
            console.log(`  ${chalk.red('sila')}         - В чем сила?`);
            console.log(`  ${chalk.red('status')}       - Запрос обстановки`);
            console.log(`  ${chalk.red('cls')}          - Очистка логов`);
            console.log(`  ${chalk.red('exit')}         - Конец связи`);
            console.log(chalk.gray('  -----------------------------'));
            console.log('');
        } else {
            return false; 
        }
    },
    
    'cls': async () => { console.clear(); drawIntro(); },
    'clear': async () => { console.clear(); drawIntro(); },
    
    'exit': async () => {
        console.log(chalk.yellow('\n  КОНЕЦ СВЯЗИ. БЕРЕГИ СЕБЯ.\n'));
        process.exit(0);
    },
    'выход': async () => {
        console.log(chalk.yellow('\n  ОТБОЙ.\n'));
        process.exit(0);
    }
};

// === ИНТЕРФЕЙС ===
function getPrompt() {
    const cwd = process.cwd();
    const homedir = os.homedir();
    const shortPath = cwd.startsWith(homedir) ? '~' + cwd.slice(homedir.length) : cwd;
    const symbol = (os.platform() !== 'win32' && os.userInfo().uid === 0) ? '#' : '»';
    
    return `\n${chalk.white('[')}${chalk.red.bold('ZOV')}${chalk.white(']')} ${chalk.gray(shortPath)} ${chalk.red(symbol)} `;
}

// === ЗАПУСК ===
async function main() {
    if (!fs.existsSync(INSTALL_FLAG)) {
        await runFirstSetup();
    }

    if (IS_WIN) process.stdout.write('\x1b]0;ZMD: COMMAND CENTER\x07');
    drawIntro();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });

    const prompt = () => {
        rl.setPrompt(getPrompt());
        rl.prompt();
    };

    prompt();

    rl.on('line', async (line) => {
        line = line.trim();
        if (!line) { prompt(); return; }

        const args = line.split(' ');
        const cmd = args[0].toLowerCase();
        const cmdArgs = args.slice(1);

        if (customCommands[cmd]) {
            try { 
                const result = await customCommands[cmd](cmdArgs);
                if (result !== false) {
                    prompt();
                    return;
                }
            } 
            catch (e) { 
                console.error(chalk.red('ВНЕШТАТНАЯ СИТУАЦИЯ:'), e); 
                prompt();
                return;
            }
        }

        if (cmd === 'cd') {
            try { process.chdir(args[1] || os.homedir()); } 
            catch (err) { console.error(chalk.red(`ОБЪЕКТ НЕ ОБНАРУЖЕН: ${args[1]}`)); }
            prompt();
            return;
        }

        const child = spawn(line, { shell: true, stdio: 'inherit' });
        child.on('close', () => prompt());
        
        // Обработка ошибок, если команда не найдена системой
        child.on('error', () => {
             console.log(chalk.red('КОМАНДА НЕ РАСПОЗНАНА, ЦЕНТР.'));
             prompt();
        });
    });
}

main();