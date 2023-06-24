const mongoose = require("mongoose");

const materialContactSchema = new mongoose.Schema({
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
  locality:{
    type: String,
    required: true,
  },
  unit:{
    type: String,
    required: true,
  },
  charge:{
    type:Number,
    required:true
  },
  materials: [],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  queryId:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("materialcontact", materialContactSchema);
