// app/student/profile/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  semester: string;
  hostelName: string;
  roomNumber: string;
  hostelId: string;
  profileImage?: string;
}

interface VisitorStats {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}

const StudentProfile: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Partial<Student>>({});
  const [visitorStats] = useState<VisitorStats>({
    total: 5,
    approved: 3,
    rejected: 1,
    pending: 1
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockStudent: Student = {
      id: "21CS101",
      name: "Rahul Sharma",
      rollNumber: "21CS101",
      email: "rahul.sharma@university.edu",
      phone: "+91 98765 43210",
      department: "Computer Science",
      year: "3rd Year",
      semester: "5th Semester",
      hostelName: "Krishna Hostel",
      roomNumber: "A-204",
      hostelId: "H001"
    };
    
    setStudent(mockStudent);
    setEditedStudent(mockStudent);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedStudent(student || {});
  };

  const handleSave = async () => {
    if (student) {
      // Replace with actual API call
      const updated = { ...student, ...editedStudent };
      setStudent(updated);
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: keyof Student, value: string) => {
    setEditedStudent(prev => ({ ...prev, [field]: value }));
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
      <div className="flex">

        {/* Main Content */}
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
                    {student.name.split(' ').map(n => n[0]).join('')}
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
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedStudent.rollNumber || ''}
                              onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">{student.rollNumber}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Department
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedStudent.department || ''}
                              onChange={(e) => handleInputChange('department', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">{student.department}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Year / Semester
                          </label>
                          {isEditing ? (
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={editedStudent.year || ''}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                placeholder="Year"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                              <input
                                type="text"
                                value={editedStudent.semester || ''}
                                onChange={(e) => handleInputChange('semester', e.target.value)}
                                placeholder="Semester"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                            </div>
                          ) : (
                            <p className="text-gray-900 font-medium">
                              {student.year} / {student.semester}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hostel Details - Read Only */}
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
                            Room Number
                          </label>
                          <p className="text-gray-900 font-medium">{student.roomNumber}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Hostel ID
                          </label>
                          <p className="text-gray-900 font-medium">{student.hostelId}</p>
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
    </div>
  );
};

export default StudentProfile;