const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String },
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  price: { type: Number, required: true },
  stock: { type: Number }
});
module.exports = model('Product', ProductSchema);
