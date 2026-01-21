'use client';

import { useState } from 'react';
import {
  Users,
  Shield,
  UserCheck,
  Building2,
  Filter,
  Calendar,
  Download,
  FileText,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Modular Imports
import { ReportType, VisitorStat, WardenPerf, SecurityEvent, StudentStat, HostelStat, ExportFormat } from './types';
import { ReportCard } from './ReportComponents';
import { VisitorStatistics } from './VisitorStatistics';
import { WardenPerformance } from './WardenPerformance';
import { SecurityReport } from './SecurityReport';
import { StudentWise } from './StudentWise';
import { HostelWise } from './HostelWise';
import { CustomReport } from './CustomReport';

// --- Centralized Mock Data ---
const REPORTS_DATA: {
  visitorStats: VisitorStat[];
  wardenPerf: WardenPerf[];
  securityEvents: SecurityEvent[];
  studentStats: StudentStat[];
  hostelStats: HostelStat[];
} = {
  visitorStats: [
    { date: '2026-01-04', visitor: 'Kiran Sharma', student: 'Rahul Sharma', purpose: 'Family Visit', entryTime: '14:00', exitTime: '17:30', duration: '3 hours', status: 'Completed' },
    { date: '2026-01-05', visitor: 'Dr. Mohan Kumar', student: 'Amit Kumar', purpose: 'Medical Emergency', entryTime: '08:00', exitTime: '17:30', duration: '1 hour', status: 'Completed' },
    { date: '2026-01-06', visitor: 'Sunita Devi', student: 'Priya Patel', purpose: 'Parent Meeting', entryTime: '15:30', exitTime: '18:00', duration: '2h 30m', status: 'Completed' },
  ],
  wardenPerf: [
    { name: 'Dr. Suresh Kumar', hostel: 'Krishna Hostel', totalRequests: 156, approved: 142, rejected: 14, approvalRate: '91%', avgResponseTime: '25 min' },
    { name: 'Dr. Meera Singh', hostel: 'Saraswati Hostel', totalRequests: 134, approved: 118, rejected: 16, approvalRate: '88%', avgResponseTime: '18 min' },
    { name: 'Dr. Anil Sharma', hostel: 'Vivekananda Hostel', totalRequests: 98, approved: 89, rejected: 9, approvalRate: '91%', avgResponseTime: '32 min' },
  ],
  securityEvents: [
    { timestamp: 'Jan 06, 02:00 PM', visitor: 'Dr. Mohan Kumar', student: 'Amit Kumar', eventType: 'Entry', status: 'Normal', remarks: 'Verified and allowed' },
    { timestamp: 'Jan 05, 10:15 PM', visitor: 'Kiran Sharma', student: 'Rahul Sharma', eventType: 'Exit', status: 'Normal', remarks: 'On time exit' },
    { timestamp: 'Jan 06, 01:00 AM', visitor: 'Raj Malhotra', student: 'Vikash Gupta', eventType: 'Overstay', status: 'Warning', remarks: 'Exceeded by 45 min' },
    { timestamp: 'Jan 04, 07:30 PM', visitor: 'Unknown Person', student: 'N/A', eventType: 'Denied', status: 'Alert', remarks: 'No valid pass' },
    { timestamp: 'Jan 04, 03:45 PM', visitor: 'Sunita Devi', student: 'Priya Patel', eventType: 'Manual Entry', status: 'Warning', remarks: 'System bypass - emergency' },
  ],
  studentStats: [
    { studentId: 'STU001', studentName: 'Rahul Sharma', totalVisitors: 12, uniqueVisitors: 4, frequency: '3/month', lastVisit: '2026-01-04' },
    { studentId: 'STU002', studentName: 'Priya Patel', totalVisitors: 8, uniqueVisitors: 3, frequency: '2/month', lastVisit: '2026-01-03' },
    { studentId: 'STU003', studentName: 'Amit Kumar', totalVisitors: 5, uniqueVisitors: 2, frequency: '1.5/month', lastVisit: '2026-01-05' },
  ],
  hostelStats: [
    { name: 'Krishna Hostel', totalVisitors: 456, peakTime: '14:00-16:00', compliance: '94%' },
    { name: 'Saraswati Hostel', totalVisitors: 389, peakTime: '15:00-17:00', compliance: '97%' },
    { name: 'Vivekananda Hostel', totalVisitors: 278, peakTime: '14:00-15:00', compliance: '92%' },
  ]
};

// --- Export Helper ---
const exportData = (data: any[], format: ExportFormat, title: string) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  if (format === 'csv') {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.csv`;
    link.click();
  } else if (format === 'excel') {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.xlsx`);
  } else if (format === 'pdf') {
    const doc = new jsPDF();
    doc.text(title, 14, 22);
    const headers = Object.keys(data[0]).map(key =>
      key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    );
    const rows = data.map(item => Object.values(item));
    autoTable(doc, {
      head: [headers],
      body: rows as any[],
      startY: 30,
    });
    doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`);
  }
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('visitor-statistics');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Filters
  const getFilteredVisitorStats = () => {
    let data = REPORTS_DATA.visitorStats;
    if (dateFrom) data = data.filter(d => d.date >= dateFrom);
    if (dateTo) data = data.filter(d => d.date <= dateTo);
    return data;
  };

  const getFilteredSecurityEvents = () => REPORTS_DATA.securityEvents;
  const getFilteredStudentStats = () => {
    let data = REPORTS_DATA.studentStats;
    if (dateFrom) data = data.filter(d => d.lastVisit >= dateFrom);
    if (dateTo) data = data.filter(d => d.lastVisit <= dateTo);
    return data;
  };
  const getFilteredWardenPerf = () => REPORTS_DATA.wardenPerf;
  const getFilteredHostelStats = () => REPORTS_DATA.hostelStats;

  const handleExport = (format: ExportFormat) => {
    let data: any[] = [];
    let title = '';

    switch (selectedReport) {
      case 'visitor-statistics':
        data = getFilteredVisitorStats();
        title = 'Visitor Statistics';
        break;
      case 'warden-performance':
        data = getFilteredWardenPerf();
        title = 'Warden Performance';
        break;
      case 'security-report':
        data = getFilteredSecurityEvents();
        title = 'Security Report';
        break;
      case 'student-wise':
        data = getFilteredStudentStats();
        title = 'Student Wise Report';
        break;
      case 'hostel-wise':
        data = getFilteredHostelStats();
        title = 'Hostel Wise Report';
        break;
      default:
        return;
    }
    exportData(data, format, title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[1600px] mx-auto p-8">
        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg mb-4">Select Report</h3>
                <div className="space-y-2">
                  <ReportCard
                    icon={<Users className="w-5 h-5" />}
                    title="Visitor Statistics"
                    isActive={selectedReport === 'visitor-statistics'}
                    onClick={() => setSelectedReport('visitor-statistics')}
                  />
                  <ReportCard
                    icon={<UserCheck className="w-5 h-5" />}
                    title="Warden Performance"
                    isActive={selectedReport === 'warden-performance'}
                    onClick={() => setSelectedReport('warden-performance')}
                  />
                  <ReportCard
                    icon={<Shield className="w-5 h-5" />}
                    title="Security Report"
                    isActive={selectedReport === 'security-report'}
                    onClick={() => setSelectedReport('security-report')}
                  />
                  <ReportCard
                    icon={<Users className="w-5 h-5" />}
                    title="Student-wise"
                    isActive={selectedReport === 'student-wise'}
                    onClick={() => setSelectedReport('student-wise')}
                  />
                  <ReportCard
                    icon={<Building2 className="w-5 h-5" />}
                    title="Hostel-wise"
                    isActive={selectedReport === 'hostel-wise'}
                    onClick={() => setSelectedReport('hostel-wise')}
                  />
                  <ReportCard
                    icon={<Filter className="w-5 h-5" />}
                    title="Custom Report"
                    isActive={selectedReport === 'custom-report'}
                    onClick={() => setSelectedReport('custom-report')}
                  />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-slate-800 mb-4">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Date Range</label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {selectedReport !== 'custom-report' && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-medium text-slate-600 mb-3">Export</h4>
                    <div className="space-y-2">
                      <button onClick={() => handleExport('pdf')} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <FileText className="w-4 h-4" /> PDF
                      </button>
                      <button onClick={() => handleExport('excel')} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download className="w-4 h-4" /> Excel
                      </button>
                      <button onClick={() => handleExport('csv')} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download className="w-4 h-4" /> CSV
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {selectedReport === 'visitor-statistics' && <VisitorStatistics data={getFilteredVisitorStats()} />}
            {selectedReport === 'warden-performance' && <WardenPerformance data={getFilteredWardenPerf()} />}
            {selectedReport === 'security-report' && <SecurityReport data={getFilteredSecurityEvents()} />}
            {selectedReport === 'student-wise' && <StudentWise data={getFilteredStudentStats()} />}
            {selectedReport === 'hostel-wise' && <HostelWise data={getFilteredHostelStats()} />}
            {selectedReport === 'custom-report' && <CustomReport visitorData={REPORTS_DATA.visitorStats} />}
          </main>
        </div>
      </div>
    </div>
  );
}