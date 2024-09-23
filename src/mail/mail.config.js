const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyMailtransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.VERIFYMAILUSER,
    pass: process.env.VERIFYMAILPASSWORD,
  },
});

module.exports = verifyMailtransporter;
