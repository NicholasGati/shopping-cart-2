"use strict";
const express = require('express');
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const csrfProtection = csrf();
router.use(csrfProtection);

// Import all necessary models
const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");

// USER IS OR ISNT LOGGED IN GOES UP here

router.get("/all", (req, res, next) => {
  User.find({}, (err, users) => {
    let userMap = {};
    users.forEach((user) => {
      userMap[user.id] = { email: user.email, _id: user.id };
    });
    res.send(userMap);
  });
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  // req contains the user. Find orders by user id
  Order.find({user: req.user}, (err, orders) => {
    if (err) {
      return res.redirect("/shop/coffee");
    }

    let cart;
    orders.forEach((order) => {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });

    res.render("user/profile", {user: req.user, orders: orders});
  });
});

router.get('/edit', isLoggedIn, (req, res, next) => {
  res.render("user/edit", {user: req.user, csrfToken: req.csrfToken()});
});

router.post('/:id/delete', isLoggedIn, (req, res, next) => {
  User.findOneAndRemove({_id: req.params.id}, (err) => {
    if (err) {
      req.flash("error", err);
      return res.redirect("/user/edit");
    }

    req.flash("success", "Your account has been deleted.");
    req.logout();
    return res.redirect("/shop/coffee");
  });
});

// Log the user out
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.use('/', isNotLoggedIn, (req, res, next) => {
  next();
});

// END USER IS OR ISNT LOGGED IN

// Access to User signup page
router.get("/signup", isNotLoggedIn, (req, res, next) => {
  const messages = req.flash("error");
  res.render("user/signup", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

// User actually signing up
router.post("/signup", passport.authenticate("local.signup", {
  successRedirect: "/user/profile",
  failureRedirect: "/user/signup",
  failureFlash: true
}), (req, res, next) => {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect("/user/profile");
  }
});

router.get("/signin", (req, res, next) => {
  const messages = req.flash("error");
  res.render("user/signin", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("/signin", passport.authenticate("local.signin", {
  failureRedirect: "/user/signin",
  failureFlash: true
}), (req, res, next) => {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect("/user/profile");
  }
});

// Helper functions
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
