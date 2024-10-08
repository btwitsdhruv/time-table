import React, { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Assuming you store the username in local storage after login
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Remove token and other user-related data from local storage
    localStorage.removeItem("token"); // Clear JWT token
    localStorage.removeItem("username"); // Clear username or any other user data
  
    // Optionally, clear other data like user role or profile
    localStorage.removeItem("role"); // Clear user role if stored
    localStorage.removeItem("profile"); // Clear profile info if stored
  
    
    // Redirect to login page after logout
    window.location.href = "/";
  };
  

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Brand Name */}
          <div className="text-xl font-bold text-gray-800 dark:text-white">
          <Link to="/home">Timetable App</Link>  
          </div>

          {/* Main Nav Links */}
          <div className="hidden md:flex space-x-6">
            {/* <a href="/home" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 mt-2">Home</a> */}
            {/* <a href="/schedule" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 mt-2">Schedule</a> */}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-gray-200">Faculty Management</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/subject">Subject</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/department">Departmentdata</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/professor">ProfessorData</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/Lab">Labs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/Group">Groups</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Authentication / Profile */}
          <div className="flex items-center space-x-4">
            {username ? (
              <>
                <span className="text-gray-600 dark:text-gray-200">Welcome, {username}</span>
                <Button variant="primary" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 dark:text-gray-200">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
