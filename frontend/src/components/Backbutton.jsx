import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const Backbutton = ({destination ='/'}) => {
  return (
    <div className='flex'>
        <Link to={destination} className='text-white px-4 py-1 rounded-md w-fit bg-sky-400'>
            <BsArrowLeft className='text-2xl'/>
        </Link>
    </div>
  )
}

export default Backbutton