import subCourseModel from "../models/subCourse.model";

export const get_AllsubCourse = async (req, res) => {
    try {
        const allSubCourse = await subCourseModel.find();
        if (allSubCourse) {
            return res.status(200).json({
                data: allSubCourse,
                message: "Fetched"
            })
        }

        return res.status(400).json({ message: "Bad Request" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}


export const addSubCourse = (req, res) => {
    try {
        const { title } = req.body;
        const add_subCourse = new subCourseModel({
            title: title
        })
        add_subCourse.save();

        if (add_subCourse) {
            return res.status(201).json({
                data: add_subCourse,
                message: "Course added successfully"
            })

        }

        return res.status(400).json({ message: "Bad request" })


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const getSubCourse = async (req, res) => {
    try {
        const subCourseID = req.params.subCourse_id;
        const subCourse = await subCourseModel.findOne({ _id: subCourseID });
        if (subCourse) {
            return res.status(200).json({
                data: subCourse,
                message: "fetched"
            })
        }

        return res.status(400).json({ message: "Bad Request" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const deleteSubCourse = async (req, res) => {
    try {
        const subCourseID = req.params.subCourse_id;
        const del_subCourse = await subCourseModel.deleteOne({ _id: subCourseID });
        if (del_subCourse) {
            return res.status(200).json({
                data: del_subCourse,
                message: "fetched"
            })
        }

        return res.status(400).json({ message: "Bad Request" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}


export const updateSubCourse = async (req, res) => {
    try {
        const subCourseID = req.params.subCourse_id;
        const { title } = req.body;
        const updatesubCourse = await subCourseModel.updateOne({ _id: subCourseID }, {
            $set: {
                title: title
            }
        });
        if (updatesubCourse) {
            return res.status(200).json({
                data: updatesubCourse,
                message: "fetched"
            })
        }

        return res.status(400).json({ message: "Bad Request" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

