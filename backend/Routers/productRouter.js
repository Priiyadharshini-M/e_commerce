const express = require('express')
const productRouter = express.Router()
const { addProduct, viewAllProducts, viewProduct, viewFilteredProducts, getProductTypes, updateProduct } = require('../Controllers/productController')
const { isAuthorizedUser, isAuthenticatedUser } = require('../Middleware/auth')

productRouter.post('/',isAuthenticatedUser, isAuthorizedUser, addProduct)
productRouter.get('/',viewAllProducts)
productRouter.get('/:id',viewProduct)
productRouter.get('/types/pro',getProductTypes,)
productRouter.post('/filteredProducts',viewFilteredProducts)
productRouter.put('/:productId', isAuthenticatedUser, updateProduct)

module.exports = productRouter