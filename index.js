// const crypto = require('crypto');
//Libuv - это многопоточная библиотека которая предназначена для переработки 
//в машинный код того что выдает ядро Node 
//оно работает на движке v8 и обрабатывает JS код

//Это основа Node JS

//Libuv многопоточный и служит свазующей частю с операционными системами
//По умолчанию он работает с четырьмя потоками
//в этом можно убедится запуская функции в низу

// const start = Date.now();

// crypto.pbkdf2('123ttt', '5', 1000000, 64, 'sha512', () => {
//     console.log('1 start', Date.now() - start);
// });

// crypto.pbkdf2('123ttt', '5', 1000000, 64, 'sha512', () => {
//     console.log('2 start', Date.now() - start);
// });

// crypto.pbkdf2('123ttt', '5', 1000000, 64, 'sha512', () => {
//     console.log('3 start', Date.now() - start);
// });

// crypto.pbkdf2('123ttt', '5', 1000000, 64, 'sha512', () => {
//     console.log('4 start', Date.now() - start);
// });

// crypto.pbkdf2('123ttt', '5', 1000000, 64, 'sha512', () => {
//     console.log('6 start', Date.now() - start);
// });

const Application = require('./framework/Application');
const userRouter = require('./src/user_router');
const jsonParser = require('./framework/parse_json');

//для инициализации переменных в файле .env
require('dotenv').config();
const PORT = process.env.PORT || '3000';

const app = new Application();

//добавляем JSON парсер
app.use(jsonParser);

//добавляем роутер в наше приложение
app.addRouter(userRouter);

//функция для прослушиввания входящих соединений
app.listen(PORT, () => console.log(`Server started on PORT=${PORT}`));