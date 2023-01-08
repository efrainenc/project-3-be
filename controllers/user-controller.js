
const express = require('express')
const router = express.Router()

//import model
const db = require('../models')
const { handleValidateOwnership, requireToken } = require("../config/auth");


// middleware to print out the HTTP method and the URL path for every request to our terminal
router.use((req, res, next) => {    
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});

// index route (GET HTTP VERB)
// this route will catch GET requests to /products/ and respond with all the products
router.get('/', async (req, res) => { 
	try {
			const post = await db.User.find({}).populate().exec()
			res.status(200).json(post)
	} catch (error) {
			console.error(error)
			return next(error)
	}
});

// show route (GET HTTP VERB)
// this route will catch GET requests to /products/index/ and respond with a single product
router.get('/:id', async (req, res, next) => { // might have removed a requiredToken late night note
try {
	const foundPost = await db.User.findById(req.params.id)
	.populate()
	.exec();
	console.log(foundPost)
	res.status(200).json(foundPost)
} catch (error) {
	console.error(error)
	return next(error)
}
});

// update route (PUT HTTP VERB)
router.put("/:id", requireToken, async (req, res) => {
	try {
		console.log(req.params)
		handleValidateOwnership(req, await db.User.findById(req.params.id))
		const updatedUser = await db.User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json(updatedUser)
	} catch (error) {
		//send error
		res.status(400).json({error: error.message})
	}
})

module.exports = router