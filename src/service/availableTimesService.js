import { logger } from "../application/logger.js"
import { AvailableTimes } from "../model/AvailableTime.js"
import { User } from "../model/User.js"
import { createAvailableTimesValidation, getAvailableTimesValidation } from "../validation/available-times-validation.js"
import { validate } from "../validation/validation.js"


const create = async (username, request) => {

    const createRequest = validate(createAvailableTimesValidation, request)

    const user = await User.findOne({username: username})

    if(!user){
        throw new ResponseError(404, "Account not found")
    }


    return AvailableTimes.create(createRequest)

}

const get = async (username) => {

    return AvailableTimes.find()

}

export default{
    create,
    get
}