import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Link } from "react-router-dom";

const AddGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch departments when the component loads
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/department');
        setDepartments(response.data);
      } catch (err) {
        setError('Failed to fetch departments.');
      }
    };

    fetchDepartments();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const groupData = {
      groupName,
      groupCode,
      department: departmentId
    };

    try {
      const response = await axios.post('http://localhost:3000/api/groups', groupData);

      if (response.status === 201) {
        setSuccess('Group created successfully.');
        setGroupName('');
        setGroupCode('');
        setDepartmentId('');
      } else {
        setError('Failed to create group.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (

    <>
  <Navbar></Navbar>
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"> {/* Adjusted width and centered */}
        <h1 className="text-2xl font-bold mb-4">Add New Group</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Group Code</label>
            <input
              type="text"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mr-4"
          >
            Add Group
          </button>
          <Button type="button"  className="bg-green-500 text-white p-2 rounded">
          <Link to="/groupdata">Go to Show Data</Link>
        </Button>
        </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddGroup;
