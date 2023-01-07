const express = require('express')
const router = express.Router()


const db = require('../models')

// middleware to print out the HTTP method and the URL path for every request to our terminal
router.use((req, res, next) => {    
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});


// index route (GET HTTP VERB)
router.get('/', async (req, res, next) => {
  try {

    const aggregateResult = await db.Post.aggregate([
      {$lookup:{
                 from: "comments",
                 localField: "_id",
                 foreignField: "post_id",
                 as: "post_comments"
       }  }
    ])
    // need to use a .then because aggregate returns a promise instead of a function
    res.status(200).json(aggregateResult)
  } catch (error) {
    
    return next(error)
  }
});


module.exports = router;



