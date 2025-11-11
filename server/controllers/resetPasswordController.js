const Userlist = require("../models/userSchema");
const bcrypt = require("bcrypt");

const resetPasswordController =async(req,res)=>{
    let {email,newpassword} = req.body
    let existingUser = await Userlist.findOne({email:email})

    bcrypt.hash(newpassword, 10, async function(err, hash) {
        if(existingUser){
            await Userlist.findOneAndUpdate({email:email},{password:hash})
            res.send({success:"Reset Password"})
        }else{
            res.send({error:"Credential Invalid"})
        }
    })
        
}

module.exports = resetPasswordController