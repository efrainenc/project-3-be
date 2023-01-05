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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{timestamps: true});

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts
