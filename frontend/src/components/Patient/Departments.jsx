import { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  const apiUrl = 'http://localhost:5000/api/department';

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(apiUrl);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Department List</h2>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Floor</th>
            <th className="px-6 py-3">Head of Department</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {departments.map((department, index) => (
            <tr key={department.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{department.name}</td>
              <td className="px-6 py-4">{department.description}</td>
              <td className="px-6 py-4">{department.floor}</td>
              <td className="px-6 py-4">{department.headOfDepartment}</td>
              <td className="px-6 py-4">
                {department.isActive ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
