const os = require('os');
//Объект для работы с операционной системой
const cluster = require('cluster');
//позволяет однопоточному приложению использовать все
//возможности многоядерных систем

//вид операционной системы
console.log(os.platform());

//объект архитектуры
console.log(os.arch());

//объект доступва к информации о ядрах
console.log(os.cpus());

//информация о ядрах может пригодится для вичисления количества потоков
//на каждой машине для оптимизации нагрузки потоками
const cpus = os.cpus();

if (cluster.isMaster){
    for (let i = 0; i < cpus.length - 2; i++){
        //запускает дочерний прцес на каждом из доступных ядер
        cluster.fork();
    
        console.log('Load process');
    };

    //подписка на собитие когда воркер умерает и мы выделяем еще поток 
    //для нового воркера
    cluster.on('exit', worker => {
        console.log(`Worker width pid=${worker.process.pid} is dead.`);

        cluster.fork();
    })
}else{
    console.log(`Worker width pid=${process.pid} is runing`);

    setInterval(() => {
        console.log(`Worker width pid=${process.pid} still running`);
    }, 7000);
};


