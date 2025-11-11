const Userlist = require("../models/userSchema");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const emailVerification = require("../helpers/emailVerification");
const emailRegex = require("../helpers/emailRegex");
const passwordRegexLowerCase = require("../helpers/passwordRegexLowerCase");
const passwordRegexUpperCase = require("../helpers/passwordRegexUpperCase");
const passwordRegexDigit = require("../helpers/passwordRegexDigit");
const passwordRegexSpecialChar = require("../helpers/passwordRegexSpecialChar");
const passwordRegexLength = require("../helpers/passwordRegexLength");

const registrationController = async (req, res) => {
  let { username, email, password } = req.body;

  // Validations
  if (!username) return res.send({ error: "Enter your username." });
  if (!email) return res.send({ error: "Enter your email." });
  if (!emailRegex(email)) return res.send({ error: "Please enter a valid email!" });
  if (!password) return res.send({ error: "Enter your password." });
  if (!passwordRegexLowerCase(password)) return res.send({ error: "Ensures at least one lowercase letter." });
  if (!passwordRegexUpperCase(password)) return res.send({ error: "Ensures at least one uppercase letter." });
  if (!passwordRegexDigit(password)) return res.send({ error: "Ensures at least one digit." });
  if (!passwordRegexSpecialChar(password)) return res.send({ error: "Ensures at least one special character." });
  if (!passwordRegexLength(password)) return res.send({ error: "Ensures the password is at least 8 characters long." });

  // Duplicate check
  let existingUser = await Userlist.find({ email });
  if (existingUser.length > 0) return res.send({ error: "Email already exists!" });

  // Generate OTP
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

  // Hash password
  const hash = await bcrypt.hash(password, 10);

  // Save user
  let user = new Userlist({ username, email, password: hash, otp });
  await user.save();

  // Create JWT token for verification
  const token = jwt.sign(
    { email, otp },
    process.env.JWT_SECRET || "mysecretkey",
    { expiresIn: "10m" } // 10 minutes expiry
  );

  // Send verification email
  await emailVerification(email, token);

  res.send({ success: "Registration Done! Please check your email to verify." });
};

module.exports = registrationController;
