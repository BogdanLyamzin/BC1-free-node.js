const {Schema, model} = require("mongoose");
const Joi = require("joi")

const {handleMongooseError} = require("../helpers")

const emailRegexp = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: [true, "Email must be exist"],
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    }
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const refreshSchema = Joi.object({
    refreshToken: Joi.string().required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    refreshSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}