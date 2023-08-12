import { logger } from "../application/logger.js"
import mongoose from "mongoose"
import categoryService from "../service/categoryService.js"

const create = async (req, res, next) => {
    try{
        const request = req.body
        const username = req.user.username

        const result = await categoryService.create(username, request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }   

}

const get = async (req, res, next) => {
    try{
        const username = req.user.username

        const result = await categoryService.get(username)

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
        const categoryId     = req.params.categoryId

        const result = await categoryService.update(username,categoryId, request)

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
        const categoryId = req.params.categoryId

        const result = await categoryService.remove(username,categoryId)

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