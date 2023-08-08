const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dx4xl.mongodb.net/${process.env.PROJECT_NAME}?retryWrites=true&w=majority`;

const connectDB = () => {
  return mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log("Database connected!"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
