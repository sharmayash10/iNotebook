const jwt = require("jsonwebtoken");
require('dotenv').config(); //Load environment variables from .env file

const getUserId = (req,res, next) => {
    try {
        var authToken = req.header("auth-token");
        if(!authToken){
            return res.send({message: "Unauthorized Access"});
        }
        
        //Verify the authtoken and set userId in the request
        var dataJWT = jwt.verify(authToken, process.env.JWT_SECRET);
        req.userId = dataJWT.userId;
        next();
    } catch (error) {
        return res.send({message: "Unauthorized Access"});
    }
}

module.exports = getUserId;