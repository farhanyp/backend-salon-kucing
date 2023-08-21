import { logger } from "../application/logger.js"
import { AvailableTimes } from "../model/AvailableTime.js"
import { Lodging } from "../model/Lodging.js"
import { Category } from "../model/Category.js"
import { Product } from "../model/Product.js"
import { User } from "../model/User.js"
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid"
import { format } from 'date-fns';

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

const viewCategory = async (req, res, next) => {

    try{

        const category = await Category.find({})
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus}
        res.render('admin/category/view_category.ejs',{
            category: category,
            alert: alert,
            title: "Staycation | Category",
        })

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/login')
    }
}

const addCategory = async (req, res, next) => {

    try{

        const name = req.body.name
        await Category.create({name})

        req.flash('alertMessage', 'Success Add Category')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/category')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}

const editCategory = async (req, res, next) => {

    try{

        const name = req.body.name
        const categoryId = req.body.id
        
        const data = {}
        if(name){
            data.name = name
        }

        // if (request.productId) {
        //     data.productId = updateRequest.productId;
        // }

        await Category.findByIdAndUpdate(categoryId, data)

        req.flash('alertMessage', 'Success Add Category')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/category')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}


const deleteCategory = async (req, res, next) => {

    try{

        const categoryId = req.body.categoryId
        
        const products = await Product.find({categoryId: categoryId})

        logger.info(products.length)
        logger.info(products.length)

        if(!products.length == 0){
        req.flash('alertMessage', 'Tidak bisa menghapus kategori, hapus dahulu produk yang memiliki kategori berkaitan')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
        }else if (products.length == 0){
            await Category.deleteOne({_id: categoryId})
    
            req.flash('alertMessage', 'Success Delete Category')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        }


    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}

const viewProduct = async (req, res, next) => {

    try{

        const product = await Product.find().populate('categoryId').exec()
        const category = await Category.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus}
        res.render('admin/product/view_product.ejs',{
            product: product,
            category: category,
            alert: alert,
            title: "Staycation | Product",
        })

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/product')
    }
}


// const editProduct = async (req, res, next) => {

//     try{

//         const request = req.body
//         const productId = req.body.id
        
//         const data = {}
//         if(request.name){
//             data.name = request.name
//         }
    
//         if(request.qty){
//             data.qty = request.qty
//         }
    
//         if(request.desc){
//             data.desc = request.desc
//         }
    
//         if(request.price){
//             data.price = request.price
//         }

//         const product = await Product.findOne({ _id: productId });
//         console.log(product)

//         if(req.file){
//             await fs.unlink(path.join(`src/public/${product.ImageName}`))
//             data.ImageName = `images/${req.file.filename}`
//         } 


//         if (request.categoryId) {
//             if(product.categoryId != request.categoryId){
    
//                 await Category.updateOne({_id: product.categoryId}, {$pull:{productId: productId}})
    
//                 await Category.updateOne({_id: request.categoryId}, {$push:{productId: productId}})
    
//             }
    
//             data.categoryId = request.categoryId;
//         } 

//         await Product.findByIdAndUpdate(productId, data)

//         req.flash('alertMessage', 'Success Add Category')
//         req.flash('alertStatus', 'success')
//         res.redirect('/admin/product')

//     }catch(error){
//         req.flash('alertMessage', `${error.message}`)
//         req.flash('alertStatus', 'danger')
//         res.redirect('/admin/category')
//     }
// }


const editProduct = async (req, res, next) => {

    try{

        const request = req.body
        const productId = req.body.id
        
        const data = {}
        if(request.name){
            data.name = request.name
        }
    
        if(request.qty){
            data.qty = request.qty
        }
    
        if(request.desc){
            data.desc = request.desc
        }
    
        if(request.price){
            data.price = request.price
        }

        const product = await Product.findOne({ _id: productId }); 

        if (request.categoryId) {
            if(product.categoryId != request.categoryId){
    
                await Category.updateOne({_id: product.categoryId}, {$pull:{productId: productId}})
    
                await Category.updateOne({_id: request.categoryId}, {$push:{productId: productId}})
    
            }
    
            data.categoryId = request.categoryId;
        } 

        await Product.findByIdAndUpdate(productId, data)

        req.flash('alertMessage', 'Success Add Category')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/product')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}


// const addProduct = async (req, res, next) => {

//     try{
//         const request = req.body

//         const data = {
//             ImageName: `images/${req.file.filename}`,
//             name: request.name,
//             qty: request.qty,
//             desc: request.desc,
//             price: request.price,
//             categoryId: request.categoryId,
//         }
//         const product =  await Product.create(data)

//         if(request.categoryId){
//             await Category.findOneAndUpdate({_id: request.categoryId}, {$push: {productId: product._id}})
//         }

//         req.flash('alertMessage', 'Success Add Product')
//         req.flash('alertStatus', 'success')
//         res.redirect('/admin/product')

//     }catch(error){
//         req.flash('alertMessage', `${error.message}`)
//         req.flash('alertStatus', 'danger')
//         res.redirect('/admin/product')
//     }
// }

const addProduct = async (req, res, next) => {

    try{
        const request = req.body
        const product =  await Product.create(request)

        if(request.categoryId){
            await Category.findOneAndUpdate({_id: request.categoryId}, {$push: {productId: product._id}})
        }

        req.flash('alertMessage', 'Success Add Product')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/product')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/product')
    }
}


// const deleteProduct = async (req, res, next) => {

//     try{

//         const productId = req.body.productId
//         const product = await Product.findOne({_id: productId})
//         await fs.unlink(path.join(`src/public/${product.ImageName}`))

//         await Category.updateOne({_id: product.categoryId}, {$pull:{productId: productId}})
//         await Product.deleteOne({_id: productId})
        

//         req.flash('alertMessage', 'Success Delete Category')
//         req.flash('alertStatus', 'success')
//         res.redirect('/admin/product/')

//     }catch(error){
//         req.flash('alertMessage', `${error.message}`)
//         req.flash('alertStatus', 'danger')
//         res.redirect('/admin/product/')
//     }
// }

const deleteProduct = async (req, res, next) => {

    try{

        const productId = req.body.productId
        const product = await Product.findOne({_id: productId})

        await Category.updateOne({_id: product.categoryId}, {$pull:{productId: productId}})
        await Product.deleteOne({_id: productId})
        

        req.flash('alertMessage', 'Success Delete Category')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/product/')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/product/')
    }
}

const viewAvailableTimes = async (req, res, next) => {

    try{

        const times = await AvailableTimes.find()

        const formattedTimes = times.map(time => {
            const formattedStartTime = format(new Date(time.startTime), 'dd-MM-yyyy');
            const formattedEndTime = format(new Date(time.endTime), 'dd-MM-yyyy');
            return {
                ...time,
                formattedStartTime,
                formattedEndTime
            };
        });

        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus}
        res.render('admin/availalble-times/view_times.ejs',{
            times: formattedTimes,
            alert: alert,
            title: "Staycation | Available Times",
        })

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/product')
    }
}


const addAvailableTimes = async (req, res, next) => {

    try{

        const request = req.body;
        const times = {};

        const startTimeParts = request.startTime.split('-').map(part => parseInt(part, 10));
        times.startTime = new Date(startTimeParts[2], startTimeParts[1] - 1, startTimeParts[0]);

        const endTimeParts = request.endTime.split('-').map(part => parseInt(part, 10));
        times.endTime = new Date(endTimeParts[2], endTimeParts[1] - 1, endTimeParts[0]);

        await AvailableTimes.create(times)

        req.flash('alertMessage', 'Success Add Times')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/available-times')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/available-times')
    }
}

const deleteAvailableTimes = async (req, res, next) => {

    try{

        const timesId = req.params.timesId
        await AvailableTimes.deleteOne({_id: timesId})

        req.flash('alertMessage', 'Success Delete Times')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/available-times')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/available-times')
    }
}


const viewBooking = async (req, res, next) => {

    try{

        const lodgings = await Lodging.find({ paymentStatus: false }).sort({
            paymentStatus: -1 // This will bring false paymentStatus entries to the top
        });

        const formattedTimes = lodgings.map(lodging => {
            const formattedStartTime = format(new Date(lodging.startTime), 'dd-MM-yyyy');
            const formattedEndTime = format(new Date(lodging.endTime), 'dd-MM-yyyy');
            return {
                ...lodging,
                formattedStartTime,
                formattedEndTime
            };
        });

        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus}
        res.render('admin/booking/view_booking.ejs',{
            booking: formattedTimes,
            alert: alert,
            title: "Staycation | Booking",
        })

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/booking')
    }
}

const deleteBooking = async (req, res, next) => {

    try{

        const bookingId = req.params.bookingId
        logger.info(bookingId)
        await Lodging.deleteOne({_id: bookingId})

        req.flash('alertMessage', 'Success Delete Times')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/booking')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/booking')
    }
}


const editBooking = async (req, res, next) => {

    try{

        const request = req.body
        const bookingId = req.body.id
        
        const data = {}
        if(request.paymentStatus){
            data.paymentStatus = request.paymentStatus
        }

        await Lodging.findByIdAndUpdate(bookingId, data)

        req.flash('alertMessage', 'Success Update Booking')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/booking')

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/booking')
    }
}

const viewHistoryBooking = async (req, res, next) => {

    try{

        const lodgings = await Lodging.find({ paymentStatus: true }).sort({
            paymentStatus: -1 // This will bring false paymentStatus entries to the top
        });

        const formattedTimes = lodgings.map(lodging => {
            const formattedStartTime = format(new Date(lodging.startTime), 'dd-MM-yyyy');
            const formattedEndTime = format(new Date(lodging.endTime), 'dd-MM-yyyy');
            return {
                ...lodging,
                formattedStartTime,
                formattedEndTime
            };
        });

        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus}
        res.render('admin/historybooking/view_booking.ejs',{
            booking: formattedTimes,
            alert: alert,
            title: "Staycation | History Booking",
        })

    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/history-booking')
    }
}



export default{
    viewSignIn,
    actionSignIn,
    viewDashboard,
    actionLogout,
    viewCategory,
    addCategory,
    editCategory,
    deleteCategory,
    viewProduct,
    addProduct,
    editProduct,
    deleteProduct,
    viewAvailableTimes,
    addAvailableTimes,
    deleteAvailableTimes,
    viewBooking,
    deleteBooking,
    editBooking,
    viewHistoryBooking
}