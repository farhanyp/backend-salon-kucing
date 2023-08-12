import ResponseError  from "../error/response-error.js"
import userService from "../service/userService.js";
import { User } from "../model/User.js"

const login =  async (req, res, next) =>{
    try{

        const request = req.body

        const result = await userService.login(request)

        // Response jika tida ada data yang terkirim
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ResponseError(400, "Bad Request: Data tidak dikirimkan");
          }

        res.status(200).json({
            data: result
        })
    }catch(e){
        next(e)
    }
}

export default{
    login
}