const express = require('express')
const { addToCart, viewCart, updateCart, removeFromCart } = require('../Controllers/cartController')
const cartRouter = express.Router()

cartRouter.post('/',addToCart)
cartRouter.get('/:id',viewCart)
cartRouter.put('/:id',updateCart)
cartRouter.delete('/:id',removeFromCart)

module.exports = cartRouter
