const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema(
{
  image: {type: String, required: [true, " need an image"]},
  caption: String,
  owner: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post