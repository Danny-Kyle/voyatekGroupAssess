import React from 'react'
import Breadcrumb from './Breadcrumbs'

const breadcrumbitems = [
  // {href: "/", label: "Home"},
  {href: "/settings", label: "Settings"},
  {href: "/", label: "User & Roles Settings"}
]

const Load = () => {
  return (
    <main className="p-4 md:p-8 lg:p-12">
      <div className='flex flex-col gap-4'>
        <Breadcrumb items={breadcrumbitems}/>
        <div>
          <h2 className='font-bold text-xl sm:text-2xl md:text-3xl'>Users & Roles</h2>
          <p className='text-sm sm:text-base md:text-lg text-gray-600'>Manage all users in your business</p>
        </div>
      </div>
    </main>
  )
}

export default Load
