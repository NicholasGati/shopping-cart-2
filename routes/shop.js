"use strict";
const express = require("express");
const router = express.Router();

// Import the models that you need
const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");

router.get('/coffee', (req, res, next) => {
  Product.find((err, docs) => {
    let productChunks = [];
    const chunkSize = 4;

    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize))
    }
    res.render('shop/index', {products: productChunks});
  });
});

router.get("/add-to-cart/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, prod) => {
    if (err) {
      return res.redirect("/shop/coffee");
    }
    cart.add(prod, productId);
    req.session.cart = cart;
    res.redirect("/shop/coffee");
  });
});

router.get("/reduce/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("/shop/shopping-cart");
});

router.get("/remove/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/shop/shopping-cart");
});

router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", {products: null, isNull: true});
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {products: cart.generateArray(), totalPrice: cart.totalPrice, isNull: false});
});

// CHECKOUT
router.get("/checkout", isLoggedIn, (req, res, next) => {
  if (!req.session.cart) {
    return redirect("/shop/shopping-cart");
  }

  const cart = new Cart(req.session.cart);
  const errMsg = req.flash("error")[0];
  res.render("shop/checkout", {errMsg: errMsg, noError: !errMsg, total: cart.totalPrice});
});

router.post("/checkout", isLoggedIn, (req, res, next) => {
  if (!req.session.cart) {
    return redirect("/shop/shopping-cart");
  }
  const cart = new Cart(req.session.cart);

  // Get stripe
  const stripe = require("stripe")("sk_test_QGPJcc7chWkkZqvNeEcM4rbj");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken,
    description: "Charge card"
  }, (err, charge) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/shop/checkout");
    }

    // If there are no errors, create the new order
    const order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });

    // Now that an order is created, save it to DB
    order.save((err, result) => {
      if (err) {
        req.flash("errer", err.message);
        return res.redirect("/shop/checkout");
      }

      req.flash("success", "Thank you for your order. Your order is now being processed.");
      req.session.cart = null;
      res.redirect("/shop/coffee");
    });
  });
});

// Helper functions
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
