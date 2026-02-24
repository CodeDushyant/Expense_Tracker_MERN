const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  console.log("To",to);
  try {
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //     host: process.env.SMTP_HOST,
    //           port: process.env.SMTP_PORT,
    //           secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });
    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
    await transporter.sendMail({
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("Email sent to:", to);
  } catch (error) {
    console.log("Email error:", error.message);
  }
};

module.exports = sendEmail;


