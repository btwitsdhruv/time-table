import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]); // Initial state as an empty array
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all subjects with populated professor data
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {

      // const response = await axios.get('http://localhost:3000/api/subjects');

      const token = localStorage.getItem("token");
       
      const response = await axios.get('http://localhost:3000/api/subjects', {
        headers: {
          Authorization: `Bearer ${token}` // Set token in Authorization header
        }
      });

      if (Array.isArray(response.data)) {
        setSubjects(response.data); // Ensure the response is an array
      } else {
        console.error('Unexpected response data format:', response.data);
        setSubjects([]); // Fallback in case of unexpected data format
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/subjects/${id}`);
      fetchSubjects(); // Refresh the subjects list after deletion
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handleEdit = (id) => {
    // Handle edit logic
  };

  // Filter subjects based on search input
  const filteredSubjects = subjects.filter((subject) =>
    subject.subjectName && subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded shadow-md"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Subjects List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border font-medium text-left">Subject Code</th>
              <th className="px-4 py-2 border font-medium text-left">Subject Name</th>
              <th className="px-4 py-2 border font-medium text-left">Abbreviation</th>
              <th className="px-4 py-2 border font-medium text-left">Weekly Lectures</th>
              <th className="px-4 py-2 border font-medium text-left">Theory Professors</th>
              <th className="px-4 py-2 border font-medium text-left">Practical Professors</th>
              <th className="px-4 py-2 border font-medium text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr key={subject._id} className="border-b">
                <td className="px-4 py-2 border">{subject.subjectCode}</td>
                <td className="px-4 py-2 border">{subject.subjectName}</td>
                <td className="px-4 py-2 border">{subject.abbreviation}</td>
                <td className="px-4 py-2 border">{subject.weeklyLectures}</td>
                <td className="px-4 py-2 border">
                  {subject.theoryProfs.map((prof) => prof.firstName).join(', ')} {/* Theory Professors */}
                </td>
                <td className="px-4 py-2 border">
                  {subject.practicalProfs.map((prof) => prof.firstName).join(', ')} {/* Practical Professors */}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow-md mr-2"
                    onClick={() => handleEdit(subject._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded shadow-md"
                    onClick={() => handleDelete(subject._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectManagement;
