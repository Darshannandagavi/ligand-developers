import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true
  auth: {
    user: process.env.EMAIL,          // full gmail address
    pass: process.env.EMAIL_PASSWORD, // 16-char app password
  },
    });

    await transporter.verify();
    console.log("✔ Email server ready");

    const info = await transporter.sendMail({
      from: `"Admin" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✔ Email sent!", info.messageId);

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
  }
};
