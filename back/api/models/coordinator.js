const mongoose = require('mongoose');

const CoordinatorSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,  // objectId is a type for ID's number and so
        firstName: {type: String,  required:true},
        lastName: {type: String, required:true},
        address: {type: String, required:true},
        mail: {type: String, required:false},   // i assume that mail is not mandatory
        phone: {type: String, required:true},
        branch: {type: String, required:true}
    }
);

module.exports = mongoose.model('Coordinator', CoordinatorSchema); 
