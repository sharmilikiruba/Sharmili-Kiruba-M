'use client'

import { LayoutDashboard, User, FileText, Clock, Bell, Calendar, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

export default function RequestDetailsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visitor Information Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Visitor Information</h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                      Pending
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Suresh Sharma</h3>
                      <p className="text-sm text-gray-600">Father</p>
                      <p className="text-sm text-gray-600">+91 98888 12345</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">ID Proof Type</p>
                      <p className="text-sm font-medium text-gray-900">Aadhar Card</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">ID Proof Number</p>
                      <p className="text-sm font-medium text-gray-900">XXXX-XXXX-1234</p>
                    </div>
                  </div>
                </div>

                {/* Visit Details Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Visit Details</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Visit Date</p>
                          <p className="text-sm font-medium text-gray-900">January 06, 2026</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Visit Time</p>
                          <p className="text-sm font-medium text-gray-900">10:00</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Meeting Location</p>
                          <p className="text-sm font-medium text-gray-900">Hostel Common Room</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Accompanying Persons</p>
                          <p className="text-sm font-medium text-gray-900">1</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Purpose of Visit</p>
                      <p className="text-sm font-medium text-gray-900">Family Visit</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Expected Duration</p>
                      <p className="text-sm font-medium text-gray-900">2 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Timeline & Student Details */}
              <div className="space-y-6">
                {/* Request Timeline Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Timeline</h2>

                  <div className="space-y-6">
                    {/* Timeline Item 1 - Completed */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                      </div>
                      <div className="pb-6">
                        <p className="text-sm font-medium text-gray-900">Request Submitted</p>
                        <p className="text-xs text-gray-500">Jan 05, 2026 14:30</p>
                      </div>
                    </div>

                    {/* Timeline Item 2 - In Progress */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                      </div>
                      <div className="pb-6">
                        <p className="text-sm font-medium text-gray-900">Pending Approval</p>
                        <p className="text-xs text-gray-500">Waiting...</p>
                      </div>
                    </div>

                    {/* Timeline Item 3 - Pending */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Visit Completed</p>
                        <p className="text-xs text-gray-500">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Details Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Student Details</h2>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="text-sm font-medium text-gray-900">Rahul Sharma</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Room</p>
                      <p className="text-sm font-medium text-gray-900">A-204</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Hostel</p>
                      <p className="text-sm font-medium text-gray-900">Krishna Hostel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}