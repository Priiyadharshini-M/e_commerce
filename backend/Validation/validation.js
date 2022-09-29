const joi = require('@hapi/joi')

const registerValidation = joi.object({
    userName: joi.string()
        .min(3)
        .max(20)
        .pattern(new RegExp('^[a-zA-Z ]+$'))
        .required(),
    userEmail: joi.string()
        .pattern(new RegExp('^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$'))
        .required(),
    contact: joi.string()
        .pattern(new RegExp('^[6-9]{1}[0-9]{9}$'))
        .required(),
    password: joi.string()
        .min(5)
        .max(12)
        .required(),
    confirmPassword: joi.ref('password')
})

const productValidation = joi.object({
    productName: joi.string()
                    .min(3)
                    .max(20)
                    .pattern(new RegExp('^[a-zA-Z ]+$'))
                    .required(),
    productImage: joi.required(),
    description: joi.string()
                     .min(10)
                     .max(200)
                     .required(),
    price: joi.number()
              .min(0)
              .required(),
    productCategory: joi.string()
                        .min(2)
                        .max(25)
                        .pattern(new RegExp('^[a-zA-Z ]+$'))
                        .required(),
    productType: joi.string()
                    .min(2)
                    .max(20)
                    .pattern(new RegExp('^[a-zA-Z ]+$'))
                    .required(),
    stock: joi.number()
              .min(1)
              .required()
})

module.exports = { registerValidation, productValidation }