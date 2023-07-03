const router = require('express').Router();
const Product = require('../models/Product-model');
const mongoose = require('mongoose');
const fileUploader = require('../config/cloudinary.config');

//Get Product by ID

router.get('/products/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    //check if ID is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }

    const getProduct = await Product.findById(productId).populate('store');

    if (!getProduct) {
      return res.status(404).json({ message: 'No Product found with that ID' });
    }
    res.json(getProduct);
  } catch (error) {
    console.log('There was an error retrieving the Product', error);
    next(error);
  }
});
// Create Product
router.post('/products', async (req, res, next) => {
  const { name, store, img, price, stock } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      img,
      store,
      price,
      stock
    });
    res.json(newProduct);
  } catch (error) {
    console.log('An error occurred creating a new product', error);
    next(error);
  }
});

// Update the Product Details

router.put('/products/:productId', async (req, res, next) => {
  const { name, img, price, stock } = req.body;
  const { productId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      { name, img, price, stock },
      { new: true }
    ).populate('store');
    res.json(updateProduct);
  } catch (error) {
    console.log('An error occurred updating the Product', error);
    next(error);
  }
});

// Route to delete the product
router.delete('/products/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }
    const deleteProduct = await Product.findByIdAndDelete(productId, {
      new: true
    });
    res.json({
      message: `Product with ID ${productId} was deleted successfully`
    });
  } catch (error) {
    console.log('An error occurred deleting the product', error);
    next(error);
  }
});

module.exports = router;
