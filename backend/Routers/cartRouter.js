const express = require('express')
const { addToCart, viewCart, updateCart, removeFromCart } = require('../Controllers/cartController')
const { isAuthenticatedUser } = require('../Middleware/auth')
const cartRouter = express.Router()

cartRouter.post('/', isAuthenticatedUser, addToCart)
cartRouter.get('/:id', isAuthenticatedUser, viewCart)
cartRouter.put('/:id', isAuthenticatedUser, updateCart)
cartRouter.delete('/:id', isAuthenticatedUser, removeFromCart)

module.exports = cartRouter
