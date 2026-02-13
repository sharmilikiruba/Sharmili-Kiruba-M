'use client';

import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle,
  Users,
  BarChart3,
  Bell,
  FileText,
  UserCheck,
  XCircle,
  Calendar
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WardenDashboard() {
  const router = useRouter();

  const stats = [
    {
      title: 'Pending Requests',
      count: 0,
      icon: ClipboardList,
      color: 'bg-yellow-100',
      iconColor: 'bg-yellow-500'
    },
    {
      title: 'Approved Today',
      count: 0,
      icon: CheckCircle,
      color: 'bg-green-100',
      iconColor: 'bg-green-500'
    },
    {
      title: 'Rejected Today',
      count: 0,
      icon: XCircle,
      color: 'bg-red-100',
      iconColor: 'bg-red-500'
    },
    {
      title: 'Active Visitors',
      count: 0,
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Monthly Visitors',
      count: 0,
      icon: Calendar,
      color: 'bg-white',
      iconColor: 'bg-gray-200',
      subtext: 'This month'
    }
  ];

  const pendingRequests: any[] = [];

  const activeVisitors: any[] = [];

  const weeklyOverview = [
    { label: 'Requests This Week', value: 0, color: 'text-gray-900' },
    { label: 'Approved', value: 0, color: 'text-green-600' },
    { label: 'Rejected', value: 0, color: 'text-red-600' },
    { label: 'Avg. Visit Duration', value: '0 hrs', color: 'text-gray-900' }
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Welcome!
        </h2>
        <p className="text-gray-600">Warden Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-2xl p-6 border border-gray-200`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-700 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-4xl font-bold text-gray-900">{stat.count}</p>
                {stat.subtext && (
                  <p className="text-xs text-gray-600 mt-1">{stat.subtext}</p>
                )}
              </div>
              <div className={`${stat.iconColor} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Weekly Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Weekly Overview</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {weeklyOverview.map((item, index) => (
            <div key={index} className="text-center">
              <p className={`text-5xl font-bold mb-2 ${item.color}`}>
                {item.value}
              </p>
              <p className="text-gray-700 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pending Requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Pending Requests</h3>
            <button
              onClick={() => router.push('/Warden/Pending_Request')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">{request.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{request.visitorName}</h4>
                        <p className="text-sm text-gray-600">
                          {request.studentName} • {request.room}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {request.priority}
                      </span>
                      <p className="text-xs text-gray-500">{request.date}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 italic">
                No pending requests.
              </div>
            )}
          </div>
        </div>

        {/* Active Visitors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Active Visitors</h3>
            <button
              onClick={() => router.push('/Warden/Active_Visitors')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {activeVisitors.length > 0 ? (
              activeVisitors.map((visitor) => (
                <div key={visitor.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{visitor.visitorName}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Visiting {visitor.visitingStudent} • {visitor.room}
                      </p>
                      <p className="text-xs text-gray-500">{visitor.since}</p>
                    </div>
                    <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      {visitor.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 italic">
                No active visitors.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}