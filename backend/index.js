const mongoose = require('mongoose')
const express = require("express")
require('dotenv/config')
const app = express()
const cors=require('cors')

const user = require('./Routers/userRouter')
const product = require('./Routers/productRouter')
const cartRouter = require('./Routers/cartRouter')

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log('Database Connected')  
    })
    .catch((err) => { console.log(err) }) 

app.use('/user',user)
app.use('/product',product)
app.use('/cart',cartRouter)

const server = app.listen(process.env.PORT, () => {
    console.log('Server is running at port :', process.env.PORT)
})