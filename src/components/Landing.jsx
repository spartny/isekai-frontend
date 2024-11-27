import React from 'react'
import TopBar from './TopBar'
import Menu from './Menu'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

function Landing() {
  const navigate = useNavigate()
  useEffect(() => {
    let logged_in = !!localStorage.getItem("accessToken");
    if (!logged_in) {
      navigate('/login');
    }
  }, [navigate])
  return (
    <div className='w-full'>
        <TopBar />
        <Menu />
    </div>
  )
}

export default Landing