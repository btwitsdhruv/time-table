import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";

const GroupTable = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all groups when the component loads
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/groups");
        setGroups(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch groups.");
      }
    };

    fetchGroups();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/groups/${id}`);
      setGroups(groups.filter((group) => group._id !== id)); // Remove the deleted group from state
      setSuccess("Group deleted successfully.");
    } catch (err) {
      setError("Failed to delete group.");
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups.filter(
    (group) =>
      group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.groupCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <>
    
    <Navbar></Navbar>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Group Management</h1>

      {/* Display errors or success messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search groups..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Table */}
      <table className="min-w-full table-auto bg-white border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Group Name</th>
            <th className="px-4 py-2 border">Group Code</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGroups.map((group) => (
            <tr key={group._id} className="text-center">
              <td className="px-4 py-2 border">{group.groupName}</td>
              <td className="px-4 py-2 border">{group.groupCode}</td>

              <td className="px-4 py-2 border">{group.department.name}</td>

              <td className="px-4 py-2 border">
                <button
                  className="text-blue-500 hover:underline mr-4"
                  onClick={() =>
                    alert(
                      `Edit functionality for ${group.groupName} coming soon!`
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(group._id)}
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

export default GroupTable;
