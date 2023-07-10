require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const productReviewAnalysisRoute = require('./routes/reviewAnalysis');
const productsComparisonRoute = require('./routes/productsComparison');
const intraSiteProductsComparisonRoute = require('./routes/intraSiteComparison');
const connectDB = require('./db');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(express.json());

app.use(cors());
app.options("*", cors());

// Testing route
app.get("/api/test", async (req, res) => {
  res.status(200).send("Test succesfully made!");
});

app.use('/analysis', productReviewAnalysisRoute);
app.use('/comparison', productsComparisonRoute);
app.use('/intra', intraSiteProductsComparisonRoute);

connectDB();
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
