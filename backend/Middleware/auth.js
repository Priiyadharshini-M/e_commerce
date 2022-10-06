const jwt = require('jsonwebtoken')
const jwtDecode=require('jwt-decode')
require('dotenv').config()
const constants = require('../Constants/constants')

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
      throw "Access denied , Please login"
    }
    const data = jwt.verify(token, process.env.SECRET_TOKEN)
    if(req.params.id && data.id !== req.params.id){
        throw "You don't have access to other user account"
    }
  }
  catch (err) {
    return res.status(constants.UNAUTHORIZED).json({ err })
  }
  next()
}

const isAuthorizedUser = async (req, res, next) => {
  try {   
    let token=req.headers.authorization.split(' ')[1]
    let tokenData=jwtDecode(token)
    if(tokenData.role!==constants.ADMIN){
        throw "You can't access this page.Authorization failed"
    }
    const data = jwt.verify(token, process.env.SECRET_TOKEN)
  }
  catch (err) {
    return res.status(constants.UNAUTHORIZED).json({ err })
  }
  next()
}

module.exports = { isAuthenticatedUser, isAuthorizedUser }