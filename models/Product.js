const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, },
    img: { type: String },
    categories: { type: Array },
    size: { type: String },
    price: { type: Number },
    sku: {  type: String, required: true },
}, 
{ timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)