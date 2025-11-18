import React from 'react'
import { Link } from 'react-router-dom'

const Navsection = () => {
  return (
    <div className='w-full flex justify-end gap-10 px-4 py-6'>

        <Link
        to="/login"
        className="text-sm text-white hover:text-text-primary transition-all duration-200 bg-blue-500 rounded-lg px-10 py-2"
        >Sign In</Link>
        <Link
        to="/signup"
        className='text-sm text-white hover:bg-white hover:text-black  transition-all duration-500 border-blue-500 border-2 px-10 py-2 rounded-lg'
        >Sign Up</Link>
    </div>
  )
}

export default Navsection