const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema(
{
  username: 
  {
    type: String,
    required: true,
    unique: true,
  },
  password: 
  {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
  id: false, // hides the id of the user
  toJSON: 
  {
    virtuals: true,
    // ret is the returned Mongoose document
    transform: (_doc, ret) => 
    {
      delete ret.password;
      return ret;
    },
  },
})

const User = mongoose.model("User", UserSchema)

module.exports = User