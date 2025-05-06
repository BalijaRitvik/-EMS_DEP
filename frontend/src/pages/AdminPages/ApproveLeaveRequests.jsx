// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { LEAVE_API_ENDPOINT, ADMIN_API_ENDPOINT } from "../../utils/constant";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import AdminHeader from "./AdminHeader";

// const AdminView = ({ handleStatusUpdate }) => {
//     const [leaveRecords, setLeaveRecords] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchLeaveRequests = async () => {
//             try {
//                 const { data } = await axios.get(`${LEAVE_API_ENDPOINT}/requests`, { withCredentials: true });
//                 console.log("📌 All Leave Requests API Response:", data);
//                 setLeaveRecords(data);
//             } catch (error) {
//                 console.error("Error fetching leave requests:", error);
//                 setError(error.response?.data?.message || "Error fetching leave requests");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchLeaveRequests();
//     }, []);

//     return <LeaveRequestTable leaveRecords={leaveRecords} handleStatusUpdate={handleStatusUpdate} isManager={false} loading={loading} error={error} />;
// };

// const ManagerView = ({ organizationId, handleStatusUpdate }) => {
//     const [leaveRecords, setLeaveRecords] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const employeeId = useSelector((state) => state.auth.employee?._id);

//     useEffect(() => {
//         const fetchDepartmentLeaveRequests = async () => {
//             try {
//                 const { data } = await axios.get(`${LEAVE_API_ENDPOINT}/department-requests/${organizationId}`, { withCredentials: true });
//                 console.log("📌 Department Leave Requests API Response:", data);
//                 setLeaveRecords(data);
//             } catch (error) {
//                 console.error("Error fetching department leave requests:", error);
//                 setError(error.response?.data?.message || "Error fetching department leave requests");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (organizationId && employeeId) {
//             fetchDepartmentLeaveRequests();
//         } else {
//             setError("Missing organization ID or employee ID.");
//             setLoading(false);
//         }
//     }, [organizationId, employeeId]);

//     return <LeaveRequestTable leaveRecords={leaveRecords} handleStatusUpdate={handleStatusUpdate} isManager={true} loading={loading} error={error} />;
// };

// const LeaveRequestTable = ({ leaveRecords, handleStatusUpdate, isManager, loading, error }) => {
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         const date = new Date(dateString);
//         return isNaN(date.getTime()) ? "N/A" : date.toISOString().split("T")[0];
//     };

//     return (
//         <div className="p-5 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-center text-black">
//                 {isManager ? "Department Leave Requests" : "All Leave Requests"}
//             </h2>
//             {loading ? (
//                 <p className="text-gray-500 text-center">Loading leave requests...</p>
//             ) : error ? (
//                 <p className="text-red-500 text-center">{error}</p>
//             ) : leaveRecords.length === 0 ? (
//                 <p className="text-gray-500 text-center">
//                     No leave requests found {isManager ? "in your department" : "in the organization"}.
//                 </p>
//             ) : (
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border border-black p-2 text-center font-bold text-black">Employee Name</th>
//                             <th className="border border-black p-2 text-center font-bold text-black">Email</th>
//                             <th className="border border-black p-2 text-center font-bold text-black">Start Date</th>
//                             <th className="border border-black p-2 text-center font-bold text-black">End Date</th>
//                             <th className="border border-black p-2 text-center font-bold text-black">Leave Type</th>
//                             <th className="border border-black p-2 text-center font-bold text-black">Reason</th>
//                             <th className="border border-black p-2 text-center font-bold text-black">Status</th>
//                             <th className="border border-black p-2 text-center font-bold text-black">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {leaveRecords.flatMap((record) =>
//                             record.requests.map((request) => (
//                                 <tr key={request._id}>
//                                     <td className="border border-black p-2 text-center font-bold text-black">{record.employee?.empname || "N/A"}</td>
//                                     <td className="border border-black p-2 text-center font-bold text-black">{record.employee?.mail || "N/A"}</td>
//                                     <td className="border border-black p-2 text-center font-bold text-black">{formatDate(request.startDate)}</td>
//                                     <td className="border border-black p-2 text-center font-bold text-black">{formatDate(request.endDate)}</td>
//                                     <td className="border border-black p-2 text-center font-bold text-black">{request.leaveType}</td>
//                                     <td className="border border-black p-2 text-center font-bold text-black">{request.reason}</td>
//                                     <td className="border border-black p-2 text-center font-bold">
//                                         <span
//                                             className={`font-bold ${
//                                                 request.status === "Approved"
//                                                     ? "text-green-600"
//                                                     : request.status === "Rejected"
//                                                     ? "text-red-600"
//                                                     : "text-orange-400"
//                                             }`}
//                                         >
//                                             {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
//                                         </span>
//                                     </td>
//                                     <td className="border border-black p-2 text-center font-bold">
//                                         {request.status && request.status !== "Pending" ? (
//                                             <span className="text-gray-500">Action Taken</span>
//                                         ) : (
//                                             <div className="flex justify-center gap-2">
//                                                 <button
//                                                     onClick={() => handleStatusUpdate(request._id, "Approved", record.employee?._id)}
//                                                     className="px-3 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition-colors font-bold"
//                                                 >
//                                                     Approve
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleStatusUpdate(request._id, "Rejected", record.employee?._id)}
//                                                     className="px-3 py-2 bg-red-500 text-black rounded hover:bg-red-600 transition-colors font-bold"
//                                                 >
//                                                     Reject
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// const ApproveLeaveRequests = () => {
//     const navigate = useNavigate();
//     const { employee } = useSelector((state) => state.auth);
//     const adminId = employee?._id;
//     const adminRole = employee?.Employeestatus;
//     const isManager = adminRole === "Manager";
//     const organizationId = useSelector((state) => state.auth.employee.organization);

//     useEffect(() => {
//         console.log("adminId from state.auth:", adminId);
//         if (!adminId) {
//             console.log("Navigating to login due to missing adminId");
//             toast.error("Invalid or missing admin ID. Please log in again.");
//             navigate("/");
//             return;
//         }
//     }, [adminId, navigate]);

//     const handleStatusUpdate = async (requestId, newStatus, employeeId, authenticatedId = adminId) => {
//         try {
//             console.log("Request URL:", `${LEAVE_API_ENDPOINT}/update/${requestId}`);
//             console.log("Request Payload:", { status: newStatus, employeeId });
//             console.log("Authenticated Employee ID (for reference):", authenticatedId);
//             const response = await axios.put(`${LEAVE_API_ENDPOINT}/update/${requestId}`, { status: newStatus, employeeId }, { withCredentials: true });
//             console.log("📌 Update Status API Response:", response.data);
//             toast.success(`Leave request ${newStatus.toLowerCase()} successfully`);
//             navigate("/AdminHome")
//         } catch (error) {
//             console.error("Error updating leave status:", {
//                 message: error.response?.data?.message || error.message,
//                 status: error.response?.status,
//                 requestId,
//                 newStatus,
//                 employeeId,
//             });
//             toast.error(error.response?.data?.message || "Error updating leave status");
//         }
//     };

//     return (
//         <>
//             <AdminHeader />
//             <div className="p-5">
//                 {isManager ? (
//                     <ManagerView organizationId={organizationId} handleStatusUpdate={handleStatusUpdate} />
//                 ) : (
//                     <AdminView handleStatusUpdate={handleStatusUpdate} />
//                 )}
//             </div>
//         </>
//     );
// };

// export default ApproveLeaveRequests;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { LEAVE_API_ENDPOINT, ADMIN_API_ENDPOINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminHeader from "./AdminHeader";

const AdminView = ({ handleStatusUpdate }) => {
    const [leaveRecords, setLeaveRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const { data } = await axios.get(`${LEAVE_API_ENDPOINT}/requests`, { withCredentials: true });
                console.log("📌 All Leave Requests API Response:", data);
                setLeaveRecords(data);
            } catch (error) {
                console.error("Error fetching leave requests:", error);
                setError(error.response?.data?.message || "Error fetching leave requests");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaveRequests();
    }, []);

    return <LeaveRequestTable leaveRecords={leaveRecords} handleStatusUpdate={handleStatusUpdate} isManager={false} loading={loading} error={error} />;
};

const ManagerView = ({ organizationId, handleStatusUpdate }) => {
    const [leaveRecords, setLeaveRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const employeeId = useSelector((state) => state.auth.employee?._id);

    useEffect(() => {
        const fetchDepartmentLeaveRequests = async () => {
            try {
                const { data } = await axios.get(`${LEAVE_API_ENDPOINT}/department-requests/${organizationId}`, { withCredentials: true });
                console.log("📌 Department Leave Requests API Response:", data);
                setLeaveRecords(data);
            } catch (error) {
                console.error("Error fetching department leave requests:", error);
                setError(error.response?.data?.message || "Error fetching department leave requests");
            } finally {
                setLoading(false);
            }
        };
        if (organizationId && employeeId) {
            fetchDepartmentLeaveRequests();
        } else {
            setError("Missing organization ID or employee ID.");
            setLoading(false);
        }
    }, [organizationId, employeeId]);

    return <LeaveRequestTable leaveRecords={leaveRecords} handleStatusUpdate={handleStatusUpdate} isManager={true} loading={loading} error={error} />;
};

const LeaveRequestTable = ({ leaveRecords, handleStatusUpdate, isManager, loading, error }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "N/A" : date.toISOString().split("T")[0];
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate("/adminHome")}
                    className="text-purple-700 hover:text-purple-900 flex items-center space-x-1 transition-colors duration-200"
                >
                    <span>←</span>
                    <span>Back to Dashboard</span>
                </button>
            </div>

            <div className="text-center mb-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-purple-100 p-6 rounded-full">
                        <span className="text-4xl">📅</span>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-purple-900">Leave Request Management</h1>
                        <p className="text-purple-700">
                            {isManager ? "Review leave requests in your department" : "Review all leave requests in the organization"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-4 text-gray-500 bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                        Loading leave requests...
                    </div>
                ) : error ? (
                    <div className="text-center py-4 text-red-500 bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                        {error}
                    </div>
                ) : leaveRecords.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                        No leave requests found {isManager ? "in your department" : "in the organization"}.
                    </div>
                ) : (
                    leaveRecords.flatMap((record) =>
                        record.requests.map((request, index) => (
                            <div key={request._id} className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 flex items-center space-x-4">
                                <div className="flex items-center space-x-3 flex-1">
                                    <div className="bg-purple-50 p-3 rounded-full">
                                        <span className="text-xl">👤</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{index + 1}</span>
                                            <h3 className="text-lg font-semibold text-purple-900">{record.employee?.empname || "N/A"}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600">Email: {record.employee?.mail || "N/A"}</p>
                                        <p className="text-sm text-gray-600">Start Date: {formatDate(request.startDate)}</p>
                                        <p className="text-sm text-gray-600">End Date: {formatDate(request.endDate)}</p>
                                        <p className="text-sm text-gray-600">Leave Type: {request.leaveType}</p>
                                        <p className="text-sm text-gray-600">Reason: {request.reason}</p>
                                        <p className="text-sm">
                                            Status:{' '}
                                            <span
                                                className={`font-medium ${
                                                    request.status === "Approved"
                                                        ? "text-green-600"
                                                        : request.status === "Rejected"
                                                        ? "text-red-600"
                                                        : "text-orange-400"
                                                }`}
                                            >
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-2">
                                    {request.status && request.status !== "Pending" ? (
                                        <span className="text-gray-500">Action Taken</span>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(request._id, "Approved", record.employee?._id)}
                                                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-medium"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(request._id, "Rejected", record.employee?._id)}
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};

const ApproveLeaveRequests = () => {
    const navigate = useNavigate();
    const { employee } = useSelector((state) => state.auth);
    const adminId = employee?._id;
    const adminRole = employee?.Employeestatus;
    const isManager = adminRole === "Manager";
    const organizationId = useSelector((state) => state.auth.employee.organization);

    useEffect(() => {
        console.log("adminId from state.auth:", adminId);
        if (!adminId) {
            console.log("Navigating to login due to missing adminId");
            toast.error("Invalid or missing admin ID. Please log in again.");
            navigate("/");
            return;
        }
    }, [adminId, navigate]);

    const handleStatusUpdate = async (requestId, newStatus, employeeId, authenticatedId = adminId) => {
        try {
            console.log("Request URL:", `${LEAVE_API_ENDPOINT}/update/${requestId}`);
            console.log("Request Payload:", { status: newStatus, employeeId });
            console.log("Authenticated Employee ID (for reference):", authenticatedId);
            const response = await axios.put(`${LEAVE_API_ENDPOINT}/update/${requestId}`, { status: newStatus, employeeId }, { withCredentials: true });
            console.log("📌 Update Status API Response:", response.data);
            toast.success(`Leave request ${newStatus.toLowerCase()} successfully`);
            navigate("/adminHome");
        } catch (error) {
            console.error("Error updating leave status:", {
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
                requestId,
                newStatus,
                employeeId,
            });
            toast.error(error.response?.data?.message || "Error updating leave status");
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
                {isManager ? (
                    <ManagerView organizationId={organizationId} handleStatusUpdate={handleStatusUpdate} />
                ) : (
                    <AdminView handleStatusUpdate={handleStatusUpdate} />
                )}
            </div>
        </>
    );
};

export default ApproveLeaveRequests;