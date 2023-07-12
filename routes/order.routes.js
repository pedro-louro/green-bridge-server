const router = require('express').Router();
const Order = require('../models/Order-model');
const mongoose = require('mongoose');

// Create Order
router.post('/orders', async (req, res, next) => {
  const { store, user, products, status, total } = req.body;

  try {
    const newOrder = await Order.create({
      store,
      user,
      products,
      status,
      total
    });

    res.json(newOrder);
  } catch (error) {
    console.log('An error occurred creating a new product', error);
    next(error);
  }
});

// Get Details of an order

router.get('/orders/:orderId', async (req, res, next) => {
  const { orderId } = req.params;

  try {
    //check if ID is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }

    const getOrder = await Order.findById(orderId).populate('products');

    if (!getOrder) {
      return res.status(404).json({ message: 'No Order found with that ID' });
    }
    res.json(getOrder);
  } catch (error) {
    console.log('There was an error retrieving the Order', error);
    next(error);
  }
});

router.put('/orders/:orderId', async (req, res, next) => {
  const { status, products } = req.body;
  const { orderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }
    if (
      status !== 'cart' &&
      status !== 'new' &&
      status !== 'preparing' &&
      status !== 'ready' &&
      status !== 'delivering' &&
      status !== 'delivered' &&
      status !== 'canceled'
    ) {
      return res
        .status(400)
        .json({ message: 'Please use a valid Order Status' });
    }
    let updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('products');

    if (products) {
      updateOrder = await Order.findByIdAndUpdate(orderId, {
        $push: { products: products }
      }).populate('products');
    }

    res.json(updateOrder);
  } catch (error) {
    console.log('An error occurred updating the Order', error);
    next(error);
  }
});

module.exports = router;
