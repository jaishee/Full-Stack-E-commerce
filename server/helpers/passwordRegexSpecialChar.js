const passwordRegexSpecialChar=(password)=>{
    if(/(?=.*[@.#$!%*?&])/.test(password)){
       return true 
    }
}

module.exports = passwordRegexSpecialChar