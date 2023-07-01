const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  store: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  status: {
    type: String,
    enum: ['new', 'preparing', 'ready', 'delivering', 'delivered', 'canceled'],
    required: true
  },
  total: { type: Number }
});
module.exports = model('Project', orderSchema);
