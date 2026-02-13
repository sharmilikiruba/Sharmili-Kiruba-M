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
import { ReportType, VisitorStat, StudentStat, HostelStat, ExportFormat } from './types';
import { ReportCard } from './ReportComponents';
import { VisitorStatistics } from './VisitorStatistics';
import { StudentWise } from './StudentWise';
import { HostelWise } from './HostelWise';

// --- Centralized Mock Data ---
const REPORTS_DATA: {
  visitorStats: VisitorStat[];
  studentStats: StudentStat[];
  hostelStats: HostelStat[];
} = {
  visitorStats: [],
  studentStats: [],
  hostelStats: []
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

  const getFilteredStudentStats = () => {
    let data = REPORTS_DATA.studentStats;
    if (dateFrom) data = data.filter(d => d.lastVisit >= dateFrom);
    if (dateTo) data = data.filter(d => d.lastVisit <= dateTo);
    return data;
  };
  const getFilteredHostelStats = () => REPORTS_DATA.hostelStats;

  const handleExport = (format: ExportFormat) => {
    let data: any[] = [];
    let title = '';

    switch (selectedReport) {
      case 'visitor-statistics':
        data = getFilteredVisitorStats();
        title = 'Visitor Statistics';
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
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {selectedReport === 'visitor-statistics' && <VisitorStatistics data={getFilteredVisitorStats()} />}
            {selectedReport === 'student-wise' && <StudentWise data={getFilteredStudentStats()} />}
            {selectedReport === 'hostel-wise' && <HostelWise data={getFilteredHostelStats()} />}
          </main>
        </div>
      </div>
    </div>
  );
}