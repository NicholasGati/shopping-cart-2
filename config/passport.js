"use strict";
const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// Serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// User signup
passport.use("local.signup", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  //Validate
  req.checkBody("email", "Invalid Email").notEmpty().isEmail();
  req.checkBody("password", "Invalid Password").notEmpty().isLength({min: 4});
  const errors = req.validationErrors();

  // If there are errors
  if (errors) {
    let messages = [];
    errors.forEach((err) => {
      messages.push(err.msg)
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({"email": email}, (err, user) => {
    if (err) {
      return done(err);
    }

    // If this user is already found in DB
    if (user) {
      return done(null, false, {message: "Email is already in use."});
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save((err, result) => {
      if (err) {
        return done(err);
      }

      return done(null, newUser);
    });
  });
}));

passport.use("local.signin", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, res, next) => {
  //Validate
  req.checkBody("email", "Invalid Email").notEmpty().isEmail();
  req.checkBody("password", "Invalid Password").notEmpty().isLength({min: 4});
  const errors = req.validationErrors();

  // If there are errors
  if (errors) {
    let messages = [];
    errors.forEach((err) => {
      messages.push(err.msg)
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({"email": email}, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {message: "No user found."})
    }

    if (!user.validPassword(password)) {
      return done(null, false, {message: "Invalid Password!"});
    }

    return done(null, user);
  });
}));
