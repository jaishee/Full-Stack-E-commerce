const Userlist = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const otpController = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
    const { email, otp } = decoded;

    const user = await Userlist.findOne({ email });
    if (!user) return res.send({ message: "User not found" });
    if (user.isEmailVerified) return res.send({ message: "Email already verified" });
    if (user.otp !== otp) return res.send({ message: "Invalid OTP" });

    user.isEmailVerified = true;
    user.otp = "";
    await user.save();

    res.send({ message: "Email verified successfully!" }); // ✅ send as object
  } catch (err) {
    res.send({ message: "Token expired or invalid!" }); // ✅ send as object
  }
};

module.exports = otpController