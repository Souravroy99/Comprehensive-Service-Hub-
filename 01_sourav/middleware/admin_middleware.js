const adminMiddleware = async (req, res, next) => {
    try{
        const adminRole = req.user.isAdmin ;

        if(!adminRole) {
            return res.status(401).json({message: "Access denied! User is not an admin"}) ;
        }

        next() ;
    }
    catch(error){  
        const err = {
            status: 404,
            message: "Error in Admin-Middleware",
            extraDetails: error,
        } 
        next(err) ;   
    }
}

module.exports = adminMiddleware ;