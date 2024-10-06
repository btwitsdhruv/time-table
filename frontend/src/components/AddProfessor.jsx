import React, { useState } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card,CardHeader,CardTitle,CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "react-hot-toast";

const AddProfessor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    slotIndex: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Assuming you're using token-based auth
      const response = await axios.post(
        "http://localhost:3000/professors",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Professor added successfully");
        setFormData({ firstName: "", middleName: "", lastName: "", slotIndex: "" });
      }
    } catch (error) {
      console.error("Error adding professor:", error);
      toast.error("Failed to add professor. Ensure you have access rights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Professor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full"
                required
              />
            </div>

            {/* Middle Name */}
            <div className="mb-4">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Enter middle name"
                className="w-full"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full"
                required
              />
            </div>

            {/* Slot Index */}
            <div className="mb-4">
              <Label htmlFor="slotIndex">Slot Index</Label>
              <Input
                type="number"
                id="slotIndex"
                name="slotIndex"
                value={formData.slotIndex}
                onChange={handleChange}
                placeholder="Enter slot index"
                className="w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Professor"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProfessor;
