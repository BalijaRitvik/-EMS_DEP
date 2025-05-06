// import React, { useState } from 'react';
// import axios from 'axios';
// import { ADMIN_API_ENDPOINT } from '../../utils/constant';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
// import { useNavigate } from 'react-router-dom';

// const PromoteEmployee = () => {
//   const { employee } = useSelector((state) => state.auth);
//   const organizationId = employee?.organization;
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { employees: allEmployees, refetch } = UseGetAllEmployees();  // refetch is available here

//   const promote = async (empId) => {
//     try {
//       setLoading(true);
//       await axios.put(`${ADMIN_API_ENDPOINT}/promote/${empId}`, {}, { withCredentials: true });
//       toast.success('Employee promoted to Manager');
//       refetch(); // Trigger re-fetch to get the updated employee list
//       navigate(-1);  // Optionally navigate to the previous page
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to promote employee');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredEmployees = allEmployees?.filter(emp => emp._id !== employee?._id) || [];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Promote Employee</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Email</th>
//               <th className="py-2 px-4">Status</th>
//               <th className="py-2 px-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.map((emp) => (
//               <tr key={emp._id} className="border-b">
//                 <td className="py-2 px-4">{emp.empname}</td>
//                 <td className="py-2 px-4">{emp.email}</td>
//                 <td className="py-2 px-4">{emp.Employeestatus}</td>
//                 <td className="py-2 px-4">
//                   {emp.Employeestatus !== 'Manager' ? (
//                     <button
//                       onClick={() => promote(emp._id)}
//                       className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
//                     >
//                       {loading ? "Promoting..." : "Promote"}
//                     </button>
//                   ) : (
//                     <span className="text-gray-500">Already Manager</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {filteredEmployees.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   No employees available for promotion.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PromoteEmployee;


import React, { useState } from 'react';
import axios from 'axios';
import { ADMIN_API_ENDPOINT } from '../../utils/constant';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaRocket, FaArrowLeft } from 'react-icons/fa';

const PromoteEmployee = () => {
  const { employee } = useSelector((state) => state.auth);
  const organizationId = employee?.organization;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { employees: allEmployees, refetch } = UseGetAllEmployees();

  const promote = async (empId) => {
    try {
      setLoading(true);
      await axios.put(`${ADMIN_API_ENDPOINT}/promote/${empId}`, {}, { withCredentials: true });
      toast.success('Employee promoted to Manager');
      refetch();
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to promote employee');
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = allEmployees?.filter(emp => emp._id !== employee?._id) || [];

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-700 hover:text-blue-900 flex items-center space-x-1 transition-colors duration-200"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-blue-100 p-6 rounded-full">
              <FaRocket className="text-blue-700 text-4xl" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-blue-900">Career Advancement</h1>
              <p className="text-blue-700">Promote deserving employees to managerial positions</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredEmployees.map((emp, index) => (
            <div key={emp._id} className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 flex items-center space-x-4">
              <div className="flex items-center space-x-3 flex-1">
                <div className="bg-blue-50 p-3 rounded-full">
                  <FaUser className="text-blue-500 text-xl" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{index + 1}</span>
                    <h3 className="text-lg font-semibold text-blue-900">{emp.empname}</h3>
                  </div>
                  <p className="text-sm text-gray-600">Employee ID: {emp._id.slice(0, 6)}</p>
                  <p className="text-sm text-gray-600">Current Status: {emp.Employeestatus}</p>
                  <p className="text-sm text-gray-600">Email: {emp.email}</p>
                  {emp.Employeestatus === 'Manager' && (
                    <p className="text-sm text-yellow-600 flex items-center space-x-1">
                      <span>★</span>
                      <span>Already a Manager</span>
                      <span>★</span>
                    </p>
                  )}
                </div>
              </div>
              {emp.Employeestatus !== 'Manager' && (
                <button
                  onClick={() => promote(emp._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  {loading ? "Promoting..." : "Promote"}
                </button>
              )}
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div className="text-center py-4 text-gray-500 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              No employees available for promotion.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoteEmployee;
