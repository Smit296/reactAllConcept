var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
var cors = require("cors");
const dotenv = require('dotenv');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(cors());
dotenv.config();

const blogControllers = require("./Controller/Blog");
const FarmerController = require("./Controller/bank/Farmer");
const BankController = require("./Controller/bank/Bank");
const LoanController = require("./Controller/bank/LoanScheme");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://eagle-ecommerce-app:eagle-ecommerce-app@ecommerce-app-ll9yl.mongodb.net/ecommerce-app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
let db = mongoose.connection;
db.once("open", function () {
  console.log("connected to mongodb");
});
//check for DB errors
db.on("error", function (err) {
  console.log(err);
});

// Auth Router
app.use("/oauth", require("./Controller/Outh"));

// Routes
app.use("/user", require("./Controller/User"));
app.use("/address", require("./Controller/Address"));
app.use("/product", require("./Controller/Product"));
app.use("/conprd", require("./Controller/ConnectProduct"));
app.use("/join", require("./Controller/Join"));
app.use("/company", require("./Controller/Company"));

//route for blog
app.post("/blog_create", blogControllers.create);
app.get("/blog_get", blogControllers.get);
app.post("/blog_update", blogControllers.update);
app.post("/adminlogin", blogControllers.login);
app.post("/blog_delete", blogControllers.delete);

//route for banks
app.use("/farmer_create", FarmerController.create);
app.use("/farmer_get", FarmerController.get);
app.use("/farmer_delete", FarmerController.delete);
app.use("/bank_create", BankController.create);
app.use("/bank_get", BankController.get);
app.post("/bank_login", BankController.login);
app.post("/bank_check", BankController.checkBank);
app.use("/loan_create", LoanController.create);
app.use("/loan_get", LoanController.get);

//Heroku Config
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

module.exports = app;
