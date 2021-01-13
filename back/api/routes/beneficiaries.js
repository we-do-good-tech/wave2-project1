const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Beneficiary = require('../models/beneficiary');

router.get('/', (req, res, next) => {           // here we dont use /products because we are already here! otherwise it will be /products/products
    Beneficiary.find().select("_id firstName lastName ID address mail phone coordinator branch").exec().then(docs => 
        {
        const response = {
            count: docs.length,
            beneficiaries: docs
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {

    const beneficiary = new Beneficiary({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        ID: req.body.ID,
        address: req.body.address,
        mail: req.body.mail,
        phone: req.body.phone,
        coordinator: req.body.coordinator,
        branch: req.body.branch
    });
    beneficiary.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'a new beneficiary was created!',
            beneficiary: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:beneficiaryId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.beneficiaryId;
    Beneficiary.findById(id).exec().then(doc => {
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

router.patch('/:beneficiaryId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.beneficiaryId;
    const updateOPS = {};                        // create a json object that will contain all attributes that are needed to be updated
    for (const ops of req.body) {                // iterate over all body array
        updateOPS[ops.propName] = ops.value;
    }
    Beneficiary.updateOne({ _id: id }, { $set: updateOPS }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:beneficiaryId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.beneficiaryId;
    Beneficiary.remove({ _id: id }).exec().then(result => {
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