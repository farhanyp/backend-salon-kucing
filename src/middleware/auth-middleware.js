import mongoose from "mongoose"
import { User } from "../model/User.js"
import { logger } from "../application/logger.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.get('authorization')
    if(!token){
        res.status(401).json({
            errors: "Unauthorized"
        })
        
    }else{
        const user = await User.findOne({token: token})

        if(!user) {
            res.status(401).json({
                errors: "Unauthorized"
            })
            
        }else{
            req.user = user
            next()
        }
    }

}
