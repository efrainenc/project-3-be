///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const commentSchema = new mongoose.Schema(
{
  comment: String,
  //postID: String,
  //authorID: String,
},{timestamps: true});

const Comments = mongoose.model("Post", commentSchema);

module.exports = Comments