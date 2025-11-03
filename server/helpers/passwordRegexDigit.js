const passwordRegexDigit=(password)=>{
    if(/(?=.*\d)/.test(password)){
        return true
    }
    
}

module.exports = passwordRegexDigit