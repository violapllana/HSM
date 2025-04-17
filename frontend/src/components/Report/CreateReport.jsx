import { useState, useEffect } from 'react';
import axios from 'axios';

const PatientReportPanel = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [doctorId, setDoctorId] = useState(''); // mund të merret nga auth nëse e ke
  const [reportData, setReportData] = useState({
    title: '',
    diagnosis: '',
    treatment: '',
    description: '',
    status: 'In Progress',
    comments: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const apiUrlPatients = 'http://localhost:5000/api/patient';
  const apiUrlReport = 'http://localhost:5000/api/report';

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(apiUrlPatients);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedPatientId || !doctorId) {
      setStatusMessage('Please select a patient and enter doctor ID.');
      return;
    }

    try {
      const response = await axios.post(apiUrlReport, {
        ...reportData,
        patientId: selectedPatientId,
        doctorId: doctorId
      });

      setStatusMessage('Report sent successfully!');
      setReportData({
        title: '',
        diagnosis: '',
        treatment: '',
        description: '',
        status: 'In Progress',
        comments: ''
      });
      setSelectedPatientId('');
    } catch (error) {
      console.error('Error submitting report:', error);
      setStatusMessage('Failed to send report.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Send Report to Patient</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Patient:</label>
        <select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select a patient --</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.username}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Doctor ID:</label>
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={reportData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Diagnosis:</label>
        <input
          type="text"
          name="diagnosis"
          value={reportData.diagnosis}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Treatment:</label>
        <input
          type="text"
          name="treatment"
          value={reportData.treatment}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Description:</label>
        <textarea
          name="description"
          value={reportData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Status:</label>
        <select
          name="status"
          value={reportData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Comments:</label>
        <textarea
          name="comments"
          value={reportData.comments}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Send Report
      </button>

      {statusMessage && (
        <p className="mt-4 text-green-600 font-semibold">{statusMessage}</p>
      )}
    </div>
  );
};

export default PatientReportPanel;
// import { useEffect, useState } from 'react';
// import axios from 'axios';


// const PatientReport = () => {
//   const [reports, setReports] = useState([]);
//   const [statusMessage, setStatusMessage] = useState('');
  

//   const patientId = req.user.id; 


//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/report/patient/${patientId}`);
//       setReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//       setStatusMessage('Failed to load reports.');
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">My Health Reports</h2>

//       {statusMessage && <p className="text-red-500 mb-4">{statusMessage}</p>}

//       {reports.length === 0 ? (
//         <p>No reports found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-4 py-2">Title</th>
//                 <th className="border px-4 py-2">Diagnosis</th>
//                 <th className="border px-4 py-2">Treatment</th>
//                 <th className="border px-4 py-2">Doctor</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2">Comments</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.map((report) => (
//                 <tr key={report.id} className="text-sm text-gray-700">
//                   <td className="border px-4 py-2">{report.title}</td>
//                   <td className="border px-4 py-2">{report.diagnosis}</td>
//                   <td className="border px-4 py-2">{report.treatment}</td>
//                   <td className="border px-4 py-2">{report.doctor?.username || 'Unknown'}</td>
//                   <td className="border px-4 py-2">{report.status}</td>
//                   <td className="border px-4 py-2">{report.comments}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientReport;
