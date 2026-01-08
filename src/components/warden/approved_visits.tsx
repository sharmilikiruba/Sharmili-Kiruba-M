import React, { useState } from 'react';
import { LayoutDashboard, FileText, CheckCircle, Users, BarChart3, Search, Eye } from 'lucide-react';

const ApprovedVisitsPage = () => {
  const [activeMenu, setActiveMenu] = useState('approved');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pending', label: 'Pending Requests', icon: FileText },
    { id: 'approved', label: 'Approved Visits', icon: CheckCircle },
    { id: 'active', label: 'Active Visitors', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const approvedRequests = [
    {
      id: 'VR002',
      student: 'Rahul Sharma',
      room: 'Room A-204',
      visitor: 'Kiran Sharma',
      relation: 'Mother',
      visitDate: 'Jan 04, 2026',
      approvedTime: '14:00 - 17:00',
      status: 'Approved'
    },
    {
      id: 'VR004',
      student: 'Amit Kumar',
      room: 'Room C-310',
      visitor: 'Dr. Mohan Kumar',
      relation: 'Father',
      visitDate: 'Jan 05, 2026',
      approvedTime: '08:00 - 12:00',
      status: 'Approved'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Approved Visits</h1>
              <p className="text-gray-600">2 approved visitor requests</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Table Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Approved Requests</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Request ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Visitor</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Visit Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Approved Time</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {approvedRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">{request.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{request.student}</div>
                            <div className="text-xs text-gray-500">{request.room}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{request.visitor}</div>
                            <div className="text-xs text-gray-500">{request.relation}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{request.visitDate}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{request.approvedTime}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="flex items-center gap-2 text-sm text-gray-900 hover:text-blue-600 transition-colors">
                            <Eye size={18} />
                            <span className="font-medium">View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApprovedVisitsPage;