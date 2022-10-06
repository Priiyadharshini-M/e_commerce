const express = require('express')
const cartRouter = express.Router()
const { addToCart, viewCart, updateCart, removeFromCart } = require('../Controllers/cartController')
const { isAuthenticatedUser } = require('../Middleware/auth')

cartRouter.post('/', isAuthenticatedUser, addToCart)
cartRouter.get('/:id', isAuthenticatedUser, viewCart)
cartRouter.put('/:cartId', isAuthenticatedUser, updateCart)
cartRouter.delete('/:cartId', isAuthenticatedUser, removeFromCart)

module.exports = cartRouter
