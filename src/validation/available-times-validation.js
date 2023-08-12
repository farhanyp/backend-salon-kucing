import Joi from "joi"

const createAvailableTimesValidation = Joi.object({
    startTime:  Joi.date().required(),
    endTime:    Joi.date().required(),
    isBooked:   Joi.bool().optional().default(false)
})

const getAvailableTimesValidation = Joi.string().required()

export{
    createAvailableTimesValidation,
    getAvailableTimesValidation
}