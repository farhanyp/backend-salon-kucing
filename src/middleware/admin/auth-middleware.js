const isLogin = (req,res,next)=>{
    if(req.cookies.authorization === undefined){
        req.flash('alertMessage', `${req.cookies.authorization}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/login')
    }else{
        next()
    }
}

export{
    isLogin
};