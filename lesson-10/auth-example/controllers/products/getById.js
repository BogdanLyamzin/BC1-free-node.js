const createError = require("http-errors");

const {Product} = require("../../models/product")

const getById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await Product.findById(id);
        if(!result){
            throw new createError(404, "Not found");
        }
        res.json(result);
    } catch (error) {
        if(error.message.includes("Cast to ObjectId failed")){
            error.status = 404;
        }
        next(error)
    }
}

module.exports = getById;