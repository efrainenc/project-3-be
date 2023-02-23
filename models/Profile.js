const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
{
  usernameProfile: String, 
  imageProfile: String,
  headerImageProfile: String,
  bioProfile: String,
  owner: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})

const Profile = mongoose.model("Profile", ProfileSchema)

module.exports = Profile