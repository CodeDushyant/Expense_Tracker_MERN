const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  console.log("Attempting to send email to:", to);
  
  try {
   const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  pool: true,
  secure: false, // 587 ke liye false zaroori hai
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Ye certificate errors ko bypass karega
    minVersion: "TLSv1.2"
  },
  connectionTimeout: 10000, // 10 seconds baad timeout (taaki request atki na rahe)
});

    // 1. Verify connection first
    await transporter.verify();
    console.log("Transporter is ready to take our messages");

    // 2. Send the mail
    const info = await transporter.sendMail({
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully! Message ID:", info.messageId);
    return info;
    
  } catch (error) {
    // Render Logs mein ye error message check karein
    console.error("FULL EMAIL ERROR:", error);
    throw error; 
  }
};

module.exports = sendEmail;
