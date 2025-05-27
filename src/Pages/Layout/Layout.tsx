import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function Layout() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("auth") == "true") {
      navigate("/homePage")
    } else {
      navigate("/signUp")
    }
  },[])


  return (
    <div>
       <ToastContainer />
    </div>
  )
}

export default Layout