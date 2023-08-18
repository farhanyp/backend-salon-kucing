import express from 'express'
import adminController from '../controller/adminController.js'
import { isLogin } from '../middleware/admin/auth-middleware.js'


const adminRouter = express.Router()

adminRouter.get('/admin/login', adminController.viewSignIn)
adminRouter.post('/admin/login', adminController.actionSignIn)
adminRouter.use(isLogin)
adminRouter.get('/admin/logout', adminController.actionLogout)
adminRouter.get('/admin/dashboard', adminController.viewDashboard)

export{
    adminRouter
}
