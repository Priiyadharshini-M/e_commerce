const mongoose=require('mongoose')
const User = require('./userModel')
const Product = require('./productModel')

const schema=mongoose.Schema;
const cartSchema=new schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports=mongoose.model('Cart',cartSchema)