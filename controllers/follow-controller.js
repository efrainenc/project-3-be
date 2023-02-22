// Imports
const express = require('express')
const router = express.Router()

// Import models through models/index.js
const db = require('../models')

// Import token validation and requireToken for Auth
const { handleValidateOwnership, requireToken } = require("../config/auth");

// Middleware to print out the HTTP method and the URL path for every request to our terminal
router.use((req, res, next) => 
{    
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});

// Index route (GET HTTP VERB)
// This route will catch GET requests to /follow/ and respond with all the followed users
router.get('/', async (req, res) => 
{ 
	try 
  {
    const follow = await db.Follow.find({})
    .populate('following owner', '-_id')
    .exec()
    res.status(200).json(follow)
	} catch (error) 
  {
    return next(error)
	}
});

// Show route (GET HTTP VERB)
// This route will catch GET requests to /follow/index/ and respond with a single folloed user
router.get('/:id', async (req, res, next) => 
{ 
  try 
  {
    const foundFollow = await db.Follow.findById(req.params.id)
    .populate('owner', '-_id')
    .exec();
    res.status(200).json(foundFollow)
  } catch (error) 
  {
    return next(error)
  }
});

// Create route (POST HTTP VERB)
// Send data to create a new followed user
// Passport will verify the the token passed with the request's Authorization headers and set the current user for the request (req.user).
router.post("/", requireToken, async (req, res, next) => 
{
  try 
  {
		const owner = req.user._id
		req.body.owner = owner
    const newFollow = await db.Follow.create(req.body);
    res.status(201).json(newFollow);
  } catch (err) 
  {
    res.status(400).json({error: err.message,});
  }
});

// Update route (PUT HTTP VERB)
// Send data to update followed user
router.put("/:id", requireToken, async (req, res) => 
{
	try 
  {
		handleValidateOwnership(req, await db.Follow.findById(req.params.id))
		const updatedFollow = await db.Follow.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json(updatedFollow)
	} catch (error) 
  {
		res.status(400).json({error: error.message})
	}
})

// Destroy route (DELETE HTTP VERB)
// Send data to delete followed user
router.delete("/:id", requireToken, async (req, res, next) => 
{
  try 
  {
    handleValidateOwnership(req, await db.Follow.findById(req.params.id));
    const deletedFollow = await db.Follow.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedFollow);
  } catch (err) 
  {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router