import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate();
    useEffect(()=> {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token')
        navigate('/login')
    }, [])
  return (
    <div>Logout in process...</div>
  )
}

export default Logout