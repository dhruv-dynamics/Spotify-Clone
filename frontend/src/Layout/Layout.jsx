import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <div className='flex bg-black min-h-screen text-white'>
      <Sidebar />
      <main className="w-3/4 ml-[25%] p-2 pb-28 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

export default Layout