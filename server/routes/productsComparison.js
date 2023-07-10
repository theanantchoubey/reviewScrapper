const express = require("express");
const router = express.Router();
const productsComparisonController = require("../controller/productsComparisonController");

router.post(
  "/productsComparison",
  productsComparisonController.productsComparison
);
router.get(
  "/productsComparisonData",
  productsComparisonController.productsComparedData
);
module.exports = router;
