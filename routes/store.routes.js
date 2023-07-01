const router = require('express').Router();
const Store = require('../models/Store.model');
const mongoose = require('mongoose');
const fileUploader = require('../config/cloudinary.config');

// // Route to create the store
// router.post('/projects', async (req, res, next) => {
//   const { title, description, imgUrl } = req.body;

//   try {
//     const newProject = await Project.create({
//       title,
//       description,
//       imgUrl,
//       tasks: []
//     });
//     res.json(newProject);
//   } catch (error) {
//     console.log('An error occurred creating a new project', error);
//     next(error);
//   }
// });
