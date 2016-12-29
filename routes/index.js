"use strict";
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home/index');
});

router.get('/about', (req, res, next) => {
  res.render('home/about');
});


// Helper function to check if user is logged in
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next(); // continue
//   }
//   // store the old url so that when the user signs in, they get redirected to the route they were on initially
//   req.session.oldUrl = req.url;
//   res.redirect('/user/signin');
// }

module.exports = router;
