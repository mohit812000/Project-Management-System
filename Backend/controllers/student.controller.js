import studentModel from "../models/student.model";

export const getStudents = async (req, res) => {
    try {
        const { search, limit, page } = req.query;
        const skipno = limit * (page - 1)
        const pipeline = [
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            { $unwind: "$category" },
            { $sort: { '_id': 1 } },

        ]

        const generateSearchRgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = generateSearchRgx(search);
        let filter = {}

        if (search) {
            filter = {
                $or: [
                    { name: { $regex: searchRgx, $options: "i" } },
                    { description: { $regex: searchRgx, $options: "i" } },
                    { email: { $regex: searchRgx, $options: "i" } },
                    { "category.categoryName": { $regex: searchRgx, $options: "i" } },
                ]
            }
            pipeline.push({ $match: filter })
        }
        if (parseInt(limit) && parseInt(page)) {
            pipeline.push({ $skip: skipno }, { $limit: parseInt(limit) })
        }
        const getStudents = await studentModel.aggregate(pipeline);
        // const getStudents = await studentModel.find(filter).populate("category");
        if (getStudents) {
            return res.status(200).json({
                data: getStudents,
                message: "Fetched"
            })
        }
        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const addStudent = (req, res) => {

    try {
        const { name, email, contact, category } = req.body;
        const add_student = new studentModel({
            name: name,
            email: email,
            contact: contact,
            category: category,

        })



        add_student.save();

        if (add_student) {
            return res.status(201).json({
                data: add_student,
                message: "Created"
            })
        }
        return res.status(400).json({
            message: "Bad Request"
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const getStudent = async (req, res) => {
    try {
        const studentID = req.params.student_id;
        const student = await studentModel.findOne({ _id: studentID }).populate("category");

        if (student) {
            return res.status(200).json({
                data: student,
                message: "fetched"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const updateStudent = async (req, res) => {
    try {
        const studentID = req.params.student_id;
        const { name, email, contact, category} = req.body;
        const update_student = await studentModel.updateOne({ _id: studentID }, {
            $set: {
                name: name,
                email: email,
                contact: contact,
                category: category,
            }


        });
        if (update_student.acknowledged) {
            return res.status(200).json({
                message: "Updated"
            })
        }
        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const deleteStudent = async (req, res) => {
    try {
        const studentID = req.params.student_id;
        const del_student = await studentModel.deleteOne({ _id: studentID });
        if (del_student) {
            return res.status(200).json({
                message: "Deleted"

            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })


    } catch (error) {
        return res.status(500).json({
            message: error
        })

    }
}
