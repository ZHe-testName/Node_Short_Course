const Emitter = require('events');
//предназначена для отлова и обработки собитий в вNode js
//это класс для создания объектов собитий

const emitter = new Emitter();

//для навешивания собитий используется метод on();
//можно использоать привязку once() чтобы собитие можно было генерить тольео раз
//в против =ном случае его можно вызывать сколько углдно раз с помощю метода emit()
emitter.on('message', (first, second) => {
    console.log(first);
    console.log(second);
});

const MESSAGE = process.env.message || '';

//очень часто используемый прием
if (MESSAGE){
    //для генерации собитий
    emitter.emit('message', MESSAGE, 123);
}else{
    emitter.emit('message', 'You dont write message');
};

//удаление
// emitter.removeAllListeners();
// emitter.removeListener('name', [callback]);