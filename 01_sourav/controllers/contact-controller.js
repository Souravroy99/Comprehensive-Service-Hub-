const Contact = require('../models/contact_model')

const contactForm = async(req,res)=>{
    try{ 
        const {username, email, message} = req.body ;
        await Contact.create({username, email, message}) ;
        return res.status(200).json({message: "Message send successfully"}) ;
    }
    catch(err){
        const status = 422 ;
        const message = 'Message is not delivered' ;
        const extraDetails = err.errors[0].message ;
        

        const error = {
            status,
            message,
            extraDetails
        }
        next(error) ;
    }
}

module.exports = contactForm ;