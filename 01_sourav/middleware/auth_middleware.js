const jwt = require('jsonwebtoken')
const User = require("../models/user_model") 

// In middleware we should use (req, res, next)

const authMiddleware = async(req, res, next) => {
    const token = req.header("Authorization") ;  // use 'header' not 'headers'
 
    if(!token) {
        // If we use an expired token, we will receive a "401 unauthorized HTTP"

        return res.status(401).json({message: "Unauthorized HTTP, Token not provided or Invalid Token"}) ;
    }                                                                                

    // Authorized token 
    // Token format ==> Bearer <JWT-Token>
    // We need to remove the "Bearer " prefix

    const jwtToken = token.split(" ")[1] ;
    console.log(jwtToken) ;

    try{
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

        const userData = await User.findOne({email: isVerified.email}).select({password: 0}) ;  // Don't send password because of privacy

        console.log("Token: ", userData) ;


        // We can add custom properties to 'req' object(we can pass information between middleware functions or make it available in our route handler)
        req.user = userData ;
        req.token = token ; 
        req.userId = userData._id ;


        // Using next() in middleware is essential because it tells the Express.js application to move on to the next middleware or route handler in the stack. Middleware functions in Express are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. When a middleware function is done, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging, and the client will not receive a response.
        next();
        
    }
    catch(error) {
        return res.status(401).json({message: "The user does not have accessibility"}) ;
    }

}

module.exports = authMiddleware ;