const {Product} = require("../../models/product");

const getAll = async(req, res, next)=> {
    try {
        const {page = 1, limit = 20} = req.query;
        const skip = (page - 1) * limit;
        const result = await Product.find(
            {}, 
            "-createdAt -updatedAt", {skip, limit: +limit}).populate("owner", "email")
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getAll;