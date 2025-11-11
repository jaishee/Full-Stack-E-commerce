const Userlist = require("../models/userSchema");
const nodemailer = require("nodemailer");

const forgetPasswordController = async(req,res)=>{
    // Get email from database
    let {email} = req.body

    let existingUser = await Userlist.findOne({email:email})
    if(existingUser){
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
            html:`<div style=max-width:500px;margin:auto;padding:40px;background:#f5f7fa;border-radius:12px;
            text-align:center;font-family:Arial,sans-serif><h2 style=color:#333;margin-bottom:10px>Email Verification</h2>
            <p style=color:#555;font-size:14px;line-height:20px>Please click the button below to verify your email.</p>
            <a href=http://localhost:5173/resetpassword/${email} style="display:inline-block;background:#003049;color:#FCFFFD;
            padding:12px 25px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">Reset Password</a>
            <p style=color:#888;font-size:12px;margin-top:25px>If you didn't request this email, you can ignore it.</div>`
          });
          res.send({success:"Check your email!"})
    }else{
        req.send({error:"Credential Invalid"})
    }
}

module.exports = forgetPasswordController