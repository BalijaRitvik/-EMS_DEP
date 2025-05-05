import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import register from '../assets/Images/register.png';
import toast from "react-hot-toast";
import { AUTH_API_ENDPOINT } from '../utils/constant';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CreateOrganizationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [organization, setOrganizationState] = useState({
        organization_name: "",
        mail: "",
        adminname: "",
        adminDepartment: "",
        departments: [""],
        organizationLogo: null,
        employeeStatus: "Admin",
        price: 0,  // Default value, or you can set it to whatever is appropriate
        duration: 0, // Default value, or adjust based on requirements
    });

    const [validationErrors, setValidationErrors] = useState({
        organization_name: '',
        mail: '',
        adminname: '',
        adminDepartment: '',
        departments: '',
        organizationLogo: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    // useEffect(() => {
    //     // If there is any session data passed through state, update the form values
    //     const { email: newEmail = '', price: newPrice = 0, duration: newDuration = 0 } = location.state || {};
    //     if (newEmail !== organization.mail || newPrice !== organization.price || newDuration !== organization.duration) {
    //         setOrganizationState((prev) => ({
    //             ...prev,
    //             mail: newEmail,
    //             price: newPrice,
    //             duration: newDuration,
    //         }));
    //         console.log('Updated organization state:', { mail: newEmail, price: newPrice, duration: newDuration });
    //     }
    // }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'mail') { // Prevent changes to mail field
            setOrganizationState((prev) => ({
                ...prev,
                [name]: value,
            }));
            validateField(name, value);
        }
    };

    const handleDepartmentChange = (index, value) => {
        const updatedDepartments = [...organization.departments];
        updatedDepartments[index] = value;
        setOrganizationState((prev) => ({
            ...prev,
            departments: updatedDepartments,
        }));
        validateField('departments', updatedDepartments);
    };

    const handleSingleDepartmentChange = (index) => (e) => {
        handleDepartmentChange(index, e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setOrganizationState((prev) => ({
            ...prev,
            organizationLogo: file,
        }));
        validateField('organizationLogo', file);
    };

    const addDepartment = () => {
        if (organization.departments.length < 5) {
            setOrganizationState((prev) => ({
                ...prev,
                departments: [...prev.departments, ""],
            }));
        } else {
            setValidationErrors((prev) => ({
                ...prev,
                departments: 'Maximum 5 departments allowed',
            }));
        }
    };

    const validateField = (name, value) => {
        const errors = { ...validationErrors };
        if (name === 'organization_name') {
            errors.organization_name = value.trim() === '' ? 'Organization name is required' : '';
        } else if (name === 'mail') {
            errors.mail = !EMAIL_REGEX.test(organization.mail) ? 'Invalid email address' : '';
        } else if (name === 'adminname') {
            errors.adminname = value.trim() === '' ? 'Admin name is required' : '';
        } else if (name === 'departments') {
            errors.departments = value.some((dept) => dept.trim() === '') ? 'Department names cannot be empty' : '';
        } else if (name === 'adminDepartment') {
            errors.adminDepartment = value.trim() === '' ? 'Admin department is required' : '';
        } else if (name === 'organizationLogo') {
            errors.organizationLogo = value ? '' : 'Organization logo is required';
        }
        setValidationErrors(errors);
    };

    const validateForm = () => {
        const { organization_name, mail, adminname, departments, adminDepartment, organizationLogo } = organization;
        let valid = true;
        const errors = {};

        if (organization_name.trim() === '') {
            errors.organization_name = 'Organization name is mandatory';
            valid = false;
        }
        if (!EMAIL_REGEX.test(mail)) {
            errors.mail = 'Invalid email address';
            valid = false;
        }
        if (adminname.trim() === '') {
            errors.adminname = 'Admin name is required';
            valid = false;
        }
        if (departments.some((dept) => dept.trim() === '')) {
            errors.departments = 'Department names cannot be empty';
            valid = false;
        }
        if (adminDepartment.trim() === '') {
            errors.adminDepartment = 'Admin department is required';
            valid = false;
        }
        if (!organizationLogo) {
            errors.organizationLogo = 'Organization logo is required';
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
        formData.append('organization_name', organization.organization_name);
        formData.append('mail', organization.mail);
        formData.append('adminname', organization.adminname);
        formData.append('adminDepartment', organization.adminDepartment);
        formData.append('departments', JSON.stringify(organization.departments));
        formData.append('employeeStatus', organization.employeeStatus);
        formData.append('organizationLogo', organization.organizationLogo);
        formData.append('price', organization.price);  // Retain price
        formData.append('duration', organization.duration);  // Retain duration

        try {
            const response = await fetch(`${AUTH_API_ENDPOINT}/register`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
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
                navigate('/');
                setValidationErrors({});
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(`Registration failed: ${data.error || data.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Something went wrong. Please try again later.");
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
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {validationErrors.organization_name && (
                            <p className="text-red-500 text-sm">{validationErrors.organization_name}</p>
                        )}

                        <input
                            type="email"
                            name="mail"
                            value={organization.mail}
                            onChange={handleInputChange}
                            placeholder="Email"
                            readOnly
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                        />
                        {validationErrors.mail && <p className="text-red-500 text-sm">{validationErrors.mail}</p>}

                        <input
                            type="text"
                            name="adminname"
                            value={organization.adminname}
                            onChange={handleInputChange}
                            placeholder="Admin Name"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {validationErrors.adminname && (
                            <p className="text-red-500 text-sm">{validationErrors.adminname}</p>
                        )}

                        {organization.departments.map((dept, index) => (
                            <input
                                key={index}
                                type="text"
                                value={dept}
                                onChange={handleSingleDepartmentChange(index)}
                                placeholder={`Department ${index + 1}`}
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                        {validationErrors.departments && (
                            <p className="text-red-500 text-sm">{validationErrors.departments}</p>
                        )}

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
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {validationErrors.adminDepartment && (
                            <p className="text-red-500 text-sm">{validationErrors.adminDepartment}</p>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            name="organizationLogo"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full text-sm text-gray-700"
                        />
                        {validationErrors.organizationLogo && (
                            <p className="text-red-500 text-sm">{validationErrors.organizationLogo}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 rounded bg-blue-500 text-white focus:outline-none ${isSubmitting ? 'bg-blue-300' : ''}`}
                        >
                            {isSubmitting ? "Submitting..." : "Create Organization"}
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 bg-gray-200 p-6 flex items-center justify-center">
                    <img src={register} alt="Register" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default CreateOrganizationForm;
