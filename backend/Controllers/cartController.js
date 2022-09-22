const Cart = require('../Models/cartModel')
const constants = require('../Constants/constants')
const ObjectId = require('mongoose').Types.ObjectId

const addToCart = async (req, res) => {
    try {
        let cart;
        const existproduct = await Cart.findOne({ userId: req.body.userId, productId: req.body.productId })
        if (existproduct)
            throw "This product already exists in your cart."
        cart = new Cart({
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity
        })

        await cart.save()
        const message = "Added to cart successfully"
        return res.status(constants.CREATED).json({ cart, message })
    }
    catch (err) {
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

const viewCart = async (req, res) => {
    try {
        let cart;
        cart = await Cart.find({userId:req.params.id}).populate({ path: 'productId'})
        if (cart.length <= 0) {
            throw "No products found in cart"
        }
        const cartCount = cart.length
        return res.status(constants.SUCCESS).json({ cart, cartCount })
    }
    catch (err) {
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

const updateCart = async (req, res) => {
    try {
        let cart;
        if (!ObjectId.isValid(req.params.id)) {
            throw "No cart"
        }
        cart = await Cart.findByIdAndUpdate(req.params.id, {quantity: req.body.quantity})
        
        await cart.save()
        const message = "Updated quantity"
        return res.status(constants.CREATED).json({ cart, message })
    }
    catch (err) {
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

const removeFromCart = async (req, res) => {
    try {
        let cart;
        if (!ObjectId.isValid(req.params.id)) {
            throw "No cart"
        }
        cart = await Cart.findByIdAndDelete(req.params.id)
        
        await cart.save()
        const message = "Removed from cart"
        return res.status(constants.CREATED).json({ cart, message })
    }
    catch (err) {
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

module.exports = { addToCart, viewCart, updateCart, removeFromCart }
