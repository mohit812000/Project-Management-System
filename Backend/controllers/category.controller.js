import categoryModel from "../models/category.model";

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (categories) {
            return res.status(200).json({
                data: categories,
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

export const addCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        const existCategory = await categoryModel.findOne({ categoryName: categoryName });
        if (existCategory) {
            return res.status(200).json({
                message: "Course already exist!"
            })
        } else {
            const add_category = new categoryModel({
                categoryName: categoryName,
                description: description
            })

            add_category.save();

            if (add_category) {
                return res.status(201).json({
                    data: add_category,
                    message: "Course added successfully"
                })
            }

            return res.status(400).json({
                message: "Bad Request"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }

}

export const getCategory = async (req, res) => {
    try {
        const categoryID = req.params.category_id;
        const category = await categoryModel.findOne({ _id: categoryID });
        if (category) {
            return res.status(200).json({
                data: category,
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

export const updateCategory = async (req, res) => {
    try {
        const categoryID = req.params.category_id;
        const { categoryName, description } = req.body;
        const update_category = await categoryModel.updateOne({ _id: categoryID }, {
            $set: {
                categoryName: categoryName,
                description: description,
            }
        })
        if (update_category.acknowledged) {
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


export const deleteCategory = async (req, res) => {
    try {
        const categoryID = req.params.category_id;
        console.log("categiryid", categoryID)
        const del_category = await categoryModel.deleteOne({ _id: categoryID })
        if (del_category.acknowledged) {
            return res.status(200).json({
                data: del_category,

                message: "Deleted"

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

