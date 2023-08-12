import { logger } from "../application/logger.js"
import { Category } from "../model/Category.js"
import { Product } from "../model/Product.js"
import { User } from "../model/User.js"
import { getCategoryValidation } from "../validation/category-validation.js"
import { createProductValidation, deleteProductValidation, updateProductValidation } from "../validation/product-validation.js"
import { validate } from "../validation/validation.js"

const create = async (username, request) => {

    const createRequest = validate(createProductValidation, request)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    const result = await Product.create(createRequest)

    if(createRequest.categoryId){
        await Category.findOneAndUpdate({_id: createRequest.categoryId}, {$push: {productId: result._id}})
    }

    return result
}

const get = async () => {

    // return await Product.find()
    return "ini get"
}


const update = async (username, productId, request) => {

    const updateRequest = validate(updateProductValidation, request)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    const data = {}
    if(request.name){
        data.name = updateRequest.name
    }

    if(request.qty){
        data.qty = updateRequest.qty
    }

    if(request.desc){
        data.desc = updateRequest.desc
    }

    if(request.price){
        data.price = updateRequest.price
    } 

    const product = await Product.findOne({ _id: productId });

    if (!product) {
        throw new ResponseError(404, "Category not found");
    }

    if (request.categoryId) {
        if(product.categoryId != updateRequest.categoryId){

            await Category.updateOne({_id: product.categoryId}, {$pull:{productId: productId}})

            await Category.updateOne({_id: request.categoryId}, {$push:{productId: productId}})

        }

        data.categoryId = updateRequest.categoryId;
    } 

    await Product.findByIdAndUpdate(productId, data)

    return await Product.findOne({
        _id: productId
    })

}

const remove = async(username, productId) => {

    const removeRequest = validate(deleteProductValidation, productId)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    return Product.deleteOne({_id: removeRequest})
}

export default{
    create,
    get,
    update,
    remove
}