const jwt = require('jsonwebtoken')
const secret = "1234@Krish"

function setUser(user){

    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secret)
}

function getUser(token){
    try {
        
        return jwt.verify(token,secret);
    } catch (error) {
        if(!token)return null;
    }
}


module.exports = {
    setUser,getUser
}

