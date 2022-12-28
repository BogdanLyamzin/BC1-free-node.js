const nodemailer = require("nodemailer")
require("dotenv").config()

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: "bogdan.lyamzin.d@meta.ua",
        pass: META_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig)

const email = {
    to: "sideco5895@irebah.com",
    from: "bogdan.lyamzin.d@meta.ua",
    subject: "Verify you mail",
    html: `<p><strong>Please</strong> Verify you email</p>`
}

transport.sendMail(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))