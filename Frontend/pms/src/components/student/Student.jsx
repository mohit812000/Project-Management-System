import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../util/api'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { notification, Modal } from "antd"
import { RiAddFill } from "react-icons/ri";



const Student = () => {
  const [student, setStudent] = useState([])

  const [studentID, setStudentID] = useState("")
  const [isModalOpen, setisModalOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const onclickHandler = () => {
    navigate("/addStudent")
  }

  const oneditHandler = (id) => {
    console.log("edittt", id)
    navigate(`/editstudent/${id}`)
  }

  const ondeleteHandler = () => {
    console.log("deleteee", studentID)
    axios.delete(`${baseUrl}/delete-student/${studentID}`)
      .then((res) => {
        console.log(res)
        notification.success({ message: "Deleted" })
        getData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getData = (val = "") => {
    axios.get(`${baseUrl}/get-students?search=${val}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log("student", res.data.data)
        setStudent(res.data.data)


      })
      .catch((err) => console.log(err))
  }

  const onchangeHandler = (e) => {
    getData(e.target.value)

  }
  useEffect(() => {
    getData()
  }, [])

  const deleteStudent = (id) => {
    setisModalOpen(true);
    setStudentID(id)
  }

  const singleDataHandler = (id) => {
    console.log("singleStudent", id)
    navigate(`/singleStudent/${id}`)

  }
  return (
    <div className='mt-3 p-3'>
      <h1 className='my-4 font-bold H1 text-7xl'>STUDENT LIST</h1>
      <div className='flex justify-between'>
        <input type="text" placeholder='Search by name or course ' className='border-b border-slate-800 py-2 w-[500px] px-2 border-top-none focus-visible:outline-none' onChange={onchangeHandler} />

        <button className='flex items-center bg-blue-950 text-white rounded px-3 py-2' onClick={onclickHandler}>ADD STUDENT
          <span><RiAddFill className='text-xl ms-1' /></span></button>

      </div>
      <Table className='mt-4'>
        <thead>
          <tr>
            <th className='text-left'>Sr. No</th>
            <th className='text-left'>Name</th>
            <th className='text-left'>Email</th>
            <th className='text-left'>Contact</th>
            <th className='text-left'>Course</th>
            <th className='text-left'>Details</th>
            {/* <th>Project Link</th>
            <th>Date</th>
            <th>Project Status</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            student &&
            student.map((student, ind) => {
              return (
                <tr key={ind}>
                  <td className='text-left'>{++ind}</td>
                  <td className='text-left'>{student.name}</td>
                  <td className='text-left'>{student.email}</td>
                  <td className='text-left'>{student.contact}</td>
                  <td className='text-left'>{student.category?.categoryName ? student.category?.categoryName : "Not Available"}</td>
                  <td  onClick={() => singleDataHandler(student._id)} className='hover:text-blue-500 text-left'>View Info</td>
                 
                  <td>
                    <div className="flex justify-center items-center">
                      <div className="text-3xl text-slate-700 hover:text-green-700" onClick={() => oneditHandler(student._id)}>
                        <FaEdit />
                      </div>
                      <div className='ms-2 text-3xl text-slate-700 hover:text-red-500' onClick={() => deleteStudent(student._id)}>
                        <RiDeleteBin5Fill />
                      </div>

                    </div>
                  </td>


                </tr>
              )


            })
          }

        </tbody>

        <Modal title="" open={isModalOpen} onCancel={() => setisModalOpen(false)}>
          <h5>Are you sure want to delete this data?</h5>
          <div className='flex justify-end'>
            <Button onClick={() => setisModalOpen(false)} className='bg-dark border-dark'>Cancel</Button>
            <Button onClick={() => {
              ondeleteHandler()
              setisModalOpen(false)
            }} className='ms-3 submit_btn1'>Delete</Button>

          </div>


        </Modal>


      </Table>

    </div >
  )
}

export default Student