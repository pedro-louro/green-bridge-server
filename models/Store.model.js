const { Schema, model } = require('mongoose');

const storeSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String },
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});
module.exports = model('Store', storeSchema);
