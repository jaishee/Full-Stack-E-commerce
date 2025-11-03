const Userlist = require("../models/userSchema");

const loginController=async (req, res)=>{

    let alluser = await Userlist.find()
    res.send(alluser)
}

module.exports = loginController