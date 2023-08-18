import { logger } from "../application/logger.js"
import { AvailableTimes } from "../model/AvailableTime.js"
import { Lodging } from "../model/Lodging.js"
import { Product } from "../model/Product.js"
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
            res.redirect("/admin/dashboard")
        }
    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/login')
    }
}

const actionSignIn = async (req, res, next) => {

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

        res.redirect("/admin/dashboard")
    }
}

const actionLogout = async (req,res)=>{
    
    res.cookie('authorization', '', { expires: new Date(0) });
    res.redirect('/admin/login')

}

const viewDashboard = async (req, res, next) => {
    try{

        const product = await Product.find({})
        const lodging = await Lodging.find()
        const time = await AvailableTimes.find()

        res.render("admin/dashboard/view_dashboard.ejs", {
            title: "Staycation | Dashboard",
            products :  product,
            lodgings: lodging,
            times: time
        })
    }catch(e){
        next(e)
    }
}

export default{
    viewSignIn,
    actionSignIn,
    viewDashboard,
    actionLogout
}