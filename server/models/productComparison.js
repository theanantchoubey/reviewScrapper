const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const productsComparisonSchema = new mongoose.Schema(
  {
    id: String,
    productsSite: String,
    productOneData: {
      productSite: String,
      productURL: String,
      productTitle: String,
      productPrice: String,
      discount: String,
      productReviews: Array,
      productImg: String,
    },
    productTwoData: {
      productSite: String,
      productURL: String,
      productTitle: String,
      productPrice: String,
      discount: String,
      productReviews: Array,
      productImg: String,
    },
  },
  { timestamps: true }
);
productsComparisonSchema.plugin(findOrCreate);
module.exports = ProductsComparison = mongoose.model(
  "ProductsComparison",
  productsComparisonSchema
);
