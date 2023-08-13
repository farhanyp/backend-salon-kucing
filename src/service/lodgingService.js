import { logger } from "../application/logger.js"
import { Lodging } from "../model/Lodging.js"
import { User } from "../model/User.js"
import { createLodgingValidation, getLodgingValidation, removeLodgingValidation, updateLodgingValidation } from "../validation/lodging-validation.js"
import { validate } from "../validation/validation.js"

const create = async (request) => {

    const createRequest = validate(createLodgingValidation, request)

    return Lodging.create(createRequest)

}


const get = async (username) => {
    
    const createRequest = validate(getLodgingValidation, username)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    return Lodging.find()
}


const update = async (username, lodgingId, request) => {

    
    const updateRequest = validate(updateLodgingValidation, request)
    
    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    const data = {}

    if (request.paymentStatus) {
        data.paymentStatus = updateRequest.paymentStatus;
    }

    const lodging = await Lodging.findOne({ _id: lodgingId });

    if (!lodging) {
        throw new ResponseError(404, "Category not found");
    }

    await Lodging.findByIdAndUpdate(lodgingId, data)

    return await Lodging.findOne({
        _id: lodgingId
    })
}

const remove = async(username, productId) => {

    const removeRequest = validate(removeLodgingValidation, productId)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }

    return Lodging.deleteOne({_id: removeRequest})
}

export default{
    create,
    get,
    update,
    remove
}