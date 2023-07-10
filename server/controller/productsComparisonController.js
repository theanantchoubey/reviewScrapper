const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");
const ProductsComparison = require("../models/productComparison");

exports.productsComparison = (req, res, next) => {
  const requestedProductOneURL = req.body.productOneURL;
  const requestedProductTwoURL = req.body.productTwoURL;
  const requestedProductsCompany = req.body.productCompany;
  //   const requestedProductOneURL = "https://www.amazon.in/Tecno-Spark-Storage-Expandable-Processor/dp/B0B56YRDDT?ref_=Oct_DLandingS_D_61a3e4a1_60";
  //   const requestedProductTwoURL = 'https://www.amazon.in/dp/B0B4F3G74S/ref=sspa_dk_detail_1?psc=1&pd_rd_i=B0B4F3G74S&pd_rd_w=JS609&content-id=amzn1.sym.341eb43e-ea7c-457f-aa0f-a8bbc2ea1307&pf_rd_p=341eb43e-ea7c-457f-aa0f-a8bbc2ea1307&pf_rd_r=3DZGBF2SZZCFPPVFZVTY&pd_rd_wg=gs8AQ&pd_rd_r=da154f46-f85d-45f6-a59f-eed3a7efb13d&s=electronics&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy';
  // console.log(
  //   `productOne: ${requestedProductOneURL} && productTwo: ${requestedProductTwoURL} of ${requestedProductsCompany} Company`
  // );
  if (requestedProductsCompany == "Amazon") {
    if (requestedProductOneURL && requestedProductTwoURL) {
      const productOneCB = (error, respone, html) => {
        handleProductOneHTML(html);
      };
      const productTwoCB = (error, response, html) => {
        handleProductTwoHTML(html);
      };
      request(requestedProductOneURL, productOneCB);
      request(requestedProductTwoURL, productTwoCB);
      let productOneData, productTwoData;
      let productsData = [];
      const handleProductOneHTML = (html) => {
        let selTool = cheerio.load(html);
        let discountPercentage = selTool(".savingsPercentage");
        let productTitle = selTool("#productTitle");
        let productPrice = selTool(".a-price-whole");
        let profileName = selTool(".review .a-profile-name");
        let productImage = selTool("#landingImage");
        let reviewTitle = selTool(".review-title");
        let reviewText = selTool(".reviewText");
        let ratings = selTool(".review-rating .a-icon-alt");
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
        productOneData = {
          productSite: "Amazon",
          productURL: requestedProductOneURL,
          productTitle: selTool(productTitle[0]).text().trim(),
          productPrice: selTool(productPrice[0]).text().trim(),
          discount: selTool(discountPercentage[0]).text().trim(),
          productReviews: productReviews,
          productImg: productImage.attr().src,
        };
        productsData.push(productOneData);
        // console.log(productOneData);
      };
      const handleProductTwoHTML = (html) => {
        let selTool = cheerio.load(html);
        let discountPercentage = selTool(".savingsPercentage");
        let productTitle = selTool("#productTitle");
        let productPrice = selTool(".a-price-whole");
        let profileName = selTool(".review .a-profile-name");
        let productImage = selTool("#landingImage");
        let reviewTitle = selTool(".review-title");
        let reviewText = selTool(".reviewText");
        let ratings = selTool(".review-rating .a-icon-alt");
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
        productTwoData = {
          productSite: "Amazon",
          productURL: requestedProductTwoURL,
          productTitle: selTool(productTitle[0]).text().trim(),
          productPrice: selTool(productPrice[0]).text().trim(),
          discount: selTool(discountPercentage[0]).text().trim(),
          productReviews: productReviews,
          productImg: productImage.attr().src,
        };
        productsData.push(productTwoData);

        const comparedData = {
          productsSite: "Amazon",
          productOneData: productsData[0],
          productTwoData: productsData[1],
        };
        // console.log(comparedData);
        ProductsComparison.create(comparedData, (err, data) => {
          if (err) {
            console.log(err + "Error Inserting Data");
          } else {
            console.log("Data Successfully Inserted");
          }
        });
      };
    }
  } else if (requestedProductsCompany == "Flipkart") {
    if (requestedProductOneURL && requestedProductTwoURL) {
      const productOneCB = (error, respone, html) => {
        handleProductOneHTML(html);
      };
      const productTwoCB = (error, response, html) => {
        handleProductTwoHTML(html);
      };
      request(requestedProductOneURL, productOneCB);
      request(requestedProductTwoURL, productTwoCB);
      let productOneData, productTwoData;
      let productsData = [];
      const handleProductOneHTML = (html) => {
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
          console.log("Wrong link format!");
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
        productOneData = {
          productSite: "Flipkart",
          productURL: requestedProductOneURL,
          productTitle: selTool(productTitle[0]).text().trim(),
          productPrice: selTool(productPrice[0]).text().trim(),
          discount: selTool(discountPercentage[0]).text().trim(),
          productImg: productImage.attr().src,
          productReviews: productReviews,
        };
        productsData.push(productOneData);
      };
      const handleProductTwoHTML = (html) => {
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
          console.log("Wrong link format!");
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
        productTwoData = {
          productSite: "Flipkart",
          productURL: requestedProductTwoURL,
          productTitle: selTool(productTitle[0]).text().trim(),
          productPrice: selTool(productPrice[0]).text().trim(),
          discount: selTool(discountPercentage[0]).text().trim(),
          productImg: productImage.attr().src,
          productReviews: productReviews,
        };

        productsData.push(productTwoData);
        const comparedData = {
          productsSite: "Flipkart",
          productOneData: productsData[0],
          productTwoData: productsData[1],
        };
        ProductsComparison.create(comparedData, (err, data) => {
          if (err) {
            console.log(err + "Error Inserting Data");
          } else {
            console.log("Data Successfully Inserted");
          }
        });
        // res.json(productsData);
      };
    }
  } else {
    console.log("Site Not matched");
  }
};

exports.productsComparedData = (req, res, next) => {
  ProductsComparison.find((err, comparedData) => {
    if (err) {
      res.json(err);
    } else {
      res.json(comparedData);
      // console.log(user);
    }
  });
};
