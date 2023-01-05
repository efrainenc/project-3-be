
const express = require('express');
const router = express.Router();
const {User} = require('../models');
router.use(express.json());

// Mongoose connection
require("../config/db.connection");
const { handleValidateOwnership, requireToken } = require("../config/auth");

// middleware to print out the HTTP method and the URL path for every request to our terminal
router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

///////////////////////////////
// Routes
////////////////////////////////
console.log(User)

// Index Route
// router.get("/", async(req, res, next)=>
// {
//   try
//   {
//     const users = await User.find({})
//     .populate('name', 'username -_id').exec()
//     res.status(200).json(users)
//   }catch(err)
//   {
//     console.error(err)
//     return next(err)
//   }
// });

// // Create Route  Register Creates User
// //  requireToken,
// router.post("/", async(req, res, next)=>
// {
//   try {

//     //const owner = req.user._id
//     //req.body.owner = owner
//     const createdUser = await User.create(req.body)
//     console.log(createdUser)
//     res.status(201).json(createdUser)
//   } catch(err){
//     console.error(err)
//     return next(err)
//   }
// });


// Show Route
router.get('/:id', async(req, res, next)=>
{
  try {
    const foundUser = await User.findById(req.params.id)

    console.log(foundUser)
    res.status(200).json(foundUser)
  } catch (err) {
    console.error(err)
    return next(err)
  }
});

// Delete Route
//  requireToken,
router.delete("/:id", async(req, res, next)=>
{
  try
  {
    //handleValidateOwnership(req, await People.findById(req.params.id));
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    console.log(deletedUser)
    res.status(200).json(deletedUser);
    res.redirect('/')
  } catch(err)
  {
    console.error(err)
    return next(err)
  }
});

// Update Route
//  requireToken,
router.put("/:id", async(req, res, next)=>
{
  try {
    //handleValidateOwnership(req, await People.findById(req.params.id))
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(updatedUser)
    return res.status(200).json(updatedUser)
  } catch(err){
    console.error(err)
    return next(err)
  }
});

// Logout make sure this is in the RIGHT LOCATION
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