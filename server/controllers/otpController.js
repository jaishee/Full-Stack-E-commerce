const Userlist = require("../models/userSchema")

const otpController =async(req,res)=>{
    let {email, otp} = req.body
    let existingUser = await Userlist.findOne({
        email:email
    })

    if(existingUser){
        if(existingUser.otp==otp){
            await Userlist.findOneAndUpdate({email:email},{otp:""})
        }else{
            console.log("Doesn't matched")
        }
    }else{
        console.log("Credential Account")
    }
}

module.exports = otpController