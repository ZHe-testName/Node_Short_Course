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