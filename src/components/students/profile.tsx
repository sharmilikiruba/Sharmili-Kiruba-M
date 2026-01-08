'use client'
import React, { useState } from 'react'
import {
  Mail,
  Phone,
  BookOpen,
  Building2,
} from 'lucide-react'

const StudentProfilePage = () => {
  const [activeMenu] = useState('profile')

  const studentInfo = {
    name: 'Rahul Sharma',
    rollNumber: '21CS101',
    email: 'rahul.sharma@university.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science',
    yearSemester: '3rd Year / 5th Semester',
    hostelName: 'Krishna Hostel',
    roomNumber: 'A-204',
    hostelId: 'H001',
    profileImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  }

  const statistics = [
    { label: 'Total Requests', value: 5, color: 'text-gray-600' },
    { label: 'Approved', value: 3, color: 'text-green-600' },
    { label: 'Rejected', value: 1, color: 'text-red-600' },
    { label: 'Pending', value: 1, color: 'text-yellow-600' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          {activeMenu === 'profile' && (
            <div>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  My Profile
                </h2>
                <p className="text-gray-600">
                  View and manage your profile information
                </p>
              </div>

              {/* Profile Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={studentInfo.profileImage}
                      alt={studentInfo.name}
                      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
                    />

                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {studentInfo.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {studentInfo.rollNumber}
                    </p>

                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                      Student
                    </span>

                    <div className="w-full space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700 break-all">
                          {studentInfo.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {studentInfo.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Info */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Student Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Academic */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <h4 className="text-lg font-semibold">
                          Academic Details
                        </h4>
                      </div>

                      <p className="mb-2">
                        <span className="text-gray-600">Department:</span>{' '}
                        <strong>{studentInfo.department}</strong>
                      </p>
                      <p>
                        <span className="text-gray-600">Year / Semester:</span>{' '}
                        <strong>{studentInfo.yearSemester}</strong>
                      </p>
                    </div>

                    {/* Hostel */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <h4 className="text-lg font-semibold">
                          Hostel Details
                        </h4>
                      </div>

                      <p className="mb-2">
                        <span className="text-gray-600">Hostel:</span>{' '}
                        <strong>{studentInfo.hostelName}</strong>
                      </p>
                      <p className="mb-2">
                        <span className="text-gray-600">Room:</span>{' '}
                        <strong>{studentInfo.roomNumber}</strong>
                      </p>
                      <p>
                        <span className="text-gray-600">Hostel ID:</span>{' '}
                        <strong>{studentInfo.hostelId}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visitor Statistics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statistics.map((stat, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-6 text-center border border-gray-200"
                    >
                      <p className={`text-5xl font-bold mb-2 ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-gray-700 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default StudentProfilePage
