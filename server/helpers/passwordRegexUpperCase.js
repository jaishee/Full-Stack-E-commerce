const passwordRegexUpperCase=(password)=>{
    if(/(?=.*[A-Z])/.test(password)){
        return true
    }
    
}

module.exports = passwordRegexUpperCase