//в Node js есть 4 типа стримов(не путать с потоками выполнения threads)

//СТримы дают возможность считывать и записывать файлы не целиком а по кусочку чтобы не тормозить
//загрузку
//особенно удобно когда файлы имеют большие размеры

//Readeble - чтение чего либо
//Writeble - запись чего либо
//Duplex - Readeble + Writeble в месте
//Transforrm - Такой же как и Duplex но может изменять данные по мере их чтения

const fs = require('fs');
const path = require('path');

//без стримов мы считываем файл целиком за раз и получаем данные в формате BUFER
// fs.readFile(path.resolve(__dirname, 'book.pdf'), (err, data) => {
//     if(err){
//         throw err;
//     }

//     console.log(data);
// })

//чтобы работать со стримами нужно подписываться на собития
//и создать стрим

const stream = fs.createReadStream(path.resolve(__dirname, 'book.pdf'));

stream.on('data', (chunk) => {//кусочек файла пазмером до 64кБ
    console.log(chunk);
});

//также есть порядок не важен, собиттия асинхронны
stream.on('end', () => console.log('End reading'));
stream.on('open', () => console.log('Start reading'));
stream.on('error', () => console.log('Impotant to catch errors'));

//стрим для записи файлов по кусочкам
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'text_2.txt'));

for (let i = 0; i <= 20; i++){
    writeStream.write(i + '\n');
};

//стримы для записи нужно совершать в ручную
writeStream.end();

//для работы http server нам доступны два объекта req res
//они тоже являются стримами

const http = require('http');

http.createServer((req, res) => {
    //req - readeble stream
    //res - writeble stream

    //для отправки данных пользователю допустим можно сделать так
    // const stream = fs.createReadStream(path.resolve(__dirname, 'text_2.txt'));
    // stream.on('data', chunk => res.write(chunk));
    // stream.on('end', () => res.end());
    //но так файл считается на много быстрее и мы прервем соеденение 
    //до полного скачивания

    //для таких случаев лутше использовать pipe

    //пока данные не выгружены метод позволяет не читать новую порцию
    stream.pipe(res);
});