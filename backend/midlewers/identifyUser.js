

var jwt = require('jsonwebtoken');
const JWT_TOKEN = "ARTCHAT-byRP";

const identifyUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({ error: "authanticate with valid user token" })
    }
    try {

        const data = jwt.verify(token , JWT_TOKEN);
        req.user = data.user;
        // console.log(data.user.id);
        next();
        
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });
    }
}

module.exports = {
    identifyUser,
}