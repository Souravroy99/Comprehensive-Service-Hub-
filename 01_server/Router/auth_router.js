const express = require('express')
const router = express.Router() ;
const auth = require('../controllers/auth-controllers')     
const signupSchema = require('../validators/auth_contact_validators')
const validate = require('../middleware/validate_middleware')
const authMiddleware = require('../middleware/auth_middleware')


router.route('/home').get(auth.home) ;
router.route('/register').post(validate(signupSchema.registerSchema), auth.register) ;
router.route('/login').post(validate(signupSchema.loginSchema), auth.login) ;

router.route('/user').get(authMiddleware, auth.user) ; // To fetch current user data 

module.exports = router ; 



/* 
get --> Read data
post --> Insert data
put or patch --> Update data, or insert if a new id
delete --> Delete data 
*/