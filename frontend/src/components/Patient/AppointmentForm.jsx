// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const AppointmentForm = () => {
//   const [departments, setDepartments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [connections, setConnections] = useState([]);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('asc');
//   const [filterBy, setFilterBy] = useState('doctor');
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [connectionStatus, setConnectionStatus] = useState('');

//   const apiUrlDepartment = 'http://localhost:5000/api/department';
//   const apiUrlDoctor = 'http://localhost:5000/api/doctor';
//   const apiUrlConnect = 'http://localhost:5000/api/connect';
//   const apiUrlConnections = 'http://localhost:5000/api/connect';

//   // Fetch data from the backend API
//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get(apiUrlDepartment);
//       setDepartments(response.data);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get(apiUrlDoctor);
//       setDoctors(response.data);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const fetchConnections = async () => {
//     try {
//       const response = await axios.get(apiUrlConnections);
//       setConnections(response.data);
//     } catch (error) {
//       console.error('Error fetching connections:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchDoctors();
//     fetchConnections();
//   }, []);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleSort = (column) => {
//     const sortedData = [...(filterBy === 'doctor' ? doctors : departments)].sort((a, b) => {
//       if (a[column] < b[column]) return sortBy === 'asc' ? -1 : 1;
//       if (a[column] > b[column]) return sortBy === 'asc' ? 1 : -1;
//       return 0;
//     });
//     setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
//     if (filterBy === 'doctor') {
//       setDoctors(sortedData);
//     } else {
//       setDepartments(sortedData);
//     }
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredDoctors = doctors.filter(
//     (doctor) =>
//       doctor.username.toLowerCase().includes(search.toLowerCase()) ||
//       doctor.email.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleConnect = async () => {
//     if (!selectedDepartment || !selectedDoctor) {
//       setConnectionStatus('Please select both a department and a doctor.');
//       return;
//     }

//     try {
//       const response = await axios.post(apiUrlConnect, {
//         doctorId: selectedDoctor,
//         departmentId: selectedDepartment,
//       });
//       setConnectionStatus(response.data.message || 'Successfully connected.');
//       fetchConnections();
//     } catch (error) {
//       setConnectionStatus('Error connecting doctor and department.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Connect Doctor - Department</h2>

//       {/* Search and Sort Controls */}
//       <div className="mb-4 flex justify-between">
//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={search}
//           onChange={handleSearch}
//           className="p-2 border rounded"
//         />
//         <div className="flex items-center space-x-4">
//           <select
//             onChange={(e) => setFilterBy(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="doctor">Doctors</option>
//             <option value="department">Departments</option>
//           </select>
//           <button
//             onClick={() => handleSort('name')}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Sort by Name
//           </button>
//         </div>
//       </div>

//       {/* Table of Doctors or Departments */}
//       <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
//         <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//           <tr>
//             <th className="px-6 py-3">ID</th>
//             <th className="px-6 py-3">Name</th>
//             <th className="px-6 py-3">Email</th>
//           </tr>
//         </thead>
//         <tbody className="text-sm text-gray-700">
//           {(filterBy === 'department' ? filteredDepartments : filteredDoctors).map(
//             (item) => (
//               <tr key={item.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4">{item.id}</td>
//                 <td className="px-6 py-4">{item.name || item.username}</td>
//                 <td className="px-6 py-4">{item.email}</td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>

//       {/* Department and Doctor Selection */}
//       <div className="mt-6">
//         <div className="mb-4">
//           <label htmlFor="department" className="block font-semibold">
//             Choose a Department:
//           </label>
//           <select
//             id="department"
//             className="p-2 border rounded"
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//           >
//             <option value="">Select a department</option>
//             {departments.map((department) => (
//               <option key={department.id} value={department.id}>
//                 {department.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="doctor" className="block font-semibold">
//             Choose a Doctor:
//           </label>
//           <select
//             id="doctor"
//             className="p-2 border rounded"
//             onChange={(e) => setSelectedDoctor(e.target.value)}
//           >
//             <option value="">Select a doctor</option>
//             {doctors.map((doctor) => (
//               <option key={doctor.id} value={doctor.id}>
//                 {doctor.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={handleConnect}
//           className="px-6 py-2 bg-green-500 text-white rounded"
//         >
//           Connect
//         </button>
//         {connectionStatus && (
//           <p className="mt-4 text-red-500">{connectionStatus}</p>
//         )}
//       </div>

//       {/* Existing Connections */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold">Existing Connections</h3>
//         <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md mt-4">
//           <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//             <tr>
//               <th className="px-6 py-3">Doctor</th>
//               <th className="px-6 py-3">Department</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-gray-700">
//             {connections.map((connection) => (
//               <tr key={connection.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   {connection.doctor ? connection.doctor.username : connection.doctorId}
//                 </td>
//                 <td className="px-6 py-4">
//                   {connection.department ? connection.department.name : connection.departmentId}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AppointmentForm;
import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]); // Shtuar pacientët
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(''); // Shtuar pacienti
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');

  const apiUrlDepartment = 'http://localhost:5000/api/department';
  const apiUrlDoctor = 'http://localhost:5000/api/doctor';
  const apiUrlPatient = 'http://localhost:5000/api/patient'; // Përdorimi i API për pacientët
  const apiUrlAppointments = 'http://localhost:5000/api/appointments';

  // Fetch departments, doctors, and patients
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(apiUrlDepartment);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(apiUrlDoctor);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(apiUrlPatient);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDoctors();
    fetchPatients(); // Thirrja për të marrë pacientët
  }, []);

  const handleConnect = async () => {
    if (!selectedPatient || !selectedDepartment || !selectedDoctor || !appointmentDate || !appointmentReason) {
      setConnectionStatus('Please fill all the fields before scheduling the appointment.');
      return;
    }

    // Përdor vetëm datën, pa orën
    const appointmentDateOnly = appointmentDate; // Mban vetëm datën, pa orën

    // Shiko të dhënat që po dërgohen
    console.log('Sending appointment data:', {
      patientId: selectedPatient,
      doctorId: selectedDoctor,
      departmentId: selectedDepartment,
      date: appointmentDateOnly, // Dërgo vetëm datën
      reason: appointmentReason,
    });

    try {
      const response = await axios.post(apiUrlAppointments, {
        patientId: selectedPatient,
        doctorId: selectedDoctor,
        departmentId: selectedDepartment,
        date: appointmentDateOnly, // Dërgo vetëm datën
        reason: appointmentReason,
      });
      setConnectionStatus(response.data.message || 'Appointment successfully created.');
    } catch (error) {
      setConnectionStatus('Error creating appointment.');
      console.error(error.response?.data || error.message); // Print the error message for debugging
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Schedule Appointment</h2>

      {/* Department, Doctor, and Patient Selection */}
      <div className="mt-6">
        <div className="mb-4">
          <label htmlFor="department" className="block font-semibold">Choose a Department:</label>
          <select
            id="department"
            className="p-2 border rounded"
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="doctor" className="block font-semibold">Choose a Doctor:</label>
          <select
            id="doctor"
            className="p-2 border rounded"
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.username}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="patient" className="block font-semibold">Choose a Patient:</label>
          <select
            id="patient"
            className="p-2 border rounded"
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.username}</option>
            ))}
          </select>
        </div>

        {/* Appointment Date */}
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block font-semibold">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            className="p-2 border rounded"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="appointmentReason" className="block font-semibold">Reason for Appointment:</label>
          <textarea
            id="appointmentReason"
            className="p-2 border rounded w-full"
            rows="4"
            value={appointmentReason}
            onChange={(e) => setAppointmentReason(e.target.value)}
          />
        </div>

        <button
          onClick={handleConnect}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Schedule Appointment
        </button>

        {connectionStatus && (
          <p className="mt-4 text-red-500">{connectionStatus}</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
