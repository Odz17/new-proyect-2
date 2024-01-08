// places.routes.js
const router = require("express").Router();
const { model } = require("mongoose");
const Place = require('../models/Place.model');

router.get('/list', (req, res) => {
  Place.find().then(data => {
    res.render('places/list', { places: data }); 
  });
});



router.get('/create', (req, res) => {
  res.render('places/create');
});

router.post("/create", (req, res, next) => {
  console.log("Received POST request at /places/create");

  const { title, location, image, description, author, rating } = req.body;
  
  console.log("Received data:", { title, location, image, description, author, rating });

  Place.create({
    title: title,
    location: location,
    image: image,
    description: description,
    author: author,
    rating: rating,
  })
    .then(() => {
      console.log("Place created successfully");
      res.redirect('/places/list');
    })
    .catch(error => {
      console.error("Error creating place:", error);
      next(error);
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
  const { title, location, image, description, author, rating } = req.body;
  
  Place.findByIdAndUpdate(id, { title, location, image, description, author, rating }, { new: true })
    .then(updatedplaceFromDB => {
      res.json(updatedplaceFromDB);
    })
    .catch(error => {
      res.status(500).json({ error: "Internal Server Error" });
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