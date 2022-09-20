const User = require('../Models/userModel')
const constants = require('../Constants/constants')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtDecode=require('jwt-decode')
const { registerValidation } = require('../Validation/validation')

const signUpUser = async (req, res) => {

    try {
        const result = await registerValidation.validateAsync(req.body, { abortEarly: false })

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        let registeredUser;
        const existUserEmail = await User.findOne({ userEmail: req.body.userEmail })
        if (existUserEmail)
            throw "User Email already exists"
        const existUserPhNo = await User.findOne({ contact:req.body.contact })
        if (existUserPhNo)
            throw "Phone Number already exists"

            registeredUser = new User({
                ...result,
            password: hashPassword
        })

        await registeredUser.save()
        const message = "Registered successfully"
        return res.status(constants.CREATED).json({registeredUser, message})
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

const userLogin = async (req, res) => {
   
    try {
        const user = await User.findOne({ userEmail: req.body.userEmail })

        if (!user) {
            throw "This email doesn't exist"
        }
        const validPass=await bcrypt.compare(req.body.password, user.password)
        if (!validPass) {
              throw "Invalid Credentials"
        }
        let payload = { userEmail: req.body.userEmail, role: user.role, id: user._id, userName: user.userName }
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN)
        const message = "Successfully logged in"
        res.status(constants.SUCCESS).json({ user, token, message })
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
            return res.status(constants.BAD_REQUEST).json(errors)
        }
        return res.status(constants.INTERNAL_SERVER_ERROR).json({ err })
    }
}

module.exports = { signUpUser, userLogin }