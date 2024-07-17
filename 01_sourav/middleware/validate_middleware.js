// In middleware we should use (req, res, next), We should definitely use ==> 'next()'


const validate = (schema) => async(req, res, next) => { 
    console.log("SCHEMA : " , schema ) ;
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next() ;
    }
    catch(err) {
        
        const status = 422 ;
        const message = "Fill the form properly" ; 
        const extraDetails = err.errors[0].message ;

        console.log(`${extraDetails} \nTotal Errors => ${err.errors.length}`)
        
        const error = {
            status,
            message,
            extraDetails,
        }; 

        next(error);
    }
}

module.exports = validate ; 