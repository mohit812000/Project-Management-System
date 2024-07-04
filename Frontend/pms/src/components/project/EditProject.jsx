import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { baseUrl } from '../util/api';
import { useNavigate, useParams } from 'react-router-dom';
import { notification } from "antd"
import moment from "moment"

const EditProject = () => {
    const [singleProject, setSingleProject] = useState({});
    const { project_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseUrl}/get-project/${project_id}`)
            .then((res) => {
                console.log("single project", res.data.data)
                setSingleProject(res.data.data)
            })
            .catch((err) => console.log(err))


    }, [project_id])

    return (
        <div className='flex h-[613px] justify-center items-center'>
            <div className='shadow-xl w-[700px] p-4 h-80'>
                <h1 className='H1 text-7xl font-bold mb-6'>Edit Project</h1>
                <Formik
                    initialValues={{projectName: singleProject.projectName, projectLink: singleProject.projectLink, projectStatus: singleProject.projectStatus , startDate:singleProject.startDate, endDate:singleProject.endDate}}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};

                        if (!values.projectLink) {
                            errors.projectLink = "Link is required"
                        }
                        if (!values.projectStatus) {
                            errors.projectStatus = "Project status is required"
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.put(`${baseUrl}/update-project/${project_id}`, values)
                            .then((res) => {
                                console.log(res)
                                notification.success({ message: res.data.message });
                                setSubmitting(false);
                                navigate(`/singleStudent/${singleProject.studentDetails._id}`)

                            })
                            .catch((err) => console.log(err))
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>

                            {/* <input
                                type="text"
                                name="projectLink"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.projectLink}
                                placeholder='Link'
                                className='form-control'
                            />
                            {errors.projectLink && touched.projectLink && errors.projectLink} */}


                            <input
                                type="text"
                                name="projectName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.projectName}
                                placeholder='Link'
                                className='form-control'
                            />
                            {errors.projectName && touched.projectName && errors.projectName}

                            <input
                                type="text"
                                name="projectLink"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.projectLink}
                                placeholder='Link'
                                className='form-control'
                            />
                            {errors.projectLink && touched.projectLink && errors.projectLink}

                            <input
                                type="text"
                                name="startDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={moment(values.startDate).format("Do MMM YYYY")}
                                onFocus={(e) => e.target.type = "date"}

                                placeholder='Link'
                                className='form-control'
                            />
                            {errors.startDate && touched.startDate && errors.startDate}

                            <input
                                type="text"
                                name="endDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={moment(values.endDate).format("Do MMM YYYY")}
                                onFocus={(e) => e.target.type = "date"}

                                placeholder='Link'
                                className='form-control'
                            />
                            {errors.endDate && touched.endDate && errors.endDate}


                            <select name="projectStatus"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.projectStatus}
                                className='form-control mt-3'


                            >
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Incomplete">Incomplete</option>

                            </select>
                            {errors.projectStatus && touched.projectStatus && errors.projectStatus}
                            <Button type="submit" disabled={isSubmitting} className='mt-4 submit_btn'>
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>


            </div>


        </div>
    )
}

export default EditProject