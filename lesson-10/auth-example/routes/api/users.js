const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const createError = require("http-errors");
const Joi = require("joi");

const { User, schemas } = require("../../models/user");
const { authenticate, upload } = require("../../middlewares")
const {sendMail} = require("../../helpers");

const router = express.Router();

router.get("/verify/:verificationToken", async(req, res, next)=> {
    try {
        const {verificationToken} = req.params;
        const user = await User.findOne({verificationToken});
        if(!user){
            throw createError(404);
        }
        await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});
        res.json({
            message: 'Verification successful'
        })
    } catch (error) {
        next(error);
    }
})

router.post("/verify", async(req, res, next)=> {
    try {
        const {error} = schemas.verify.validate(req.body);
        if(error){
            throw createError(400, "missing required field email")
        };
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user.verify){
            throw createError(400, "Verification has already been passed")
        }
        const mail = {
            to: email,
            subject: "Подтвеждение email",
            html: `<a target="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Нажмите чтобы подтвердить свой email</a>`
        }
        sendMail(mail);
        res.json({
            "message": "Verification email sent"
        })
    } catch (error) {
        next(error);
    }
})

router.get("/current", authenticate, async (req, res, next) => {
    res.json({
        email: req.user.email
    })
});

router.get("/logout", authenticate, async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send()
})
// upload.array("images", 12)
/* 
upload.fields([
    {
        name: "photo",
        maxCount: 1
    },
    {
        name: "cards",
        maxCount: 12
    }
])
*/

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch("/avatars", authenticate, upload.single("avatar"), async(req, res, next)=> {
    const {_id} = req.user;
    const {path: tempUpload, filename} = req.file;
    try {
        // 2085-1.png => 620400138f092023fc6294d2.png
        // avatar.my.png => ["avatar", "my", "png"] => ["png", "my", "avatar"]
        const [extention] = filename.split(".").reverse();
        const newFileName = `${_id}.${extention}`;
        const resultUpload = path.join(avatarsDir, newFileName);
        await fs.rename(tempUpload, resultUpload);
        // "/avatars/620400138f092023fc6294d2.png"
        const avatarURL = path.join("avatars", newFileName);
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({
            avatarURL
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;