const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Category", categorySchema);
