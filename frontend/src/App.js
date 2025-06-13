// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Register from "./components/Register";
// import Login from "./components/Login";
// import Logout from "./components/Logout"; 
// import Home from "./components/Home";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// //CRUD operations for admin,doctor,patient
// import AdminPanel from "./components/Admin/ManageAdmins";
// import PatientPanel from "./components/Admin/ManagePatients"; 
// import DoctorPanel from "./components/Admin/ManageDoctors";
// import ManageUsers from "./components/Admin/ManageUsers";

// import PatientAndDoctorPanel from "./components/Admin/ManageConnections"; 
// import AppointmentList from "./components/Admin/AppointmentList"; 


// //Sidebar for admin,doctor,patient
// import AdminSidebar from "./components/Admin/AdminSidebar";
// import PatientSidebar from "./components/Patient/PatientSidebar"; 
// import DoctorSidebar from "./components/Doctor/DoctorSidebar";

// //Dashboard for admin,doctor,patient
// import DoctorDashboard from "./components/Doctor/DoctorDashboard";
// import PatientDashboard from "./components/Patient/PatientDashboard";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import AppointmentDoctor from "./components/Doctor/AppointmentDoctor";
// import AppointmentPatient from "./components/Patient/AppointmentPatient";



// import ConnectDoctor from "./components/Patient/ConnectDoctor";
// import ConnectedList from "./components/Doctor/ConnectedList";

// //Department CRUD
// import DepartmentDetails from "./components/Department/DepartmentDetails";
// import DepartmentsPanel from "./components/Department/Departments";
// import DepartmentsList from "./components/Department/DepartmentsList";

// //Contact CRUD
// import ContactList from "./components/ContactUs/ContactList";
// import ContactUs from "./components/ContactUs/ContactForm"; 

// //Report CRUD 
// import ReportList from "./components/Report/ReportsList";
// import CreateReport from "./components/Report/CreateReport";
// import PatientViewReports from "./components/Report/PatientViewReport";

// //Appointment CRUD
// import AppointmentForm from "./components/Admin/AppointmentForm";

// import Profile from "./components/Admin/Profile";
// import PatientProfile from "./components/Patient/PatientProfile";
// import DoctorProfile from "./components/Doctor/DoctorProfile";





// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/header" element={<Header />} />
//         <Route path="/footer" element={<Footer />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />


//         <Route path="/adminsidebar" element={<AdminSidebar />} />
//         <Route path="/patientsidebar" element={<PatientSidebar />} />
//         <Route path="/doctorsidebar" element={<DoctorSidebar />} />
//         <Route path="/manageusers" element={<ManageUsers />} />


//         <Route path="/adminpanel" element={<AdminPanel />} />
//         <Route path="/doctorpanel" element={<DoctorPanel />} />
//         <Route path="/patientpanel" element={<PatientPanel />} />
//         <Route path="/AppointmentPatient" element={<AppointmentPatient />} />
    
//         <Route path="/admindashboard" element={<AdminDashboard />} />
//         <Route path="/PatientDashboard" element={<PatientDashboard/>}/>
//         <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
//         <Route path="/AppointmentList" element={<AppointmentList />} />
//         <Route path="/AppointmentDoctor" element={<AppointmentDoctor />} />

    
//         <Route path="/departments" element={<DepartmentsPanel />} />
//         <Route path="/department/:id" element={<DepartmentDetails />} />
//         <Route path="/departmentslist" element={<DepartmentsList />} />

//         <Route path="/contactus" element={<ContactUs />} />
//         <Route path="/contactlist" element={<ContactList />} />

//         <Route path="/report" element={<ReportList />} />
//         <Route path="/createreport" element={<CreateReport />} />
//         <Route path="/viewreport" element={<PatientViewReports />} />
//         <Route path="/AppointmentForm" element={<AppointmentForm />} />

//         <Route path="/connect" element={<PatientAndDoctorPanel />} />
//         <Route path="/connectdoctor" element={<ConnectDoctor />} />
//         <Route path="/connected" element={<ConnectedList />} />
//         <Route path="/profile" element={<Profile/>} />
//         <Route path="/patientProfile" element={<PatientProfile/>} />
//          <Route path="/doctorProfile" element={<DoctorProfile/>} />

        
      
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Sidebar
import AdminSidebar from "./components/Admin/AdminSidebar";
import PatientSidebar from "./components/Patient/PatientSidebar";
import DoctorSidebar from "./components/Doctor/DoctorSidebar";

// Dashboards
import AdminDashboard from "./components/Admin/AdminDashboard";
import PatientDashboard from "./components/Patient/PatientDashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";

// CRUD Admin
import ManageAdmins from "./components/Admin/ManageAdmins";
import ManageDoctors from "./components/Admin/ManageDoctors";
import ManagePatients from "./components/Admin/ManagePatients";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageConnections from "./components/Admin/ManageConnections";
import AppointmentList from "./components/Admin/AppointmentList";
import AppointmentForm from "./components/Admin/AppointmentForm";

// Departments
import DepartmentsPanel from "./components/Department/Departments";
import DepartmentDetails from "./components/Department/DepartmentDetails";
import DepartmentsList from "./components/Department/DepartmentsList";

// Contact
import ContactForm from "./components/ContactUs/ContactForm";
import ContactList from "./components/ContactUs/ContactList";

// Reports
import ReportList from "./components/Report/ReportsList";
import CreateReport from "./components/Report/CreateReport";
import PatientViewReports from "./components/Report/PatientViewReport";

// Appointments for doctor/patient
import AppointmentDoctor from "./components/Doctor/AppointmentDoctor";
import AppointmentPatient from "./components/Patient/AppointmentPatient";

// Patient & Doctor interaction
import ConnectDoctor from "./components/Patient/ConnectDoctor";
import ConnectedList from "./components/Doctor/ConnectedList";

// Profiles
import AdminProfile from "./components/Admin/Profile";
import PatientProfile from "./components/Patient/PatientProfile";
import DoctorProfile from "./components/Doctor/DoctorProfile";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contactus" element={<ContactForm />} />

        {/* Admin Routes */}
        <Route path="/admindashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/adminsidebar" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminSidebar />
          </ProtectedRoute>
        } />
        <Route path="/adminpanel" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageAdmins />
          </ProtectedRoute>
        } />
        <Route path="/doctorpanel" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageDoctors />
          </ProtectedRoute>
        } />
        <Route path="/patientpanel" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManagePatients />
          </ProtectedRoute>
        } />
        <Route path="/manageusers" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        } />
        <Route path="/connect" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageConnections />
          </ProtectedRoute>
        } />
        <Route path="/AppointmentList" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AppointmentList />
          </ProtectedRoute>
        } />
        <Route path="/AppointmentForm" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AppointmentForm />
          </ProtectedRoute>
        } />
        <Route path="/contactlist" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ContactList />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminProfile />
          </ProtectedRoute>
        } />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/doctorsidebar" element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorSidebar />
          </ProtectedRoute>
        } />
        <Route path="/AppointmentDoctor" element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <AppointmentDoctor />
          </ProtectedRoute>
        } />
        <Route path="/connected" element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <ConnectedList />
          </ProtectedRoute>
        } />
        <Route path="/doctorProfile" element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorProfile />
          </ProtectedRoute>
        } />

        {/* Patient Routes */}
        <Route path="/PatientDashboard" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/patientsidebar" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientSidebar />
          </ProtectedRoute>
        } />
        <Route path="/AppointmentPatient" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <AppointmentPatient />
          </ProtectedRoute>
        } />
        <Route path="/connectdoctor" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <ConnectDoctor />
          </ProtectedRoute>
        } />
        <Route path="/patientProfile" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientProfile />
          </ProtectedRoute>
        } />

        {/* Shared Roles (admin, doctor, patient) */}
        <Route path="/report" element={
          <ProtectedRoute allowedRoles={["admin", "doctor", "patient"]}>
            <ReportList />
          </ProtectedRoute>
        } />
        <Route path="/createreport" element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <CreateReport />
          </ProtectedRoute>
        } />
        <Route path="/viewreport" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientViewReports />
          </ProtectedRoute>
        } />

        {/* Departments (admin only) */}
        <Route path="/departments" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DepartmentsPanel />
          </ProtectedRoute>
        } />
        <Route path="/departmentslist" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DepartmentsList />
          </ProtectedRoute>
        } />
        <Route path="/department/:id" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DepartmentDetails />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
