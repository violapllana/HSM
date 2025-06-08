import { useEffect, useState } from 'react';
import axios from 'axios';

const PatientViewReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const patientId = localStorage.getItem('patientId'); // Merr patientId nga localStorage

        if (!patientId) {
          console.error('Patient ID not found in localStorage');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/report/patient/${patientId}`, {
          withCredentials: true,
        });

        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Medical Reports</h2>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        reports.map((report) => (
          <div key={report.id} className="border-b border-gray-200 mb-4 pb-4">
            <h3 className="text-xl font-semibold mb-1">{report.title}</h3>
            <p><strong>Diagnosis:</strong> {report.diagnosis}</p>
            <p><strong>Treatment:</strong> {report.treatment}</p>
            <p><strong>Description:</strong> {report.description}</p>
            <p><strong>Status:</strong> {report.status}</p>
            <p><strong>Comments:</strong> {report.comments}</p>
            <div className="mt-2 text-blue-600">
              <strong>Doctor:</strong> {report.doctor?.username} <br />
              <strong>Email:</strong> {report.doctor?.email}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientViewReports;
