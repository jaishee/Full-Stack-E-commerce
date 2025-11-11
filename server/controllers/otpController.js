const Userlist = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const otpController =async(req,res)=>{
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
        const { email, otp } = decoded;

        const user = await Userlist.findOne({ email });
        if (!user) return res.send("User not found");
        if (user.isEmailVerified) return res.send("Email already verified");
        if (user.otp !== otp) return res.send("Invalid OTP");

        user.isEmailVerified = true;
        user.otp = "";
        await user.save();

        res.send("Email verified successfully!");
    } catch (err) {
        res.send("Token expired or invalid!");
    }
}

module.exports = otpController