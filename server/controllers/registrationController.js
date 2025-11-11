const emailRegex = require("../helpers/emailRegex")
const passwordRegexLowerCase = require("../helpers/passwordRegexLowerCase")
const passwordRegexUpperCase = require("../helpers/passwordRegexUpperCase")
const passwordRegexDigit = require("../helpers/passwordRegexDigit")
const passwordRegexSpecialChar = require("../helpers/passwordRegexSpecialChar")
const passwordRegexLength = require("../helpers/passwordRegexLength")
const Userlist = require("../models/userSchema")
const bcrypt = require('bcrypt')
const emailVerification = require("../helpers/emailVerification")
const otpGenerator = require('otp-generator')

const registrationController =async(req, res)=>{
    let {username, email, password} = req.body
    
    if(!username){
        res.send({error:"Enter your username."})
    }else if(!email){
        res.send({error:"Enter your email."})
    }else if(!emailRegex(email)){
        res.send({error:"Please enter a valid email!"})
    }
    else if(!password){
        res.send({error:"Enter you password."})
    }else if(!passwordRegexLowerCase(password)){
        res.send({error:"Ensures at least one lowercase letter."})  
    }else if(!passwordRegexUpperCase(password)){
        res.send({error:"Ensures at least one uppercase letter."})  
    }else if(!passwordRegexDigit(password)){
        res.send({error:"Ensures at least one digit."})  
    }else if(!passwordRegexSpecialChar(password)){
        res.send({error:"Ensures at least one special character."})  
    }else if(!passwordRegexLength(password)){
        res.send({error:"Ensures the password is at least 8 characters long."})  
    }
    else{
        //Finding Duplicate Email
        let existingUser = await Userlist.find({email:email})

        if(existingUser.length>0){
            res.send({error:"Email already exist!"})
        }else{

            //OTP Generation
            let otp = otpGenerator.generate(6, { 
                upperCase: false, 
                specialChars: false,
                alphabets: false,
            });

            //Coverting password to hash
            bcrypt.hash(password, 10, function(err, hash) {

            //Add Data to Database       
                let data = new Userlist({
                    username:username,
                    email:email,
                    password:hash,
                    otp:otp
                })
                data.save()
                res.send({success:"Registration Done!"})
                emailVerification(email,otp)
            });
        }
    }
}

module.exports = registrationController