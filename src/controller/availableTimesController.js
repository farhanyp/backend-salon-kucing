import availableTimesService from "../service/availableTimesService.js";

const create = async (req, res, next) => {
    try{
        const request = req.body;
        const username = req.user.username

        const result = await availableTimesService.create(username, request)

        res.status(200).json({
            data: result
        })
    }catch(e){
        next(e)
    }
}

const get = async (req, res, next) => {
    try{

        const result = await availableTimesService.get()

        res.status(200).json({
            data: result
        })
    }catch(e){
        next(e)
    }
}

export default{
    create,
    get
}