const nodemailer = require("nodemailer");
const passApp = "qzuwbrswdbdgeyaq";
const sender = "shaheenabdelrahman28@gmail.com";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender,
    pass: passApp,
  },
});
const sendWelcomeEmail = (name, email) => {
  transporter.sendMail({
    to: email,
    from: sender,
    subject: "Thanks for joining in",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};
const sendCancelationEmail = (email, name) => {
  transporter.sendMail({
    to: email,
    from: sender,
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};
module.exports = { sendWelcomeEmail, sendCancelationEmail };
