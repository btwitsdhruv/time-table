import React, { useState } from 'react';
import axios from 'axios';

const DepartmentForm = ({ fetchDepartments }) => {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = localStorage.getItem("token");  // Get the token from localStorage

      console.log("Sending data:", { name, branch, status });
      await axios.post(
        'http://localhost:3000/api/department',
        { name, branch, status }
      );

      fetchDepartments();  // Fetch updated departments
      setName('');
      setBranch('');
      setStatus('active');

      console.log("Department created successfully");
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Department Name Field */}
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2">Department Name</label>
        <input
          type="text"
          placeholder="Enter Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Branch Field */}
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2">Branch</label>
        <input
          type="text"
          placeholder="Enter Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Status Field */}
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Department
        </button>
      </div>
    </form>

  );
};

export default DepartmentForm;
