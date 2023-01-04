
const express = require('express');
const router = express.Router();
const {Posts} = require('../models');
router.use(express.json());

// Mongoose connection
require("../config/db.connection");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

///////////////////////////////
// Routes
////////////////////////////////
console.log(Posts)

// Index Route
router.get("/", async(req, res, next)=>
{
  try
  {
    const posts = await Posts.find({})
    res.status(200).json(posts)
  }catch(err)
  {
    console.error(err)
    return next(err)
  }
});

// Create Route
router.post("/", requireToken, async(req, res, next)=>
{
  try {
    const createdPost = await Posts.create(req.body)
    console.log(createdPost)
    res.status(201).json(createdPost)
  } catch(err){
    console.error(err)
    return next(err)
  }
});


// Show Route
router.get('/:id', async(req, res, next)=>
{
  try {
    const foundPost = await Posts.findById(req.params.id)
    console.log(foundPost)
    res.status(200).json(foundPost)
  } catch (err) {
    console.error(err)
    return next(err)
  }
});

// Delete Route
router.delete("/:id", requireToken, async(req, res, next)=>
{
  try
  {
    handleValidateOwnership(req, await People.findById(req.params.id));
    const deletedPost = await Posts.findByIdAndDelete(req.params.id)
    console.log(deletedPost)
    res.status(200).json(deletedPost);
    res.redirect('/posts')
  } catch(err)
  {
    console.error(err)
    return next(err)
  }
});

// Update Route
router.put("/:id", requireToken, async(req, res, next)=>
{
  try {
    handleValidateOwnership(req, await People.findById(req.params.id))
    const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(updatedPost)
    return res.status(200).json(updatedPost)
  } catch(err){
    console.error(err)
    return next(err)
  }
});



// Logout
router.get( "/logout", requireToken, async (req, res, next) => {
  try {
    const currentUser = req.user.username
		delete req.user
    res.status(200).json({
      message: `${currentUser} currently logged out`,
      isLoggedIn: false,
      token: "",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router
