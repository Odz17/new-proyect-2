const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });


const User = require("../models/User.model");


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
  
  router.post("/myprofile/edit", isLoggedIn, upload.single('profileImage'), (req, res) => {
    const { currentUser } = req.session;
    const { username } = req.body;
    const newImage = req.file ? `/uploads/${req.file.filename}` : currentUser.userImage;
  
    User.findByIdAndUpdate(currentUser._id, { username, userImage: newImage }, { new: true })
      .then(updatedUser => {
        res.redirect("/myprofile");
      })
      .catch(error => {
        console.error("Error al actualizar datos:", error);
        res.redirect("/myprofile/edit");
      });
  });


  
  module.exports = router;