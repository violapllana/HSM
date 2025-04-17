import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReportList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const apiUrl = 'http://localhost:5000/api/report';

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${reportToDelete}`);
      fetchReports();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Reports</h2>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Patient</th>
            <th className="px-6 py-3">Doctor</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-6">
                Loading reports...
              </td>
            </tr>
          ) : reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{report.title}</td>
                <td className="px-6 py-4">{report.patient.username}</td>
                <td className="px-6 py-4">{report.doctor.username}</td>
                <td className="px-6 py-4">{report.status}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setShowDetailsModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setReportToDelete(report.id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6">
                No reports found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this report?</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Report Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Title:</strong> {selectedReport.title}</p>
              <p><strong>Patient:</strong> {selectedReport.patient.username}</p>
              <p><strong>Doctor:</strong> {selectedReport.doctor.username}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>
              <p><strong>Diagnosis:</strong> {selectedReport.diagnosis}</p>
              <p><strong>Treatment:</strong> {selectedReport.treatment}</p>
              <p><strong>Description:</strong> {selectedReport.description}</p>
              <p><strong>Comments:</strong> {selectedReport.comments}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
