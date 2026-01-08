'use client'

import { Search, Filter, Eye, LayoutDashboard, User, FileText, Clock, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
// Sample data
const requests = [
  {
    id: 'VR001',
    visitorName: 'Suresh Sharma',
    relation: 'Father',
    visitDate: 'Jan 06, 2026',
    purpose: 'Family Visit',
    status: 'Pending',
  },
  {
    id: 'VR002',
    visitorName: 'Kiran Sharma',
    relation: 'Mother',
    visitDate: 'Jan 04, 2026',
    purpose: 'Family Visit',
    status: 'Approved',
  },
  {
    id: 'VR005',
    visitorName: 'Unknown Person',
    relation: 'Friend',
    visitDate: 'Jan 02, 2026',
    purpose: 'Other',
    status: 'Rejected',
  },
]

export default function MyRequestsPage() {
  const router = useRouter()
  return (
    <div className="flex h-screen bg-gray-50">
    

      {/* Main Content */}
      <main className="flex-1 flex flex-col">

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Requests</h1>
              <p className="text-gray-600">View all your visitor requests</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Request History</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search requests..."
                        className="pl-10 w-64 h-10 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      All Status
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Relation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visit Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.visitorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.relation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.visitDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              request.status === 'Pending'
                                ? 'bg-yellow-500 text-white'
                                : request.status === 'Approved'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button 
                            onClick={() => router.push('/requestdetail')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}