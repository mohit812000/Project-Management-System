import mongoose from "mongoose";
import categoryModel from "./category.model";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: categoryModel

    },
    status: {
        type: Number,
        default: 1
    },
    ceatedAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("student", studentSchema)