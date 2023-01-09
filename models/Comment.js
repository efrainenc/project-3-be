const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
{
  comment: {type: String, required: [true, "need an comment"]},
  post_id: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  owner: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment