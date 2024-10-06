import React from 'react'
import DepartmentList from './department/DepartmentList'
import DepartmentForm from './department/DepartmentForm'
import Navbar from './shared/Navbar'

const Dipartment = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-row space-x-8 p-8">
      {/* Left Side: Department Form */}
      <div className="w-1/3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add Department</h2>
        <DepartmentForm />
      </div>

      {/* Right Side: Department List */}
      <div className="w-2/3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Department List</h2>
        <DepartmentList />
      </div>
    </div>
    </>
  )
}

export default Dipartment;

