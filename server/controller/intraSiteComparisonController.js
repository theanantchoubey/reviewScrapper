const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");
const IntraSiteProductsComparison = require("../models/intraSiteComparison");

exports.intraSiteProductsComparison = (req, res, next) => {
  const requestedAmazonProductURL = req.body.amazonProductURL;
  const requestedFlipkartProductURL = req.body.flipkartProductURL;
  // console.log(
  //   `productOne: ${requestedAmazonProductURL} && productTwo: ${requestedFlipkartProductURL}.`
  // );
  if (requestedAmazonProductURL && requestedFlipkartProductURL) {
    const amazonProductCB = (error, respone, html) => {
      handleAmazonProductHTML(html);
    };
    const flipkartProductCB = (error, response, html) => {
      handleFlipkartProductHTML(html);
    };
    request(requestedAmazonProductURL, amazonProductCB);
    request(requestedFlipkartProductURL, flipkartProductCB);
    let amazonProductData, flipkartProductData;
    let productsData = [];
    const handleAmazonProductHTML = (html) => {
      let selTool = cheerio.load(html);
      let discountPercentage = selTool(".savingsPercentage");
      let productTitle = selTool("#productTitle");
      let productPrice = selTool(".a-price-whole");
      let profileName = selTool(".review .a-profile-name");
      let reviewTitle = selTool(".review-title");
      let reviewText = selTool(".reviewText");
      let productImage = selTool("#landingImage");
      let ratings = selTool(".review-rating .a-icon-alt");
      let productReviews = [];
      if (selTool(productTitle).length == 0) {
        console.log("Wrong link format!")
        return;
      }
      for (let i = 0; i < profileName.length; i++) {
        // console.log(selTool(discountPercentage[i]).text().trim().replace("-", ""));
        productReviews.push({
          profileName: selTool(profileName[i]).text().trim(),
          reviewTitle: selTool(reviewTitle[i]).text().trim().substring(19),
          reviewText: selTool(reviewText[i]).text().trim(),
          customerRatings: selTool(ratings[i]).text().trim(),
        });
      }
      amazonProductData = {
        productSite: "Amazon",
        productURL: requestedAmazonProductURL,
        productTitle: selTool(productTitle[0]).text().trim(),
        productPrice: selTool(productPrice[0]).text().trim(),
        discount: selTool(discountPercentage[0]).text().trim().replace("-", ""),
        productReviews: productReviews,
        productImg: productImage.attr().src,
      };
      productsData.push(amazonProductData);

    };
    const handleFlipkartProductHTML = (html) => {
      let selTool = cheerio.load(html);
      let discountPercentage = selTool("._3Ay6Sb._31Dcoz");
      let productTitle = selTool(".yhB1nd .B_NuCI");
      let productPrice = selTool("._30jeq3._16Jk6d");
      let profileName = selTool("._2sc7ZR._2V5EHH");
      let reviewTitle = selTool("._2-N8zT");
      let reviewText = selTool(".t-ZTKy div div");
      let ratings = selTool("._3LWZlK._1BLPMq");
      let productImage = selTool("._396cs4._2amPTt._3qGmMb");
      let productReviews = [];
      if (selTool(productTitle).length == 0) {
        console.log("Wrong link format!")
        return;
      }
      for (let i = 0; i < profileName.length; i++) {
        productReviews.push({
          profileName: selTool(profileName[i]).text().trim(),
          reviewTitle: selTool(reviewTitle[i]).text().trim(),
          reviewText: selTool(reviewText[i]).text().trim(),
          customerRatings: selTool(ratings[i]).text().trim(),
        });
      }
      flipkartProductData = {
        productSite: "Flipkart",
        productURL: requestedFlipkartProductURL,
        productTitle: selTool(productTitle[0]).text().trim(),
        productPrice: selTool(productPrice[0]).text().trim().replace("₹", ""),
        discount: selTool(discountPercentage[0]).text().trim(),
        productReviews: productReviews,
        productImg: productImage.attr().src,
      };

      const pushData = () => {
        productsData.push(flipkartProductData);
        const comparedData = {
          amazonProductData: productsData[0],
          flipkartProductData: productsData[1],
        };

        IntraSiteProductsComparison.create().then(comparedData, (err, data) => {
          if (err) {
            console.log(err + "Error Inserting Data");
          } else {
            console.log("IntraSiteData Successfully Inserted");
          }
        });
      };
      setTimeout(pushData, 2000);
      // res.json(productsData);
    };
  }
};

exports.intraSiteProductsComparedData = (req, res, next) => {
  IntraSiteProductsComparison.find().then((err, comparedData) => {
    if (err) {
      res.json(err);
    } else {
      res.json(comparedData);
      // console.log(user);
    }
  });
};
