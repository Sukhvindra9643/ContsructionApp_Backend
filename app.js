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

app.get("/",(req,res)=>{
    res.sendFile("index.html",{root: __dirname});
})

// Route imports
const user = require("./routes/UserRoute");
const service = require("./routes/OtherServiceCreateRoute");
const category = require("./routes/MaterialServiceCreateRoute");
const payment = require("./routes/paymentRoute");
const materialQuery = require("./routes/AllMaterialQueryRoutes");
const materialContact = require("./routes/MyMaterialContactRoute");
const ServiceQuery = require("./routes/ServiceBookingRoutes");

app.use("/api/v1",user);
app.use("/api/v1",service);
app.use("/api/v1",category);
app.use("/api/v1",payment);
app.use("/api/v1",materialQuery);
app.use("/api/v1",materialContact);
app.use("/api/v1",ServiceQuery);
app.use("/api/v1",require("./routes/AllQueryServiceRoute"));
app.use("/api/v1",require("./routes/MyQueryServiceRoute"));


// Middleware for error
app.use(errorMiddleware);


module.exports = app; 