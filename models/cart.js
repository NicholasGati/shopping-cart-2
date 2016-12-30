"use strict";

module.exports = function(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
    // get the item that we already have
    let storedItem = this.items[id];
    // if none exist, create one
    if (!storedItem) {
      //the storedItem is an item that may have more than one of itself
      storedItem = this.items[id] = {item: item, price: 0, qty: 0};
    }

    storedItem.qty++;
    storedItem.price = storedItem.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  }

  this.reduceByOne = function(id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;

    if (this.items[id].qty <= 0) {
      delete this.items[id];
    }
  }

  this.removeItem = function(id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  }

  this.generateArray = function() {
    let arr = [];
    for (var key in this.items) {
      arr.push(this.items[key]);
    }
    return arr;
  }
}
