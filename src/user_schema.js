//это файл нужен для того что бы создать
//модель юзера согласно еоторой мы будем
//получать юзеров с базы данных
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
});

//Для создания модели юззера для БД
module.exports = mongoose.model('User', userSchema);