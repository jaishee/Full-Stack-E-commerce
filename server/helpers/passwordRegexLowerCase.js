const passwordRegexLowerCase=(password)=>{
    if(/^(?=.*[a-z])/.test(password)){
        return true
    }
}

module.exports = passwordRegexLowerCase