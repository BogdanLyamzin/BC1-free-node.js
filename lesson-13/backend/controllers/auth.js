const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {User} = require("../models/user")

const {HttpError, ctrlWrapper} = require("../helpers")

const {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL} = process.env;

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

const login = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid"); // throw HttpError(401, "Email invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid"); // throw HttpError(401, "Password invalid");
    }

    const payload = {
        id: user._id,
    }

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});
    await User.findByIdAndUpdate(user._id, {accessToken, refreshToken})
    
    res.json({
        accessToken,
        refreshToken,
    })
}

const googleAuth = async(req, res)=> {
    const {_id: id} = req.user;
    const payload = {
        id,
    }

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});
    await User.findByIdAndUpdate(id, {accessToken, refreshToken});

    res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`)
}

const refresh = async(req, res)=> {
    const {refreshToken: token} = req.body;
    try {
        const {id} = jwt.verify(token, REFRESH_SECRET_KEY);
        const isExist = await User.findOne({refreshToken: token});
        if(!isExist) {
            throw HttpError(403, "Token invalid");
        }

        const payload = {
            id,
        }
    
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});

        res.json({
            accessToken,
            refreshToken,
        })
    }
    catch(error) {
        throw HttpError(403, error.message);
    }
}

const getCurrent = (req, res) => {
    const {name, email} = req.user;

    res.json({
        name,
        email,
    })
}

const logout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {accessToken: "", refreshToken: ""});
    res.json({
        message: "Logout success"
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    googleAuth: ctrlWrapper(googleAuth),
    refresh: ctrlWrapper(refresh),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}