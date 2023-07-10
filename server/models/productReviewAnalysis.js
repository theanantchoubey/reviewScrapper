const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const productReviewAnalysisSchema = new mongoose.Schema({
  id: String,
  productSite: String,
  productURL: String,
  productTitle: String,
  productPrice: String,
  discount: String,
  productReviews: Array,
  productImg: String,
}, { timestamps: true });
productReviewAnalysisSchema.plugin(findOrCreate);
module.exports = ProductReviewAnalysis = mongoose.model("ProductReviewAnalysis", productReviewAnalysisSchema);
