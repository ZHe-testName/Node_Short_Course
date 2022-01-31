//по хорошум делать декомпозийию машрутов в отдельном файле
//а не писать на прямую в роутере

const Router = require('../framework/Router');

const router = new Router();

const users = [
    {id: 1, name: 'Katya'},
    {id: 2, name: 'Jeka'}
];

router.get('/users', (req, res) => {
    res.send(users);
});

//для поверки на ошибку по одинаковым путям
// router.get('./users', (req, res) => {
//     res.end(JSON.stringify(users));
// });

router.post('/users', (req, res) => {
    res.send(users);
});

module.exports = router;