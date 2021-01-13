const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,  // objectId is a type for ID's number and so
        firstName: {type: String,  required:true},
        lastName: {type: String, required:true},
        address: {type: String, required:true},
        mail: {type: String, required:false},   // i assume that mail is not mandatory
        phone: {type: String, required:true},
        volunteeringType: {type: String, required:true},
        availDates: {type: String, required:true},  // what type of data is it? string representing days of the week?
        coordinator: {type: String, required:true},
        branch: {type: String, required:true}
    }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);