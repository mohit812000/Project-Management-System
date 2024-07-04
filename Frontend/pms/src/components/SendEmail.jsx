import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './util/api';
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";


const SendEmail = () => {
    const { email } = useParams()
    const [to, setTo] = useState(email || " ");
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const res = await axios.post(`${baseUrl}/emailSend/${email}`, { to, subject, text });
            setResponse(res.data.message);
            notification.success({ message: "Email sent successfully" });
            navigate("/incomplete")
        } catch (error) {
            setResponse('Failed to send email');
            notification.error({ message: "Failed to sent email" })
        }
    };

    const cancelButton = () => {
        console.log("cancel")
        navigate("/incomplete")

    }

    return (
        <div className='flex justify-center items-center h-[600px]'>
            <div className='text-left shadow-xl w-[500px] py-4'>
                <div className='bg-[#f2f6fc] flex justify-between items-center h-12 px-2'>
                    <p className='font-semibold pt-3'>New Message</p>
                    <div onClick={cancelButton}>

                        <ImCross />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='px-2 mt-2'>
                        <div>
                            <label>To:</label>
                            <input
                                type="email"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                required
                                className='px-2 w-[450px] focus-visible:outline-none'
                            />
                        </div>
                        <hr />
                        <div className='my-4'>
                            <label>Subject:</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                className='px-2 w-[420px] focus-visible:outline-none'

                            />
                        </div>
                        <div>
                            <label>Message:</label>
                            <div className='mt-2'>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required
                                    className='focus:outline-none px-2 w-full h-[200px]'

                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>

                        <button type="submit" className='nav-butt text-white rounded px-3 py-1'>Send</button>
                    </div>
                </form>
                {response && <p>{response}</p>}
            </div>
        </div>
    );
};

export default SendEmail;
