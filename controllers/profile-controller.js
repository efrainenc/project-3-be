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
// This route will catch GET requests to /follow/ and respond with all the user profiles
router.get('/', async (req, res) => 
{ 
	try 
	{
		const profile = await db.Profile.find({})
		.populate('owner', 'username -_id')
		.exec()
		res.status(200).json(profile)
	} catch (error) 
	{
		return next(error)
	}
});

// Show route (GET HTTP VERB)
// This route will catch GET requests to /follow/index/ and respond with a single user profile
router.get('/:id', async (req, res, next) => 
{ 
	try 
	{
		const foundProfile = await db.Profile.findById(req.params.id)
		.populate("owner")
		.exec();
		res.status(200).json(foundProfile)
	} catch (error) 
	{
		return next(error)
	}
});

// Create route (POST HTTP VERB)
// Send data to create a new user profile
// Passport will verify the the token passed with the request's Authorization headers and set the current user for the request (req.user).
router.post("/", requireToken, async (req, res, next) => 
{
  try 
	{
		const owner = req.user._id
		req.body.owner = owner
    const newProfile = await db.Profile.create(req.body);
    res.status(201).json(newProfile);
  } catch (err) 
	{
    res.status(400).json({error: err.message,});
  }
});

// Update route (PUT HTTP VERB)
// Send data to update user profile
router.put("/:id", requireToken, async (req, res) => 
{
	try 
	{
		handleValidateOwnership(req, await db.Profile.findById(req.params.id))
		const updatedProfile = await db.Profile.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json(updatedProfile)
	} catch (error) 
	{
		res.status(400).json({error: error.message})
	}
})

// Destroy route (DELETE HTTP VERB)
// Send data to delete user profile
router.delete("/:id", requireToken, async (req, res, next) => 
{
  try 
	{
    handleValidateOwnership(req, await db.Profile.findById(req.params.id));
    const deletedProfile = await db.Profile.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedProfile);
  } catch (err) 
	{
    res.status(400).json({ error: err.message });
  }
});

module.exports = router