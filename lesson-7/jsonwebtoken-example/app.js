const jwt = require("jsonwebtoken")
require("dotenv").config()

const {SECRET_KEY} = process.env;

const payload = {
    id: "63a046109d144fb085b1fefc"
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTA0NjEwOWQxNDRmYjA4NWIxZmVmYyIsImlhdCI6MTY3MTQ0ODkwMCwiZXhwIjoxNjcxNTMxNzAwfQ.NSNBGmkpZnLw0h8zWjQRwy5L63W4bodfJs3AxtXfNSW"
    const result = jwt.verify(token, SECRET_KEY);
    // console.log(result);
    jwt.verify(invalidToken, SECRET_KEY)
}
catch(error) {
    console.log(error.message);
}