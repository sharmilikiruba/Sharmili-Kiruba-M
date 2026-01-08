'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, Calendar as CalendarIcon, PieChart, Download, RotateCcw } from 'lucide-react';

export default function WardenReports() {
  const [selectedReport, setSelectedReport] = useState('weekly');
  const [startDate, setStartDate] = useState(new Date(2026, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2026, 0, 7));

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedPurpose, setSelectedPurpose] = useState('all');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [filterType, setFilterType] = useState('date');

  const reportTypes = [
    { id: 'daily', label: 'Daily Visitor Report', desc: 'Visitors for selected date', icon: Calendar },
    { id: 'weekly', label: 'Weekly Summary', desc: 'Aggregated weekly data', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly Statistics', desc: 'Monthly visitor counts', icon: PieChart },
    { id: 'student', label: 'Student-wise History', desc: 'Visitor history per student', icon: Users },
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

  const weeklyData = [
    { day: 'Monday', total: 8, approved: 7, rejected: 0, pending: 0 },
    { day: 'Tuesday', total: 7, approved: 6, rejected: 1, pending: 1 },
    { day: 'Wednesday', total: 6, approved: 5, rejected: 0, pending: 2 },
    { day: 'Thursday', total: 5, approved: 4, rejected: 1, pending: 0 },
    { day: 'Friday', total: 4, approved: 3, rejected: 0, pending: 1 },
    { day: 'Saturday', total: 3, approved: 2, rejected: 1, pending: 2 },
    { day: 'Sunday', total: 2, approved: 1, rejected: 0, pending: 0 }
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
     
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 text-sm">Visitor activity and operational reports</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Dr. Suresh Kumar</span>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              DS
            </div>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">WARDEN</span>
          </div>
        </div>

        <div className="flex">
          {/* Report Types Sidebar */}
          <div className="w-80 bg-white border-r p-6">
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
                    <span className="text-xl">{typeof report.icon === 'string' ? report.icon : '📊'}</span>
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
          <div className="flex-1 p-8">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-5 gap-4 mb-4">
                  {/* Start Date */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <Calendar className="mr-2 h-4 w-4" />
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
                          <Calendar className="mr-2 h-4 w-4" />
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

                {/* Filter Type and Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex gap-2">
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
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Visits</p>
                      <p className="text-4xl font-bold">45</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Avg Daily</p>
                      <p className="text-4xl font-bold">6.4</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Peak Day</p>
                      <p className="text-4xl font-bold">Monday</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
                      <p className="text-4xl font-bold">89%</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <PieChart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Summary Table */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Weekly Summary - Jan 1-7, 2026</h3>
                  <Button onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export {exportFormat.toUpperCase()}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Day</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Total Visitors</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Approved</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Rejected</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Pending</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyData.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 font-medium">{row.day}</td>
                          <td className="py-4 px-4 text-center">{row.total}</td>
                          <td className="py-4 px-4 text-center text-green-600 font-semibold">{row.approved}</td>
                          <td className="py-4 px-4 text-center text-red-600 font-semibold">{row.rejected}</td>
                          <td className="py-4 px-4 text-center text-yellow-600 font-semibold">{row.pending}</td>
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