import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPanel from "./components/Admin/ManageAdmins";
import PatientPanel from "./components/Admin/ManagePatients"; 
import AdminSidebar from "./components/Admin/AdminSidebar";
import PatientSidebar from "./components/Patient/PatientSidebar"; 
import DoctorSidebar from "./components/Doctor/DoctorSidebar";
import PatientDashboard from "./components/Patient/PatientDashboard";
import DepartmentDetails from "./components/Admin/DepartmentDetails";
import DoctorPanel from "./components/Admin/Departments";
import DepartmentsPanel from "./components/Admin/Departments";
import ContactList from "./components/ContactUs/ContactList";
import ContactUs from "./components/ContactUs/Form"; 
import Logout from "./components/Logout"; 
import HospitalSurveyChart from "./components/Admin/AdminDashboard";
import DepartmentsList from "./components/Admin/DepartmentsList";


import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/patientsidebar" element={<PatientSidebar />} />
        <Route path="/doctorsidebar" element={<DoctorSidebar />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/doctorpanel" element={<DoctorPanel />} />
        <Route path="/patientpanel" element={<PatientPanel />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/contactlist" element={<ContactList />} />
        <Route path="/hospital-survey" element={<HospitalSurveyChart />} />
        <Route path="/PatientDashboard" element={<PatientDashboard/>}/>
        <Route path="/departments" element={<DepartmentsPanel />} />
        <Route path="/department/:id" element={<DepartmentDetails />} />
        <Route path="/departmentslist" element={<DepartmentsList />} />
      </Routes>
    </Router>
  );
}

export default App;
