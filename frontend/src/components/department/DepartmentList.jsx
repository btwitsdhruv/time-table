import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem("token");  // Get the token from localStorage
    
            const response = await axios.get('http://localhost:3000/api/department', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Include token in Authorization header
                    }
            });
    
            setDepartments(response.data);  // Set the fetched departments in the state
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/department/${id}`);
            fetchDepartments(); // Refresh the list
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Departments</h2>
            <ul className="space-y-2">
                {departments.map((department) => (
                    <li key={department._id} className="flex justify-between items-center p-2 border-b">
                        <div>
                            <strong>{department.name}</strong> - {department.branch} ({department.status})
                        </div>
                        <button
                            onClick={() => handleDelete(department._id)}
                            className="bg-red-500 text-white p-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
