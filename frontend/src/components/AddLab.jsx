import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Navbar from './shared/Navbar'
import { Button } from './ui/button';
import { Link } from "react-router-dom";

const AddLab = () => {
  const [labName, setLabName] = useState('');
  const [labCode, setLabCode] = useState('');
  const [capacity, setCapacity] = useState('');
  const [resources, setResources] = useState(['']); // Start with one empty resource input
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch departments when the component loads
  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:3000/api/department',{
          headers: {
            Authorization: `Bearer ${token}`  // Include token in Authorization header
          }
        });
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
    const token = localStorage.getItem("token");
    const labData = {
      labName,
      labCode,
      capacity: Number(capacity),
      resources,
      department: departmentId,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/lab', labData, {
        headers: {
          Authorization: `Bearer ${token}`  // Include token in Authorization header
        }
      });

      if (response.status === 201) {
        setSuccess('Lab created successfully.');
        setLabName('');
        setLabCode('');
        setCapacity('');
        setResources(['']); // Reset resources
        setDepartmentId('');
      } else {
        setError('Failed to create lab.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
};


  // Handle resource input
  const handleResourceChange = (index, value) => {
    const newResources = [...resources];
    newResources[index] = value;
    setResources(newResources);
  };

  const addResourceInput = () => {
    setResources([...resources, '']); // Add an empty input for new resource
  };

  return (
    <>
   <Navbar></Navbar>
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Lab</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Lab Name</label>
          <input
            type="text"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lab Code</label>
          <input
            type="text"
            value={labCode}
            onChange={(e) => setLabCode(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Resources</label>
          {resources.map((resource, index) => (
            <input
              key={index}
              type="text"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
              placeholder={`Resource ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addResourceInput}
            className="text-sm text-blue-600"
          >
            Add Another Resource
          </button>
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
          Add Lab
        </button>
        <Button type="button"  className="bg-green-500 text-white p-2 rounded">
          <Link to="/labdata">Go to Show Data</Link>
        </Button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddLab;
