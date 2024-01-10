// places.routes.js
const router = require("express").Router();
const { model } = require("mongoose");
const Place = require('../models/Place.model');
const fileUploader = require('../config/cloudinary.config');

router.get('/list', (req, res) => {
  Place.find().then(data => {
    res.render('places/list', { places: data }); 
  });
});


router.get('/create', (req, res) => {
  res.render('places/create');
});

router.post("/create", fileUploader.single('image'), (req, res, next) => {
  
  
  const { title, location, description, author, rating } = req.body;
  const image = req.file ? req.file.path : undefined;
  
  
  Place.create({
    title: title,
    location: location,
    image: req.file ? req.file.path : undefined,
    description: description,
    author: author,
    rating: rating,
  })
  .then(() => {
    res.redirect('/places/list');
  })
  .catch(error => {
    console.error("Error creating place:", error);
    next(error);
  });
});




router.get("/:id", fileUploader.single('image'), (req, res) => {
  
  const { id } = req.params;
  
  Place.findById(id)
  .then( (placeFromDB) => {
    res.render('places/single', { placeFromDB });
        // res.json(placeFromDB);
  })
  .catch((error) => {
    res.status(404).json({ error: "Place not found" });
  });
  
});

router.get("/:_id/edit", fileUploader.single('image'), (req, res, next) => {
  const { _id } = req.params;
  Place.findById(_id)
  .then(placeFromDB => {
    res.render('places/edit',  placeFromDB );
  })
  .catch((error) => {
    next(error);
  })
})

router.post('/:_id/edit', fileUploader.single('image'), (req, res) => {
  
  const { _id } = req.params;
  const { title, location, image, description, author, rating } = req.body;
  
  Place.findByIdAndUpdate(_id, { title, location, image, description, author, rating }, { new: true })
  .then(updatedplaceFromDB => {
    const redirectus = `/places/${updatedplaceFromDB._id}`;
      res.redirect(redirectus);
    // res.json(updatedplaceFromDB);
  })
  .catch(error => {
    res.status(500).json({ error: "Internal Server Error" });
  });
});



router.get('/:_id/delete', (req, res) => {
  const { _id } = req.params;

  Place.findByIdAndUpdate(_id)
    .then(_id => {
      return Place.findByIdAndDelete(_id)
    })
    .then(() => {
      res.redirect('/places/list');
      // res.json(`Place ${_id} has been deleted`);
    })
    .catch(error => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});



module.exports = router;