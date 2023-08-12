import express from 'express'
import categoryController from '../controller/categoryController.js'
import { authMiddleware } from '../middleware/auth-middleware.js'
import productController from '../controller/productController.js'
import availableTimesController from '../controller/availableTimesController.js'
import lodgingController from '../controller/lodgingController.js'

const apiRouter = new express.Router()

apiRouter.use(authMiddleware)
apiRouter.post('/api/v1/member/category/create', categoryController.create)
apiRouter.get('/api/v1/member/categories', categoryController.get)
apiRouter.patch('/api/v1/member/category/:categoryId', categoryController.update)
apiRouter.delete('/api/v1/member/category/:categoryId', categoryController.remove)


apiRouter.post('/api/v1/member/product/create', productController.create)
apiRouter.get('/api/v1/member/product', productController.get)
apiRouter.patch('/api/v1/member/product/:productId', productController.update)
apiRouter.delete('/api/v1/member/product/:productId', productController.remove)


apiRouter.post('/api/v1/member/booking/times', availableTimesController.create)
apiRouter.get('/api/v1/member/booking/times', availableTimesController.get)


apiRouter.post('/api/v1/member/lodging/create', lodgingController.create)
apiRouter.get('/api/v1/member/lodging', lodgingController.get)
apiRouter.patch('/api/v1/member/lodging/:lodgingId', lodgingController.update)
apiRouter.delete('/api/v1/member/lodging/:lodgingId', lodgingController.remove)


export {
    apiRouter
}