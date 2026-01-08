'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Calendar as CalendarComp, Clock, TrendingUp, Download, RotateCcw, Filter } from 'lucide-react';

export default function EmergencyVisitLog() {
  const [selectedReport, setSelectedReport] = useState('emergency');
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

  const emergencyData = [
    { 
      date: '2026-01-05', 
      visitor: 'Dr. Mohan Kumar', 
      student: 'Amit Kumar', 
      purpose: 'Medical Emergency', 
      responseTime: '15 min', 
      status: 'Approved' 
    }
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
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
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
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">5</span>
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b px-8 py-4">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarComp className="mr-2 h-4 w-4" />
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

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarComp className="mr-2 h-4 w-4" />
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

          <div className="flex items-center justify-between mt-4">
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
            <div className="flex gap-2">
              <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
                <Filter className="w-4 h-4 mr-2" />
                Apply
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
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
              <Card className="bg-red-50 border-red-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Emergency</p>
                      <p className="text-5xl font-bold">1</p>
                    </div>
                    <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">This Week</p>
                      <p className="text-5xl font-bold">1</p>
                    </div>
                    <div className="w-14 h-14 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <CalendarComp className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Avg Response</p>
                      <p className="text-4xl font-bold">15 min</p>
                    </div>
                    <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Resolved</p>
                      <p className="text-4xl font-bold">100%</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Visit Log Table */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-6">Emergency Visit Log</h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Visitor</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Purpose</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Response Time</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emergencyData.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">{row.date}</td>
                          <td className="py-4 px-4">{row.visitor}</td>
                          <td className="py-4 px-4">{row.student}</td>
                          <td className="py-4 px-4">
                            <span className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              {row.purpose}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">{row.responseTime}</td>
                          <td className="py-4 px-4 text-center">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              {row.status}
                            </span>
                          </td>
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