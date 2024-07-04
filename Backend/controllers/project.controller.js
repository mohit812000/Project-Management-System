import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const getProjectLinks = async (req, res) => {
    try {

        const { limit, page, studentid } = req.query;

        // const { limit, page} = req.query;
        const skipno = limit * (page - 1)
        const pipeline = [
            // {
            //     $lookup:{
            //         from :"students",
            //         localField :"studentDetails",
            //         foreignField:"_id",
            //         as:"studentDetails"

            //     }
            // },
            // {$unwind:"$studentDetails"},
            { $sort: { '_id': 1 } },

            {
                $lookup: {
                    from: "subcourses",
                    localField: "selectProject",
                    foreignField: "_id",
                    as: "selectProject"
                },

            },
            { $unwind: "$selectProject" },
            { $sort: { "_id": 1 } }


        ]

        if (parseInt(limit) && parseInt(page)) {
            pipeline.push({ $skip: skipno }, { $limit: parseInt(limit) })
        }

        if (studentid) {
            const ObjectId = mongoose.Types.ObjectId;
            pipeline.push({ $match: { studentDetails: new ObjectId(studentid) } })
        }



        const projectLink = await projectModel.aggregate(pipeline)
        if (projectLink) {
            return res.status(200).json({
                data: projectLink,
                message: "fetched"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const getIncompleted = async (req, res) => {
    try {
        const projects = await projectModel.find({ projectStatus: "Ongoing" });
        const ids = []
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const date = new Date();
            if (project.endDate < date) {
                ids.push(project._id)
            }
        }

        console.log(ids)
        const updateStatus = await projectModel.updateMany(
            { _id: { $in: ids } },
            { $set: { projectStatus : 'Incomplete' } }
         )
         console.log(updateStatus)
        const getProjects = await projectModel.find({ projectStatus: "Incomplete" }).populate("studentDetails");
        if (getProjects) {
            return res.status(200).json({
                data: getProjects,
                message: "fetched"
            })
        }

        return res.status(400).json({ message: "Bad Request" })


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}

export const addProject = (req, res) => {
    try {

        const { selectProject, projectName, projectLink, startDate, endDate, studentDetails, projectStatus } = req.body;
        const add_project = new projectModel({
            selectProject: selectProject,
            projectName: projectName,
            projectLink: projectLink,
            startDate: startDate,
            endDate: endDate,
            studentDetails: studentDetails,
            projectStatus: projectStatus

        })
        add_project.save();

        if (add_project) {
            return res.status(201).json({
                data: add_project,
                message: "Created"
            })
        }
        // console.log(add_project.selectProject)
        return res.status(400).json({
            message: "Bad Request"
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}


export const getProject = async (req, res) => {
    try {
        const projectID = req.params.project_id;
        const project = await projectModel.findOne({ _id: projectID })
            .populate("studentDetails").populate("selectProject")
        console.log(project.selectProject)
        if (project) {
            return res.status(200).json({
                data: project,
                message: "Project fetched successfully"
            });
        }
        console.log(project.selectProject)
        return res.status(404).json({
            message: "Project not found"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const deleteProject = async (req, res) => {
    try {
        const projectID = req.params.project_id;
        const del_project = await projectModel.deleteOne({ _id: projectID });

        if (del_project) {
            return res.status(200).json({ message: "Deleted" })
        }

        return res.status(400).json({ message: "Bad request" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const updateProject = async (req, res) => {
    try {
        const projectID = req.params.project_id;
        const { selectProject, projectName, projectLink, studentDetails, projectStatus, startDate, endDate } = req.body;
        const update_project = await projectModel.updateOne({ _id: projectID }, {
            $set: {
                selectProject: selectProject,
                projectName: projectName,
                projectLink: projectLink,
                studentDetails: studentDetails,
                projectStatus: projectStatus,
                startDate: startDate,
                endDate: endDate
            }
        });
        if (update_project.acknowledged) {
            return res.status(200).json({ message: "Updated" })

        }
        return res.status(400).json({ message: "Bad request" })


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}