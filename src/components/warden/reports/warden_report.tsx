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
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';
import { useEffect, useMemo, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

// Modular Imports
import { ReportType, FilterState } from './types';
import { ReportBtn } from './ReportComponents';
import { DailyVisitorReport } from './DailyVisitorReport';
import { WeeklySummaryReport } from './WeeklySummaryReport';
import { MonthlyStatisticsReport } from './MonthlyStatisticsReport';
import { StudentWiseHistoryReport } from './StudentWiseHistoryReport';
import { EmergencyVisitLogReport } from './EmergencyVisitLogReport';
import { RejectedRequestsReport } from './RejectedRequestsReport';

const purposes = ['All Purposes', 'Family Visit', 'Birthday Celebration', 'Medical Emergency', 'Other'];

// --- Centralized MOCK DATA ---
const MOCK_DATA: Record<ReportType, any[]> = {
  'daily-visitor': [],
  'emergency-visit': [],
  'rejected-requests': []
};

export default function WardenReports() {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState<ReportType>('daily-visitor');
  const [filters, setFilters] = useState<FilterState>({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    student: '',
    purpose: 'All Purposes',
    exportFormat: 'PDF'
  });
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hostelId, setHostelId] = useState<number | null>(null);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      student: '',
      purpose: 'All Purposes',
      exportFormat: 'PDF'
    });
  };

  // Resolve Hostel ID
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      try {
        const res = await apiClient.get(`/warden/profile/${user.id}`);
        if (res.data.success) {
          setHostelId(res.data.data.profile.hostel_id);
        }
      } catch (error) {
        console.error('Error fetching warden profile:', error);
      }
    };
    fetchProfile();
  }, [user]);

  const fetchReportData = useCallback(async () => {
    if (!hostelId) return;

    try {
      setIsLoading(true);
      const params = {
        startDate: filters.startDate,
        endDate: filters.endDate,
        purpose: filters.purpose !== 'All Purposes' ? filters.purpose : undefined
      };

      let endpoint = `/warden/reports/${hostelId}`;
      if (selectedReport === 'emergency-visit') endpoint = `/warden/reports/emergency/${hostelId}`;
      if (selectedReport === 'rejected-requests') endpoint = `/warden/reports/rejected/${hostelId}`;

      const res = await apiClient.get(endpoint, { params });

      if (res.data.success) {
        if (selectedReport === 'daily-visitor') {
          setData(res.data.data.visitors.map((v: any) => ({
            visitorName: v.name,
            student: v.student?.fullName || 'N/A',
            purpose: v.visit_purpose || 'N/A',
            time: `${v.visit_from_time} - ${v.visit_to_time}`,
            duration: v.logs?.[0]?.duration || 'N/A',
            status: v.request_status,
            date: new Date(v.visit_date).toLocaleDateString()
          })));
          setStats(res.data.data.stats);
        } else if (selectedReport === 'emergency-visit') {
          setData(res.data.data.map((v: any) => ({
            date: new Date(v.visit_date).toLocaleDateString(),
            visitor: v.name,
            student: v.student?.fullName || 'N/A',
            purpose: v.visit_purpose || 'N/A',
            responseTime: v.logs?.[0]?.entry_time || 'N/A',
            status: v.request_status
          })));
        } else if (selectedReport === 'rejected-requests') {
          setData(res.data.data.map((v: any) => ({
            date: new Date(v.visit_date).toLocaleDateString(),
            student: v.student?.fullName || 'N/A',
            visitor: v.name,
            purpose: v.visit_purpose || 'N/A',
            reason: v.rejection_reason || 'N/A',
            status: 'Rejected'
          })));
        }
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [hostelId, selectedReport, filters.startDate, filters.endDate, filters.purpose]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const currentData = useMemo(() => {
    if (!filters.student) return data;
    return data.filter(item => {
      const itemStudent = item.student || item.studentName || '';
      return itemStudent.toLowerCase().includes(filters.student.toLowerCase());
    });
  }, [data, filters.student]);

  const handleExport = () => {
    const reportNames: Record<ReportType, string> = {
      'daily-visitor': 'Daily Visitor Report',
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
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-24 text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
          <h3 className="text-lg font-medium text-gray-900">Loading Report Data</h3>
          <p className="text-gray-500">Connecting to secure database...</p>
        </div>
      );
    }

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
        return <DailyVisitorReport data={currentData} stats={stats} />;
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Student</label>
              <input
                type="text"
                placeholder="Type student name..."
                value={filters.student}
                onChange={(e) => handleFilterChange('student', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
            <button
              onClick={fetchReportData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
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
