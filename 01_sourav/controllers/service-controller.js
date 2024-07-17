const Service = require('../models/service_model') ;

const services = async(req, res) => {
    try {
        const response = await Service.find() ;
        console.log("I am from Service-controller.js")

        if(response.length > 0) {  // Don't check for 'response.ok' here, because we uses 'array of objects'
            return res.status(200).json({message: response}) ;
        }
        else {
            return res.status(404).json({ message: "No service found"}) ;
        } 
    }
    catch(error){
        console.log(`Error in Service controller: ${error}`);
    }
}

module.exports = services