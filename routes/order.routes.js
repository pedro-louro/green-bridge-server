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

    const getOrder = await Order.findById(orderId).populate(
      'products.product user store'
    );

    if (!getOrder) {
      return res.status(404).json({ message: 'No Order found with that ID' });
    }
    res.json(getOrder);
  } catch (error) {
    console.log('There was an error retrieving the Order', error);
    next(error);
  }
});

// Get list of orders for given User

router.get('/orders/user/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const getOrders = await Order.find({ user: userId }).populate(
      'products store'
    );

    if (!getOrders) {
      return res.status(404).json({ message: 'No Orders found for that user' });
    }
    res.json(getOrders);
  } catch (error) {
    console.log('There was an error retrieving the Order', error);
    next(error);
  }
});

// Get list of orders for given Driver

router.get('/orders/', async (req, res, next) => {
  const { driver } = req.query;
  try {
    const getOrders = await Order.find({ driver: driver }).populate(
      'store products.product user'
    );

    if (!getOrders) {
      return res
        .status(404)
        .json({ message: 'No Orders found for that status' });
    }
    res.json(getOrders);
  } catch (error) {
    console.log('There was an error retrieving the Order', error);
    next(error);
  }
});

// Get list of orders for given Order Status

router.get('/orders/', async (req, res, next) => {
  const { status } = req.query;
  try {
    const getOrders = await Order.find({ status: status }).populate('store');

    if (!getOrders) {
      return res
        .status(404)
        .json({ message: 'No Orders found for that status' });
    }
    res.json(getOrders);
  } catch (error) {
    console.log('There was an error retrieving the Order', error);
    next(error);
  }
});

router.put('/orders/:orderId', async (req, res, next) => {
  const { status, products, total, driver } = req.body;
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
      { status, total, driver },
      { new: true }
    ).populate('products');

    // Built to receive one single product for now
    if (products) {
      console.log(`Products`);

      console.log(products.quantity);
      // Check if product to be added/updated exists in the existing order
      const productExists = updateOrder.products.filter(
        existingProduct =>
          existingProduct.product.toString() === products.product
      );
      console.log('Product Exists');
      console.log(productExists);

      if (productExists.length) {
        //If the product exists, find it's index
        const productIndex = updateOrder.products.findIndex(
          element => element.product.toString() === products.product
        );

        //IF the quantity is 0, remove the product from the array
        if (products.quantity === 0) {
          updateOrder.products.splice(productIndex, 1);
        } else {
          // update the array of products by it's index (find witht the product ID) to set the new quantity
          updateOrder.products[productIndex].quantity = products.quantity;
        }

        // send the new array of products to the DB
        updateOrder = await Order.findByIdAndUpdate(orderId, {
          products: updateOrder.products
        }).populate('products');
      } else {
        updateOrder = await Order.findByIdAndUpdate(orderId, {
          $push: { products: products }
        }).populate('products');
      }
    }

    res.json(updateOrder);
  } catch (error) {
    console.log('An error occurred updating the Order', error);
    next(error);
  }
});

router.delete('/orders/:orderId', async (req, res, next) => {
  const { orderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Please use a valid ID' });
    }
    const deleteOrder = await Order.findByIdAndDelete(orderId, {
      new: true
    });
    res.json({
      message: `Order with ID ${orderId} was deleted successfully`
    });
  } catch (error) {
    console.log('An error occurred deleting the order', error);
    next(error);
  }
});

module.exports = router;
