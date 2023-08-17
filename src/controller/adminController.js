import { logger } from "../application/logger.js"
import { User } from "../model/User.js"
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid"

const viewSignIn = async (req, res, next) => {

    try{

        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus}

        if( req.cookies.authorization == undefined){
            
            res.render('index',{
                alert: alert,
                title: "Staycation | Login",
            })

        }else{
            logger.info(req.cookies.authorization)
            res.redirect("/admin")
        }
    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/login')
    }
}

const actionSignIn = async (req, res, next) => {

    try{
        const username = req.body.username
        const password = req.body.password

        const user = await User.findOne({username: username})

        if(!user){
            req.flash('alertMessage', 'username atau password anda salah')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/login')
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if(!isPasswordValid){
            req.flash('alertMessage', 'username atau password anda salah')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/login')
        }

        if( user && isPasswordValid){
            const token = uuid().toString()
            
            await User.updateOne({username: user.username}, {token: token})
            res.cookie('authorization', token);

            res.redirect("/admin")
        }
    
    }catch(e){
        
    }
}

export default{
    viewSignIn,
    actionSignIn
}