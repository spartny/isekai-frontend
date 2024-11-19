import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/')
    }

  return (
    <div className='flex items-start justify-between ml-20 pl-20'>
        <button className='button-stroke-white w-44 h-9' onClick={handleClick}>
            Return to Menu
        </button>
    </div>
  )
}

export default BackButton