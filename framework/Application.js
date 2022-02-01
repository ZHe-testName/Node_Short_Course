//Тут мы инкапсулируем сервер и ивент емиттер
const http = require('http');
const EventEmitter = require('events');

module.exports = class Application{
    constructor(){
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    _createServer(){
        return http.createServer((req, res) => {
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
        
            //тело запроса может тбыть достаточно болшим
            //по тому мы будем использовать переменную
            let body = '';

            //перед работой с запросом его сначала нужно тпрочиттать
            //с помощю ридбл стрима
            req.on('data', chunk => {
                body += chunk;
            });

            //после чтения срабатывает собитие end
            req.on('end', () => {
                if (body){
                    req.body = JSON.parse(body);
                };

                this.middlewares.forEach(m => m(req, res));
                 
                //генеррируем собитие для отработки запросов прои создании сервера
                //emit возвращает булево значение для того чтобы понимать существующий ли 
                //запрос мы передали в собитие
                const emitterBoolean = this.emitter.emit(this._createMask(req.pathname, req.method), req, res);

                //для отлова не существующих запросов воспользуемся значением которое возвращет emit
                //и просто прерываем соединение для того чтобы сервер не зависал
                if (!emitterBoolean){
                    res.end();
                };
            });
        });
    }

    //создание маски запроса лутше вынести в отдельный приватный метод
    _createMask (url, method){
        return `[${url}]: [${method}]`
    }    

    use (middleware){
        this.middlewares.push(middleware);
    }

    //метод для запуска сервера
    //который просто делегирует реализацию в наш сервер
    listen (port, callback){
        this.server.listen(port, callback);
    }

    //общий вид объекта endpoint
    // endpoint = {
    //     '/users': {
    //         'GET': handler
    //     }
    // }

    //у приллжения может быть нескольео роутеров
    //по хорошему нужно создать метод для добавления роутера
    addRouter (router){
        //итерируемся по всем ключам путей
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];

            //в каждом пути по всем методам пробегаемся и навешиваем слушатель
            Object.keys(endpoint).forEach(method => {   
                this.emitter.on(this._createMask(path, method), (req, res) => {
                    const handler = endpoint[method];

                    handler(req, res);
                });
            })
        })
    }
};