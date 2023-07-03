const router = require('express').Router();
const Order = require('../models/Order-model');
const mongoose = require('mongoose');

// Create Order
// router.post('/orders', async (req, res, next) => {
//   const { store, user, products, status, total } = req.body;

//   const arrayProducts = [...products];
//   console.log('PRODUCTS HEREEEEEEEEEEEEEEEEE');
//   console.log(products);

//   try {
//     const newOrder = await Order.create({
//       store,
//       user,
//       products: [],
//       status,
//       total
//     });

//     const pushProducts = async () => {
//       for (product of products) {
//         const finalPush = await Order.findByIdAndUpdate(
//           newOrder._id,
//           {
//             $push: { products: product }
//           },
//           { new: true }
//         );
//       }
//     };
//     pushProducts();

//     res.json(newOrder);
//   } catch (error) {
//     console.log('An error occurred creating a new product', error);
//     next(error);
//   }
// });
module.exports = router;
