import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';

const ProfessorsTable = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    specialization: '',
    status: 'active', // Default to 'active'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [departments, setDepartments] = useState([]); // To store departments for selection

  // Fetch all professors
  const fetchProfessors = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:3000/api/professors',{
        headers: {
        Authorization: `Bearer ${token}`  // Include token in Authorization header
      }
      });
      const data = await response.json();
      setProfessors(data);
    } catch (err) {
      setError('Failed to fetch professors.');
    }
  };

  // Fetch departments (assuming you have an API endpoint for this)
  const fetchDepartments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:3000/api/department',{
        headers: {
          Authorization: `Bearer ${token}` 
        } 
      }); // Update the endpoint as necessary
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      setError('Failed to fetch departments.');
    }
  };

  // Delete professor by ID
  const deleteProfessor = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:3000/api/professors/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`  // Include token in Authorization header
        }
      });
      setSuccess('Professor deleted successfully.');
      fetchProfessors(); // Refresh the list
    } catch (err) {
      setError('Failed to delete professor.');
    }
  };

  // Start editing a professor
  const handleEdit = (professor) => {
    setSelectedProfessor(professor);
    setFormData({
      firstName: professor.firstName,
      lastName: professor.lastName,
      department: professor.department._id, // Set department ID for editing
      specialization: professor.specialization,
      status: professor.status,
    });
    setIsEditing(true);
  };

  // Update professor
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/api/professors/${selectedProfessor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess('Professor updated successfully.');
        setIsEditing(false);
        fetchProfessors(); // Refresh the list
      } else {
        setError('Failed to update professor.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchProfessors();
    fetchDepartments(); // Fetch departments when the component mounts
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Professors List</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        {/* Table to display all professors */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">First Name</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Last Name</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Department</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Specialization</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {professors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center text-gray-500">No professors found</td>
                </tr>
              ) : (
                professors.map((professor) => (
                  <tr key={professor._id} className="border-t">
                    <td className="py-4 px-6">{professor.firstName}</td>
                    <td className="py-4 px-6">{professor.lastName}</td>
                    <td className="py-4 px-6">{professor.department?.name}</td>
                    <td className="py-4 px-6">{professor.specialization}</td>
                    <td className="py-4 px-6">{professor.status === 'active' ? 'Active' : 'Inactive'}</td>
                    <td className="py-4 px-6 flex space-x-4">
                      <button
                        onClick={() => handleEdit(professor)}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProfessor(professor._id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-6">Edit Professor</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
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
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Update Professor
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfessorsTable;
