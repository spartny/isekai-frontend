import React from 'react'

function TopBar() {
  return (
    <div className='flex justify-center items-center name-logo'>
      <p className='text-3xl'>SigVerify</p>
      <img className='size-10' type="image/svg+xml" src="logo_white.svg"></img>
    </div>
  )
}

export default TopBar