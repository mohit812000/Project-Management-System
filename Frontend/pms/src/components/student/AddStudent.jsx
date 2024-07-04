import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { baseUrl } from "../util/api";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { notification } from "antd"
import { IoMdArrowRoundBack } from "react-icons/io";



const AddStudent = () => {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  useEffect(() => {
    axios.get(`${baseUrl}/get-categories`)
      .then((res) => {
        console.log("course", res.data.data);
        setCourse(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])



  const backHandler = () => {
    navigate("/")
  }

  return (
    <div className='relative'>
       <div className='h-14 w-14 rounded-full border-gray-500 border-2 flex justify-center items-center absolute top-6 left-40 back' onClick={backHandler}>
        <IoMdArrowRoundBack className='text-2xl'/>


      </div>

      <div className='h-[86vh] flex justify-center items-center'>
        <div className='w-1/2 p-4 shadow-xl'>
          <h1 className='H1 text-7xl font-bold'>ADD STUDENT</h1>

          <Formik
            initialValues={{ name: '', email: '', contact: '', category: '' }}
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
              axios.post(`${baseUrl}/add-student`, values, {
                headers: {
                  Authorization: token
                }
              })
                .then((res) => {
                  console.log(res)
                  notification.success({ message: "Data added successfully" })
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
                <p className='text-left text-red-400 text-sm my-2'>

                  {errors.name && touched.name && errors.name}
                </p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className='form-control my-3'
                  placeholder='Email'
                />
                <p className='text-left text-red-400 text-sm my-2'>

                  {errors.email && touched.email && errors.email}
                </p>
                <input
                  type="contact"
                  name="contact"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact}
                  className='form-control'
                  placeholder='Contact'
                />
                <p className='text-left text-red-400 text-sm my-2'>

                  {errors.contact && touched.contact && errors.contact}
                </p>


                <select id=""
                  type="text"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                  className='form-control my-3'

                >
                  {course.length > 0 ? (
                    <>
                      <option>Select Course</option>
                      {course.map((courseItem, index) => (
                        <option key={index} value={courseItem._id}>
                          {courseItem.categoryName}
                        </option>
                      ))}
                    </>
                  ) : (
                    <>
                      <option>Select Course</option>
                      <option disabled>Course is not available first add course in course page, then select from here.</option>
                    </>
                  )}
                  


                </select>
                <p className='text-left text-red-400 text-sm my-2'>

                  {errors.category && touched.category && errors.category}
                </p>
                {/* <Button className='bg-dark border-black px-4 me-3' onClick={backHandler}>Back</Button> */}
                <Button type="submit" disabled={isSubmitting} className='submit_btn px-4'>
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

export default AddStudent