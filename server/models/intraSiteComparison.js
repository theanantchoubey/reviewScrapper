const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const intraSiteComparisonSchema = new mongoose.Schema(
  {
    id: String,
    amazonProductData: {
      productSite: String,
      productURL: String,
      productTitle: String,
      productPrice: String,
      discount: String,
      productReviews: Array,
      productImg: String,
    },
    flipkartProductData: {
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
intraSiteComparisonSchema.plugin(findOrCreate);
module.exports = IntraSiteProductsComparison = mongoose.model(
  "IntraSiteProductsComparison",
  intraSiteComparisonSchema
);
