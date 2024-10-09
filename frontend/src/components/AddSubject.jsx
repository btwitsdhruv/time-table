import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { Link } from "react-router-dom";



const AddSubject = () => {
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [theoryProfessor, setTheoryProfessor] = useState("");
  const [practicalProfessor, setPracticalProfessor] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [classroom, setClassroom] = useState("");
  const [error, setError] = useState("");

  const [professors, setProfessors] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:3000/api/professors', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfessors(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized! Redirecting to login...");
          window.location.href = "/";
        } else {
          console.error("Error fetching professors:", error);
        }
      }
    };

    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // Adjust endpoint as needed
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchProfessors();
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:3000/api/subjects", {
        subject_code: subjectCode,
        subject_name: subjectName,
        credit_hours: parseInt(creditHours, 10),
        semester,
        department,
        subject_type: subjectType,
        theory_professor: theoryProfessor,
        practical_professor: practicalProfessor,
        max_students: parseInt(maxStudents, 10),
        classroom,
      }, {
        headers: {
          Authorization: `Bearer ${token}`  // Include token in Authorization header
        }
      });


      // Clear form after successful submission
      setSubjectCode("");
      setSubjectName("");
      setCreditHours("");
      setSemester("");
      setDepartment("");
      setSubjectType("");
      setTheoryProfessor("");
      setPracticalProfessor("");
      setMaxStudents("");
      setClassroom("");

      alert("Subject added successfully!");
    } catch (err) {
      console.error("Error adding subject:", err);
      setError("Error adding subject. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Add New Subject</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="subjectCode">Subject Code</Label>
        <Input
          id="subjectCode"
          type="text"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          required
          className="mb-4"
        />

        <Label htmlFor="subjectName">Subject Name</Label>
        <Input
          id="subjectName"
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
          className="mb-4"
        />

        <Label htmlFor="creditHours">Credit Hours</Label>
        <Input
          id="creditHours"
          type="number"
          value={creditHours}
          onChange={(e) => setCreditHours(e.target.value)}
          required
          className="mb-4"
        />

        <Label htmlFor="semester">Semester</Label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Select a semester</option>
          {Array.from({ length: 8 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>


        <Label htmlFor="department">Select Department</Label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name} {/* Adjust according to the department schema */}
            </option>
          ))}
        </select>

        <Label htmlFor="subjectType">Subject Type</Label>
        <Input
          id="subjectType"
          type="text"
          value={subjectType}
          onChange={(e) => setSubjectType(e.target.value)}
          required
          className="mb-4"
        />

        <Label htmlFor="theoryProfessor">Select Theory Professor</Label>
        <select
          id="theoryProfessor"
          value={theoryProfessor}
          onChange={(e) => setTheoryProfessor(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Select a theory professor</option>
          {professors.map(professor => (
            <option key={professor._id} value={professor._id}>
              {professor.firstName} {professor.lastName}
            </option>
          ))}
        </select>

        <Label htmlFor="practicalProfessor">Select Practical Professor</Label>
        <select
          id="practicalProfessor"
          value={practicalProfessor}
          onChange={(e) => setPracticalProfessor(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Select a practical professor</option>
          {professors.map(professor => (
            <option key={professor._id} value={professor._id}>
              {professor.firstName} {professor.lastName}
            </option>
          ))}
        </select>

        <Label htmlFor="maxStudents">Max Students</Label>
        <Input
          id="maxStudents"
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
          required
          className="mb-4"
        />

        <Label htmlFor="classroom">Classroom</Label>
        <Input
          id="classroom"
          type="text"
          value={classroom}
          onChange={(e) => setClassroom(e.target.value)}
          required
          className="mb-4"
        />

        <div className="flex justify-center items-center">
          <Button type="submit" className="bg-blue-500 text-white p-2 rounded mr-4">
            Add Subject
          </Button>
          <Button type="button" className="bg-green-500 text-white p-2 rounded">
            <Link to="/subject/showdata">Go to Show Data</Link>
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AddSubject;
