const express = require('express');
const app = express();
const morgan = require('morgan')  // 'kind of' a middleman that can show responses in the log down in the terminal
const bodyParser = require('body-parser') // extracts data in a more readable way

const productRouter = require('./api/routes/products');  // 'kind of' import the route products
const sysAdminRouter = require('./api/routes/sysAdmins');
const beneficiariesRouter = require('./api/routes/beneficiaries');
const volunteerRouter = require('./api/routes/volunteers');
const coordinatorRouter = require('./api/routes/coordinators');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://node-rest-shop:noderestshop@node-rest-shop.j80vz.mongodb.net/oneFamilyDB?retryWrites=true&w=majority',
{  
    useUnifiedTopology: true,
    useNewUrlParser: true
}
);



app.use(morgan('dev'));  
app.use(bodyParser.urlencoded({extended:false}));  // extracts simple url (otherwise enter 'true')
app.use(bodyParser.json());                        // extracts json data
 
app.use((req,res,next)=>{                           // the purpose: prevet core errors!  
    res.header('Access-Control-Allow-Origin','*');  // any client has an access now
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/products',productRouter);   // every address with /products in the beggining will lead to /api/routes/proucts
app.use('/volunteers',volunteerRouter);
app.use('/coordinators',coordinatorRouter);
app.use('/sysAdmins',sysAdminRouter);
app.use('/beneficiaries',beneficiariesRouter);

// app.use('/orders',orderRouter);
app.use((req,res,next)=>              // if we got here and didnt enter any of the previews uses, than someone is asking for an unsupported address.
{                                    // so this can raise an error and sent it to the "next" func to send it to next use call to deal with
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:
        {
            message: error.message
        }
    });
});
module.exports = app;