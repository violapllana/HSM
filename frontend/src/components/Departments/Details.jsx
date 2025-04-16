import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DepartmentDetails = () => {
  const [department, setDepartment] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`
        );
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching department:", error);
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
    <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Department Details
        </h1>

        <div className="space-y-6 text-gray-800 text-lg">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {department.name}
          </div>
          <div>
            <span className="font-semibold">Description:</span>{" "}
            {department.description}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/departments")}
            className="bg-blue-500 text-white px-6 py-2 rounded text-sm hover:bg-blue-600 transition duration-300"
          >
            Back to Departments
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
