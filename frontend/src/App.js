import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout"; 
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

//CRUD operations for admin,doctor,patient
import AdminPanel from "./components/Admin/ManageAdmins";
import PatientPanel from "./components/Admin/ManagePatients"; 
import DoctorPanel from "./components/Admin/ManageDoctors";
import ManageUsers from "./components/Admin/ManageUsers";

import PatientAndDoctorPanel from "./components/Admin/ManageConnections"; 
import AppointmentList from "./components/Admin/AppointmentList"; 


//Sidebar for admin,doctor,patient
import AdminSidebar from "./components/Admin/AdminSidebar";
import PatientSidebar from "./components/Patient/PatientSidebar"; 
import DoctorSidebar from "./components/Doctor/DoctorSidebar";

//Dashboard for admin,doctor,patient
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import PatientDashboard from "./components/Patient/PatientDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AppointmentDoctor from "./components/Doctor/AppointmentDoctor";
import AppointmentPatient from "./components/Patient/AppointmentPatient";



import ConnectDoctor from "./components/Patient/ConnectDoctor";
import ConnectedList from "./components/Doctor/ConnectedList";

//Department CRUD
import DepartmentDetails from "./components/Department/DepartmentDetails";
import DepartmentsPanel from "./components/Department/Departments";
import DepartmentsList from "./components/Department/DepartmentsList";

//Contact CRUD
import ContactList from "./components/ContactUs/ContactList";
import ContactUs from "./components/ContactUs/ContactForm"; 

//Report CRUD 
import ReportList from "./components/Report/ReportsList";
import CreateReport from "./components/Report/CreateReport";
import PatientViewReports from "./components/Report/PatientViewReport";

//Appointment CRUD
import AppointmentForm from "./components/Admin/AppointmentForm";

import Profile from "./components/Admin/Profile";
import PatientProfile from "./components/Patient/PatientProfile";





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
        <Route path="/logout" element={<Logout />} />


        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/patientsidebar" element={<PatientSidebar />} />
        <Route path="/doctorsidebar" element={<DoctorSidebar />} />
        <Route path="/manageusers" element={<ManageUsers />} />


        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/doctorpanel" element={<DoctorPanel />} />
        <Route path="/patientpanel" element={<PatientPanel />} />
        <Route path="/AppointmentPatient" element={<AppointmentPatient />} />
    
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/PatientDashboard" element={<PatientDashboard/>}/>
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/AppointmentList" element={<AppointmentList />} />
        <Route path="/AppointmentDoctor" element={<AppointmentDoctor />} />

    
        <Route path="/departments" element={<DepartmentsPanel />} />
        <Route path="/department/:id" element={<DepartmentDetails />} />
        <Route path="/departmentslist" element={<DepartmentsList />} />

        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/contactlist" element={<ContactList />} />

        <Route path="/report" element={<ReportList />} />
        <Route path="/createreport" element={<CreateReport />} />
        <Route path="/viewreport" element={<PatientViewReports />} />
        <Route path="/AppointmentForm" element={<AppointmentForm />} />

        <Route path="/connect" element={<PatientAndDoctorPanel />} />
        <Route path="/connectdoctor" element={<ConnectDoctor />} />
        <Route path="/connected" element={<ConnectedList />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/patientProfile" element={<PatientProfile/>} />

        
      
      </Routes>
    </Router>
  );
}

export default App;
