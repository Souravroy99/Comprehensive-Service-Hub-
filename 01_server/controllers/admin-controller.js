const User = require('../models/user_model') ;
const Contact = require('../models/contact_model') ;


// 1. ************* All User Fetch Logic ************* //
const getAllUsers = async(req, res) => {
    try{
        const users = await User.find().select({password: 0}) ;

        if(!users || users.length === 0) {
            return res.status(404).json({message: "No users found"}) ;
        }

        return res.status(200).json(users) ;
    }
    catch(error) {
        next(error) ;
    }
}


// 2. ************ All Contact Fetch Logic ************ //
const getAllContactMessages = async(req, res) => {
    try{
        const contacts = await Contact.find() ;

        if(!contacts || contacts.length === 0) {
            return res.status(404).json({message: "No Messages found"}) ;
        }

        return res.status(200).json(contacts) ;
    }
    catch(error){
        next(error) ;
    }
}


// 3. ************ User Delete Logic ************ //
const deleteUserById = async(req, res) => {
    try {
        const id = req.params.ID ; // I get this 'ID' from URL
        const deletedUserToken = User.findOne({_id:id}, {token:1}) ;

        await User.deleteOne({_id: id}) ; 
        return res.status(200).json({token: deletedUserToken}) ;
    }
    catch(error){
        next(error) ;
    }
}


// 4. ************ Contact Message Delete Logic ************ //
const deleteContactByID = async(req, res) => {
    try {
        const id = req.params.id ; // I get this 'id' from URL
        await Contact.deleteOne({_id: id}) ; 
        return res.status(200).json({message:"Message successfully deleted"}) ;
    }
    catch(error){
        next(error) ;
    }
}

 
// 5. ************ Single User Fetch Logic ************ //
const getUserByID = async(req, res) => {
    try{
        const id = req.params.id ;
        const userData = await User.findOne({_id : id}).select({password:0}) ;
        return res.status(200).json(userData) ;
    }
    catch(error){
        next(error) ;
    }
}
 


// 6. *********** Single User Update Logic *********** //
const updateUserByID = async(req, res) => {
    try{
        const id = req.params.id ;
        const updateUserData = req.body ;

        const currUpdatedUser = await User.updateOne({_id: id}, {$set: updateUserData}) ;
        return res.status(200).json(currUpdatedUser) ;
    }
    catch(error){
        next(error) ;
    }
}



module.exports = { getAllUsers, getAllContactMessages, deleteUserById, deleteContactByID, getUserByID, updateUserByID} ;