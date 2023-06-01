const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Service Name"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Your Service Price"],
  },
  public_id:[],
  url:[],
  rating: {
    type: String,
    required: [true, "Please Enter Your Rating"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
