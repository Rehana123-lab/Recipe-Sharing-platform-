const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  steps: [String],
  image: String, // optional for image upload later
  createdBy: { type: String}, // username string instead of ObjectId
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);