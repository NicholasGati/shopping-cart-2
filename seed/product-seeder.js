"use strict";
const Product = require("../models/product");
const mongoose = require("mongoose");

mongoose.connect("localhost:27017/coffeeshop");

const products = [
  new Product({
    imagePath: 'https://www.gocoffeego.com/coffee-images/Olympia-Coffee-Big-Truck-Organic-Espresso-12-ounce.2460.xlg.jpg',
    price: 16,
    description: "3rd Place America's Best Espresso Winner! Our flagship espresso blend. We devote constant attention to Big Truck and think it might be the best organic espresso blend you can find. Coffee is a seasonal fresh produce and different producing countries have varied seasons and harvest periods. We strive to buy smaller lots in their prime to keep the blend as fresh as possible. The ingredients of the blend change based upon seasonality, yet the flavor profile for Big Truck remains the same.",
    type: 'coffee',
    name: 'Big Truck Organic Espresso'
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Bird-Rock-Coffee-Guatemla-El-Injerto-Red-Catuai.3596.lg.jpg",
    price: 20,
    description: "This Bird Rock exclusive Direct Trade lot comes from what is considered one of the best coffee farms in the world. El Injerto has been a fixture in the Guatemala Cup of Excellence for the last several years, bringing home many 1st place victories including this year. We have had the honor of working directly with El Injerto for six years now. ",
    type: "coffee",
    name: "Guatemala El Injerto Red Catuai"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Barefoot-Coffee-Redcab-Brazil-12-ounce.456.xlg.jpg",
    price: 15,
    description: "Hints of citrus graham cracker and vanilla on the nose with flavors of semi-sweet chocolate chips, hazelnut, and marshmallow. Mild acidity compliments the graciously creamy body. ",
    type: "coffee",
    name: "Redcab - Brazil"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Klatch-Coffee-Colombia-Best-Of-Huila-12-ounce-1.4852.xlg.jpg",
    price: 15,
    description: "Our roasting team found sweet flavors of chocolate and honey on the nose with bright tangerine, lime acidity and a creamy chocolate body in the cup. With subtle hints of tart cherry, sweet spices and floral notes, this coffee will taste great hot or iced!",
    type: "coffee",
    name: "Colombia Best Of Huila"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Klatch-Coffee-Uganda-Chema-Sipi-Falls-12-ounce-1.4367.xlg.jpg",
    price: 15,
    description: "This year’s new crop brings out a clean, smooth and balanced cup. It offers sweet and bright flavors of green apple, lemon and cocoa. Along with creamy chocolate body and subtle malic acidity, this is a coffee you can drink all day! Our new coffee from Uganda is sourced from various family-owned farms located in the Bugisu region on the slopes of Mount Elgon in the Kapchorwa district, Uganda.",
    type: "coffee",
    name: "Uganda Chema Sipi Falls"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Barefoot-Coffee-Redcab-Espresso-12-ounce.843.xlg.jpg",
    price: 15,
    description:"Saucy body leads into base flavors of hazelnut, caramel and a touch of yellow plum followed by mild malic acidity that leads to a melted milk chocolate finish.",
    type: "coffee",
    name: "Redcab - Espresso"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Klatch-Coffee-Bolivian-Cascara-Organic-Coffee-Cherry-Tea-4-Ounce.4803.xlg.jpg",
    price: 9,
    description:"Our newest cascara tea from Bolivia offers sweet and bright flavors of lemon and orange along with subtle hints of honey and tamarind. You can enjoy this either hot or iced! ",
    type: "coffee",
    name: "Bolivian Cascara Organic (Coffee Cherry Tea)"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Klatch-Coffee-FTO-Ethiopia-Yirgacheffe-Gedeb-12-ounce.4719.xlg.jpg",
    price: 16,
    description:"This is one of our favorite new arrivals...so far! It starts with a sweet cocoa and floral aroma. The cup brings out complex fruit flavors, sweet herbal notes, lemon acidity and a marzipan body along with a sweet and savory finish. Overall, it's a very unique cup with tons of depth and dynamics. You can also enjoy this hot or iced!",
    type: "coffee",
    name: "FTO Ethiopia Yirgacheffe Gedeb"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Klatch-Coffee-Hawaiian-Kau-Typica-12-ounce.1251.xlg.jpg",
    price: 35,
    description:"A Hawaiian coffee bean from the Big Island that delivers. The sweetest Hawaiian coffee with notes of honey and chocolate on the nose with molasses, milk chocolate and hints of almond nuttiness on the tongue. Rich and syrupy body with long aftertaste. Like a great Kona, only sweeter.",
    type: "coffee",
    name: "Hawaiian Ka'u Typica"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Equator-Coffees-Ethiopia-Sidama-Ardi-12-ounce.1550.xlg.jpg",
    price: 18,
    description:"Dark chocolate, vanilla, sweet lemon, lavender and a creamy berry melange. Presenting our beloved Ardi which hails from Southern Ethiopia in the Guji area. For the approximately 2-3,000 people living in this area, coffee farming is the main source of income.",
    type: "coffee",
    name: "Ethiopia Sidama Ardi"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Atomic-Cafe-Costa-Rica-La-Magnolia-12-ounce-1.124.xlg.jpg",
    price: 12,
    description:"Lush and elegant, clean, smooth, this cup showcases a sweet, creamy character that is delicately accented with notes of honey, subtle citrus, and a vibrant, floral aroma.",
    type: "coffee",
    name: "Costa Rica La Magnolia"
  }),
  new Product({
    imagePath: "https://www.gocoffeego.com/coffee-images/Costa-Rica-Nero-Ramirez-12oz-2-.3658.xlg.jpg",
    price: 19,
    description:"Fudgy with flavors of sweet cream and strawberry undertones. Nereo is a cool, humble guy. We have a lot of respect for him and the way he approaches coffee and life. He is hardworking and resourceful, using his own organic inputs from other areas of his farm as fertilizer, and harvests all his own coffee with his family rather than hiring pickers.",
    type: "coffee",
    name: "Costa Rica Nereo Ramirez, Micro Mill"
  })
];

// Loop over products and save them to DB.
// Once they are all iterated through and saved, disconnect from the DB.
let done = 0;
for (let i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
