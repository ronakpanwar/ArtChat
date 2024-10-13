

var jwt = require('jsonwebtoken');


const identifyUser =async (req,res,next)=>{
    const token = await req.cookies.token;
    if(!token){
        res.status(401).send({ error: "authanticate with valid user token" })
    }
    try {

        const data = jwt.verify(token , process.env.JWT_TOKEN);
        req.id = data.userId;
        // console.log(data.user.id);
        next();
        
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });
    }
}

module.exports = {
    identifyUser,
}