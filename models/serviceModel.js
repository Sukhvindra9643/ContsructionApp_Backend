const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Service Name"],
  },
  bname: {
    type: String,
    required: [true, "Please Enter Your Business Name"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Your Service Price"],
  },
  images: [
    {
      public_id: [{
        type: String,
      }],
      url: [{
        type: String,
      }],
    },
  ],
  category:{
    type:String,
    required : true,
  },
  subcategory:{
    type:String,
    required : true,
  },
  desc: {
    type: String,
    required: [true, "Please Enter Your Service Description"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
