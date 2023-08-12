import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const availableTimeSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: false
    },
})

availableTimeSchema.pre('save', () => {
    if(!availableTimeSchema.isBooked){
        availableTimeSchema.isBooked = false
    }
})

const AvailableTimes = mongoose.model("AvailableTimes", availableTimeSchema)

export{
    AvailableTimes
}