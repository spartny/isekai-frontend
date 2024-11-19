import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';

function Menu() {
  return (
    

    <div className='flex justify-center items-center min-h-full'>
        <div className='w-80 mt-10 p-10 pt-0 menu-bg h-fit'>
            <h1 className='text-4xl mb-12 mt-8'>Menu</h1>
            <div className="flex flex-col">
                <Link className='text-2xl p-4 hover-effect' to={'/saved-games'}>Continue</Link>
                <Link className='text-2xl p-4 hover-effect' to={'/create-game'}>New Game</Link>
                <Link className='text-2xl p-4 hover-effect' to={'/profile'}>Profile</Link>
                <Link className='text-2xl p-4 hover-effect' to={'/logout'}>Quit</Link>
            </div>
        </div>
    </div> 
  )
}

export default Menu