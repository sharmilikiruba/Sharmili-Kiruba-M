'use client';

import React, { useState, useEffect } from 'react';
import { Student, VisitorStats } from './types';

const StudentProfile: React.FC = () => {
    const [student, setStudent] = useState<Student | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [visitorStats] = useState<VisitorStats>({
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0
    });

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        // Replace with actual API call
        const mockStudent: Student = {
            id: "",
            rollNumber: "",
            name: "",
            gender: "",
            dateOfBirth: "",
            photo: "",
            phone: "",
            email: "",
            address: "",
            course: "",
            department: "",
            yearOfStudy: "",
            hostelName: "",
            hostelType: "",
            roomNumber: "",
            dateOfJoining: "",
            status: "Active",
            parentName: "",
            parentMobile: "",
            parentAddress: ""
        };

        setStudent(mockStudent);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!student) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-600 mt-1">View and manage your profile information</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white text-4xl font-bold">
                                    {student.name.split(' ').map((n: string) => n[0]).join('')}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                            <p className="text-gray-600 mb-3">{student.rollNumber}</p>
                            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                                Student
                            </span>
                            <div className="mt-6 space-y-3 text-left">
                                <div className="flex items-start text-gray-600">
                                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm break-all">{student.email}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-sm">{student.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Student Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Student Information</h3>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Personal Details */}
                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <h4 className="font-semibold text-gray-900">Personal Details</h4>
                                        </div>

                                        <div className="space-y-4">


                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Gender
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.gender}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Date of Birth
                                                </label>
                                                <p className="text-gray-900 font-medium">{formatDate(student.dateOfBirth)}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Address
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Academic Details */}
                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            <h4 className="font-semibold text-gray-900">Academic Details</h4>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Roll Number
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.rollNumber}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Course
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.course}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Department
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.department}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Year of Study
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.yearOfStudy}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hostel Details */}
                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <h4 className="font-semibold text-gray-900">Hostel Details</h4>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Hostel Name
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.hostelName}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Hostel Type
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.hostelType}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Room Number
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.roomNumber}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Date of Joining
                                                </label>
                                                <p className="text-gray-900 font-medium">{formatDate(student.dateOfJoining)}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Status
                                                </label>
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${student.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {student.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guardian Details */}
                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <h4 className="font-semibold text-gray-900">Guardian Details</h4>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Parent/Guardian Name
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.parentName}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Parent/Guardian Mobile
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.parentMobile}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Parent/Guardian Address
                                                </label>
                                                <p className="text-gray-900 font-medium">{student.parentAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visitor Statistics */}
                    <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Visitor Statistics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-4xl font-bold text-gray-900 mb-2">
                                    {visitorStats.total}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total Requests</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-4xl font-bold text-green-600 mb-2">
                                    {visitorStats.approved}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Approved</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-4xl font-bold text-red-600 mb-2">
                                    {visitorStats.rejected}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Rejected</div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <div className="text-4xl font-bold text-yellow-600 mb-2">
                                    {visitorStats.pending}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Pending</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};
export default StudentProfile;