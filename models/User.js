///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const userSchema = new mongoose.Schema(
{
  name: String,
  email: String,
  username:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  avatar: String,
},
{
  timestamps: true,
  toJSON:{
    virtuals: true,
    // ret is the returned Mongoose document
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
}
);

const User = mongoose.model("User", userSchema);

module.exports = User
