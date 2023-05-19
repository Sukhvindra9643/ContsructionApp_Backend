const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var serviceQuerySchema = new mongoose.Schema({
  servicename: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true
  },
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  sellername:{
    type:String,
    required:true
  },
  sellermobile:{
    type:String,
    required:true
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

//Export the model
module.exports = mongoose.model("Servicequery", serviceQuerySchema);
