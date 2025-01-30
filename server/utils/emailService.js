const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider
  auth: {
    user: process.env.SMTP_USER, // Set in .env
    pass: process.env.SMTP_PASSWORD, // Set in .env
  },
});

// ✅ Send Email Function
exports.sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};
