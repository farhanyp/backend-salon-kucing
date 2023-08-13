import Joi from "joi"

const createProductValidation = Joi.object({
    ImageName: Joi.string().max(255).optional(),
    name: Joi.string().max(255).required(),
    qty: Joi.number().min(1).required(),
    desc: Joi.string().optional(),
    price: Joi.number().required(),
    categoryId: Joi.string().min(1).required(),

})

const getProductValidation = Joi.string().min(1).required()

const updateProductValidation = Joi.object({
    name: Joi.string().max(255).optional(),
    qty: Joi.number().optional(),
    desc: Joi.string().optional(),
    price: Joi.number().optional(),
    categoryId: Joi.string().min(1).optional(),
})

const deleteProductValidation = Joi.string().min(1).required()

export{
    createProductValidation,
    getProductValidation,
    updateProductValidation,
    deleteProductValidation
}