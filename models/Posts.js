///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const postSchema = new mongoose.Schema(
{
  image: String,
  caption: String,
},{timestamps: true});

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts
