const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");
const ProductReviewAnalysis = require("../models/productReviewAnalysis");
const { error } = require("console");

//For Post Request
exports.productReviewAnalysis = (req, res, next) => {
  const requestedURL = req.body.productURL;
  if (requestedURL) {
    const cb = (error, response, html) => {
      handleHTML(html);
    };
    request(requestedURL, cb);
    const handleHTML = (html) => {
      let selTool = cheerio.load(html);
      let discountPercentage = selTool(".savingsPercentage");
      let productTitle = selTool("#productTitle");
      let productPrice = selTool(".a-price-whole");
      let profileName = selTool(".review .a-profile-name");
      let reviewTitle = selTool(".review-title");
      let reviewText = selTool(".reviewText");
      let ratings = selTool(".review-rating .a-icon-alt");
      let productImage = selTool("#landingImage");
      let productReviews = [];
      if (selTool(productTitle).length == 0) {
        console.log("Wrong link format!");
        return;
      }
      for (let i = 0; i < profileName.length; i++) {
        productReviews.push({
          profileName: selTool(profileName[i]).text().trim(),
          reviewTitle: selTool(reviewTitle[i]).text().trim().substring(19),
          reviewText: selTool(reviewText[i]).text().trim(),
          customerRatings: selTool(ratings[i]).text().trim(),
        });
      }
      const productData = {
        productSite: "Amazon",
        productURL: requestedURL,
        productTitle: selTool(productTitle[0]).text().trim(),
        productPrice: selTool(productPrice[0]).text().trim(),
        discount: selTool(discountPercentage[0]).text().trim(),
        productReviews: productReviews,
        productImg: productImage.attr().src,
      };
      ProductReviewAnalysis.create(productData)
        .then((data) => {
          res.json(data);
          console.log("Data Successfully Inserted");
        })
        .catch((err) => {
          res.json(err);
        });
    };
  }
};

//For Get Request
exports.productReviewAnalysisData = (req, res, next) => {
  console.log("Requested Data!");
  ProductReviewAnalysis.find().then((err, analysedData) => {
    if (err) {
      res.json(err);
    } else {
      res.json(analysedData);
    }
  });
};

// exports.intraSiteComparison = (req, res, next) => {
//   const requestedAmazonUrl =
//     "https://www.amazon.in/Tecno-Spark-Storage-Expandable-Processor/dp/B0B56YRDDT?ref_=Oct_DLandingS_D_61a3e4a1_60";
//   const requestedFlipkartUrl =
//     "https://www.flipkart.com/realme-c33-sandy-gold-64-gb/p/itma112335dbe78a?pid=MOBGHBJG8NWDGK6T&marketplace=FLIPKART";
//   console.log(
//     `amazonURL: ${requestedAmazonUrl}, flipkartURL: ${requestedFlipkartUrl}`
//   );
//   if (requestedAmazonUrl && requestedFlipkartUrl) {
//     const productsData = [];
//     const amazonCB = (error, respone, html) => {
//       handleAmazonHTML(html);
//     };
//     const flipkartCB = (error, response, html) => {
//       handleFlipkartHTML(html);
//     };
//     request(requestedAmazonUrl, amazonCB);
//     request(requestedFlipkartUrl, flipkartCB);
//     const handleAmazonHTML = (html) => {
//       let selTool = cheerio.load(html);
//       let discountPercentage = selTool(".savingsPercentage");
//       let productTitle = selTool("#productTitle");
//       let productPrice = selTool(".a-price-whole");
//       let profileName = selTool(".review .a-profile-name");
//       let reviewTitle = selTool(".review-title");
//       let reviewText = selTool(".reviewText");
//       let ratings = selTool(".review-rating .a-icon-alt");

//       let productReviews = [];
//       for (let i = 0; i < profileName.length; i++) {
//         productReviews.push({
//           profileName: selTool(profileName[i]).text().trim(),
//           reviewTitle: selTool(reviewTitle[i]).text().trim(),
//           reviewText: selTool(reviewText[i]).text().trim(),
//           customerRatings: selTool(ratings[i]).text().trim(),
//         });
//       }
//       productsData.push({
//         productSite: "Amazon",
//         productURL: requestedAmazonUrl,
//         productTitle: selTool(productTitle[0]).text().trim(),
//         productPrice: selTool(productPrice[0]).text().trim(),
//         discount: selTool(discountPercentage[0]).text().trim(),
//         productReviews: productReviews,
//       });
//     };
//     const handleFlipkartHTML = (html) => {
//       let selTool = cheerio.load(html);
//       let discountPercentage = selTool("._3Ay6Sb._31Dcoz");
//       let productTitle = selTool(".yhB1nd .B_NuCI");
//       let productPrice = selTool("._30jeq3._16Jk6d");
//       let profileName = selTool("._2sc7ZR._2V5EHH");
//       let reviewTitle = selTool("._2-N8zT");
//       let reviewText = selTool(".t-ZTKy div div");
//       let ratings = selTool("._3LWZlK._1BLPMq");

//       let productReviews = [];
//       for (let i = 0; i < profileName.length; i++) {
//         productReviews.push({
//           profileName: selTool(profileName[i]).text().trim(),
//           reviewTitle: selTool(reviewTitle[i]).text().trim(),
//           reviewText: selTool(reviewText[i]).text().trim(),
//           customerRatings: selTool(ratings[i]).text().trim(),
//         });
//       }
//       productsData.push({
//         productSite: "Flipkart",
//         productURL: requestedFlipkartUrl,
//         productTitle: selTool(productTitle[0]).text().trim(),
//         productPrice: selTool(productPrice[0]).text().trim(),
//         discount: selTool(discountPercentage[0]).text().trim(),
//         productReviews: productReviews,
//       });
//       res.json(productsData);
//     };

//     // console.log(productsData);
//   }
// };
