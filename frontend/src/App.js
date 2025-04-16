import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Departments from './components/Departments/Index'; 

import AdminSidebar from './components/Admin/AdminSidebar'; // Corrected path
import PatientSidebar from './components/Patient/PatientSidebar'; // Corrected path
import DoctorSidebar from './components/Doctor/DoctorSidebar'; // Corrected path
import DepartmentDetails from './components/Departments/Details'; 
import ContactList from './components/ContactUs/ContactList';
import ContactUs from './components/ContactUs/Form'; // Corrected path
import Logout from './components/Logout'; // Corrected path

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
    
  
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

<Route path="/departments" element={<Departments />} />
<Route path="/departments/:id" element={<DepartmentDetails />} />

        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/patientsidebar" element={<PatientSidebar />} />
        <Route path="/doctorsidebar" element={<DoctorSidebar />} />

        <Route path="/logout" element={<Logout />} />

  
         <Route path="/contactus" element={<ContactUs />} />
        <Route path="/contactlist" element={<ContactList />} />

      </Routes>
    </Router>
  );
}

export default App;