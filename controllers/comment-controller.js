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
// This route will catch GET requests to /comment/ and respond with all the comments
router.get('/', async (req, res) => 
{ 
	try 
	{
		const comment = await db.Comment.find({})
		.populate('post_id').populate('owner', '-_id')
		.exec()
		res.status(200).json(comment)
	} catch (error) 
	{
		return next(error)
	}
});

// Show route (GET HTTP VERB)
// This route will catch GET requests to /comment/index/ and respond with a single comment
router.get('/:id', async (req, res, next) => 
{ 
	try 
	{
		const foundComment = await db.Comment.findById(req.params.id)
		.populate('post_id').populate('owner', '-_id')
		.exec();
		res.status(200).json(foundComment)
	} catch (error) 
	{
		return next(error)
	}
});

// Create route (POST HTTP VERB)
// Send data to create a new comment
// Passport will verify the the token passed with the request's Authorization headers and set the current user for the request (req.user).
router.post("/", requireToken, async (req, res, next) => 
{
  try 
	{
		const owner = req.user._id
		req.body.owner = owner
    const newComment = await db.Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) 
	{
    res.status(400).json({error: err.message,});
  }
});

// Update route (PUT HTTP VERB)
// Send data to update comment
router.put("/:id", requireToken, async (req, res) => 
{
	try 
	{
		handleValidateOwnership(req, await db.Comment.findById(req.params.id))
		const updatedComment = await db.Comment.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json(updatedComment)
	} catch (error) 
	{
		res.status(400).json({error: error.message})
	}
})

// Destroy route (DELETE HTTP VERB)
// Send data to delete comment
router.delete("/:id", requireToken, async (req, res, next) => 
{
  try 
	{
    handleValidateOwnership(req, await db.Comment.findById(req.params.id));
    const deletedComment = await db.Comment.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedComment);
  } catch (err) 
	{
    res.status(400).json({ error: err.message });
  }
});

module.exports = router