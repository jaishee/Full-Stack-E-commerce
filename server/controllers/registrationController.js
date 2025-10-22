const registrationController =(req, res)=>{
    let {username, email, password} = req.body
    console.log(username)
    if(!username){
        res.send({error:"Enter you username: "})
    }else if(!email){
        res.send({error:"Enter you email: "})
    }else if(!password){
        res.send({error:"Enter you password: "})
    }else{
        res.send({success:"Registration Complete"})
    }
}

module.exports = registrationController