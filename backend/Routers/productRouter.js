const express = require('express')
const productRouter = express.Router()
const { addProduct, viewAllProducts, viewProduct, viewFilteredProducts, getProductTypes } = require('../Controllers/productController')

productRouter.post('/',addProduct)
productRouter.get('/',viewAllProducts)
productRouter.get('/:id',viewProduct)
productRouter.get('/types/pro',getProductTypes,)
productRouter.post('/filteredProducts',viewFilteredProducts)

module.exports = productRouter