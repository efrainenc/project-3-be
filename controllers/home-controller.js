
const express = require('express');
const router = express.Router();
const {Posts} = require('../models');
router.use(express.json());

// Mongoose connection
require("../config/db.connection");

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
router.post("/", async(req, res, next)=>
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
router.delete("/:id", async(req, res, next)=>
{
  try
  {
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
router.put("/:id", async(req, res, next)=>
{
  try {
    const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(updatedPost)
    return res.status(200).json(updatedPost)
  } catch(err){
    console.error(err)
    return next(err)
  }
});

module.exports = router
