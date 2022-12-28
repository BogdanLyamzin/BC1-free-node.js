const {Schema, model} = require("mongoose");
const Joi = require("joi")

const {handleMongooseError} = require("../helpers")

const genres = ["fantastic", "love"];
const isbnRegexp = /^\d{3}-\d{3}-\d-\d{5}-\d$/;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        enum: genres,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
    // 123-456-7-89012-3
    // isbn: {
    //     type: String,
    //     match: isbnRegexp,
    //     unique: true,
    //     required: true,
    // }
}, {versionKey: false, timestamps: true})

bookSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genres).required(),
    // isbn: Joi.string().pattern(isbnRegexp).required(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Book = model("book", bookSchema);

module.exports = {
    Book,
    schemas,
};