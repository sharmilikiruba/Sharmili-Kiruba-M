'use client'

import { useRouter } from 'next/navigation'
import {
  Clock,
  CheckCircle,
  XCircle,
  ClipboardList,
  Plus
} from 'lucide-react'

export default function StudentDashboardPage() {
  const router = useRouter()

  const stats = [
    {
      title: 'Pending Requests',
      value: 1,
      icon: Clock,
      bg: 'bg-yellow-50',
      iconBg: 'bg-yellow-500'
    },
    {
      title: 'Approved',
      value: 1,
      icon: CheckCircle,
      bg: 'bg-green-50',
      iconBg: 'bg-green-500'
    },
    {
      title: 'Rejected',
      value: 1,
      icon: XCircle,
      bg: 'bg-red-50',
      iconBg: 'bg-red-500'
    },
    {
      title: 'Total Requests',
      value: 3,
      icon: ClipboardList,
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500'
    }
  ]

  const recentRequests = [
    {
      name: 'Suresh Sharma',
      relation: 'Father · Family Visit',
      date: 'Jan 06, 2026 at 10:00',
      status: 'Pending',
      color: 'bg-yellow-500'
    },
    {
      name: 'Kiran Sharma',
      relation: 'Mother · Family Visit',
      date: 'Jan 04, 2026 at 14:00',
      status: 'Approved',
      color: 'bg-green-500'
    },
    {
      name: 'Unknown Person',
      relation: 'Friend · Other',
      date: 'Jan 02, 2026 at 22:00',
      status: 'Rejected',
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Rahul Sharma!</h1>
          <p className="text-gray-600 mt-1">
            Krishna Hostel · Room A-204
          </p>
        </div>

        <button
          onClick={() => router.push('/students/Newrequest')}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border ${stat.bg}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.iconBg} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="bg-white border rounded-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="font-bold text-lg">Recent Requests</h2>
          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
        </div>

        {recentRequests.map((req, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-6 border-b last:border-none"
          >
            <div>
              <p className="font-semibold">{req.name}</p>
              <p className="text-sm text-gray-600">{req.relation}</p>
              <p className="text-xs text-gray-400 mt-1">{req.date}</p>
            </div>
            <span
              className={`${req.color} text-white text-sm px-4 py-1 rounded-full`}
            >
              {req.status}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Info */}
      <div className="mt-10 bg-white border rounded-xl p-6">
        <h2 className="font-bold mb-4">Quick Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Visiting Hours</p>
            <p className="font-semibold mt-1">8:00 AM - 8:00 PM</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Max Visitors</p>
            <p className="font-semibold mt-1">3 per day</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Hostel Contact</p>
            <p className="font-semibold mt-1">+91 98765 11111</p>
          </div>
        </div>
      </div>
    </div>
  )
}
