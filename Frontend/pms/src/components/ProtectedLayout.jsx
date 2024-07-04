import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Appbar from './Appbar'

const ProtectedLayout = () => {
  const token = localStorage.getItem("token")
  return (
    <div>
      {
        token ? <>
          <Appbar />
          <Outlet />

        </> : <Navigate to={"/sign-in"} />
      }
    </div>
  )
}

export default ProtectedLayout