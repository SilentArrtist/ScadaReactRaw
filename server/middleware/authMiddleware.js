const jwt = require('jsonwebtoken')
const KEY = "bnfuhteiwdjvo42jio5efnke"
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};
