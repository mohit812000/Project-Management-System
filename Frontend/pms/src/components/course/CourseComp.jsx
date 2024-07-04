import React, { useEffect, useState } from 'react'
import axios from "axios"
import { baseUrl } from "../util/api"
import { Button, Table } from "react-bootstrap"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiAddFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';


const CourseComp = () => {
    const [course, setCourse] = useState([])
    const navigate = useNavigate()
    const [courseID, setCourseID] = useState("")
    const [isModalOpen, setisModalOpen] = useState(false);

    const getCategories = () => {
        axios.get(`${baseUrl}/get-categories`)
            .then((res) => {
                console.log("categoryyyy", res.data.data)
                setCourse(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    useEffect(() => {
        getCategories()

    }, [])

    const onclickHandler = () => {
        navigate("/addCourse")

    }

    const oneditHandler = (id) => {
        console.log("editt", id)
        navigate(`/editCourse/${id}`)

    }

    const ondelete = (id) => {
        console.log("id", id)
        setCourseID(id)
        setisModalOpen(true)

    }

    const ondeleteHandler = () => {
        axios.delete(`${baseUrl}/delete-category/${courseID}`)
            .then((res) => {
                console.log(res)
                getCategories()
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div className='p-3'>
            <h1 className='font-bold H1 text-7xl mt-3'>COURSES</h1>
            <div className='flex justify-end'>
                <button className='flex items-center bg-blue-950 text-white rounded px-3 py-2' onClick={onclickHandler}>ADD COURSE <span><RiAddFill className='text-xl ms-1' />

                </span></button>

            </div>

            <Table bordered className='mt-3'>
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>
                    {
                        course &&
                        course.map((course, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{++ind}</td>
                                    <td className='w-[200px]'>{course.categoryName}</td>
                                    <td className='w-[1200px]'>{course.description}</td>
                                    <td>
                                        <div className="flex justify-center items-center h-16 px-3">
                                            <div className="text-3xl text-slate-700 hover:text-green-700" onClick={() => oneditHandler(course._id)}>
                                                <FaEdit />
                                            </div>
                                            <div className='ms-3 text-3xl text-slate-700 hover:text-red-500' onClick={() => ondelete(course._id)}>
                                                <RiDeleteBin5Fill />
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    

                    <Modal open={isModalOpen} onCancel={() => setisModalOpen(false)}>
                        <h5>Are you sure want to delete this data?</h5>
                        <div className='flex justify-end'>
                            <Button onClick={() => setisModalOpen(false)} className='bg-dark border-dark'>Cancel</Button>
                            <Button onClick={() => {
                                ondeleteHandler()
                                setisModalOpen(false)
                            }} className='ms-3 submit_btn1'>Delete</Button>

                        </div>


                    </Modal>
                </tbody>

            </Table>
        </div>
    )
}

export default CourseComp