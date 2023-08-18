import express from 'express'
import adminController from '../controller/adminController.js'
import { isLogin } from '../middleware/admin/auth-middleware.js'


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


adminRouter.get('/admin/product', adminController.viewProduct)

export{
    adminRouter
}
