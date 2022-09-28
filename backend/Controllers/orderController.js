const Order = require('../Models/orderModel')
const User = require('../Models/userModel')
const constants = require('../Constants/constants')
const ObjectId = require('mongoose').Types.ObjectId

const orders = async (req, res) => {
    try {
        let order;
        order = new Order({
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            amount: req.body.amount
        })

        await order.save()
        const message = "Order placed successfully"
        return res.status(constants.CREATED).json({ order, message })
    }
    catch (err) {
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

const viewOrder = async (req, res) => {
    try {
        let order, user;
        user = await User.find({_id:req.params.id},{role:1})
        if(user[0].role === constants.USER){
        order = await Order.find({userId:req.params.id}).populate({ path: 'productId'})
        }
        if(user[0].role === constants.ADMIN){
            order = await Order.find().populate([{ path: 'productId'},{path : 'userId'}])
        }
        if (order.length <= 0) {
            throw "No orders found"
        }
        const orderCount = order.length
        return res.status(constants.SUCCESS).json({ order, orderCount })
    }
    catch (err) {
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

const cancelOrder = async (req, res) => {
    try {
        let order;
        if (!ObjectId.isValid(req.params.orderId)) {
            throw "No orders"
        }
        order = await Order.findByIdAndUpdate(req.params.orderId, {status: constants.CANCELLED})
    
        const message = "Order cancelled"
        return res.status(constants.SUCCESS).json({ order, message })
    }
    catch (err) {
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

module.exports = { orders, viewOrder, cancelOrder }