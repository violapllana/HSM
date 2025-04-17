
import { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const apiUrl = 'http://localhost:5000/api/department';

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setDepartments(response.data);
    } catch (error) {
      console.error('Gabim gjatë marrjes së departamenteve:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Departments</h2>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-6">
                Loading departments...
              </td>
            </tr>
          ) : departments.length > 0 ? (
            departments.map((dep, index) => (
              <tr key={dep.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{dep.name}</td>
                <td className="px-6 py-4">{dep.description}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedDepartment(dep);
                      setShowDetailsModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Details Modal */}
      {showDetailsModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Department Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {selectedDepartment.name}</p>
              <p><strong>Description:</strong> {selectedDepartment.description}</p>
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
};

export default DepartmentsList;
