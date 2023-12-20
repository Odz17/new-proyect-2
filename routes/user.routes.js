const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get("/myprofile", isLoggedIn, (req, res) => {
    const { currentUser } = req.session;
    User.findById(currentUser._id)
      .then(userFromDB => {
        res.render("user/user-profile", { user: userFromDB });
      }) 
        
  })

  router.get("/myprofile/edit", isLoggedIn, (req, res) => {
    const { currentUser } = req.session;
  
    User.findById(currentUser._id)
      .then(userFromDB => {
        res.render("user/user-edit", { user: userFromDB });
      })
      .catch(error => {
        console.error("Error al cargar el formulario de edición:", error);
        res.redirect("/myprofile"); 
      });
  });
  
  router.post("/myprofile/edit", (req, res) => {
    const { currentUser } = req.session;
    const { username } = req.body;
  
    User.findByIdAndUpdate(currentUser._id, { username }, { new: true })
      .then(updatedUser => {
        // res.send(updatedUser)
        res.redirect("/myprofile");
      })
      .catch(error => {
        console.error("Error al actualizar datos:", error);
        res.redirect("/myprofile/edit");
      });
  });


  
  module.exports = router;