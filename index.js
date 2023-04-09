const app = require("./app");
const connectDatabase = require("./config/db")
const cloudinary = require('cloudinary')

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shuting down the server due to Uncaught Exception");
    process.exit(1);
})
// config

require("dotenv").config({ path: "backend/config/config.env" });



// Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// unhandled promise rejection
process.on("unhandledRejection",err => {
    console.log(`Error : ${err.message}`);
    console.log("Shuting down the server due to unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    });
});