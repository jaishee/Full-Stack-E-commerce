const Userlist = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const forgetPasswordController = async (req, res) => {
  let { email } = req.body;

  let existingUser = await Userlist.findOne({ email: email })

  if (existingUser) {

    // Create JWT TOKEN instead of sending email directly
    const token = jwt.sign(
      { email: existingUser.email },           // payload
      process.env.JWT_SECRET || "mysecretkey", // Secret key
      { expiresIn: "10m" }                     // Token expiration (10 mins)
    );

    const resetLink = `http://localhost:5173/resetpassword/${token}`; // Token instead of email in URL

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
      subject: "Reset Password",
      html: `
      <div style="max-width:500px;margin:auto;padding:40px;background:#f5f7fa;border-radius:12px;
      text-align:center;font-family:Arial,sans-serif">
        <h2 style="color:#333;margin-bottom:10px">Reset Password</h2>
        <p style="color:#555;font-size:14px;line-height:20px">
          Click the button below to reset your password:
        </p>
        <a href="${resetLink}" style="display:inline-block;background:#003049;color:#ffffff;
        padding:12px 25px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">
          Reset Password
        </a>
        <p style="color:#888;font-size:12px;margin-top:25px">
          If you didn't request this, ignore the email.
        </p>
      </div>`
    });

    return res.send({ success: "Check your email!" });
  }

  res.send({ error: "Credential Invalid!" });
};

module.exports = forgetPasswordController;
