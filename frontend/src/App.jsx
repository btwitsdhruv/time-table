import React from "react";
import Home from "./components/Home";
import Dipartment from "./components/Dipartment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subject from "./components/Subject";
import Prectice from "./components/Prectice";
import AddProfessor from "./components/AddProfessor";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import Hello from "./components/prectice/Hello";
import SubjectData from "./components/SubjectsData";
import PrivateRoute from "./components/PrivateRoute";
import ProfessorsTable from "./components/ProfessorData";
import AddGroup from "./components/AddGroup";
import GroupTable from "./components/GroupData";
import AddLab from "./components/AddLab";
import LabList from "./components/LabData"; // Import PrivateRoute

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/hello" element={<Hello/>}></Route>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>

          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute element={Home} />}></Route>
          <Route path="/department" element={<PrivateRoute element={Dipartment} />}></Route>
          <Route path="/subject" element={<PrivateRoute element={Subject} />}></Route>
          <Route path="/subject/showdata" element={<PrivateRoute element={SubjectData} />}></Route>
          <Route path="/proffessor" element={<PrivateRoute element={AddProfessor} />}></Route>
          <Route path="/prectice" element={<PrivateRoute element={Prectice} />}></Route>
          <Route path="/pro" element={<AddProfessor />}></Route>
          <Route path="/prodata" element={<ProfessorsTable />}></Route>
          <Route path="/group" element={<AddGroup />}></Route>
          <Route path="/groupdata" element={<GroupTable />}></Route>
          <Route path="/lab" element={<AddLab />}></Route>
          <Route path="/labdata" element={<LabList />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
