import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: ObjectId,
        required: true
    },
    created_at:{
        type: Date,
        required: false,
        default: Date.now
    }
})

productSchema.pre('save', () => {
    if(!productSchema.created_at){
        productSchema.created_at = new Date()
    }
})

const Product = mongoose.model("Product", productSchema)

export{
    Product
}