import mongoose from "mongoose";
import studentModel from "./student.model";
import subCourseModel from "./subCourse.model";

const Schema = mongoose.Schema;
const projectSchema = new Schema({
    selectProject:{
        type :Schema.Types.ObjectId,
        ref:subCourseModel,
        default:null,
    },
    projectName: {
        type: String,
        default: null
    },
    projectLink: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        default: null
    },

    endDate: {
        type: Date,
        default: null
    },
    studentDetails: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: studentModel

    },
    projectStatus: {
        type: String,
        default: null,
    },
    status: {
        type: Number,
        default: 1
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

})

export default mongoose.model("project", projectSchema);