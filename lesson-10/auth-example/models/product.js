const {Schema, model} = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^[0-9]{7}$/;

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    active: {
        type: Boolean,
        default: true
    },
    // status = ["basic", "stock", "in sale"]
    status: {
        type: String,
        default: "basic",
        enum: ["basic", "stock", "in sale"]
    },
    code: {
        type: String,
        required: true,
        match: codeRegexp,
        unique: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {versionKey: false, timestamps: true});

const joiAddProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0.01).required(),
    active: Joi.boolean(),
    status: Joi.string().valueOf("basic", "in sale", "stock"),
    code: Joi.string().pattern(codeRegexp)
})

const joiUpdateFavoriteSchema = Joi.object({
    active: Joi.boolean().required()
})

const Product = model("product", productSchema);
// categories => category
// mice => mouse

module.exports = {
    Product,
    schemas: {
        add: joiAddProductSchema,
        updateFavofite: joiUpdateFavoriteSchema
    }
};