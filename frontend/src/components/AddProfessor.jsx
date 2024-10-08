import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Link } from "react-router-dom";


const CreateProfessorForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    specialization: '',
    status: 'active', // default status
  });

  const [departments, setDepartments] = useState([]); // To hold the department options
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/department'); // Adjust this URL as needed
        const data = await response.json();
        if (response.ok) {
          setDepartments(data); // Set the department data
        } else {
          setError(data.message || 'Failed to fetch departments.');
        }
      } catch (err) {
        setError('Something went wrong while fetching departments.');
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/professors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess('Professor created successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          department: '',
          specialization: '',
          status: 'active',
        });
      } else {
        setError(result.message || 'Failed to create professor.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-xl font-semibold text-gray-700 mb-4">Create Professor</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter First Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Last Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Specialization"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mr-4"
            >
              Create Professor
            </button>

            <Button type="button"  className="bg-green-500 text-white p-2 rounded">
          <Link to="/prodata">Go to Show Data</Link>
        </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProfessorForm;
