'use client';

import { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  BarChart3,
  Users,
  AlertTriangle,
  XCircle,
  Download,
  Filter as FilterIcon,
  RotateCcw,
  FileText
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Modular Imports
import { ReportType, FilterState } from './types';
import { ReportBtn } from './ReportComponents';
import { DailyVisitorReport } from './DailyVisitorReport';
import { WeeklySummaryReport } from './WeeklySummaryReport';
import { MonthlyStatisticsReport } from './MonthlyStatisticsReport';
import { StudentWiseHistoryReport } from './StudentWiseHistoryReport';
import { EmergencyVisitLogReport } from './EmergencyVisitLogReport';
import { RejectedRequestsReport } from './RejectedRequestsReport';

const students = ['All Students', 'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh'];
const purposes = ['All Purposes', 'Family Visit', 'Birthday Celebration', 'Medical Emergency', 'Other'];

// --- Centralized MOCK DATA ---
const MOCK_DATA = {
  'daily-visitor': [
    { visitorName: 'Suresh Sharma', student: 'Rahul Sharma', purpose: 'Family Visit', time: '10:00', duration: '2 hours', status: 'Pending', date: '2026-01-06' },
    { visitorName: 'Rekha Patel', student: 'Priya Patel', purpose: 'Birthday Celebration', time: '16:00', duration: '4 hours', status: 'Pending', date: '2026-01-06' },
    { visitorName: 'Mohan Lal', student: 'Amit Kumar', purpose: 'Medical Emergency', time: '11:00', duration: '1 hour', status: 'Approved', date: '2026-01-06' }
  ],
  'weekly-summary': [
    { day: 'Monday', total: 8, approved: 7, rejected: 0, pending: 0, date: '2026-01-05' },
    { day: 'Tuesday', total: 7, approved: 6, rejected: 1, pending: 1, date: '2026-01-06' },
    { day: 'Wednesday', total: 6, approved: 5, rejected: 0, pending: 2, date: '2026-01-07' },
    { day: 'Thursday', total: 5, approved: 4, rejected: 1, pending: 0, date: '2026-01-08' },
    { day: 'Friday', total: 9, approved: 8, rejected: 1, pending: 0, date: '2026-01-09' },
    { day: 'Saturday', total: 12, approved: 10, rejected: 1, pending: 1, date: '2026-01-10' },
    { day: 'Sunday', total: 14, approved: 12, rejected: 2, pending: 0, date: '2026-01-11' }
  ],
  'monthly-statistics': [
    { week: 'Week 1 (1-7)', total: 45, approved: 40, rejected: 3, emergency: 2, month: '2026-01' },
    { week: 'Week 2 (8-14)', total: 50, approved: 44, rejected: 4, emergency: 3, month: '2026-01' }
  ],
  'student-wise': [
    { studentName: 'Rahul Sharma', total: 12, unique: 4, frequency: '3/month', lastVisit: '2026-01-04' },
    { studentName: 'Priya Patel', total: 8, unique: 3, frequency: '2/month', lastVisit: '2026-01-03' }
  ],
  'emergency-visit': [
    { date: '2026-01-05', visitor: 'Dr. Mohan Kumar', student: 'Amit Kumar', purpose: 'Medical Emergency', responseTime: '15 min', status: 'Approved' }
  ],
  'rejected-requests': [
    { date: '2026-01-02', student: 'Rahul Sharma', visitor: 'Unknown Person', purpose: 'Other', reason: 'Request denied. Late hours and too many visitors.', status: 'Rejected' },
    { date: '2026-01-06', student: 'Sneha Singh', visitor: 'Salesperson', purpose: 'Other', reason: 'Not allowed.', status: 'Rejected' }
  ]
};

export default function WardenReports() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('daily-visitor');
  const [filters, setFilters] = useState<FilterState>({
    startDate: '2026-01-01',
    endDate: '2026-07-01',
    student: 'All Students',
    purpose: 'All Purposes',
    exportFormat: 'PDF'
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      startDate: '2026-01-01',
      endDate: '2026-07-01',
      student: 'All Students',
      purpose: 'All Purposes',
      exportFormat: 'PDF'
    });
  };

  const getFilteredData = (reportType: ReportType) => {
    const data = MOCK_DATA[reportType];

    return (data as any[]).filter(item => {
      // Date Filter
      const itemDate = item.date || item.lastVisit;
      if (itemDate) {
        if (itemDate < filters.startDate || itemDate > filters.endDate) return false;
      }

      // Student Filter
      const itemStudent = item.student || item.studentName;
      if (filters.student !== 'All Students' && itemStudent && itemStudent !== filters.student) return false;

      // Purpose Filter
      if (filters.purpose !== 'All Purposes' && item.purpose && item.purpose !== filters.purpose) return false;

      return true;
    });
  };

  const currentData = getFilteredData(selectedReport);

  const handleExport = () => {
    const reportNames = {
      'daily-visitor': 'Daily Visitor Report',
      'weekly-summary': 'Weekly Summary',
      'monthly-statistics': 'Monthly Statistics',
      'student-wise': 'Student-wise History',
      'emergency-visit': 'Emergency Visit Log',
      'rejected-requests': 'Rejected Requests'
    };

    const reportName = reportNames[selectedReport];
    const exportData = currentData;

    if (exportData.length === 0) {
      alert('No data matches the current filters to export.');
      return;
    }

    if (filters.exportFormat === 'PDF') {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(reportName, 14, 22);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`Filters: ${filters.startDate} to ${filters.endDate} | Student: ${filters.student} | Purpose: ${filters.purpose}`, 14, 36);

      const headers = Object.keys(exportData[0]).map(key => key.charAt(0).toUpperCase() + key.slice(1));
      const rows = exportData.map(item => Object.values(item));

      autoTable(doc, {
        head: [headers],
        body: rows as any,
        startY: 42,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      doc.save(`${reportName.replace(/\s/g, '_')}_${filters.startDate}.pdf`);
    } else if (filters.exportFormat === 'Excel') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      XLSX.writeFile(wb, `${reportName.replace(/\s/g, '_')}_${filters.startDate}.xlsx`);
    } else if (filters.exportFormat === 'CSV') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportName.replace(/\s/g, '_')}_${filters.startDate}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const renderReportContent = () => {
    if (currentData.length === 0) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          <FilterIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Records Found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </div>
      );
    }

    switch (selectedReport) {
      case 'daily-visitor':
        return <DailyVisitorReport data={currentData} />;
      case 'weekly-summary':
        return <WeeklySummaryReport data={currentData} />;
      case 'monthly-statistics':
        return <MonthlyStatisticsReport data={currentData} />;
      case 'student-wise':
        return <StudentWiseHistoryReport data={currentData} />;
      case 'emergency-visit':
        return <EmergencyVisitLogReport data={currentData} />;
      case 'rejected-requests':
        return <RejectedRequestsReport data={currentData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Visitor activity and operational reports</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
              <select
                value={filters.student}
                onChange={(e) => handleFilterChange('student', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {students.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
              <select
                value={filters.purpose}
                onChange={(e) => handleFilterChange('purpose', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {purposes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
              <select
                value={filters.exportFormat}
                onChange={(e) => handleFilterChange('exportFormat', e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <FilterIcon className="w-4 h-4" />
              Apply
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Report Type</h2>
              </div>
              <div className="space-y-2">
                <ReportBtn icon={<Calendar className="w-5 h-5" />} title="Daily Visitor Report" subtitle="Visitors for selected date" active={selectedReport === 'daily-visitor'} onClick={() => setSelectedReport('daily-visitor')} />
                <ReportBtn icon={<TrendingUp className="w-5 h-5" />} title="Weekly Summary" subtitle="Aggregated weekly data" active={selectedReport === 'weekly-summary'} onClick={() => setSelectedReport('weekly-summary')} />
                <ReportBtn icon={<BarChart3 className="w-5 h-5" />} title="Monthly Statistics" subtitle="Monthly visitor counts" active={selectedReport === 'monthly-statistics'} onClick={() => setSelectedReport('monthly-statistics')} />
                <ReportBtn icon={<Users className="w-5 h-5" />} title="Student-wise History" subtitle="Visitor history per student" active={selectedReport === 'student-wise'} onClick={() => setSelectedReport('student-wise')} />
                <ReportBtn icon={<AlertTriangle className="w-5 h-5" />} title="Emergency Visit Log" subtitle="Emergency visit records" active={selectedReport === 'emergency-visit'} onClick={() => setSelectedReport('emergency-visit')} />
                <ReportBtn icon={<XCircle className="w-5 h-5" />} title="Rejected Requests" subtitle="Rejected visit requests" active={selectedReport === 'rejected-requests'} onClick={() => setSelectedReport('rejected-requests')} />
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-end mb-6">
              <button onClick={handleExport} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg">
                <Download className="w-5 h-5" />
                Export {filters.exportFormat}
              </button>
            </div>
            {renderReportContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
