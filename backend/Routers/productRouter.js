const express = require('express')
const productRouter = express.Router()
const { addProduct, viewAllProducts, viewProduct, viewFilteredProducts } = require('../Controllers/productController')

productRouter.post('/',addProduct)
productRouter.get('/',viewAllProducts)
productRouter.get('/:id',viewProduct)
productRouter.post('/filteredProducts',viewFilteredProducts)

module.exports = productRouter