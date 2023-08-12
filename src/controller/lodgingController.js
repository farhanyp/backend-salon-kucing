import { logger } from "../application/logger.js"
import mongoose from "mongoose"
import lodgingService from "../service/lodgingService.js"

const create = async (req, res, next) => {
    try{
        const request = req.body
        const username = req.user.username

        const result = await lodgingService.create(username, request)

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

        const result = await lodgingService.get(username)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }

}


const update = async (req, res, next) => {

    try{

        const username = req.user.username
        const lodgingId = req.params.lodgingId
        const request = req.body

        const result = await lodgingService.update(username, lodgingId, request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }

}

const remove = async (req, res, next) => {

    try{

        const username = req.user.username
        const lodgingId = req.params.lodgingId

        const result = await lodgingService.remove(username, lodgingId)

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