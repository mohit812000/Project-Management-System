import mongoose from "mongoose"

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    to: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },

    status:{
        type:Number,
        default:1,
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("email", emailSchema);