const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// config
require("dotenv").config({ path: "./config/config.env" });

app.use("/api/v1/stripe",express.raw({type:"*/*"}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports
const user = require("./routes/userRoute");
const service = require("./routes/serviceRoute");
const category = require("./routes/categoryRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1",user);
app.use("/api/v1",service);
app.use("/api/v1",category);
app.use("/api/v1",payment);

// Middleware for error
app.use(errorMiddleware);


module.exports = app; 