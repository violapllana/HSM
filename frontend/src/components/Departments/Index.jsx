
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/departments");
      setDepartments(response.data);
    } catch (err) {
      setError("Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${deleteId}`);
      fetchDepartments(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting the department:", error);
    } finally {
      setShowModal(false);
    }
  };

  const cancelDelete = () => setShowModal(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Hospital Departments
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : departments.length > 0 ? (
              departments.map((dep) => (
                <tr key={dep.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{dep.name}</td>
                  <td className="p-3">{dep.description}</td>
                  <td className="p-3">
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          (window.location.href = `/departments/${dep.id}`)
                        }
                        className="bg-blue-500 text-white px-6 py-2 rounded text-sm hover:bg-blue-600 transition duration-300"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(dep.id)}
                        className="bg-red-500 text-white px-6 py-2 rounded text-sm hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No departments to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="text-lg mb-4">
              Are you sure you want to delete this department?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded text-sm hover:bg-red-600 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-6 py-2 rounded text-sm hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
