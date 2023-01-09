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
// This route will catch GET requests to /follow/ and respond with all the user posts
router.get('/', async (req, res) => 
{ 
	try 
	{
		const post = await db.Post.find({})
		.populate('owner')
		.exec()
		res.status(200).json(post)
	} catch (error) 
	{
		return next(error)
	}
});

// Show route (GET HTTP VERB)
// This route will catch GET requests to /follow/index/ and respond with a single user post
router.get('/:id', async (req, res, next) => 
{ 
	try 
	{
		const foundPost = await db.Post.findById(req.params.id)
		.populate("owner")
		.exec();
		res.status(200).json(foundPost)
	} catch (error) 
	{
		return next(error)
	}
});

/// Create route (POST HTTP VERB)
// Send data to create a new user post
// Passport will verify the the token passed with the request's Authorization headers and set the current user for the request (req.user).
router.post("/", requireToken, async (req, res, next) => 
{
  try 
	{
		const owner = req.user._id
		req.body.owner = owner
    const newPost = await db.Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) 
	{
    res.status(400).json({error: err.message,});
  }
});

// Update route (PUT HTTP VERB)
// Send data to update user post
router.put("/:id", requireToken, async (req, res) => 
{
	try 
	{
		handleValidateOwnership(req, await db.Post.findById(req.params.id))
		const updatedPost = await db.Post.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json(updatedPost)
	} catch (error) 
	{
		res.status(400).json({error: error.message})
	}
})

// Destroy route (DELETE HTTP VERB)
// Send data to delete user post
router.delete("/:id", requireToken, async (req, res, next) => 
{
  try 
	{
    handleValidateOwnership(req, await db.Post.findById(req.params.id));
    const deletedPost = await db.Post.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedPost);
  } catch (err) 
	{
    res.status(400).json({ error: err.message });
  }
});

module.exports = router