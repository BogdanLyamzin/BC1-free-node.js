const passport = require("passport");
const {Strategy} = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const {nanoid} = require("nanoid");

const {User} = require("../models/user")

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL} = process.env;

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/api/auth/google/callback`,
    passReqToCallback: true,
}

const googleCallback = async(req, accessToken, refreshToken, profile, done) => {
    try {
        const {email, displayName} = profile;
        const user = await User.findOne({email});
        if(user) {
            return done(null, user); // req.user = user;
        }
        const password = await bcrypt.hash(nanoid(), 10);
        const newUser = await User.create({email, password, name: displayName});
        done(null, newUser);
    }
    catch(error) {
        done(error, false);
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;