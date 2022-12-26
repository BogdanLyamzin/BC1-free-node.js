const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const {User} = require("../models/user");
/*
Проверка токена на валидность:
1. Извлечь из заголовка authorization содержимое.
2. Разделить полученную строку на 2 слова.
3. Если первое слово не равно "Bearer" - вернуть ответ с 401.
4. Если первое слово равно "Bearer", проверить второе слово (токен)
на валидность с помощью метод jwt.verify и SECRET_KEY.
5. Если токен не прошел проверку на валидность, вернуть 401 ответ.

Определение пользователя, которому принадлежит токен:
1. Ищем в базе пользователя с id, который был закодирован в токен.
2. Если пользователя с таким id в базе нет, возвращает 401 ответ.
3. Если есть - прикрепляем к объекту req пользователя и передаем обработку дальше:
req.user = user
*/

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next)=> {
    try {
        const {authorization = ""} = req.headers;
        const [bearer, token] = authorization.split(" ");
        if(bearer !== "Bearer"){
            throw new createError(401, "Not authorized");
        }
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token) {
            throw new createError(401, "Not authorized");
        }
        req.user = user;
        next()
    } catch (error) {
        if(!error.status) {
            error.status = 401;
            error.message = "Not authorized"
        }
        next(error);
    }
};

module.exports = authenticate;