import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminSidebar from './components/Admin/AdminSidebar'; // Corrected path
import PatientSidebar from './components/Patient/PatientSidebar'; // Corrected path
import DoctorSidebar from './components/Doctor/DoctorSidebar'; // Corrected path
import ContactUs from './components/ContactUs/ContactUs'; // Corrected path
import './App.css';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminSidebar />} />
        <Route path="/patient" element={<PatientSidebar />} />
        <Route path="/doctor" element={<DoctorSidebar />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
         <Route path="/contactus" element={<ContactUs />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      
  
      </Routes>
    </Router>
  );
}

export default App;