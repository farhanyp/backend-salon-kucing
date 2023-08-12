import { logger } from "../application/logger.js"
import { Category } from "../model/Category.js"
import { User } from "../model/User.js"
import { createCategoryValidation, getCategoryValidation, removeCategoryValidation, updateCategoryValidation } from "../validation/category-validation.js"
import { validate } from "../validation/validation.js"

const create = async (username, request) => {
    
    const createRequest = validate(createCategoryValidation, request)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }
    return Category.create(createRequest)
}

const get = async (username) => {

    const getRequest = validate(getCategoryValidation, username)

    return await Category.find()

}

const update = async (username, categoryId, request) => {

    const updateRequest = validate(updateCategoryValidation, request)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    const data = {}
    if(request.name){
        data.name = updateRequest.name
    }

    if (request.productId) {
        data.productId = updateRequest.productId;
    }  

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    await Category.findByIdAndUpdate(categoryId, data)

    return await Category.findOne({
        _id: categoryId
    })

}

const remove = async(username, categoryId) => {

    const removeRequest = validate(removeCategoryValidation, categoryId)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    return Category.deleteOne({_id: categoryId})
}

export default{
    create,
    get,
    update,
    remove
}