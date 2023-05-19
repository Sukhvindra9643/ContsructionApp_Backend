const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");



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
const materialQuery = require("./routes/materialQueryRoutes");
const materialContact = require("./routes/materialContactRoute");
const ServiceQuery = require("./routes/serviceQueryRoutes");
app.use("/api/v1",user);
app.use("/api/v1",service);
app.use("/api/v1",category);
app.use("/api/v1",payment);
app.use("/api/v1",materialQuery);
app.use("/api/v1",materialContact);
app.use("/api/v1",ServiceQuery);

// Middleware for error
app.use(errorMiddleware);


module.exports = app; 