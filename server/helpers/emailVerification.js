const nodemailer = require("nodemailer");

const emailVerification = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jahidaalam6@gmail.com",
      pass: "bdsyieqvbtewlfqd",
    },
  });

  await transporter.sendMail({
    from: '"E-commerce" <jahidaalam6@gmail.com>',
    to: email,
    subject: "Email Verification",
    html: `
      <div style="max-width:500px;margin:auto;padding:40px;background:#f5f7fa;border-radius:12px;text-align:center;font-family:Arial,sans-serif">
        <h2 style="color:#333;margin-bottom:10px">Email Verification</h2>
        <p style="color:#555;font-size:14px;line-height:20px">Please click the button below to verify your email.</p>
        <a href="http://localhost:5173/verify-email/${token}" 
           style="display:inline-block;background:#5d10a5;color:#fff;padding:12px 25px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">
           Verify Email
        </a>
        <p style="color:#888;font-size:12px;margin-top:25px">If you didn't request this email, you can ignore it.</p>
      </div>`
  });
};

module.exports = emailVerification;
