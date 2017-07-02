#!/usr/bin/env node

const program = require('commander');
const encrypt = require('./lib/encrypt');

program
    .version('0.1.0')
    .option('-k, --key <key>', 'the passwd')
    .option('-o, --out <out>', 'the out file, optional');

program
    .command('encode <name>')
    .description('加密文件，可在option中使用 -o 或 --out 指定输出文件')
    .action(function(name) {
        console.log('正在加密文件 %s', name);
        const out = program.out;
        const key = program.key;
        const input = name;
        encrypt.encode(key,input,out);
    });

program
    .command('decode <name>')
    .description('解密')
    .action(function(name) {
        console.log('正在解密文件 %s', name);
        const out = program.out;
        const key = program.key;
        const input = name;
        encrypt.decode(key,input,out);
    });

program.parse(process.argv);