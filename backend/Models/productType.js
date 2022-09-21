const mongoose=require('mongoose')

const schema=mongoose.Schema;
const productTypeSchema=new schema({
    productType:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('ProductType',productTypeSchema)