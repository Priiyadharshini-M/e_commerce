const mongoose=require('mongoose')

const schema=mongoose.Schema;
const productSchema=new schema({
    productName:{
        type:String,
        required:true,
        minlength:3
    },
    productImage:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('Product',productSchema)