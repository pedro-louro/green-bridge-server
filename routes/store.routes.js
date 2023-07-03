const router = require('express').Router();
const Store = require('../models/Store.model');
const mongoose = require('mongoose');
const fileUploader = require('../config/cloudinary.config');

//Route to Get all the stores

router.get('/stores', async (req, res, next) => {
  try {
    const stores = await Store.find().populate('admin', 'products');
    res.json(stores);
  } catch (error) {
    console.log('There was an error retrieving the stores', error);
    next(error);
  }
});

router.get('/stores/:storeId', async (req, res, next) => {
  const { storeId } = req.params;

  try {
    //check if ID is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }

    const getStore = await Store.findById(storeId).populate(
      'admin',
      'products'
    );

    if (!getStore) {
      return res.status(404).json({ message: 'No Store found with that ID' });
    }
    res.json(getStore);
  } catch (error) {
    console.log('There was an error retrieving the Store', error);
    next(error);
  }
});

// Route to create the store
router.post('/stores', async (req, res, next) => {
  const { name, admin, img, address } = req.body;

  try {
    const newStore = await Store.create({
      name,
      admin,
      img,
      address
    });
    res.json(newStore);
  } catch (error) {
    console.log('An error occurred creating a new store', error);
    next(error);
  }
});

// Route to Update the Store
router.put('/stores/:storeId', async (req, res, next) => {
  const { name, img, address } = req.body;
  const { storeId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }
    const updateStore = await Store.findByIdAndUpdate(
      storeId,
      {
        name,
        img,
        address
      },
      { new: true }
    ).populate('admin', 'products');
    res.json(updateStore);
  } catch (error) {
    console.log('An error occurred updating the store', error);
    next(error);
  }
});

// Route to delete the store
router.delete('/stores/:storeId', async (req, res, next) => {
  const { storeId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }
    const deleteStore = await Store.findByIdAndDelete(storeId, {
      new: true
    });
    res.json({
      message: `Store with ID ${storeId} was deleted successfully`
    });
  } catch (error) {
    console.log('An error occurred deleting the store', error);
    next(error);
  }
});

module.exports = router;
