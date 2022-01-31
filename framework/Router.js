//Свой фреймворк для работы с сервером\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//роутер нужен для того чтобы не писать бесконечно иф элсы
//а имеит инкапсулированную маршрутизацию
module.exports = class Router {
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