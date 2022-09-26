const express = require('express')
const { orders, viewOrder, cancelOrder} = require('../Controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/',orders)
orderRouter.get('/:id',viewOrder)
orderRouter.put('/:id',cancelOrder)

module.exports = orderRouter