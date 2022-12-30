const express = require("express")

const ctrl = require("../../controllers/books")

const {validateBody, authenticate} = require("../../middlewares")

const {schemas} = require("../../models/book")

const router = express.Router();

router.get("/", authenticate, ctrl.getAll)

router.get("/:id", authenticate, ctrl.getById)

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add)

router.put("/:id", authenticate, validateBody(schemas.addSchema), ctrl.updateById)

router.patch("/:id/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

router.delete("/:id", authenticate, ctrl.deleteById)

module.exports = router;