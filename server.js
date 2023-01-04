///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize dotenv
require("dotenv").config();
require("./config/db.connection");

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT, MONGODB_URI } = process.env;
const cors = require('cors')
const morgan = require('morgan')

// import express
const express = require("express");

const peopleController = require('./controllers/home-controller')

// create application object
const app = express();

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(cors()) // allows for cross origin request - open channel
app.use(morgan('dev')) // morgan request logger (for dev)
app.use(express.json()) // allows us to parse json data
app.use('/people', peopleController)

///////////////////////////////
// ROUTES
////////////////////////////////

app.get('/', (req, res)=>res.redirect('/people'))

// // Basic error handling for bad product indexes
// app.get('/error', (req,res)=>{
//   res.status(500).send('something went wrong...')
// })

// // Error handling using the next argument + middleware
// app.use((error, req,res,next)=>{
//   if(error){
//       return res.status(404).send(error.message)
//   }
//   next()
// })

// // wild card / 404 if not using error handling middleware 
// app.get('*', (req,res,next)=>{
//   if(req.error){
//       res.status(404).send(`Error: ${req.error.message}`)
//   }else {
//       res.redirect('/error/')
//   }
// })

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));