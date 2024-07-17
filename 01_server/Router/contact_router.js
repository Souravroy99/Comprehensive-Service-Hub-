const express = require('express') ;
const router = express.Router() ;
const signupSchema = require('../validators/auth_contact_validators')
const contactForm = require('../controllers/contact-controller') ;
const validate = require('../middleware/validate_middleware');

 
router.route('/contact').post(validate(signupSchema.contactSchema), contactForm) ;

module.exports = router ; 