import Joi from "joi"

const loginValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
})

export{
    loginValidation
}