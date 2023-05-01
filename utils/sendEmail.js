const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

  var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  let info =  await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  return info.messageId;
};
module.exports = sendEmail;
