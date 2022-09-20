const Product = require('../Models/productModel')
const { productValidation } = require('../Validation/validation')
const constants = require('../Constants/constants')

const addProduct = async(req, res) => {
    try {
        const result = await productValidation.validateAsync(req.body, { abortEarly: false })
        let product;
        const existproduct = await Product.findOne({productName: req.body.productName, productType: req.body.productType, productCategory: req.body.productCategory })
        if (existproduct)
            throw "This product already exists in this category."
        product = new Product(result)

        await product.save()
        const message = "Product added successfully"
        return res.status(constants.CREATED).json({product, message})
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            return res.status(constants.BAD_REQUEST).json({errors})
        }
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

const viewAllProducts = async(req,res) => {
    let product
    try{
        const product = await  Product.find()
        if(product.length<=0){
            throw "No product found"
        }
        return res.status(constants.SUCCESS).json({product})
    }
    catch (err){
        return res.status(constants.NOT_FOUND).json({err})
    }
}

const viewProduct = async(req,res) => {
    try{
        const product = await Product.find({_id:req.params.id})
        if(!product){
            throw "No product found"
        }
        return res.status(constants.SUCCESS).json({product})
    }
    catch(err){
        return res.status(constants.NOT_FOUND).json({err})
    }
}
module.exports = { addProduct, viewAllProducts, viewProduct }