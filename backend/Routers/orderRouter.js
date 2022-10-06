const express = require('express')
const orderRouter = express.Router()
const { orders, viewOrder, cancelOrder} = require('../Controllers/orderController')
const { isAuthenticatedUser } = require('../Middleware/auth')

orderRouter.post('/',isAuthenticatedUser,orders)
orderRouter.get('/:id',isAuthenticatedUser,viewOrder)
orderRouter.put('/:orderId',isAuthenticatedUser,cancelOrder)

module.exports = orderRouter