const express = require("express");

const ctrl = require("../../controllers/auth")

const {validateBody, authenticate, upload} = require("../../middlewares")

const {schemas} = require("../../models/user")

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

router.get("/verify/:verificationCode", ctrl.verify)

router.post("/verify", validateBody(schemas.verifyEmailSchema), ctrl.resendVerifyEmail)

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout)

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;