import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../util/api';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { MdAdd } from "react-icons/md";
import moment from "moment";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Modal, notification } from 'antd';
import { IoMdArrowRoundBack } from "react-icons/io";




const SingleStudent = () => {
  const { student_id } = useParams();
  const [student, setStudent] = useState({});
  const navigate = useNavigate();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [studentID, setStudentID] = useState("")

  useEffect(() => {
    axios.get(`${baseUrl}/get-student/${student_id}`)
      .then((res) => {
        console.log("single student", res.data.data)
        setStudent(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [student_id])

  const onclickHandler = () => {
    navigate("/addProject/" + student_id)

  }

  // project api

  const [project, setProject] = useState([])
  console.log("PPPPPPP", project)

  const singleStudentData = () => {
    axios.get(`${baseUrl}/get-projects?studentid=${student_id} `)
      .then((res) => {
        console.log("project", res.data.data)
        setProject(res.data.data)
      })
      .catch((err) => console.log(err))

  }

  useEffect(() => {
    singleStudentData()

  }, [])

  const oneditHandler = (id) => {
    console.log("edittt", id)
    navigate(`/editProject/${id}`)

  }

  const deleteProject = (id) => {
    console.log("deleteee", id)
    setisModalOpen(true)
    setStudentID(id)

  }


  const ondeleteHandeler = () => {
    console.log("studentID", studentID)
    axios.delete(`${baseUrl}/delete-project/${studentID}`)
      .then((res) => {
        console.log(res)
        singleStudentData()
        notification.success({ message: "Deleted" })

      })
      .catch((err) => console.log(err))
  }

  const backButton = () => {
    navigate("/")
  }

  return (
    <div className='relative'>
      <div className='h-14 w-14 rounded-full border-gray-500 border-2 flex justify-center items-center absolute top-6 left-40 back' onClick={backButton}>
        <IoMdArrowRoundBack className='text-2xl' />


      </div>
      <div className='h-[613px] flex justify-center items-center'>
        <div>
          <div className='flex items-center justify-center'>
            <div>
              <h1 className='H1 text-7xl font-bold'>Profile</h1>

            </div>
            <div className='mb-3'>
              <h1 className='H1 text-7xl font-bold mx-4'>:</h1>
            </div>
            <div>
              <h1 className='H1 text-7xl font-bold'>{student.name}</h1>
            </div>
          </div>
          <div className='shadow-xl w-[800px] p-16 h-[300px] flex justify-evenly'>

            <div className='text-left'>
              <h3>Name </h3>
              <h3>Email</h3>
              <h3>Contact</h3>
              <h3>Course</h3>
            </div>

            <div>
              <h3>:</h3>
              <h3>:</h3>
              <h3>:</h3>
              <h3>:</h3>
            </div>

            <div className='text-left'>
              <h3>{student?.name}</h3>
              <h3>{student?.email}</h3>
              <h3>{student?.contact}</h3>
              <h3>{student.category?.categoryName ? student.category?.categoryName : "Not Available"}</h3>
            </div>

          </div>
        </div>


      </div>

      <div className='p-4'>
        <div className='flex justify-end'>
          <button className='bg-blue-950 text-white flex items-center py-2 px-3 rounded' onClick={onclickHandler}>Add Project <span className='ms-1 mt-[1px] text-xl'><MdAdd />
          </span></button>
        </div>
        <Table bordered className='mt-3'>
          <thead>
            <tr>

              <th>Sr. No.</th>
              <th>Project</th>
              <th>Project Name</th>
              <th>Project Link</th>
              <th>Start Date</th>
              <th>Submission Date</th>
              <th>Project Status</th>
              <th>Action</th>
            </tr>


          </thead>

          <tbody>
            {
              project &&
              project.map((project, ind) => {
                return (
                  <tr>
                    <td>{++ind}</td>
                    <td>{project.selectProject.title}</td>
                    <td>{project.projectName}</td>
                    <td><a href={project.projectLink} className='no-underline'>{project.projectLink}</a></td> 
                    <td>{moment(project.startDate).format('Do MMM YYYY')}</td>
                    <td>{moment(project.endDate).format('Do MMM YYYY')}</td>
                    <td>{project.projectStatus}</td>
                    <td>
                      <div className="flex justify-center items-center">
                        <div className="text-3xl text-slate-700 hover:text-green-700" onClick={() => oneditHandler(project._id)}>
                          <FaEdit />
                        </div>
                        <div className='ms-2 text-3xl text-slate-700 hover:text-red-500' onClick={() => deleteProject(project._id)}>
                          <RiDeleteBin5Fill />
                        </div>

                      </div>
                    </td>
                  </tr>

                )
              })
            }

          </tbody>

          <Modal open={isModalOpen} onCancel={() => setisModalOpen(false)}>
            <h5>Are you sure want to delete this data?</h5>
            <div className='flex justify-end'>
              <Button onClick={() => setisModalOpen(false)} className='bg-dark border-dark'>Cancel</Button>

              <Button onClick={() => {
                ondeleteHandeler()
                setisModalOpen(false)
              }} className='submit_btn1 ms-3'>Delete</Button>
            </div>

          </Modal>



        </Table>


      </div>
    </div>
  )
}

export default SingleStudent