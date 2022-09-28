const express = require('express')
const { orders, viewOrder, cancelOrder} = require('../Controllers/orderController')
const { isAuthenticatedUser } = require('../Middleware/auth')
const orderRouter = express.Router()

orderRouter.post('/',isAuthenticatedUser,orders)
orderRouter.get('/:id',isAuthenticatedUser,viewOrder)
orderRouter.put('/:orderId',isAuthenticatedUser,cancelOrder)

module.exports = orderRouter