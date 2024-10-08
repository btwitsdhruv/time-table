import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSubjectForm = ({ subjectId, onClose, onUpdate }) => {
  const [subjectData, setSubjectData] = useState({
    subject_name: '',
    subject_code: '',
    credit_hours: '',
    semester: '',
    max_students: '',
    subject_type: '',
    department: '',
    theory_professor: '',
    practical_professor: ''
  });

  // Fetch the subject data when the component mounts
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/subjects/${subjectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubjectData(response.data);
      } catch (error) {
        console.error('Error fetching subject data:', error);
      }
    };

    fetchSubject();
  }, [subjectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData({ ...subjectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/subjects/${subjectId}`, subjectData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onUpdate(); // Call the update function to refresh the subject list
      onClose(); // Close the form after update
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Edit Subject</h2>
        <input
          type="text"
          name="subject_name"
          value={subjectData.subject_name}
          onChange={handleChange}
          placeholder="Subject Name"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="subject_code"
          value={subjectData.subject_code}
          onChange={handleChange}
          placeholder="Subject Code"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="number"
          name="credit_hours"
          value={subjectData.credit_hours}
          onChange={handleChange}
          placeholder="Credit Hours"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="semester"
          value={subjectData.semester}
          onChange={handleChange}
          placeholder="Semester"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="number"
          name="max_students"
          value={subjectData.max_students}
          onChange={handleChange}
          placeholder="Max Students"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="subject_type"
          value={subjectData.subject_type}
          onChange={handleChange}
          placeholder="Subject Type"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="department"
          value={subjectData.department?.name}
          onChange={handleChange}
          placeholder="Department"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="theory_professor"
          value={subjectData.theory_professor.firstName}
          onChange={handleChange}
          placeholder="Theory Professor"
          className="border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="practical_professor"
          value={subjectData.practical_professor.firstName}
          onChange={handleChange}
          placeholder="Practical Professor"
          className="border rounded w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </form>
    </div>
  );
};

export default EditSubjectForm;
