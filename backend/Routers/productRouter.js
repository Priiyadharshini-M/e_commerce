const express = require('express')
const productRouter = express.Router()
const { addProduct, viewAllProducts, viewProduct } = require('../Controllers/productController')

productRouter.post('/',addProduct)
productRouter.get('/',viewAllProducts)
productRouter.get('/product/:id',viewProduct)

module.exports = productRouter