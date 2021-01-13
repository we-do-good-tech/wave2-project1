const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const SysAdmin = require('../models/sysAdmin');

router.get('/', (req, res, next) => {           // here we dont use /products because we are already here! otherwise it will be /products/products
    SysAdmin.find().select("_id firstName lastName address mail phone").exec()
    .then(docs => 
        {
        const response = {
            count: docs.length,
            sysAdmin: docs.map(doc=> {
                return {
                    _id:doc._id,
                    firstName:doc.firstName,
                    lastName:doc.lastName,
                    address:doc.address,
                    mail:doc.mail,
                    phone:doc.phone,
                    request:{
                        type:'GET',
                        url: 'localhost:3000/sysAdmins/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {

    const sysAdmin = new SysAdmin({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        mail: req.body.mail,
        phone: req.body.phone
    });
    sysAdmin.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'a new sysAdmin was created!',
            createdSysAdmin: {
                _id:result._id,
                firstName:result.firstName,
                lastName:result.lastName,
                address:result.address,
                mail:result.mail,
                phone:result.phone,
                request:{
                    type:'GET',
                    url: 'localhost:3000/sysAdmins/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:sysAdminId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.sysAdminId;
    SysAdmin.findById(id).exec().then(doc => {
        console.log('from database', doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: "No valid entry found for provided id" });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch('/:sysAdminId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.sysAdminId;
    const updateOPS = {};                        // create a json object that will contain all attributes that are needed to be updated
    for (const ops of req.body) {                // iterate over all body array
        updateOPS[ops.propName] = ops.value;
    }
    SysAdmin.updateOne({ _id: id }, { $set: updateOPS }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:sysAdminId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.sysAdminId;
    SysAdmin.remove({ _id: id }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;