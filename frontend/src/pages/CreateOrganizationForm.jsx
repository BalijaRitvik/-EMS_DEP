import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import register from '../assets/Images/register.png';
import toast from "react-hot-toast";
import { AUTH_API_ENDPOINT } from '../utils/constant';
import axios from 'axios';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CreateOrganizationForm = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [organization, setOrganizationState] = useState({
        organization_name: "",
        mail: "",
        adminname: "",
        adminDepartment: "",
        departments: [""],
        organizationLogo: null,
        employeeStatus: "Admin",
        price: 0,
        duration: 0,
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrganizationState(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleDepartmentChange = (index, value) => {
        const updated = [...organization.departments];
        updated[index] = value;
        setOrganizationState(prev => ({ ...prev, departments: updated }));
        validateField('departments', updated);
    };

    const handleSingleDepartmentChange = (index) => (e) => {
        handleDepartmentChange(index, e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setOrganizationState(prev => ({ ...prev, organizationLogo: file }));
        validateField('organizationLogo', file);
    };

    const addDepartment = () => {
        if (organization.departments.length < 5) {
            setOrganizationState(prev => ({
                ...prev,
                departments: [...prev.departments, ""]
            }));
        } else {
            setValidationErrors(prev => ({
                ...prev,
                departments: "Maximum 5 departments allowed"
            }));
        }
    };

    const validateField = (name, value) => {
        const errors = { ...validationErrors };

        switch (name) {
            case "organization_name":
                errors.organization_name = value.trim() === '' ? "Organization name is required" : '';
                break;
            case "mail":
                errors.mail = !EMAIL_REGEX.test(value) ? "Invalid email address" : '';
                break;
            case "adminname":
                errors.adminname = value.trim() === '' ? "Admin name is required" : '';
                break;
            case "departments":
                errors.departments = value.some(v => v.trim() === '') ? "Department names cannot be empty" : '';
                break;
            case "adminDepartment":
                errors.adminDepartment = value.trim() === '' ? "Admin department is required" : '';
                break;
            case "organizationLogo":
                errors.organizationLogo = !value ? "Organization logo is required" : '';
                break;
            default:
                break;
        }

        setValidationErrors(errors);
    };

    const validateForm = () => {
        const { organization_name, mail, adminname, departments, adminDepartment, organizationLogo } = organization;
        const errors = {};
        let valid = true;

        if (!organization_name.trim()) {
            errors.organization_name = "Organization name is mandatory";
            valid = false;
        }
        if (!EMAIL_REGEX.test(mail)) {
            errors.mail = "Invalid email address";
            valid = false;
        }
        if (!adminname.trim()) {
            errors.adminname = "Admin name is required";
            valid = false;
        }
        if (departments.some(dept => dept.trim() === '')) {
            errors.departments = "Department names cannot be empty";
            valid = false;
        }
        if (!adminDepartment.trim()) {
            errors.adminDepartment = "Admin department is required";
            valid = false;
        }
        if (!organizationLogo) {
            errors.organizationLogo = "Organization logo is required";
            valid = false;
        }

        setValidationErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("organization_name", organization.organization_name);
        formData.append("mail", organization.mail);
        formData.append("adminname", organization.adminname);
        formData.append("adminDepartment", organization.adminDepartment);
        formData.append("departments", JSON.stringify(organization.departments));
        formData.append("organizationLogo", organization.organizationLogo);
        formData.append("employeeStatus", organization.employeeStatus);
        formData.append("price", organization.price);
        formData.append("duration", organization.duration);

        try {
            const response = await axios.post(`${AUTH_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Organization registered successfully!");
            setOrganizationState({
                organization_name: "",
                mail: "",
                adminname: "",
                adminDepartment: "",
                departments: [""],
                organizationLogo: null,
                employeeStatus: "Admin",
                price: 0,
                duration: 0,
            });
            setValidationErrors({});
            if (fileInputRef.current) fileInputRef.current.value = "";
            navigate('/');
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
            <NavLink to="/" className="text-blue-600 mb-6">Home</NavLink>
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="organization_name"
                            value={organization.organization_name}
                            onChange={handleInputChange}
                            placeholder="Organization Name"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {validationErrors.organization_name && <p className="text-red-500 text-sm">{validationErrors.organization_name}</p>}

                        <input
                            type="email"
                            name="mail"
                            value={organization.mail}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {validationErrors.mail && <p className="text-red-500 text-sm">{validationErrors.mail}</p>}

                        <input
                            type="text"
                            name="adminname"
                            value={organization.adminname}
                            onChange={handleInputChange}
                            placeholder="Admin Name"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {validationErrors.adminname && <p className="text-red-500 text-sm">{validationErrors.adminname}</p>}

                        {organization.departments.map((dept, index) => (
                            <input
                                key={index}
                                type="text"
                                value={dept}
                                onChange={handleSingleDepartmentChange(index)}
                                placeholder={`Department ${index + 1}`}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            />
                        ))}
                        {validationErrors.departments && <p className="text-red-500 text-sm">{validationErrors.departments}</p>}

                        {organization.departments.length < 5 && (
                            <button
                                type="button"
                                onClick={addDepartment}
                                className="bg-blue-500 text-white rounded py-2 px-4 w-full"
                            >
                                Add Department
                            </button>
                        )}

                        <input
                            type="text"
                            name="adminDepartment"
                            value={organization.adminDepartment}
                            onChange={handleInputChange}
                            placeholder="Admin Department"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {validationErrors.adminDepartment && <p className="text-red-500 text-sm">{validationErrors.adminDepartment}</p>}

                        <input
                            ref={fileInputRef}
                            type="file"
                            name="organizationLogo"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full text-sm text-gray-700"
                        />
                        {validationErrors.organizationLogo && <p className="text-red-500 text-sm">{validationErrors.organizationLogo}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500'} text-white`}
                        >
                            {isSubmitting ? "Submitting..." : "Create Organization"}
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 bg-gray-200 p-6 flex items-center justify-center">
                    <img src={register} alt="Register" className="max-w-full h-auto rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default CreateOrganizationForm