import express from 'express'
import categoryController from '../controller/categoryController.js'
import { authMiddleware } from '../middleware/auth-middleware.js'
import productController from '../controller/productController.js'
import availableTimesController from '../controller/availableTimesController.js'
// import lodgingController from '../controller/lodgingController.js'

const apiRouter = new express.Router()

apiRouter.use(authMiddleware)
apiRouter.post('/category/create', categoryController.create)
apiRouter.get('/categories', categoryController.get)
apiRouter.patch('/category/:categoryId', categoryController.update)
apiRouter.delete('/category/:categoryId', categoryController.remove)


apiRouter.post('/product/create', productController.create)
apiRouter.get('/product', productController.get)
apiRouter.patch('/product/:productId', productController.update)
apiRouter.delete('/product/:productId', productController.remove)


apiRouter.post('/booking/times', availableTimesController.create)
apiRouter.get('/booking/times', availableTimesController.get)


// apiRouter.post('/lodging/create', lodgingController.create)
// apiRouter.get('/lodging', lodgingController.get)
// apiRouter.patch('/lodging/:lodgingId', lodgingController.update)
// apiRouter.delete('/lodging/:lodgingId', lodgingController.remove)


export {
    apiRouter
}