import productService from "../service/productService.js"
import { logger } from "../application/logger.js"

const create = async (req, res, next) => {
    try{
        const request = req.body
        const username = req.user.username

        const result = await productService.create()

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }   
}

const get = async (req, res, next) => {
    try{

        const result = await productService.get()

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }   
}

const update = async (req, res, next) => {

    try{

        const username  = req.user.username
        const request   = req.body
        const productId = req.params.productId

        const result = await productService.update(username, productId, request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }

}


const remove = async (req, res, next) => {

    try{

        const username  = req.user.username
        const productId = req.params.productId

        const result = await productService.remove(username, productId)

        res.status(200).json({
            data: "OK"
        })

    }catch(e){
        next(e)
    }

}

export default{
    create,
    get,
    update,
    remove
}