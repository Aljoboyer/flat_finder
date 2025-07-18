require("dotenv").config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_EMAIL_APP_PASSWORD,
  },
});

async function sendEmail(to, subject, html) {
  try{
   
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);
    return true;

  } catch (e) {
    console.log("email send error ===>", e);
    return {...e, status: "error"};
  }
}

module.exports = {
  sendEmail,
};
