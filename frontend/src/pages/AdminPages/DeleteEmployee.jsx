// import React from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { FaTrash } from 'react-icons/fa';
// import { ADMIN_API_ENDPOINT } from '../../utils/constant';
// import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const DeleteEmployee = () => {
//   const { employees, loading, error, refetch } = UseGetAllEmployees();
//   const employeeId = useSelector((state) => state.auth.employee._id);
//   const organizationId = useSelector((state) => state.auth.employee.organization);
//     const navigate=useNavigate();
//   const handleDelete = async (id) => {
//     try {
//       const confirm = window.confirm('Are you sure you want to delete this employee?');
//       if (!confirm) return;

//       await axios.delete(`${ADMIN_API_ENDPOINT}/delete/${id}/${organizationId}`, {
//         withCredentials: true,
//       });
      

//       toast.success('Employee deleted successfully');
//       navigate(-1);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || 'Failed to delete employee');
//     }
//   };

//   if (loading) return <p className="text-center p-4">Loading employees...</p>;
//   if (error) return <p className="text-center text-red-500 p-4">Error fetching employees.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">Delete Employee</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">#</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Department</th>
//               <th className="border px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees
//               ?.filter((emp) => emp._id !== employeeId)
//               .map((emp, index) => (
//                 <tr key={emp._id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   <td className="border px-4 py-2">{emp.empname}</td>
//                   <td className="border px-4 py-2">{emp.mail}</td>
//                   <td className="border px-4 py-2">{emp.department?.name || 'N/A'}</td>
//                   <td className="border px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleDelete(emp._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DeleteEmployee;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaUser, FaEnvelope, FaBuilding, FaExclamationTriangle, FaRocket, FaShieldAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import { ADMIN_API_ENDPOINT } from '../../utils/constant';
import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { employees, loading, error, refetch } = UseGetAllEmployees();
  const employeeId = useSelector((state) => state.auth.employee._id);
  const organizationId = useSelector((state) => state.auth.employee.organization);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ADMIN_API_ENDPOINT}/delete/${id}/${organizationId}`, {
        withCredentials: true,
      });

      toast.success('Employee deleted successfully');
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to delete employee');
    }
  };

  const handleConfirm = () => {
    if (selectedEmployee) {
      handleDelete(selectedEmployee._id);
      setSelectedEmployee(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center text-red-500 p-8">
        <FaExclamationCircle className="text-4xl mb-2" />
        <p className="text-lg">Error fetching employees.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Delete Employee</h1>
          </div>
          <div className="text-center mb-12">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="bg-red-100 p-8 rounded-full">
                <FaShieldAlt className="text-red-600 text-6xl" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-red-900">Employee Security Management</h1>
                <p className="text-red-600">Manage employee access and security protocols</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {employees
              ?.filter((emp) => emp._id !== employeeId)
              .map((emp, index) => (
                <div
                  key={emp._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <FaUser className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{emp.empname}</h3>
                      <p className="text-sm text-gray-500">Employee ID: {emp._id.slice(0, 8)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-gray-400" />
                      <span className="text-gray-600">Email: {emp.mail}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaBuilding className="text-gray-400" />
                      <span className="text-gray-600">Department: {emp.department?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaClock className="text-gray-400" />
                      <span className="text-gray-600">Joined: {new Date(emp.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedEmployee(emp)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200 hover:from-red-600 hover:to-red-700"
                    >
                      <FaTrash className="mr-2" />
                      Remove Access
                    </button>
                  </div>
                </div>
              ))}
            

            {employees?.filter((emp) => emp._id !== employeeId).length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 p-12 rounded-2xl">
                  <FaUser className="text-gray-400 text-4xl mb-4" />
                  <p className="text-gray-500">No employees found</p>
                  <p className="text-gray-400 mt-2">All employees have full access</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setSelectedEmployee(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="bg-red-100 p-6 rounded-full mx-auto mb-6">
                <FaExclamationTriangle className="text-red-600 text-4xl" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Security Access Management
              </h3>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove {selectedEmployee.empname}'s access?
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-gray-600">Email: {selectedEmployee.mail}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaBuilding className="text-gray-400" />
                  <span className="text-gray-600">Department: {selectedEmployee.department?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaClock className="text-gray-400" />
                  <span className="text-gray-600">Joined: {new Date(selectedEmployee.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center"
                >
                  <FaTrash className="mr-2" />
                  Remove Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteEmployee;
