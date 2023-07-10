const express = require("express");
const router = express.Router();
const intraSiteProductsComparisonController = require("../controller/intraSiteComparisonController");

router.post(
  "/intraSiteProductsComparison",
  intraSiteProductsComparisonController.intraSiteProductsComparison
);
router.get(
  "/intraSiteProductsComparisonData",
  intraSiteProductsComparisonController.intraSiteProductsComparedData
);
module.exports = router;
