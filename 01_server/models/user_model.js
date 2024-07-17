const mongoose = require('mongoose') ;
const bcrypt = require('bcryptjs') ;   // Two functions --> Hash & Compare
const jwt = require('jsonwebtoken') ;


const userSchema = new mongoose.Schema({  
    username: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: { 
        type: Boolean,
        default: true,
    }
});


// Secure the password with 'bcrypt'
// 'pre' is a Middleware
userSchema.pre('save', async function(next){
                      
    const user = this ;

    if(!user.isModified('password')) {
        next() ;
    }

    try{
        const saltRound = await bcrypt.genSalt(10) ;
        const hash_password = await bcrypt.hash(user.password, saltRound) ;
        user.password = hash_password ;
    }
    catch(error){
        next(error) ;
    }
});



// What is JWT?
// --> JSON Web Tokens is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
// JWTs are often used for authentication and authorization in web applications.
// Authentication --> Verifying the identity of a user or client.
// Authorization --> Determining what actions a user or client is allowed to perform.

// Tokens, such as JWTs(JSON Web Tokens), are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side(in cookies or local storage) for later use.     


// JSON Web Token // Have some doubt
userSchema.methods.generateToken = async function(){  // Have Doubt
    try{
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            }, 
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:'30d'
            }
        ) ;
    }
    catch(error){
        console.error(error) ;
    }
}; 


// Compare the password

userSchema.methods.comparePassword = async function(password){
    const user = this ;
    return await bcrypt.compare(password, user.password) ;
}


const User = new mongoose.model('users', userSchema) ; // Collection name, Schema name
module.exports = User ;