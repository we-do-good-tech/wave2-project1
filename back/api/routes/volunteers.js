const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Volunteer = require('../models/volunteer');

router.get('/', (req, res, next) => {           // here we dont use /products because we are already here! otherwise it will be /products/products
    Volunteer.find().select("_id firstName lastName address mail phone volunteeringType availDates coordinator branch").exec().then(docs => 
        {
        const response = {
            count: docs.length,
            volunteers: docs
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {

    const volunteer = new Volunteer({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        mail: req.body.mail,
        phone: req.body.phone,
        volunteeringType: req.body.volunteeringType,
        availDates: req.body.availDates,
        coordinator: req.body.coordinator,
        branch: req.body.branch
    });
    volunteer.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'a new volunteer was created!',
            volunteer: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:volunteerId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.volunteerId;
    Volunteer.findById(id).exec().then(doc => {
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

router.patch('/:volunteerId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.volunteerId;
    const updateOPS = {};                        // create a json object that will contain all attributes that are needed to be updated
    for (const ops of req.body) {                // iterate over all body array
        updateOPS[ops.propName] = ops.value;
    }
    Volunteer.updateOne({ _id: id }, { $set: updateOPS }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:volunteerId', (req, res, next) => {     // using "/:productId" represents passing a variable
    const id = req.params.volunteerId;
    Volunteer.remove({ _id: id }).exec().then(result => {
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