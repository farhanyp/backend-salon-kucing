import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    productId: [{
        type: ObjectId,
        required: false,
        ref: "Product"
    }]
})

const Category = mongoose.model("Category", categorySchema)

export{
    Category
}

