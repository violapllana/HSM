import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DepartmentDetails = () => {
  const [department, setDepartment] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/departments/${id}`);
        setDepartment(response.data);
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    };

    fetchDepartment();
  }, [id]);

  if (!department) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Department Details
        </h2>
        <div className="space-y-3 mb-6">
          <p className="text-gray-800">
            <span className="font-semibold">Name:</span> {department.name}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Description:</span> {department.description}
          </p>
        </div>
        <button
          onClick={() => navigate('/departments')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default DepartmentDetails;
