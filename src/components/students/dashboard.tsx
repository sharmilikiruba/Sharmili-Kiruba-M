'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Clock,
  CheckCircle,
  XCircle,
  ClipboardList,
  Plus,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import apiClient from '@/lib/api-client'

export default function StudentDashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [studentId, setStudentId] = useState<number | null>(null)

  useEffect(() => {
    const fetchStudentAndDashboard = async () => {
      try {
        setIsLoading(true)
        // 1. Resolve studentId using profile fallback
        const profileRes = await apiClient.get(`/students/profile/${user?.id}`)
        if (profileRes.data.success) {
          const sid = profileRes.data.data.student.student_id
          setStudentId(sid)

          // 2. Fetch Dashboard Data
          const dashRes = await apiClient.get(`/visitors/dashboard/${sid}`)
          if (dashRes.data.success) {
            setDashboardData(dashRes.data.data)
          }
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user?.id) {
      fetchStudentAndDashboard()
    }
  }, [user])

  const stats = [
    {
      title: 'Pending Requests',
      value: dashboardData?.stats?.pending ?? 0,
      icon: Clock,
      bg: 'bg-yellow-50',
      iconBg: 'bg-yellow-500'
    },
    {
      title: 'Approved',
      value: dashboardData?.stats?.approved ?? 0,
      icon: CheckCircle,
      bg: 'bg-green-50',
      iconBg: 'bg-green-500'
    },
    {
      title: 'Rejected',
      value: dashboardData?.stats?.rejected ?? 0,
      icon: XCircle,
      bg: 'bg-red-50',
      iconBg: 'bg-red-500'
    },
    {
      title: 'Total Requests',
      value: dashboardData?.stats?.total ?? 0,
      icon: ClipboardList,
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-500';
      case 'Rejected': return 'bg-red-500';
      case 'Draft': return 'bg-gray-400';
      default: return 'bg-yellow-500';
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-gray-600 mt-1">
            Student Daily Visitor Overview
          </p>
        </div>
        <button
          onClick={() => router.push('/student/studReq')}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
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
            className={`p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.iconBg} p-3 rounded-xl shadow-inner`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900">Recent Request Activity</h2>
          <button
            onClick={() => router.push('/student/myrequest')}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            Manage All Requests
          </button>
        </div>

        {dashboardData?.recentRequests?.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {dashboardData.recentRequests.map((req: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {req.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{req.name}</p>
                    <p className="text-sm text-gray-500">{req.relation} • {req.visit_purpose}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(req.visit_date).toLocaleDateString()} at {req.visit_from_time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`${getStatusColor(req.request_status)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tight`}
                  >
                    {req.request_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <ClipboardList className="mx-auto h-12 w-12 opacity-20 mb-3" />
            <p className="italic">No recent visitor requests found.</p>
          </div>
        )}
      </div>

      {/* Quick info simplified or kept for design */}
      <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-bold mb-4 text-gray-900">Hostel Resident Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
            <p className="text-xs font-bold text-blue-600 uppercase">Visiting Hours</p>
            <p className="font-semibold mt-1 text-slate-800">8:00 AM - 8:00 PM</p>
          </div>

          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
            <p className="text-xs font-bold text-indigo-600 uppercase">Max Daily Visits</p>
            <p className="font-semibold mt-1 text-slate-800">3 per student</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase">Need Help?</p>
            <p className="font-semibold mt-1 text-slate-800">Contact Warden Office</p>
          </div>
        </div>
      </div>
    </div>
  )
}
