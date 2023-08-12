import Joi from "joi"

const createCategoryValidation = Joi.object({
    name: Joi.string().max(255).required()
})

const getCategoryValidation = Joi.string().max(255).required()

const updateCategoryValidation = Joi.object({
    name: Joi.string().max(255).optional(),
})

const removeCategoryValidation = Joi.string().max(255).required()

export{
    createCategoryValidation,
    getCategoryValidation,
    updateCategoryValidation,
    removeCategoryValidation
}