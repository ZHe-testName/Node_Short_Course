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

const http = require('http');
const EventEmitter = require('events');

//для инициализации переменных в файле .env
require('dotenv').config();

const PORT = process.env.PORT || '3000';
const emitter = new EventEmitter();

class Router {
    constructor(){
        this.endpoints = {};
    }

    request(method = 'GET', path, handler){
        if(!this.endpoints[path]){
            this.endpoints[path] = {};
        };

        const endpoint = this.endpoints[path];

        if(endpoint[method]){
            throw new Error(`[${method}] with adress ${path} already exist`)
        };

        endpoint[method] = handler;

        emitter.on(`[${path}]: [${method}]`, (req, res) => {
            handler(req, res);
        });
    }

    //для абстракции чтобы не передавать посоянно строку метода
    get(path, handler){
        this.request('GET', path, handler);
    }

    put(path, handler){
        this.request('PUT', path, handler);
    }

    post(path, handler){
        this.request('POST', path, handler);
    }

    delete(path, handler){
        this.request('DELETE', path, handler);
    }
};

const router = new Router();

//Свой фреймворк для работы с сервером\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.get('/users', (req, res) => {
    res.end('YOU SEND MESSAGE TO /USERS');
});

router.get('/posts', (req, res) => {
    res.end('YOU SEND MESSAGE TO /POSTS');
});

const server = http.createServer((req, res) => {
    //для того чтобы браузер прочитал кирилицу нужно указать объект с заголовками настроек
    // res.writeHead(200, {
    //     'Content-type': 'text/html; charset="utf8"'
    // });
    //метод отправки данных пользователю для закрития стрима
    //можно использовать для серверсайд рендеринга
    // res.end('<h1>Hello from server!!!<button>Click Me</button></h1>');

    //req.url
    //содержит в себе состояние сторки запроса после слеша

    //для работы с JSON
    // res.writeHead(200, {
    //     'Content-type': 'application/json'
    // });

    // if (req.url === '/users'){
    //     return res.end(JSON.stringify([
    //         {id: 1, name: 'Eugene'}
    //     ]));
    // };

    // if (req.url === '/posts'){
    //     return res.end(JSON.stringify([
    //         {id: 1, postText: 'My first post'}
    //     ]));
    // };

    //генеррируем собитие для отработки запросов прои создании сервера
    //emit возвращает булево значение для того чтобы понимать существующий ли 
    //запрос мы передали в собитие
    const emitterBoolean = emitter.emit(`[${req.url}]: [${req.method}]`, req, res);

    //для отлова не существующих запросов воспользуемся значением которое возвращет emit
    //и просто прерываем соединение для того чтобы сервер не зависал
    if (!emitterBoolean){
        res.end();
    };
});

//функция для прослушиввания входящих соединений
server.listen(PORT, () => console.log(`Server started on PORT=${PORT}`));