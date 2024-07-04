import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../util/api'
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";


const Incomplete = () => {
    const [incomplete, setIncomplete] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${baseUrl}/get-incomplete`)
            .then((res) => {
                console.log("prooooo", res.data.data)
                setIncomplete(res.data.data)
            })
            .catch((err) => console.log(err))
    },[])

    // const onclickHandler =(id)=>{
    //     // console.log("incomplkascbs", id)
    //     navigate(`/singleStudent/${id}`)
    // }

    const emailSend = (email)=>{
        console.log("email",email)
        navigate(`/email/${email}`)
    }
    return (
        <div className='p-4'>
            <h1 className='H1 text-7xl font-bold mt-10'>Incomplete Project</h1>
            <Table className='mt-10' bordered>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Project Status</th>
                        {/* <th>Details</th> */}
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        incomplete &&
                        incomplete.map((incomplete,ind)=>{
                            return(
                                <tr>
                                    <td>{++ind}</td>
                                    <td>{incomplete.studentDetails?.name}</td>
                                    <td>{incomplete.projectStatus}</td>
                                    {/* <td onClick={()=>onclickHandler(incomplete._id)}>View Info</td> */}
                                    <td onClick={()=>emailSend(incomplete.studentDetails?.email)}><button className='text-2xl text-[#d7483c]'><MdEmail />
                                    </button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </Table>

        </div>
    )
}

export default Incomplete