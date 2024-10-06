import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";

const AddSubject = () => {
  const [subjectCode, setSubjectCode] = useState(""); 
  const [subjectName, setSubjectName] = useState(""); 
  const [abbreviation, setAbbreviation] = useState("");
  const [weeklyLectures, setWeeklyLectures] = useState("");
  const [error, setError] = useState("");
  
  const [professors, setProfessors] = useState([]);
  const [selectedTheoryProfs, setSelectedTheoryProfs] = useState([]);
  const [selectedPracticalProfs, setSelectedPracticalProfs] = useState([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const token = localStorage.getItem("token");
       
    const response = await axios.get('http://localhost:3000/api/professors', {
      headers: {
        Authorization: `Bearer ${token}` // Set token in Authorization header
      }
    });
    console.log(response.data); 
        setProfessors(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized! Redirecting to login...");
          // Redirect to login or display a message
          window.location.href = "/";
        } else {
          console.error("Error fetching professors:", error);
        }
      }
    };
    fetchProfessors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/subjects", {
        subjectCode,
        subjectName,
        abbreviation,
        weeklyLectures: parseInt(weeklyLectures, 10), 
        theoryProfs: selectedTheoryProfs, 
        practicalProfs: selectedPracticalProfs, 
      });

      // Clear form after successful submission
      setSubjectCode(""); 
      setSubjectName(""); 
      setAbbreviation("");
      setWeeklyLectures("");
      setSelectedTheoryProfs([]); 
      setSelectedPracticalProfs([]); 

      alert("Subject added successfully!");
    } catch (err) {
      console.error("Error adding subject:", err); 
      setError("Error adding subject. Please try again.");
    }
  };

  const handleShowData = () => {
    alert("Show Data button clicked!"); 
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

        <Label htmlFor="abbreviation">Abbreviation</Label>
        <Input
          id="abbreviation"
          type="text"
          value={abbreviation}
          onChange={(e) => setAbbreviation(e.target.value)}
          required
          className="mb-4"
        />

        <Label htmlFor="weeklyLectures">Weekly Lectures</Label>
        <Input
          id="weeklyLectures"
          type="number"
          value={weeklyLectures}
          onChange={(e) => setWeeklyLectures(e.target.value)}
          required
          className="mb-4"
        />

        <Label htmlFor="theoryProfs">Select Theory Professors (hold Ctrl or Cmd to select multiple)</Label>
        <select
          multiple
          id="theoryProfs"
          value={selectedTheoryProfs}
          onChange={(e) => {
            const options = e.target.options;
            const value = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            setSelectedTheoryProfs(value);
          }}
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-32" // Increased height here
        >
          {professors.map(professor => (
            <option key={professor._id} value={professor._id}>
              {professor.firstName} {professor.lastName}
            </option>
          ))}
        </select>

        <Label htmlFor="practicalProfs">Select Practical Professors (hold Ctrl or Cmd to select multiple)</Label>
        <select
          multiple
          id="practicalProfs"
          value={selectedPracticalProfs}
          onChange={(e) => {
            const options = e.target.options;
            const value = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            setSelectedPracticalProfs(value);
          }}
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-32" // Increased height here
        >
          {professors.map(professor => (
            <option key={professor._id} value={professor._id}>
              {professor.firstName} {professor.lastName}
            </option>
          ))}
        </select>

        <div className="flex justify-center items-center">
          <Button type="submit" className="bg-blue-500 text-white p-2 rounded mr-4">
            Add Subject
          </Button>
          <Button 
            type="button" 
            className="bg-green-500 text-white p-2 rounded" 
            onClick={handleShowData}
          >
            Show Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;
