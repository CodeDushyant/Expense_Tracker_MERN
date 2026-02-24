const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  console.log("Attempting to send email to:", to);
  
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Port 465 ke liye true
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Yahan 16-digit App Password hona chahiye
      },
      tls: {
        // Ye line deployment errors ko avoid karne mein help karti hai
        rejectUnauthorized: false
      }
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
