const router = require("express").Router();
const { model } = require("mongoose");
const Place = require('../models/Place.model');


router.get('/', (req, res) => {
    Place.find()
    .then( allPlaces => {
      res.render('/places')
        // res.json(allPlaces);
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

router.get("/:id", (req, res) => {

    const { id } = req.params;
    
    Place.findById(id)
      .then( (placeFromDB) => {

        // res.json(placeFromDB);
      })
      .catch((error) => {
        res.status(404).json({ error: "Place not found" });
      });
  
  });
  

  router.post('/:id/edit', (req, res) => {
  
    const { id } = req.params;
    const { name, location, image, description } = req.body;
  
    Place.findByIdAndUpdate(id, { name, location, image, description }, { new: true })
      .then( (updatedplaceFromDB) => {
        res.json(updatedplaceFromDB)
      });
  
  });
  
 
  router.post('/:id/delete', (req, res) => {
    const { id } = req.params;
  
    Place.findByIdAndDelete(id)
      .then( () => {
        res.json(`Place ${id} has been deleted`);
      })
  })


module.exports = router;