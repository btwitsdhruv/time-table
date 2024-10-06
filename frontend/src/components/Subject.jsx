import React from "react";
import AddSubject from "./AddSubject";
import Navbar from "./shared/Navbar";

const Subject = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="mt-16">
        <AddSubject></AddSubject> 
      </div>
    </div>
  );
};

export default Subject;
