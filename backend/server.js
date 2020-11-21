const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const PORT = 4000;
const stores = require("./routes/api/stores");
const passport = require("passport");


// let Medicine = require('./medi.model');
let Medicine = require('./models/Medicine');


app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://king_auth:7KckJMsEXKqhV8u@cluster0.f7nsr.mongodb.net/mediReminder?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successully");
})

router.route('/').get(function(req,res) {
    Medicine.find(req.query.store, function(err, medicine) {
        if (err){
            console.log(err);
        }else {
            res.json(medicine);
        }
    });
});


router.route('/:id').get(function(req, res){
    let id = req.params.id;
    Medicine.findById(id, function(err, medi){
        res.json(medi);
    });
});

router.route('/add').post( function(req,res){
    let medi = new Medicine(req.body);
    medi.save()
        .then(medi=>{
            res.status(200).json({success: true, message: 'Added Success'});
        })
        .catch(err => {
            res.status(400).send('adding new medicine failed');
        });
});

router.route('/update/:id').post(function(req, res){
    Medicine.findById(req.params.id, function(err, medi){
        if (!medi)
            res.status(404).send('data is not found');
        else
            medi.description = req.body.description;
            medi.name = req.body.name;
            medi.prescription = req.body.prescription;
            medi.outstock = req.body.outstock;

            medi.save().then(medi => {
                res.json('Medicine updated');
            })
            .catch(err => {
                res.status(400).send("Medicine update failed");
            });
    });
});
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/stores", stores);

app.use('/medicine', router);

app.listen(PORT, function() {
    console.log("Server is running on Port:" + PORT);
});
