// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import AdminHeader from "./AdminHeader";
// import { ATTENDANCE_API_ENDPOINT } from "../../utils/constant";

// const AdminView = () => {
//   const navigate = useNavigate();
//   const [employeeStatus, setEmployeeStatus] = useState([]);
//   const [summary, setSummary] = useState({ present: 0, late: 0, absent: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmployeeStatus = async () => {
//       try {
//         const response = await axios.get(`${ATTENDANCE_API_ENDPOINT}/attendance-status-today`, { withCredentials: true });
//         console.log("📌 Admin API Response:", response.data);
//         setEmployeeStatus(response.data.employeeStatus || []);
//         setSummary(response.data.counts || { present: 0, late: 0, absent: 0 });
//       } catch (error) {
//         console.error("❌ Error fetching admin attendance status:", error);
//         toast.error(error?.response?.data?.message || "Error fetching attendance status.");
//       }
//       setLoading(false);
//     };
//     fetchEmployeeStatus();
//   }, []);

//   return (
//     <AttendanceTable
//       employeeStatus={employeeStatus}
//       summary={summary}
//       loading={loading}
//       navigate={navigate}
//       isManager={false}
//     />
//   );
// };

// const ManagerView = ({ managerId, organizationId }) => {
//   const navigate = useNavigate();
//   const [employeeStatus, setEmployeeStatus] = useState([]);
//   const [summary, setSummary] = useState({ present: 0, late: 0, absent: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDepartmentEmployeeStatus = async () => {
//       try {
//         const response = await axios.get(
//           `${ATTENDANCE_API_ENDPOINT}/department-attendance-status-today/${organizationId}/${managerId}`,
//           { withCredentials: true }
//         );
//         console.log("📌 Manager API Response:", response.data);
//         setEmployeeStatus(response.data.employeeStatus || []);
//         setSummary(response.data.counts || { present: 0, late: 0, absent: 0 });
//       } catch (error) {
//         console.error("❌ Error fetching department attendance status:", error);
//         toast.error(error?.response?.data?.message || "Error fetching department attendance status.");
//       }
//       setLoading(false);
//     };
//     if (organizationId && managerId) {
//       fetchDepartmentEmployeeStatus();
//     } else {
//       console.error("Missing organizationId or managerId:", { organizationId, managerId });
//       toast.error("Missing organization ID or manager ID.");
//       setLoading(false);
//     }
//   }, [organizationId, managerId]);

//   return (
//     <AttendanceTable
//       employeeStatus={employeeStatus}
//       summary={summary}
//       loading={loading}
//       navigate={navigate}
//       isManager={true}
//     />
//   );
// };

// const AttendanceTable = ({ employeeStatus, summary, loading, navigate, isManager }) => {
//   return (
//     <div className="p-5 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">
//         {isManager ? "Department Attendance Status for Today" : "Employee Attendance Status for Today"}
//       </h2>
//       {loading ? (
//         <p className="text-gray-500">Loading employee status...</p>
//       ) : (
//         <>
//           <div className="flex justify-around w-full p-4 bg-green-100 rounded-lg mb-4">
//             <p><strong className="text-green-800">Present:</strong> {summary.present}</p>
//             <p><strong className="text-yellow-800">Late:</strong> {summary.late}</p>
//             <p><strong className="text-red-800">Absent:</strong> {summary.absent}</p>
//           </div>
//           {employeeStatus.length > 0 ? (
//             <table className="w-full border-collapse mt-5 bg-white shadow-sm">
//               <thead>
//                 <tr className="bg-gray-100 text-left">
//                   <th className="py-2 px-4">Employee Name</th>
//                   <th className="py-2 px-4">Status</th>
//                   <th className="py-2 px-4">Check-in Time</th>
//                   <th className="py-2 px-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {employeeStatus.map((record, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="py-2 px-4">{record.employeeName}</td>
//                     <td className="py-2 px-4">{record.status}</td>
//                     <td className="py-2 px-4">{record.checkInTime}</td>
//                     <td className="py-2 px-4">
//                       <button
//                         onClick={() => navigate("/adminHome/view-attendance-records", { state: { employeeId: record.employeeId } })}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
//                       >
//                         View Records
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-500">
//               No attendance records found for today {isManager ? "in your department" : "in the organization"}.
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const ViewAttendance = () => {
//   const navigate = useNavigate();
//   const { employee } = useSelector((state) => state.auth); // Access state.auth directly
//   const adminId = employee?._id; // "68193205701ea1bd4cc8ceca"
//   const adminRole = employee?.Employeestatus; // "Manager"
//   const isManager = adminRole === "Manager";
//   const organizationId = employee?.organization; // "681928b45e84daa5f716809a"

//   useEffect(() => {
//     console.log("adminId from state.auth:", adminId);
//     console.log("organizationId from state.auth:", organizationId);
//     if (!adminId || !organizationId) {
//       console.log("Navigating to login due to missing adminId or organizationId");
//       toast.error("Invalid or missing admin ID or organization ID. Please log in again.");
//       navigate('/');
//       return;
//     }
//   }, [adminId, organizationId, navigate]);

//   return (
//     <>
//       <AdminHeader />
//       <div className="p-5">
//         {isManager ? (
//           <ManagerView managerId={adminId} organizationId={organizationId} />
//         ) : (
//           <AdminView />
//         )}
//       </div>
//     </>
//   );
// };

// export default ViewAttendance;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import AdminHeader from "./AdminHeader";
import { ATTENDANCE_API_ENDPOINT } from "../../utils/constant";

const AdminView = () => {
  const navigate = useNavigate();
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [summary, setSummary] = useState({ present: 0, late: 0, absent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeStatus = async () => {
      try {
        const response = await axios.get(`${ATTENDANCE_API_ENDPOINT}/attendance-status-today`, { withCredentials: true });
        console.log("📌 Admin API Response:", response.data);
        setEmployeeStatus(response.data.employeeStatus || []);
        setSummary(response.data.counts || { present: 0, late: 0, absent: 0 });
      } catch (error) {
        console.error("❌ Error fetching admin attendance status:", error);
        toast.error(error?.response?.data?.message || "Error fetching attendance status.");
      }
      setLoading(false);
    };
    fetchEmployeeStatus();
  }, []);

  return (
    <AttendanceTable
      employeeStatus={employeeStatus}
      summary={summary}
      loading={loading}
      navigate={navigate}
      isManager={false}
    />
  );
};

const ManagerView = ({ managerId, organizationId }) => {
  const navigate = useNavigate();
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [summary, setSummary] = useState({ present: 0, late: 0, absent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentEmployeeStatus = async () => {
      try {
        const response = await axios.get(
          `${ATTENDANCE_API_ENDPOINT}/department-attendance-status-today/${organizationId}/${managerId}`,
          { withCredentials: true }
        );
        console.log("📌 Manager API Response:", response.data);
        setEmployeeStatus(response.data.employeeStatus || []);
        setSummary(response.data.counts || { present: 0, late: 0, absent: 0 });
      } catch (error) {
        console.error("❌ Error fetching department attendance status:", error);
        toast.error(error?.response?.data?.message || "Error fetching department attendance status.");
      }
      setLoading(false);
    };
    if (organizationId && managerId) {
      fetchDepartmentEmployeeStatus();
    } else {
      console.error("Missing organizationId or managerId:", { organizationId, managerId });
      toast.error("Missing organization ID or manager ID.");
      setLoading(false);
    }
  }, [organizationId, managerId]);

  return (
    <AttendanceTable
      employeeStatus={employeeStatus}
      summary={summary}
      loading={loading}
      navigate={navigate}
      isManager={true}
    />
  );
};

const AttendanceTable = ({ employeeStatus, summary, loading, navigate, isManager }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/AdminHome")}
          className="text-teal-700 hover:text-teal-900 flex items-center space-x-1 transition-colors duration-200"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-teal-100 p-6 rounded-full">
            <span className="text-4xl">⏰</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-teal-900">Attendance Overview</h1>
            <p className="text-teal-700">
              {isManager ? "Monitor today’s attendance in your department" : "Monitor today’s attendance across the organization"}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4 text-gray-500 bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
          Loading employee status...
        </div>
      ) : (
        <>
          <div className="flex justify-around w-full p-4 bg-teal-50 rounded-lg mb-6 border border-teal-100 shadow-md">
            <p className="text-sm">
              <span className="font-medium text-green-700">Present:</span> {summary.present}
            </p>
            <p className="text-sm">
              <span className="font-medium text-yellow-700">Late:</span> {summary.late}
            </p>
            <p className="text-sm">
              <span className="font-medium text-red-700">Absent:</span> {summary.absent}
            </p>
          </div>
          <div className="space-y-6">
            {employeeStatus.length > 0 ? (
              employeeStatus.map((record, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100 flex items-center space-x-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-teal-50 p-3 rounded-full">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{index + 1}</span>
                        <h3 className="text-lg font-semibold text-teal-900">{record.employeeName}</h3>
                      </div>
                      <p className="text-sm text-gray-600">Status: {record.status}</p>
                      <p className="text-sm text-gray-600">Check-in Time: {record.checkInTime}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/adminHome/view-attendance-records", { state: { employeeId: record.employeeId } })}
                    className="py-2 px-4 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition-all"
                  >
                    View Records
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
                No attendance records found for today {isManager ? "in your department" : "in the organization"}.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const ViewAttendance = () => {
  const navigate = useNavigate();
  const { employee } = useSelector((state) => state.auth);
  const adminId = employee?._id;
  const adminRole = employee?.Employeestatus;
  const isManager = adminRole === "Manager";
  const organizationId = employee?.organization;

  useEffect(() => {
    console.log("adminId from state.auth:", adminId);
    console.log("organizationId from state.auth:", organizationId);
    if (!adminId || !organizationId) {
      console.log("Navigating to login due to missing adminId or organizationId");
      toast.error("Invalid or missing admin ID or organization ID. Please log in again.");
      navigate('/');
      return;
    }
  }, [adminId, organizationId, navigate]);

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-teal-50 flex items-center justify-center p-4">
        {isManager ? (
          <ManagerView managerId={adminId} organizationId={organizationId} />
        ) : (
          <AdminView />
        )}
      </div>
    </>
  );
};

export default ViewAttendance;