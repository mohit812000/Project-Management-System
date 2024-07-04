import React from 'react'
import { Formik } from 'formik';
import { Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../util/api';
import axios from 'axios';
import { notification } from "antd"
import { IoMdArrowRoundBack } from "react-icons/io";



const AddCourse = () => {
    const navigate = useNavigate()
    const backHandler = () => {
        navigate("/course")

    }
    return (
        <div className='relative'>
            <div className='h-14 w-14 rounded-full border-gray-500 border-2 flex justify-center items-center absolute top-6 left-40 back' onClick={backHandler}>
                <IoMdArrowRoundBack className='text-2xl' />


            </div>

            <div className='flex justify-center items-center h-[613px]'>
                <div className='shadow-xl w-[600px] p-4'>

                    <h1 className='H1 font-bold text-7xl'>ADD COURSE</h1>
                    <Formik
                        initialValues={{ categoryName: '', description: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.categoryName) {
                                errors.categoryName = "Course is required"
                            }
                            if (!values.description) {
                                errors.description = "Description is required"
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            values.categoryName = values.categoryName.toUpperCase();
                            axios.post(`${baseUrl}/add-category`, values)
                                .then((res) => {
                                    console.log(res)
                                    notification.success({ message: res.data.message })
                                    setSubmitting(false)
                                    navigate("/course")

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
                                    type="text"
                                    name="categoryName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.categoryName}
                                    className='form-control'
                                    placeholder='Course'
                                />
                                <p className='text-left text-sm text-red-400 my-2'>
                                    {errors.categoryName && touched.categoryName && errors.categoryName}

                                </p>
                                <textarea type="text" name="description" id="" cols="30" rows="10" onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    className='form-control mt-3'
                                    placeholder='Description' />
                                <p className='text-left text-sm text-red-400 my-2'>

                                    {errors.description && touched.description && errors.description}
                                </p>
                                <Button type="submit" disabled={isSubmitting} className='submit_btn mx-3'>
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

export default AddCourse