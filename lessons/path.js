const path = require('path');
//модуль для уудобной работы с абсолютными и относительными путями

//метод для склеивания составляющих частей путей в независимости от операционной системы
console.log(path.join('first', 'second', 'third'));

//в Node js есть две глобальные переменные
//__dirname - содержит абсолютный путь к папке
//__filename - содержит абсолютный путь к файлу

//позволяет получить абсолютный путь
const fullPath = path.resolve('first');

//парсит путь в объект в полях которого путь разбит на осмвсленные части
console.log(path.parse(fullPath));

//возвращает имя файла
console.log(path.basename(fullPath));

//возвращает расширение
console.log(path.extname(fullPath));


////////////////////////////URL///////


const siteUrl = 'http://localhost:8000/users?id=123';

//для папрсинга URL строки запроса при работе сервера
//можно использовать этот метод
const url = new URL(siteUrl);

//мы получим большой объект описывающий строку
// {
//     href: 'http://localhost:8000/users?id=123',
//     origin: 'http://localhost:8000',
//     protocol: 'http:',
//     username: '',
//     password: '',
//     host: 'localhost:8000',
//     hostname: 'localhost',
//     port: '8000',
//     pathname: '/users',
//     search: '?id=123',
//     searchParams: URLSearchParams { 'id' => '123' },
//     hash: ''
//   }

console.log(url);