///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize dotenv
require("dotenv").config();
require("./config/db.connection");

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;
const cors = require('cors')
const morgan = require('morgan')

// import express
const express = require("express");

const authController = require("./controllers/auth");
const postController = require('./controllers/post-controller')
const commentController = require('./controllers/comment-controller')
const aggregateController = require('./controllers/aggregate-controller')
const profileController = require('./controllers/profile-controller')
const followController = require('./controllers/follow-controller')

// create application object
const app = express();

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(cors()) // allows for cross origin request - open channel
app.use(morgan('dev')) // morgan request logger (for dev)
app.use(express.json()) // allows us to parse json data
app.use('/auth', authController)
app.use('/post', postController)
app.use('/comment', commentController)
app.use('/aggregate', aggregateController)
app.use('/profile', profileController)
app.use('/follow', followController)

///////////////////////////////
// ROUTES
////////////////////////////////

app.get('/', (req, res)=>res.redirect('/aggregate'))

// Error handling
app.get('/error', (req,res)=>{
  res.status(500).send('something went wrong...')
})

app.use((error, req,res,next)=>{
  if(error){
      return res.status(404).send(error.message)
  }
  next()
})

// wild card
app.get('*', (req,res,next)=>{
  if(req.error){
      res.status(404).send(`Error: ${req.error.message}`)
  }else {
      res.redirect('/error/')
  }
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));