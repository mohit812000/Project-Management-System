import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { baseUrl } from '../util/api';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";



const AddProject = () => {
    const [student, setStudent] = useState({});
    const { std_id } = useParams();
    const navigate = useNavigate();
    const [subCourse, setSubCourse] = useState([]);

    // console.log("sdfghj",Student)
    const onclickHandler = () => {
        navigate(`/singleStudent/${std_id}`)

    }

    useEffect(() => {
        axios.get(`${baseUrl}/get-student/${std_id}`)
            .then((res) => {
                console.log("single student", res.data.data)
                setStudent(res.data.data)
            })
            .catch((err) => console.log(err))
    }, [std_id])


    useEffect(() => {
        axios.get(`${baseUrl}/get-allSubCourse`)
            .then((res) => {
                console.log("res", res.data.data);
                setSubCourse(res.data.data)
                console.log("subCourse", subCourse)
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <div className='relative'>
            <div className='h-14 w-14 rounded-full border-gray-500 border-2 flex justify-center items-center absolute top-6 left-40 back' onClick={onclickHandler}>
                <IoMdArrowRoundBack className='text-2xl' />
            </div>

            <div className='h-[613px] flex justify-center items-center'>

                <div className='w-[700px] p-4 shadow-xl h-[580px]'>
                    <h1 className='H1 text-7xl font-bold'>ADD PROJECT</h1>
                    <div className='flex justify-center my-4'>
                        <div className='text-left'>
                            <h5>Name</h5>
                            <h5>Course</h5>
                        </div>
                        <div className='mx-2'>
                            <h5>:</h5>
                            <h5>:</h5>
                        </div>
                        <div className='text-left'>
                            <h5>{student.name}</h5>
                            <h5>{student.category?.categoryName ? student.category?.categoryName : "Not Available"}</h5>

                        </div>

                    </div>
                    <Formik
                        initialValues={{
                            selectProject: '', projectName: '', projectLink: '', startDate: '',
                            endDate: '', projectStatus: "Ongoing", studentDetails: std_id
                        }}
                        validate={values => {
                            const errors = {};

                            if (!values.projectLink) {
                                errors.projectLink = "Link is required"
                            }
                            if (!values.startDate) {
                                errors.startDate = "Start date is required"
                            }

                            if (!values.endDate) {
                                errors.endDate = "End Date is required"
                            }


                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {

                            axios.post(`${baseUrl}/add-project`, values)
                                .then((res) => {
                                    console.log(res)
                                    navigate(`/singleStudent/${std_id}`)
                                    setSubmitting(false)
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

                                <select id=""
                                    type="text"
                                    name="selectProject"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.selectProject}
                                    className='form-control p-2 my-3'
                                >
                                    <option>Select Project</option>
                                    {
                                        subCourse &&
                                        subCourse.map((subCourse, ind) => {
                                            return (
                                                <option key={ind} value={subCourse._id}>{subCourse.title}</option>

                                            )
                                        })
                                    }

                                </select>

                                <p className='text-left text-red-400 text-sm my-2'>

                                    {errors.selectProject && touched.selectProject && errors.selectProject}
                                </p>
                                {/* <button>Add Project</button> */}

                                <input
                                    type="text"
                                    name="projectName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.projectName}
                                    className='form-control p-2 my-3'
                                    placeholder='Project Name'
                                />
                                <p className='text-left text-red-400 text-sm my-2'>

                                    {errors.projectName && touched.projectName && errors.projectName}
                                </p>


                                <input
                                    type="text"
                                    name="projectLink"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.projectLink}
                                    className='form-control p-2 my-2'
                                    placeholder='Link'
                                />
                                <p className='text-left text-red-400 text-sm my-2'>

                                    {errors.projectLink && touched.projectLink && errors.projectLink}
                                </p>

                                <div className='flex mt-3'>

                                    <div>
                                        <input
                                            type="text"
                                            name="startDate"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            onFocus={(e) => e.target.type = "date"}
                                            value={values.startDate}
                                            className='border rounded p-2 w-[320px]'
                                            placeholder='Start Date'

                                        />
                                        <p className='text-left text-red-400 text-sm my-2'>

                                            {errors.startDate && touched.startDate && errors.startDate}
                                        </p>

                                    </div>
                                    <div>

                                        <input
                                            type="text"
                                            name="endDate"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            onFocus={(e) => e.target.type = "date"}
                                            value={values.endDate}
                                            className='border rounded p-2 w-[320px] ms-[13px]'
                                            placeholder='End Date'

                                        />
                                        <p className='text-left text-red-400 text-sm my-2 ms-3'>

                                            {errors.endDate && touched.endDate && errors.endDate}
                                        </p>


                                    </div>

                                </div>

                                <select
                                    name='projectStatus'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.projectStatus}
                                    className='border p-2 form-control my-2'

                                >
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed" disabled>Completed</option>
                                    <option value="Incomplete" disabled>Incomplete</option>

                                </select>
                                {errors.projectStatus && touched.projectStatus && errors.projectStatus}



                                <Button type="submit" disabled={isSubmitting} className='submit_btn py-2 mt-3 px-4'>
                                    Submit
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>


    )
}

export default AddProject