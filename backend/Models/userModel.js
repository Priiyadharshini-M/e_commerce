const mongoose=require('mongoose')
const Cart = require('./cartModel')

const schema=mongoose.Schema;
const userSchema=new schema({
    userName:{
        type:String,
        required:true,
        minlength:3
    },
    userEmail:{
        type:String,
        required:true,
        lowercase:true
    },
    contact:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    role:{
        type:String,
        default:'user'
    },
    cart:{
        type:[mongoose.Types.ObjectId],
        ref:'Cart'
    },
    orders:{
        type:[mongoose.Types.ObjectId],
        ref:'Orders'
    }
})

module.exports=mongoose.model('User',userSchema)