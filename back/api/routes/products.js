const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/',(req,res,next)=>{           // here we dont use /products because we are already here! otherwise it will be /products/products
    Product.find().select("name price _id").exec().then(docs=>{
        const response ={
            count: docs.length,
            products:docs
        };
        res.status(200).json(response);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});   

router.post('/',(req,res,next)=>{    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result=> {
        console.log(result);
        res.status(201).json({
            message:'product was created!',
            product: result
        }); 
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});   

router.get('/:productId',(req,res,next)=>{     // using "/:productId" represents passing a variable
    const id = req.params.productId;
    Product.findById(id).exec().then(doc=>{
        console.log('from database', doc);
        if (doc){
            res.status(200).json(doc);    
        }else{
            res.status(404).json({message: "No valid entry found for provided id"});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
   
});

router.patch('/:productId',(req,res,next)=>{     // using "/:productId" represents passing a variable
    const id = req.params.productId;
    const updateOPS = {};                        // create a json object that will contain all attributes that are needed to be updated
    for (const ops of req.body){                // iterate over all body array
        updateOPS[ops.propName] = ops.value;
    }
    Product.updateOne({_id:id},{$set:updateOPS}).exec().then(result => { 
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:productId',(req,res,next)=>{     // using "/:productId" represents passing a variable
    const id = req.params.productId;
    Product.remove({_id:id}).exec().then(result=> {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});
   

module.exports = router;