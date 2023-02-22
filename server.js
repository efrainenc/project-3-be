
///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// Initialize dotenv
require("dotenv").config();

// Import configuration to mongoDB using mongoose
require("./config/db.connection");

// Pull PORT from .env, Cors and morgan dependencies , Import express
const { PORT } = process.env;
const cors = require('cors')
const morgan = require('morgan')
const express = require("express");

// Import controllers and set them as variables
const authController = require("./controllers/auth");
const postController = require('./controllers/post-controller')
const commentController = require('./controllers/comment-controller')
const aggregateController = require('./controllers/aggregate-controller')
const profileController = require('./controllers/profile-controller')
const followController = require('./controllers/follow-controller')

// Create application object as express
const app = express();
const io = require('socket.io')();

///////////////////////////////
// MIDDLEWARE
////////////////////////////////

// For cross origin request - open channel , morgan request logger (for dev), and parse json data
app.use(cors()) 
app.use(morgan('dev'))
app.use(express.json()) 

// Controller middleware
app.use('/auth', authController)
app.use('/post', postController)
app.use('/comment', commentController)
app.use('/aggregate', aggregateController)
app.use('/profile', profileController)
app.use('/follow', followController)

///////////////////////////////
// ROUTES
////////////////////////////////

io.on('connection', (socket) => {
  console.log('A user connected');
});

// Reroute to /aggregate/ from
app.get('/', (req, res)=>res.redirect('/aggregate'))

// Error handling / 404
app.get('/error', (req,res)=>
{
  res.status(500).send('something went wrong...')
})

app.use((error, req,res,next)=>
{
  if(error)
  {
    return res.status(404).send(error.message)
  }
  next()
})

app.get('*', (req,res,next)=>
{
  if(req.error)
  {
    res.status(404).send(`Error: ${req.error.message}`)
  }else 
  {
    res.redirect('/error/')
  }
})

// Connection to port
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));