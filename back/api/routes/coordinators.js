const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Coordinator = require('../models/coordinator');

router.get('/', (req, res, next) => {           // here we dont use /products because we are already here! otherwise it will be /products/products
    Coordinator.find().select("_id firstName lastName address mail phone branch").exec().then(docs => 
        {
        const response = {
            count: docs.length,
            coordinators: docs
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {

    const coordinator = new Coordinator({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        mail: req.body.mail,
        phone: req.body.phone,
        branch: req.body.branch
    });
    coordinator.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'a new coordinator was created!',
            coordinator: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:coordinatorId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.coordinatorId;
    Coordinator.findById(id).exec().then(doc => {
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

router.patch('/:coordinatorId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.coordinatorId;
    const updateOPS = {};                        // create a json object that will contain all attributes that are needed to be updated
    for (const ops of req.body) {                // iterate over all body array
        updateOPS[ops.propName] = ops.value;
    }
    Coordinator.updateOne({ _id: id }, { $set: updateOPS }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:coordinatorId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.coordinatorId;
    Coordinator.remove({ _id: id }).exec().then(result => {
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