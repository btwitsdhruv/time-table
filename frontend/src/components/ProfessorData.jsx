import React, { useEffect, useState } from 'react';

const ProfessorsTable = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    slotIndex: '',
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all professors
  const fetchProfessors = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/professors');
      const data = await response.json();
      setProfessors(data);
    } catch (err) {
      setError('Failed to fetch professors.');
    }
  };

  // Delete professor by ID
  const deleteProfessor = async (id) => {
    try {
      await fetch(`http://localhost:7000/api/professors/${id}`, {
        method: 'DELETE',
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
      middleName: professor.middleName,
      lastName: professor.lastName,
      slotIndex: professor.slotIndex,
      isActive: professor.isActive,
    });
    setIsEditing(true);
  };

  // Update professor
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7000/api/professors/${selectedProfessor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
  }, []);

  return (
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
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Middle Name</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Last Name</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Slot Index</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Active</th>
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
                  <td className="py-4 px-6">{professor.middleName}</td>
                  <td className="py-4 px-6">{professor.lastName}</td>
                  <td className="py-4 px-6">{professor.slotIndex}</td>
                  <td className="py-4 px-6">{professor.isActive ? 'Yes' : 'No'}</td>
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
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700">Slot Index</label>
              <input
                type="number"
                name="slotIndex"
                value={formData.slotIndex}
                onChange={(e) => setFormData({ ...formData, slotIndex: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Is Active</label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Update Professor
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfessorsTable;
