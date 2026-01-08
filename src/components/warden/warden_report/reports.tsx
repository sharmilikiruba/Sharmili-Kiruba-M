'use client';

import { useState } from 'react';
import { Calendar, TrendingUp, BarChart3, Users, AlertTriangle, Download, Filter, RotateCcw, LayoutDashboard, Clock, CheckCircle, UserCheck, XCircle } from 'lucide-react';

export default function ReportsPage() {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-01-07');
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedPurpose, setSelectedPurpose] = useState('all');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedReport, setSelectedReport] = useState('daily');

  const handleReset = () => {
    setStartDate('2026-01-01');
    setEndDate('2026-01-07');
    setSelectedStudent('all');
    setSelectedPurpose('all');
    setExportFormat('pdf');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">HVMS</h1>
              <p className="text-xs text-gray-400">Visitor Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors">
                <Clock size={20} />
                <span>Pending Requests</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors">
                <CheckCircle size={20} />
                <span>Approved Visits</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors">
                <UserCheck size={20} />
                <span>Active Visitors</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 transition-colors">
                <BarChart3 size={20} />
                <span>Reports</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-gray-500">© 2026 University HVMS</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">/warden/reports</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs relative">
                  <span>5</span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
                </div>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold">Dr. Suresh Kumar</p>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">WARDEN</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1">Visitor activity and operational reports</p>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Student Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Students</option>
                  <option value="rahul">Rahul Sharma</option>
                  <option value="priya">Priya Patel</option>
                </select>
              </div>

              {/* Purpose Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose
                </label>
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Purposes</option>
                  <option value="family">Family Visit</option>
                  <option value="birthday">Birthday Celebration</option>
                  <option value="official">Official</option>
                </select>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Filter size={18} />
                Apply
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Type Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="text-gray-700" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Report Type</h2>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedReport('daily')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedReport === 'daily'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={20} />
                    <div>
                      <div className="font-semibold">Daily Visitor Report</div>
                      <div className={`text-sm ${selectedReport === 'daily' ? 'text-blue-100' : 'text-gray-500'}`}>
                        Visitors for selected date
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedReport('weekly')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedReport === 'weekly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp size={20} />
                    <div>
                      <div className="font-semibold">Weekly Summary</div>
                      <div className={`text-sm ${selectedReport === 'weekly' ? 'text-blue-100' : 'text-gray-500'}`}>
                        Aggregated weekly data
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedReport('monthly')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedReport === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 size={20} />
                    <div>
                      <div className="font-semibold">Monthly Statistics</div>
                      <div className={`text-sm ${selectedReport === 'monthly' ? 'text-blue-100' : 'text-gray-500'}`}>
                        Monthly visitor counts
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedReport('student')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedReport === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users size={20} />
                    <div>
                      <div className="font-semibold">Student-wise History</div>
                      <div className={`text-sm ${selectedReport === 'student' ? 'text-blue-100' : 'text-gray-500'}`}>
                        Visitor history per student
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedReport('emergency')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedReport === 'emergency'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={20} />
                    <div>
                      <div className="font-semibold">Emergency Visit Log</div>
                      <div className={`text-sm ${selectedReport === 'emergency' ? 'text-blue-100' : 'text-gray-500'}`}>
                        Emergency visit records
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedReport('rejected')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedReport === 'rejected'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <XCircle size={20} />
                    <div>
                      <div className="font-semibold">Rejected Requests</div>
                      <div className={`text-sm ${selectedReport === 'rejected' ? 'text-blue-100' : 'text-gray-500'}`}>
                        Rejected visit requests
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Statistics and Details Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Export Button */}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  <Download size={18} />
                  Export PDF
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-900">Total Visitors</span>
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-blue-900">2</div>
                </div>

                <div className="bg-green-50 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-green-900">Approved</span>
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <Clock className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-green-900">0</div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-yellow-900">Pending</span>
                    <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <Clock className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-yellow-900">2</div>
                </div>

                <div className="bg-red-50 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-red-900">Emergency</span>
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-red-900">0</div>
                </div>
              </div>

              {/* Daily Visitor Details Table */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Daily Visitor Details - January 6, 2026
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Visitor Name
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Student
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Purpose
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Time
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Duration
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-900 font-medium">Suresh Sharma</td>
                        <td className="py-4 px-4 text-sm text-gray-700">Rahul Sharma</td>
                        <td className="py-4 px-4 text-sm text-gray-700">Family Visit</td>
                        <td className="py-4 px-4 text-sm text-gray-700">10:00</td>
                        <td className="py-4 px-4 text-sm text-gray-700">2 hours</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                            Pending
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-900 font-medium">Rekha Patel</td>
                        <td className="py-4 px-4 text-sm text-gray-700">Priya Patel</td>
                        <td className="py-4 px-4 text-sm text-gray-700">Birthday Celebration</td>
                        <td className="py-4 px-4 text-sm text-gray-700">16:00</td>
                        <td className="py-4 px-4 text-sm text-gray-700">4 hours</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                            Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}