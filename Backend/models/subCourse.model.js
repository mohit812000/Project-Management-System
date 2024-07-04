import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subCourseSchema = new Schema({
    title:{
        type:String,
        required: true

    },

    status:{
        type:Number,
        default:1
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }



})

export default mongoose.model("subCourse", subCourseSchema)