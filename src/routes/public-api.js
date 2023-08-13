import express from 'express'
import userController from '../controller/userController.js'
import productController from '../controller/productController.js'
import availableTimesController from '../controller/availableTimesController.js'
import lodgingController from '../controller/lodgingController.js'

const publicApi = new express.Router()

publicApi.get('/', (req, res) => {
    res.send('public api!')
})

publicApi.post('/login', userController.login)

publicApi.get('/product', productController.get)

publicApi.get('/booking/times', availableTimesController.get)

publicApi.post('/lodging/create', lodgingController.create)

export {
    publicApi
}