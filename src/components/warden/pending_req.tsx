'use client'

import { Check, X, Eye, Search } from 'lucide-react'

export default function PendingRequestsPage() {
  const requests = [
    {
      id: 'VR001',
      studentName: 'Rahul Sharma',
      room: 'Room A-204',
      visitorName: 'Suresh Sharma',
      relation: 'Father',
      date: 'Jan 06, 2026',
      time: '10:00',
      purpose: 'Family Visit',
      priority: 'Normal',
    },
  ]

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pending Requests</h1>
        <p className="text-gray-500 mt-1">
          {requests.length} requests awaiting your decision
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Visitor Requests
          </h2>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Request ID</th>
                <th className="text-left px-6 py-3 font-medium">Student</th>
                <th className="text-left px-6 py-3 font-medium">Visitor</th>
                <th className="text-left px-6 py-3 font-medium">Visit Date</th>
                <th className="text-left px-6 py-3 font-medium">Purpose</th>
                <th className="text-left px-6 py-3 font-medium">Priority</th>
                <th className="text-center px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {req.id}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {req.studentName}
                    </p>
                    <p className="text-xs text-gray-500">{req.room}</p>
                  </td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                      alt="visitor"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {req.visitorName}
                      </p>
                      <p className="text-xs text-gray-500">{req.relation}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-gray-900">{req.date}</p>
                    <p className="text-xs text-gray-500">{req.time}</p>
                  </td>

                  <td className="px-6 py-4">{req.purpose}</td>

                  <td className="px-6 py-4">
                    <span className="text-gray-700">{req.priority}</span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button className="text-green-600 hover:text-green-700">
                        <Check className="w-5 h-5" />
                      </button>

                      <button className="text-red-600 hover:text-red-700">
                        <X className="w-5 h-5" />
                      </button>

                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
