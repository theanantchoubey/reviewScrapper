const express = require("express");
const router = express.Router();
const analysisController = require("../controller/productReviewAnalysisController");

router.post("/productReviewAnalysis", analysisController.productReviewAnalysis);
router.get(
  "/productReviewAnalysisData",
  analysisController.productReviewAnalysisData
);
// router.get("/intraSiteComparison", analysisController.intraSiteComparison);
module.exports = router;
