// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ADMIN_API_ENDPOINT, DEPARTMENT_API_ENDPOINT } from '../../utils/constant';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';

// const AddEmployee = () => {
//   const [loading, setLoading] = useState(false);
//   const organizationId = useSelector((store) => store.auth.employee.organization);
//   const navigate = useNavigate();
//   const [departments, setDepartments] = useState([]);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     empname: '',
//     mail: '',
//     password: '',
//     department: '',
//     Employeestatus: 'Employee',
//     rating: 2,
//     projectspending: 0,
//     age: '', // Added age field
//   });

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get(`${DEPARTMENT_API_ENDPOINT}/organization/${organizationId}/departments`);
//         setDepartments(response.data.departments || []);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//         setError('Failed to load departments');
//         toast.error('Failed to load departments');
//       }
//     };

//     if (organizationId) {
//       fetchDepartments();
//     } else {
//       setError('Organization ID not found. Please log in again.');
//       toast.error('Organization ID not found');
//     }
//   }, [organizationId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'age' ? parseInt(value) || '' : value, // Convert age to integer, allow empty string for clearing
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${ADMIN_API_ENDPOINT}/addemployee/${organizationId}`,
//         formData,
//         { withCredentials: true }
//       );
//       setFormData({
//         empname: '',
//         mail: '',
//         password: '',
//         department: '',
//         Employeestatus: 'Employee',
//         rating: 2,
//         projectspending: 0,
//         age: '', // Reset age field
//       });
//       toast.success("Employee Added Successfully");
//       navigate(-1);
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Error in adding employee";
//       toast.error(errorMessage);
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex">
//       <div className="flex-1 p-6 bg-gray-50">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-6"
//           onClick={() => navigate(-1)}
//         >
//           Back to Dashboard
//         </button>
//         <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-center mb-6">Add New Employee</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="empname" className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="empname"
//                 name="empname"
//                 value={formData.empname}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="mail"
//                 name="mail"
//                 value={formData.mail}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//                 min="18"
//                 max="100"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//                 disabled={!departments.length}
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">{departments.length ? 'Select a Department' : 'No departments available'}</option>
//                 {departments.map((dept) => (
//                   <option key={dept._id} value={dept._id}>
//                     {dept.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !organizationId || !formData.department}
//               className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
//             >
//               {loading ? 'Loading...' : 'Add Employee'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ADMIN_API_ENDPOINT, DEPARTMENT_API_ENDPOINT } from '../../utils/constant';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaBuilding, FaPlusCircle, FaArrowLeft } from 'react-icons/fa';

const AddEmployee = () => {
  const [loading, setLoading] = useState(false);
  const organizationId = useSelector((store) => store.auth.employee.organization);
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    empname: '',
    mail: '',
    password: '',
    department: '',
    Employeestatus: 'Employee',
    rating: 2,
    projectspending: 0,
    age: '', // Added age field
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${DEPARTMENT_API_ENDPOINT}/organization/${organizationId}/departments`);
        setDepartments(response.data.departments || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError('Failed to load departments');
        toast.error('Failed to load departments');
      }
    };

    if (organizationId) {
      fetchDepartments();
    } else {
      setError('Organization ID not found. Please log in again.');
      toast.error('Organization ID not found');
    }
  }, [organizationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value) || '' : value, // Convert age to integer, allow empty string for clearing
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${ADMIN_API_ENDPOINT}/addemployee/${organizationId}`,
        formData,
        { withCredentials: true }
      );
      setFormData({
        empname: '',
        mail: '',
        password: '',
        department: '',
        Employeestatus: 'Employee',
        rating: 2,
        projectspending: 0,
        age: '', // Reset age field
      });
      toast.success("Employee Added Successfully");
      navigate(-1);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error in adding employee";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-green-600 hover:text-green-800 flex items-center space-x-1 transition-all duration-200"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="bg-green-100 p-8 rounded-full">
                <FaUser className="text-green-600 text-6xl" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-green-900">Employee Onboarding</h1>
                <p className="text-green-600">Welcome a new team member to our organization</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <FaUser className="text-green-400" />
                    <label className="block text-sm font-medium text-green-700">Full Name</label>
                  </div>
                  <input
                    type="text"
                    id="empname"
                    name="empname"
                    value={formData.empname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-green-50"
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <FaEnvelope className="text-green-400" />
                    <label className="block text-sm font-medium text-green-700">Email Address</label>
                  </div>
                  <input
                    type="email"
                    id="mail"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-green-50"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <FaLock className="text-green-400" />
                    <label className="block text-sm font-medium text-green-700">Password</label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-green-50"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <FaCalendar className="text-green-400" />
                    <label className="block text-sm font-medium text-green-700">Age</label>
                  </div>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    max="100"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-green-50"
                    placeholder="Enter age"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <FaBuilding className="text-green-400" />
                  <label className="block text-sm font-medium text-green-700">Department</label>
                </div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  disabled={!departments.length}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-green-50"
                >
                  <option value="" className="text-gray-500">{departments.length ? 'Select a Department' : 'No departments available'}</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id} className="text-gray-800">
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading || !organizationId || !formData.department}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Employee...
                    </>
                  ) : (
                    <>
                      <FaPlusCircle className="mr-2" />
                      Add Employee
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;