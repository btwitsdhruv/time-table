import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './shared/Navbar';

const LabsTable = () => {
  const [labs, setLabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Fetch labs when the component loads
  useEffect(() => {
    const fetchLabs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:3000/api/lab',{
          headers: {
            Authorization: `Bearer ${token}`  // Include token in Authorization header
          }
        });
        setLabs(response.data);
      } catch (err) {
        setError('Failed to fetch labs.');
      }
    };

    fetchLabs();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter labs based on search term
  const filteredLabs = labs.filter(lab =>
    lab.labName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete lab
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/lab/${id}`);
      setLabs(labs.filter(lab => lab._id !== id));
    } catch (err) {
      setError('Failed to delete lab.');
    }
  };

  return (
    <>
   <Navbar></Navbar>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Labs List</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by lab name"
        className="border border-gray-300 rounded-md p-2 mb-4"
      />

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Lab Name</th>
            <th className="border border-gray-300 p-2">Lab Code</th>
            <th className="border border-gray-300 p-2">Department Name</th>
            <th className="border border-gray-300 p-2">Capacity</th>
            <th className="border border-gray-300 p-2">Resources</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLabs.map(lab => (
            <tr key={lab._id}>
              <td className="border border-gray-300 p-2">{lab.labName}</td>
              <td className="border border-gray-300 p-2">{lab.labCode}</td>
              <td className="border border-gray-300 p-2">{lab.name}</td>
              <td className="border border-gray-300 p-2">{lab.capacity}</td>
              <td className="border border-gray-300 p-2">{lab.resources.join(', ')}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(lab._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default LabsTable;
