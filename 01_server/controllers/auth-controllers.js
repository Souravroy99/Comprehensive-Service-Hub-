const User = require('../models/user_model')


/*----------------------------------------------Home----------------------------------------------*/
const home = async(req,res)=>{
    try{
        console.log(req.body);
        res.status(200).send({message: 'Welcome to HOME Page'}) ;
    }
    catch(error) {
        console.log(error) ;
    }
};



/*--------------------------------------------Register--------------------------------------------*/
const register = async(req,res) => {
    try{    
        const {username, email, phone, password} = req.body ;
 
        // Get the reference of user according to Email.
        const userExists = await User.findOne({'email': email})

        // Checking that is the user already exists
        if(userExists) {
            return res.status(400).json({message: 'Email already exists'}) ;
        }

        // Create new user
        const createdUser = await User.create({username, email, phone, password}) ; 

        res.status(201).json({ 
            message: createdUser, 
            token: await createdUser.generateToken(), 
            userId: createdUser._id.toString(),
        }) ;

    }
    catch(error) {
        res.status(400).json(`Message: page not found!`) ;
    } 
};



/*---------------------------------------------Login---------------------------------------------*/
const login = async(req,res) => {
    try{
        const {email, password} = req.body;

        const userExists = await User.findOne({'email': email}) ;

        if(!userExists) {
            return res.status(401).json({message: "User does not exists"}) ;
        }
 
        const isValidPassowrd = await userExists.comparePassword(password) ;

        if(isValidPassowrd) {
            res.status(201).json({ 
                message: 'User Successfully LoggedIn', 
                token: await userExists.generateToken(), 
                userId: userExists._id.toString()}) ;
        }
        else {                               
            res.status(401).json({message: 'Invalid Credentials!'})
        }
    }
    catch(error) {   
        res.status(500).json(`Internal server error!`) ;
    }
}; 



/*--------------------------------User--------------------------------*/ // To send user data for JWT authentication
const user = async(req, res) => { 
    try {
        const userData = req.user ;

        // console.log("SOURAV ===> I AM IN USER CONTROLLER") ;
        // console.log(userData) ; 

        return res.status(200).json({ userData }) ;
    }
    catch(error) {
        console.log(`Error from user route: ${error}`) ;
    }
};

module.exports = {home, register, login, user} ;