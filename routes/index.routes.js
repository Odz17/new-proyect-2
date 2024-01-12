const express = require('express');
const router = express.Router();


router.get("/", (req, res, next) => {
  res.render("index", { bodyClass: 'home' });
});

module.exports = router;
