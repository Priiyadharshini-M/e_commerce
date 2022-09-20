const express = require('express')
const userRouter = express.Router()
const { signUpUser, userLogin } = require('../Controllers/userController')

userRouter.post('/',signUpUser)
userRouter.post('/login',userLogin)

module.exports = userRouter