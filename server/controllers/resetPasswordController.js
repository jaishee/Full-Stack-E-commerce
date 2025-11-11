const Userlist = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resetPasswordController = async (req, res) => {
  let { token, newpassword } = req.body; //Token received from frontend

  try {
    // Decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
    let email = decoded.email;

    let existingUser = await Userlist.findOne({ email });

    if (!existingUser) {
      return res.send({ error: "Credential Invalid" });
    }

    bcrypt.hash(newpassword, 10, async function (err, hash) {
      await Userlist.findOneAndUpdate({ email }, { password: hash });
      res.send({ success: "Reset Password" });
    });

  } catch (error) {
    res.send({ error: "Invalid or expired token!" });
  }
};

module.exports = resetPasswordController;
