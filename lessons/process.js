const dotenv = require('dotenv');

// для конфигурации переменных окружения
dotenv.config();
//process - объект в котором хранится иеформация о запущеном процессе

console.log(process.pid);

//Для проверки в диспетчере задач
// while(true){

// };

//еще важные переменные это переменные окружения
//process.env

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);

//process имеет также массив с аргументами process.argv
//в нем сохраняются процессы при вызове в командной строке
console.log(process.argv);