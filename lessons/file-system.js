const fs = require('fs');
const path = require('path');

//в объекте fs есть все методы для работы с файлами
//они могут быть синхронными а асинхрнными

//синхронный вариан блокирует поток
//и весь код будет ждать выполнения операции
// fs.mkdirSync(path.resolve(__dirname, 'testdir', 'indir', 'deepdir'), {recursive: true}); //так можно создавать иерархию папок
//но вызвать ьтолько один раз по ясным причинам что папки с такими названиями уже будут существовать

//и асинхронные. не блокирующие поток
//изза собитийно ориентированой модели
//вторым аргументом передается колбек
console.log('START');

// fs.mkdir(path.resolve(__dirname, 'test'), (err) => {
//     if (err){
//         console.log(err);

//         return;
//     }

//     console.log('Done');
// });

console.log('END');

//удаление папки
// fs.rmdir(path.resolve(__dirname, 'test'), (err) => {
//     if (err){
//         console.log(err);

//         return;
//     }

//     console.log('Done');
// });

//создать файл
// fs.writeFile(path.resolve(__dirname, 'test.js'), '{writed: true}', (err) => {
//     if (err){
//         console.log(err);

//         return;
//     }

//     console.log('Done');
// });

//добавить чтото в конец файла
// fs.appendFile(path.resolve(__dirname, 'test.js'), '{append: true}', (err) => {
//     if (err){
//         console.log(err);

//         return;
//     }

//     console.log('Done');
// });

//НАБОР ФУНКЦИЙ ДЛЯ CRUD ОПЕРАЦИЙ

const myWriteFileAsync = async (path, data) => {
    return new Promise((res, rej) => {
        fs.appendFile(path, data, (err) => {
            if (err) return rej(err.message);
        
            res('Done');
        });
    });
};

const myAppendFileAsync = async (path, data) => {
    return new Promise((res, rej) => {
        fs.appendFile(path, data, (err) => {
            if (err) return rej(err.message);
        
            res('Done');
        });
    });
};

const myReadFileAsync = async (path) => {
    return new Promise((res, rej) => {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            if (err) return rej(err.message);
        
            res(data);
        });
    });
};

const myRemoveFileAsync = async (path) => {
    return new Promise((res, rej) => {
        fs.rm(path, (err) => {
            if (err) return rej(err.message);
        
            res('Removed');
        });
    });
};

const text = process.env.TEXT || '';

myWriteFileAsync(path.resolve(__dirname, 'test.txt'), text)
    .then(() => myAppendFileAsync(path.resolve(__dirname, 'test.txt'), ' second data '))
    .then(() => myAppendFileAsync(path.resolve(__dirname, 'test.txt'), ' thrid data '))
    .then(() => myAppendFileAsync(path.resolve(__dirname, 'test.txt'), ' fourth data '))
    .then(() => myReadFileAsync(path.resolve(__dirname, 'test.txt')))
    .then(data => data.split(' ').length)
    .then(l => myWriteFileAsync(path.resolve(__dirname, 'count.txt'), `Words count: ${l}`))
    .then(() => myRemoveFileAsync(path.resolve(__dirname, 'test.txt')))
    .catch(err => console.log(err));
