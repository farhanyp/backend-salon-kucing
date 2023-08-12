import express from 'express'
import userController from '../controller/userController.js'
import productController from '../controller/productController.js'

const publicApi = new express.Router()

publicApi.get('/', (req, res) => {
    res.send('Hello World!')
})

publicApi.post('/login', userController.login)

publicApi.get('/product', productController.get)

export {
    publicApi
}