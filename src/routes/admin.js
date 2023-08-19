import express from 'express'
import adminController from '../controller/adminController.js'
import { isLogin } from '../middleware/admin/auth-middleware.js'
import { uploadSingle } from '../middleware/admin/multer-middleware.js'


const adminRouter = express.Router()

adminRouter.get('/admin/login', adminController.viewSignIn)
adminRouter.post('/admin/login', adminController.actionSignIn)
adminRouter.use(isLogin)
adminRouter.get('/admin/logout', adminController.actionLogout)
adminRouter.get('/admin/dashboard', adminController.viewDashboard)

adminRouter.get('/admin/category', adminController.viewCategory)
adminRouter.post('/admin/category/create', adminController.addCategory)
adminRouter.patch('/admin/category', adminController.editCategory)
adminRouter.delete('/admin/category/:categoryId', adminController.deleteCategory)


// adminRouter.get('/admin/product', adminController.viewProduct)
// adminRouter.post('/admin/product/create', uploadSingle, adminController.addProduct)
// adminRouter.patch('/admin/product', uploadSingle, adminController.editProduct)
// adminRouter.delete('/admin/product/:productId', adminController.deleteProduct)


adminRouter.get('/admin/available-times', adminController.viewAvailableTimes)
adminRouter.post('/admin/available-times/create', adminController.addAvailableTimes)
adminRouter.delete('/admin/available-times/:timesId', adminController.deleteAvailableTimes)


adminRouter.get('/admin/booking', adminController.viewBooking) 
adminRouter.patch('/admin/booking', adminController.editBooking)
adminRouter.delete('/admin/booking/:bookingId', adminController.deleteBooking)


adminRouter.get('/admin/history-booking', adminController.viewHistoryBooking)

export{
    adminRouter
}
