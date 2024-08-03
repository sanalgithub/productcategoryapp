const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
});
const category = mongoose.model("Category", categorySchema);
module.exports = category;
