const router = require("express").Router();
const Place = require('../models/Place.model');


router.get('/', (req, res) => {
    Product.find()
    .then( allProducts => {
        res.json(allProducts);
    });
});


router.post("/new", (req, res, next) => {
    
    const { name, location, image, description } = req.body;
    
    Place.create({ name, location, image, description })
    .then( (response) => {
        res.json(response);
    }).catch( err => { 
        res.json(err);
    });
    
});