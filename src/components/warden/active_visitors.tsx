"use client"

import { useState } from "react"
import { Search, Phone, Clock } from "lucide-react"

const activeVisitors = [
  {
    id: "AV001",
    visitorName: "Dr. Mohan Kumar",
    studentName: "Amit Kumar",
    room: "Room C-310",
    duration: "94h 30m",
    status: "Active",
  },
  {
    id: "AV002",
    visitorName: "Kiran Sharma",
    studentName: "Rahul Sharma",
    room: "Room A-204",
    duration: "2h 10m",
    status: "Active",
  },
]

export default function ActiveVisitorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // 🔍 Filter visitors by name
  const filteredVisitors = activeVisitors.filter(visitor =>
    visitor.visitorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="flex-1 p-8 bg-gray-50">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Active Visitors</h1>
        <p className="text-gray-600">
          {filteredVisitors.length} visitors currently inside
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Currently Active
          </h2>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Visitor Cards */}
        <div className="space-y-4">
          {filteredVisitors.length > 0 ? (
            filteredVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="border border-gray-200 rounded-lg p-5 max-w-md"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {visitor.visitorName.charAt(0)}
                    </div>

                    {/* Info */}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {visitor.visitorName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Visiting {visitor.studentName}
                      </p>
                      <p className="text-sm text-gray-500">{visitor.room}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    {visitor.status}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  Inside for {visitor.duration}
                </div>

                {/* Action Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Phone className="w-4 h-4" />
                  Call Student
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No visitors found.</p>
          )}
        </div>
      </div>
    </main>
  )
}
