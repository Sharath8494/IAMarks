import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./Pages/adminlogin";
import UserDashboard from "./Pages/admindashboard";
import StudentLogin from "./Pages/Studentlog";
import HodLogin from "./Pages/Hodlogin";
import FacultyLogin from "./Pages/facultylog";
import Examdept from "./Pages/examdeptlog"
import HODDashboard from "./Pages/Hoddashboard";
import StudentDashboard from "./Pages/studentdashboard";
import FacultyDashboard from "./Pages/facultydash";
import ExamDeptDash from "./Pages/ExamDeptdash";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/student" element={<StudentLogin/>}/>
        <Route path="/studentdash" element={<StudentDashboard/>}/>
        <Route path="/hod" element={<HodLogin/>}/>
        <Route path="/Hoddash" element={<HODDashboard />} />
        <Route path="/faculty" element={<FacultyLogin/>}/>
        <Route path="/facultydash" element={<FacultyDashboard/>}/>
        <Route path="/examdept" element={<Examdept/>}/>
        <Route path="/examdeptdash" element={<ExamDeptDash/>}/>



      </Routes>
    </Router>
  );
}

export default App;
