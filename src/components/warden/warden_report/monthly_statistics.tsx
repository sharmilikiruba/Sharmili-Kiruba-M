'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, Calendar as CalendarIcon, PieChart, Download, RotateCcw, Clock } from 'lucide-react';

export default function MonthlyStatisticsReport() {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [startDate, setStartDate] = useState(new Date(2026, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2026, 0, 7));
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedPurpose, setSelectedPurpose] = useState('all');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [filterType, setFilterType] = useState('date');

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const reportTypes = [
    { id: 'daily', label: 'Daily Visitor Report', desc: 'Visitors for selected date', icon: '📅' },
    { id: 'weekly', label: 'Weekly Summary', desc: 'Aggregated weekly data', icon: '📊' },
    { id: 'monthly', label: 'Monthly Statistics', desc: 'Monthly visitor counts', icon: '📈' },
    { id: 'student', label: 'Student-wise History', desc: 'Visitor history per student', icon: '👤' },
    { id: 'emergency', label: 'Emergency Visit Log', desc: 'Emergency visit records', icon: '⚠️' },
    { id: 'rejected', label: 'Rejected Requests', desc: 'Rejected visit requests', icon: '✖️' }
  ];

  const students = [
    { value: 'all', label: 'All Students' },
    { value: 'std001', label: 'Rahul Kumar' },
    { value: 'std002', label: 'Priya Sharma' },
    { value: 'std003', label: 'Amit Patel' },
    { value: 'std004', label: 'Sneha Reddy' }
  ];

  const purposes = [
    { value: 'all', label: 'All Purposes' },
    { value: 'family', label: 'Family Visit' },
    { value: 'celebration', label: 'Celebration' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'other', label: 'Other' }
  ];

  const monthlyData = [
    { week: 'Week 1 (1-7)', total: 45, approved: 40, rejected: 3, emergency: 2 },
    { week: 'Week 2 (8-14)', total: 50, approved: 44, rejected: 4, emergency: 3 },
    { week: 'Week 3 (15-21)', total: 55, approved: 48, rejected: 5, emergency: 2 },
    { week: 'Week 4 (22-28)', total: 60, approved: 52, rejected: 6, emergency: 3 }
  ];

  const handleReset = () => {
    setStartDate(new Date(2026, 0, 1));
    setEndDate(new Date(2026, 0, 7));
    setSelectedStudent('all');
    setSelectedPurpose('all');
    setExportFormat('pdf');
    setFilterType('date');
  };

  const handleExport = () => {
    console.log(`Exporting as ${exportFormat}...`);
    // Export logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
            H
          </div>
          <div>
            <h1 className="font-bold">HVMS</h1>
            <p className="text-xs text-gray-400">Visitor Management</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            <span>📊</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            <span>⏳</span>
            <span>Pending Requests</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            <span>✓</span>
            <span>Approved Visits</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            <span>👥</span>
            <span>Active Visitors</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-600 transition">
            <span>📈</span>
            <span>Reports</span>
          </a>
        </nav>

        <div className="text-xs text-gray-500 mt-auto">
          © 2026 University HVMS
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 text-sm">Visitor activity and operational reports</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Dr. Suresh Kumar</span>
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded font-medium">WARDEN</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">🔔</span>
              <span className="absolute -mt-2 -mr-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">5</span>
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b px-8 py-4">
          <div className="grid grid-cols-5 gap-4">
            {/* Start Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(startDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(endDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Student */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Student</label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.value} value={student.value}>
                      {student.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Purpose */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Purpose</label>
              <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {purposes.map((purpose) => (
                    <SelectItem key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Export Format */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button
              variant={filterType === 'date' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('date')}
            >
              Filter by Date
            </Button>
            <Button
              variant={filterType === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('month')}
            >
              Filter by Month
            </Button>
            <Button
              variant={filterType === 'student' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('student')}
            >
              Filter by Student
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Report Types Sidebar */}
          <div className="w-72 bg-white border-r p-6 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <span>📄</span> Report Type
              </h2>
            </div>

            <div className="space-y-2">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    selectedReport === report.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{report.icon}</span>
                    <div>
                      <div className="font-medium">{report.label}</div>
                      <div className={`text-xs mt-1 ${
                        selectedReport === report.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {report.desc}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Report Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center justify-end mb-6">
              <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Visits</p>
                      <p className="text-4xl font-bold">187</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Peak Day</p>
                      <p className="text-3xl font-bold">15th</p>
                      <p className="text-lg font-semibold">Jan</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Peak Hours</p>
                      <p className="text-3xl font-bold">2-4 PM</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Unique Visitors</p>
                      <p className="text-4xl font-bold">142</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Statistics Table */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-6">Monthly Statistics - January 2026</h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Week</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Total Visitors</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Approved</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Rejected</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Emergency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyData.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 font-medium">{row.week}</td>
                          <td className="py-4 px-4 text-center">{row.total}</td>
                          <td className="py-4 px-4 text-center text-green-600 font-semibold">{row.approved}</td>
                          <td className="py-4 px-4 text-center text-red-600 font-semibold">{row.rejected}</td>
                          <td className="py-4 px-4 text-center text-orange-600 font-semibold">{row.emergency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}