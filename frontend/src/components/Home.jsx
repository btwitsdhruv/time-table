import React from "react";
import Navbar from "./shared/Navbar";
import AddSubject from "./AddSubject";
import Dipartment from "./Dipartment";

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-5xl font-bold">Welcome</h1>
      </div>
    </div>
  );
};

export default Home;
