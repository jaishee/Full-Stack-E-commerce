const passwordRegexLength=(password)=>{
    if(/[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password)){
        return true
    }
}

module.exports = passwordRegexLength