//по хорошему функции для отработки ендпоинтов
//лутше выносить в отдельный файл
//так как когда они начнут разрастаться то 
//так гораздо удобнее читать

const users = [
    {id: 1, name: 'Katya'},
    {id: 2, name: 'Jeka'}
];

const getUsers = (req, res) => {
    //теперь будем возвращать на клиент ответ с юзером по id
    if (req.params.id){
        return res.send(users.find(user => user.id == req.params.id));
    };

    res.send(users);
};

const addUser = (req, res) => {
    //каждый запрос имеет тело
    //console.log(req.body);

    const user = req.body;
    users.push(user);
    res.send(users);
};

module.exports = {
    getUsers,
    addUser,
};