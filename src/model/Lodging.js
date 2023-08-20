import mongoose from "mongoose";


const LodgingSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: false
    },
    petName: {
        type: String,
        require: false
    },
    petTypes: {
        type: String,
        require: false
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    specialNeeds:{
        type: Boolean,
        required: false
    },
    paymentStatus: {
        type: Boolean,
        required: true
    }
})

LodgingSchema.pre('save', () => {
    if(LodgingSchema.specialNeeds){
        LodgingSchema.specialNeeds = false
    }

    if(LodgingSchema.paymentStatus){
        LodgingSchema.paymentStatus = false
    }
})


const Lodging = mongoose.model("Lodging", LodgingSchema)

export{
    Lodging
}