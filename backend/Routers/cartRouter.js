const express = require('express')
const { addToCart, viewCart } = require('../Controllers/cartController')
const cartRouter = express.Router()

cartRouter.post('/',addToCart)
cartRouter.get('/',viewCart)

module.exports = cartRouter
