const mongoose = require("mongoose");

const MyQueryServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  charge:{
    type: Number,
    required: true,
  },
  serviceId : {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default : Date.now()
  },
});

module.exports = mongoose.model("myqueryService", MyQueryServiceSchema);
