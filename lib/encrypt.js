const fs = require('fs');
const crypto = require('crypto');

const encode = function (key, inputFile, outputFile) {

    if (!key) {
        throw new Error('加密key不能为空');
    }
    if (!inputFile) {
        throw new Error('加密文件不能为空');
    }

    if(!outputFile){
        outputFile = inputFile + '.code';
        console.log('未指定输出文件，默认文件名为：'+outputFile);
    }
    const cipher = crypto.createCipher('aes-256-cbc', key);
    // 加密
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);
    input.pipe(cipher).pipe(output);
    output.on('finish', function() {
      console.log('加密完成!');
    });
}

const decode = function (key, inputFile, outputFile) {
    if (!key) {
        throw new Error('加密key不能为空');
    }
    if (!inputFile) {
        throw new Error('解密文件不能为空');
    }

    if(!outputFile){
        outputFile = inputFile + '.dcode';
        console.log('未指定输出文件，默认文件名为：'+outputFile+',可直接去掉.dcode后缀即可');
    }
    const decipher = crypto.createDecipher('aes-256-cbc',key);
    // 解密
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);
    input.pipe(decipher).pipe(output);

    output.on('finish', function() {
      console.log('操作完成!');
    });
}

module.exports = {
    encode,
    decode
}

// encode(key, '/Users/coolcao/code/coolcao/encrypt/index.js');
// decode(key, '/Users/coolcao/code/coolcao/encrypt/index.js.code');


