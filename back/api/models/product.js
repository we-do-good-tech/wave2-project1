const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,  // objectId is a type for ID's number and so
        name: {type: String,  required:true},
        price: {type: Number, required:true}
    }
);

module.exports = mongoose.model('Product', productSchema);  // 'Product' is just the name of the Schema for internal uses