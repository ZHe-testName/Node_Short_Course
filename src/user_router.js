//по хорошум делать декомпозийию машрутов в отдельном файле
//а не писать на прямую в роутере

const Router = require('../framework/Router');
const controller = require('../src/user_controller');

const router = new Router();

router.get('/users', controller.getUsers);

//для поверки на ошибку по одинаковым путям
// router.get('./users', (req, res) => {
//     res.end(JSON.stringify(users));
// });

router.post('/users', controller.addUser);

module.exports = router;