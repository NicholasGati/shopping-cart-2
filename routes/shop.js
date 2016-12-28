"use strict";
const express = require("express");
const router = express.Router();

// Import the models that you need
const Product = require("../models/product");

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


module.exports = router;
