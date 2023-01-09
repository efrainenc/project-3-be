const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FollowSchema = new Schema(
{
  following: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: [true]
  },
  owner: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})

const Follow = mongoose.model("Follow", FollowSchema)

module.exports = Follow