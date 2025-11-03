const secureAPI=(req,res,next)=>{

    if(req.headers.authorization==process.env.AUTH_KEY){
        next()
    }else{
        res.send({error:"Authorization Failed"});
        }
}

module.exports = secureAPI