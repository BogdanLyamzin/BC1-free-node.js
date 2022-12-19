const express = require("express")

const ctrl = require("../../controllers/books")

const {validateBody} = require("../../middlewares")

const {schemas} = require("../../models/book")

const router = express.Router();

router.get("/", ctrl.getAll)

router.get("/:id", ctrl.getById)

router.post("/", validateBody(schemas.addSchema), ctrl.add)

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateById)

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

router.delete("/:id", ctrl.deleteById)

module.exports = router;