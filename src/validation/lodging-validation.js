import Joi from "joi";


const createLodgingValidation = Joi.object({
    ownerName:      Joi.string().max(255).required(),
    phoneNumber:    Joi.string().max(255).required(),
    email:          Joi.string().max(255).email().required(),
    petName:        Joi.string().max(255).optional(),
    petTypes:       Joi.string().max(255).optional(),
    startTime:      Joi.date().required(),
    endTime:        Joi.date().required(),
    specialNeeds:   Joi.bool().default(false),
    paymentStatus:  Joi.bool().default(false)
})

const getLodgingValidation = Joi.string().max(255).required()

const updateLodgingValidation = Joi.object({
    paymentStatus:  Joi.bool().required().default(false)
})

const removeLodgingValidation = Joi.string().max(255).required()

export {
    createLodgingValidation,
    getLodgingValidation,
    updateLodgingValidation,
    removeLodgingValidation
}