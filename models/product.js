"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  imagePath: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true},
  name: {type: String, required: true}
});

module.exports = mongoose.model('product', schema);
