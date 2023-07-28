const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number }
    }
  ],
  status: {
    type: String,
    enum: [
      'cart',
      'new',
      'preparing',
      'ready',
      'delivering',
      'delivered',
      'canceled'
    ],
    required: true
  },
  total: { type: Number },
  shipping: { type: Number }
});
module.exports = model('Order', orderSchema);
