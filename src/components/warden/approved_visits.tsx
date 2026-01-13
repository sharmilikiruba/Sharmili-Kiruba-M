"use client"
import React, { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Users,
  BarChart3,
  Search,
} from 'lucide-react'

const ApprovedVisitsPage = () => {
  const [activeMenu, setActiveMenu] = useState('approved')
  const [searchTerm, setSearchTerm] = useState('')


  const approvedRequests = [
    {
      id: 'VR002',
      student: 'Rahul Sharma',
      room: 'Room A-204',
      visitor: 'Kiran Sharma',
      relation: 'Mother',
      visitDate: 'Jan 04, 2026',
      approvedTime: '14:00 - 17:00',
      status: 'Approved',
    },
    {
      id: 'VR004',
      student: 'Amit Kumar',
      room: 'Room C-310',
      visitor: 'Dr. Mohan Kumar',
      relation: 'Father',
      visitDate: 'Jan 05, 2026',
      approvedTime: '08:00 - 12:00',
      status: 'Approved',
    },
  ]

  // 🔍 SEARCH LOGIC
  const filteredApprovedRequests = approvedRequests.filter((request) => {
    const term = searchTerm.toLowerCase()

    return (
      request.student.toLowerCase().includes(term) ||
      request.visitor.toLowerCase().includes(term)
    )
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Approved Visits
              </h1>
              <p className="text-gray-600">
                {filteredApprovedRequests.length} approved visitor requests
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Approved Requests
                  </h2>

                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search by student or visitor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Request ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Visitor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Visit Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Approved Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {filteredApprovedRequests.length > 0 ? (
                      filteredApprovedRequests.map((request) => (
                        <tr
                          key={request.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-semibold">
                            {request.id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium">
                              {request.student}
                            </div>
                            <div className="text-xs text-gray-500">
                              {request.room}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium">
                              {request.visitor}
                            </div>
                            <div className="text-xs text-gray-500">
                              {request.relation}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {request.visitDate}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {request.approvedTime}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-6 text-center text-sm text-gray-500"
                        >
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ApprovedVisitsPage
