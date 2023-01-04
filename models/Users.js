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
  username: String,
  password: String,
});

const Users = mongoose.model("User", userSchema);

module.exports = Users
