import React from 'react'
import { Outlet } from 'react-router-dom'

const Master = () => {
  return (
    <div >
      <header className='bg-dark p-3 text-center text-light'>
         <h3>CRUD API</h3>
      </header>
      <div className="container my-5">
        <Outlet/>
      </div>
    </div>
  )
}

export default Master
