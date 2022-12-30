const validateBody = require("./validateBody")
const authenticate = require("./authenticate")
const passport = require("./google-authenticate")

module.exports = {
    validateBody,
    authenticate,
    passport,
}