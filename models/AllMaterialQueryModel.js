const mongoose = require("mongoose");

const materialQuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
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
  locality: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  materials: [],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
  },
  expireAt: {
    type: Date,
  },
});

module.exports = mongoose.model("materialQuery", materialQuerySchema);
