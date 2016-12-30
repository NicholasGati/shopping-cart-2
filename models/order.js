const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'}, // this.order is relational to a User
  cart: {type: Object},
  address: {type: String, required: true},
  name: {type: String, required: true},
  paymentId: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);
