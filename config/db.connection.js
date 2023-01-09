
///////////////////////////////
// DEPENDENCIES
////////////////////////////////

//importing dotenv to init envir var for testing
require("dotenv").config()

// pull PORT from .env, give default value of 4000
const mongoose = require('mongoose');
const {MONGODB_URI} = process.env

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)

// Connection Events
mongoose.connection
  .on("open", () => console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`))
  .on("close", () => console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'))
  .on("error", (error) => console.log('MongoDB connection error 😥', error));
