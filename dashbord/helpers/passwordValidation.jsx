// src/helpers/passwordValidation.js

export const passwordRegexLowerCase = /[a-z]/;
export const passwordRegexUpperCase = /[A-Z]/;
export const passwordRegexDigit = /\d/;
export const passwordRegexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
export const passwordRegexLength = /^.{8,}$/;

// Optional: function to validate password
export const validatePassword = (password) => {
  if (!passwordRegexLowerCase.test(password)) return "Must include at least one lowercase letter.";
  if (!passwordRegexUpperCase.test(password)) return "Must include at least one uppercase letter.";
  if (!passwordRegexDigit.test(password)) return "Must include at least one digit.";
  if (!passwordRegexSpecialChar.test(password)) return "Must include at least one special character.";
  if (!passwordRegexLength.test(password)) return "Password must be at least 8 characters long.";
  return null; // valid password
};
