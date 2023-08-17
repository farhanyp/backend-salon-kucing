import express from 'express'
import adminController from '../controller/adminController.js'


const adminRouter = express.Router()

adminRouter.get('/admin/login', adminController.viewSignIn)
adminRouter.post('/admin/login', adminController.actionSignIn)

export{
    adminRouter
}
