'use client';

import { useState, useEffect } from 'react';
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
import { ReportType, VisitorStat, HostelStat, ExportFormat } from './types';
import { ReportCard } from './ReportComponents';
import { VisitorStatistics } from './VisitorStatistics';
import { HostelWise } from './HostelWise';

// --- API Client ---
import apiClient from '@/lib/api-client';

const REPORTS_DATA: {
  hostelStats: HostelStat[];
} = {
  hostelStats: []
};

// --- Export Helper ---
// --- Export Helper ---
const exportReport = async (
  reportType: ReportType,
  format: ExportFormat,
  startDate: string,
  endDate: string,
  featureName: string
) => {
  try {
    const response = await apiClient.get(`/admin/reports/${reportType}/export`, {
      params: { startDate, endDate, format },
      responseType: 'blob', // Important for file download
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const extension = format === 'excel' ? 'xlsx' : format;
    link.setAttribute('download', `${featureName}-report-${startDate}-to-${endDate}.${extension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Export failed", error);
    alert("Failed to export report");
  }
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('visitor-statistics');
  // Default to current month or reasonable range
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);

  // Data States
  const [visitorStats, setVisitorStats] = useState<any>({});
  const [hostelStats, setHostelStats] = useState<HostelStat[]>([]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedReport === 'visitor-statistics') {
          const res = await apiClient.get('/admin/reports/visitor-statistics', {
            params: { startDate: dateFrom, endDate: dateTo }
          });
          if (res.data.success) {
            setVisitorStats(res.data.data || {});
          }
        } else if (selectedReport === 'hostel-wise') {
          const res = await apiClient.get('/admin/reports/hostel-wise', {
            params: { startDate: dateFrom, endDate: dateTo }
          });
          if (res.data.success) {
            setHostelStats(res.data.data.summary || []);
          }
        }
      } catch (error) {
        console.error("Failed to fetch report data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (dateFrom && dateTo) {
      fetchData();
    }
  }, [selectedReport, dateFrom, dateTo]);


  // Filters - Legacy functions for other reports to not break UI immediately
  // For Visitor Stats, we use API data directly
  const getFilteredHostelStats = () => REPORTS_DATA.hostelStats;

  const handleExport = (format: ExportFormat) => {
    let featureName = '';

    switch (selectedReport) {
      case 'visitor-statistics':
        featureName = 'visitor-statistics';
        break;
      case 'hostel-wise':
        featureName = 'hostel-wise';
        break;
      default:
        return;
    }

    exportReport(selectedReport, format, dateFrom, dateTo, featureName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full overflow-x-auto">
      <div className="max-w-[1600px] min-w-[1024px] mx-auto p-4 sm:p-8">
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

          <main className="flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}
            {selectedReport === 'visitor-statistics' && <VisitorStatistics data={visitorStats} />}
            {selectedReport === 'hostel-wise' && <HostelWise data={hostelStats} />}
          </main>
        </div>
      </div>
    </div>
  );
}