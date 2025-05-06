// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ADMIN_API_ENDPOINT } from '../../utils/constant';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
// import UseGetDepartmentEmployees from '../../hooks/UseGetDepartmentEmployees';

// const EmployeeTable = ({ employees, adminId, navigate, isManager, openModal }) => (
//   <div className="p-6 w-full max-w-6xl mx-auto">
//     <button
//       onClick={() => navigate(-1)}
//       className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//     >
//       ← Back to Dashboard
//     </button>
//     <h1 className="text-3xl font-bold mb-6">
//       {isManager ? 'Department Employees' : 'All Employees'}
//     </h1>

//     {employees.length === 0 ? (
//       <p className="text-gray-500">
//         No employees found {isManager ? 'in your department' : 'in the organization'}.
//       </p>
//     ) : (
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow rounded-lg">
//           <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//             <tr>
//               <th className="px-4 py-2">Sno</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Project's Pending</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Add Work</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-gray-700">
//             {employees.map((employee, index) => (
//               <tr key={employee._id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{index + 1}</td>
//                 <td className="px-4 py-2">{employee.empname}</td>
//                 <td className="px-4 py-2">{employee.mail}</td>
//                 <td className="px-4 py-2">{employee.projectspending}</td>
//                 <td className="px-4 py-2">{employee.Employeestatus}</td>
//                 <td className="px-4 py-2">
//                   {employee.Employeestatus !== 'Admin' && employee._id !== adminId && (
//                     <button
//                       onClick={() => openModal(employee._id)}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                       Add Work
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}
//   </div>
// );

// const AddWork = () => {
//   const navigate = useNavigate();
//   const employee = useSelector((state) => state.auth?.employee);
//   const adminId = employee?._id;
//   const adminRole = employee?.Employeestatus;
//   const isManager = adminRole === 'Manager';

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
//   const [work, setWork] = useState({ title: '', description: '', due_date: '' });
//     const [Loading,setLoading]=useState(false);
//   const { employees: allEmployees } = UseGetAllEmployees();
//   const { employees: deptEmployees } = UseGetDepartmentEmployees({ managerId: adminId });

//   useEffect(() => {
//     if (!adminId) {
//       toast.error('Unauthorized access. Please log in again.');
//       navigate('/login');
//     }
//   }, [adminId, navigate]);

//   const openModal = (employeeId) => {
//     setSelectedEmployeeId(employeeId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedEmployeeId(null);
//     setWork({ title: '', description: '', due_date: '' });
//   };

//   const handleFormData = (e) => {
//     const { name, value } = e.target;
//     setWork((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedEmployeeId) {
//         toast.error('No employee selected.');
//         return;
//     }

//     try {
//         setLoading(true);
//         await axios.post(`${ADMIN_API_ENDPOINT}/addwork/${adminId}/${selectedEmployeeId}`, work);
//         toast.success('Work added successfully');
//         closeModal();
//         setTimeout(() => {
//             navigate(-1);
//         }, 2000); 
//     } catch (error) {
//         toast.error(error.response?.data?.message || 'Error adding work');
//     }
// };


//   const tableProps = { adminId, navigate, openModal, isManager };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {isManager ? (
//         <EmployeeTable {...tableProps} employees={deptEmployees} />
//       ) : (
//         <EmployeeTable {...tableProps} employees={allEmployees} />
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
//             >
//               ×
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Assign Work</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={work.title}
//                   onChange={handleFormData}
//                   required
//                   className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Description</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={work.description}
//                   onChange={handleFormData}
//                   required
//                   className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Due Date</label>
//                 <input
//                   type="date"
//                   name="due_date"
//                   value={work.due_date}
//                   onChange={handleFormData}
//                   required
//                   className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               >
//                 {
//                     Loading?"Adding":"Add work"
//                 }
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddWork;













import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ADMIN_API_ENDPOINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
import UseGetDepartmentEmployees from '../../hooks/UseGetDepartmentEmployees';

const EmployeeTable = ({ employees, adminId, navigate, isManager, openModal }) => (
  <div className="w-full max-w-3xl mx-auto">
    <div className="flex items-center mb-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-700 hover:text-blue-900 flex items-center space-x-1 transition-colors duration-200"
      >
        <span>←</span>
        <span>Back to Dashboard</span>
      </button>
    </div>

    <div className="text-center mb-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-blue-100 p-6 rounded-full">
          <span className="text-4xl">📋</span>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-blue-900">Organization Work Management</h1>
          <p className="text-blue-700">Assign tasks to employees and track their progress</p>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      {employees.length === 0 ? (
        <div className="text-center py-4 text-gray-500 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          No employees found {isManager ? 'in your department' : 'in the organization'}.
        </div>
      ) : (
        employees.map((employee, index) => (
          <div key={employee._id} className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 flex items-center space-x-4">
            <div className="flex items-center space-x-3 flex-1">
              <div className="bg-blue-50 p-3 rounded-full">
                <span className="text-xl">👤</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{index + 1}</span>
                  <h3 className="text-lg font-semibold text-blue-900">{employee.empname}</h3>
                </div>
                <p className="text-sm text-gray-600">Employee ID: {employee._id.slice(0, 6)}</p>
                <p className="text-sm text-gray-600">Pending Projects: {employee.projectspending}</p>
                <p className="text-sm text-gray-600">Status: {employee.Employeestatus}</p>
                <p className="text-sm text-gray-600">Email: {employee.mail}</p>
                {(employee.Employeestatus === 'Admin' || employee._id === adminId) && (
                  <p className="text-sm text-gray-500">Cannot assign work to admin or self</p>
                )}
              </div>
            </div>
            {employee.Employeestatus !== 'Admin' && employee._id !== adminId && (
              <button
                onClick={() => openModal(employee._id)}
                className="py-2 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Assign Task</span>
              </button>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

const AddWork = () => {
  const navigate = useNavigate();
  const employee = useSelector((state) => state.auth?.employee);
  const adminId = employee?._id;
  const adminRole = employee?.Employeestatus;
  const isManager = adminRole === 'Manager';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [work, setWork] = useState({ title: '', description: '', due_date: '' });
  const [Loading, setLoading] = useState(false);
  const { employees: allEmployees } = UseGetAllEmployees();
  const { employees: deptEmployees } = UseGetDepartmentEmployees({ managerId: adminId });

  useEffect(() => {
    if (!adminId) {
      toast.error('Unauthorized access. Please log in again.');
      navigate('/login');
    }
  }, [adminId, navigate]);

  const openModal = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployeeId(null);
    setWork({ title: '', description: '', due_date: '' });
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setWork((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployeeId) {
      toast.error('No employee selected.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${ADMIN_API_ENDPOINT}/addwork/${adminId}/${selectedEmployeeId}`, work);
      toast.success('Work added successfully');
      closeModal();
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding work');
    }
  };

  const tableProps = { adminId, navigate, openModal, isManager };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      {isManager ? (
        <EmployeeTable {...tableProps} employees={deptEmployees} />
      ) : (
        <EmployeeTable {...tableProps} employees={allEmployees} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative border border-blue-100">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Assign Work</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800">Title</label>
                <input
                  type="text"
                  name="title"
                  value={work.title}
                  onChange={handleFormData}
                  required
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Description</label>
                <input
                  type="text"
                  name="description"
                  value={work.description}
                  onChange={handleFormData}
                  required
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={work.due_date}
                  onChange={handleFormData}
                  required
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
              >
                {Loading ? "Adding" : "Add work"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWork;