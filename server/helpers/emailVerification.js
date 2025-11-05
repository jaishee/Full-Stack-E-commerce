const nodemailer = require("nodemailer");

const emailVerification=async(email,otp)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: "jahidaalam6@gmail.com",
            pass: "bdsyieqvbtewlfqd",
        },
    });

    const info = await transporter.sendMail({
        from: '"E-commerce" <jahidaalam6@gmail.com>',
        to: email,
        subject: "E-commerce",
        text: "Hello world?", // plain‑text body
        html: `<div style="background:#dbf3f0;width:500px;padding:80px 50px;border-radius:15px;
        text-align:center"><h1>E-commerce</h1><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Cupiditate, officia quas?</p><a href=""style="background:#5d10a5;color:#fff;padding:12px 8px;
        border-radius:5px;border:none;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;
        margin:10px 0">${otp}</a><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat iusto 
        explicabo provident pariatur sint vel eius, molestias sed maxime ex fuga, magnam error. Veritatis 
        mollitia enim nostrum asperiores? Quisquam, sequi. Provident consequatur omnis ducimus enim pariatur 
        cum. Dolor distinctio tempora commodi, omnis, ab ipsam doloribus corporis voluptates expedita deleniti 
        voluptatum?</p><a href=""><img alt=""src=https://i.ibb.co.com/7ttx4cf0/Google.png style=width:20px></a></div>`, // HTML body
    });
}

module.exports = emailVerification