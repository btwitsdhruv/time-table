import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditSubjectForm from './EditSubjectForm'; // Import the EditSubjectForm

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]); // Initial state as an empty array
  const [isEditing, setIsEditing] = useState(false); // State to control the edit form visibility
  const [currentSubjectId, setCurrentSubjectId] = useState(null); // State to store the currently editing subject ID

  // Fetch all subjects with populated professor data
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
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
    const token = localStorage.getItem("token");  // Get the token from localStorage
  
    try {
      await axios.delete(`http://localhost:3000/api/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`  // Include token in Authorization header
        }
      });
      
      fetchSubjects();  // Refresh the subjects list after deletion
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };
  

  const handleEdit = (id) => {
    setCurrentSubjectId(id); // Set the ID of the subject to edit
    setIsEditing(true); // Show the edit form
  };

  const handleCloseEditForm = () => {
    setIsEditing(false); // Hide the edit form
    setCurrentSubjectId(null); // Reset the subject ID
  };

  const handleUpdate = () => {
    fetchSubjects(); // Fetch updated subjects after editing
  };

  return (
    <div className="container mx-auto p-4">
      {/* Subjects List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border font-medium text-left">Subject Code</th>
              <th className="px-4 py-2 border font-medium text-left">Subject Name</th>
              <th className="px-4 py-2 border font-medium text-left">Credit Hours</th>
              <th className="px-4 py-2 border font-medium text-left">Semester</th>
              <th className="px-4 py-2 border font-medium text-left">Max Students</th>
              <th className="px-4 py-2 border font-medium text-left">Subject Type</th>
              <th className="px-4 py-2 border font-medium text-left">Department</th>
              <th className="px-4 py-2 border font-medium text-left">Theory Professor</th>
              <th className="px-4 py-2 border font-medium text-left">Practical Professor</th>
              <th className="px-4 py-2 border font-medium text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id} className="border-b">
                <td className="px-4 py-2 border">{subject.subject_code}</td>
                <td className="px-4 py-2 border">{subject.subject_name}</td>
                <td className="px-4 py-2 border">{subject.credit_hours}</td>
                <td className="px-4 py-2 border">{subject.semester}</td>
                <td className="px-4 py-2 border">{subject.max_students}</td>
                <td className="px-4 py-2 border">{subject.subject_type}</td>
                <td className="px-4 py-2 border">{subject.department?.name}</td>
                <td className="px-4 py-2 border">{subject.theory_professor.firstName}</td>
                <td className="px-4 py-2 border">{subject.practical_professor.firstName}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => handleEdit(subject._id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-1">Edit</button>
                  <button onClick={() => handleDelete(subject._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Subject Form */}
      {isEditing && (
        <EditSubjectForm
          subjectId={currentSubjectId}
          onClose={handleCloseEditForm}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default SubjectManagement;
