import express from 'express'
import userController from '../controller/userController.js'
import productController from '../controller/productController.js'

const publicApi = new express.Router()

publicApi.post('/api/v1/member/login', userController.login)
publicApi.get('/api/v1/member/product', productController.get)

export {
    publicApi
}