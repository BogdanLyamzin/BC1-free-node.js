const express = require("express");

const ctrl = require("../../controllers/auth")

const {validateBody, authenticate, ppassport, passport} = require("../../middlewares")

const {schemas} = require("../../models/user")

const router = express.Router();

router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}))

router.get("/google/callback", passport.authenticate("google", {session: false}), ctrl.googleAuth)

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/refresh", validateBody(schemas.refreshSchema), ctrl.refresh);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout)

module.exports = router;