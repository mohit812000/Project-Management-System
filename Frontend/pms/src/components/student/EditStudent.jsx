import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import { baseUrl } from '../util/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { notification } from "antd"
import { IoMdArrowRoundBack } from "react-icons/io";


const EditStudent = () => {
    const [edit, setEdit] = useState({})
    const { edit_id } = useParams();
    // const [proStatus, setProStatus] = useState([])
    const [course, setCourse] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`${baseUrl}/get-student/${edit_id}`)
            .then((res) => {
                console.log("sigleee", res.data.data)
                setEdit(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}/get-categories`)
            .then((res) => {
                console.log("courseeeeee", res.data.data)
                setCourse(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // useEffect(() => {
    //     axios.get(`${baseUrl}/get-projectStatus`)
    //         .then((res) => {
    //             console.log("projectstatussss", res.data.data)
    //             setProStatus(res.data.data)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    const onclickHandler = ()=>{
        navigate("/")

    }

    return (
        <div className='relative'>
            <div className='h-14 w-14 rounded-full border-gray-500 border-2 flex justify-center items-center absolute top-6 left-40 back' onClick={onclickHandler}>
                <IoMdArrowRoundBack className='text-2xl' />
            </div>

            <div className='h-[86vh] flex justify-center items-center'>

                <div className='w-1/2 p-4 shadow-xl'>
                    <h1 className='H1 text-7xl font-bold'>Edit Student</h1>
                    <Formik
                        initialValues={{ name: edit.name, email: edit.email, contact: edit.contact, category: edit.category?._id || " " }}

                        enableReinitialize={true}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = "Name is required"
                            }
                            if (!values.email) {
                                errors.email = 'Email is required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.contact) {
                                errors.contact = "Contact is required"
                            }
                            if (!values.category) {
                                errors.category = "Course name is required"
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            axios.put(`${baseUrl}/update-student/${edit_id}`, values)
                                .then((res) => {
                                    console.log(res)
                                    notification.success({ message: "Updated" })
                                    setSubmitting(false)
                                    navigate("/")
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
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
                                <input
                                    type="name"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    className='form-control'
                                    placeholder='Name'
                                />
                                {errors.name && touched.name && errors.name}
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className='form-control my-3'
                                    placeholder='Email'
                                />
                                {errors.email && touched.email && errors.email}
                                <input
                                    type="contact"
                                    name="contact"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contact}
                                    className='form-control'
                                    placeholder='Contact'
                                />
                                {errors.contact && touched.contact && errors.contact}


                                <select id=""
                                    type="text"
                                    name="category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.category}
                                    className='form-control my-3'

                                >
                                    {/* <option>Select Course</option> */}
                                    {
                                        course &&
                                        course.map((course, ind) => {
                                            return (
                                                <option key={ind} value={course._id} selected={course._id == edit.category?._id ? true : false}>{course.categoryName ? course.categoryName : "Not Available"}</option>
                                            )
                                        })
                                    }
                                </select>
                                {errors.category && touched.category && errors.category}
                                <Button type="submit" disabled={isSubmitting} className='submit_btn'>
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

export default EditStudent