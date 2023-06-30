const mongoose = require("mongoose");

const QueryServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serviceName: {
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

module.exports = mongoose.model("queryService", QueryServiceSchema);
