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
  FileText,
  Clock,
  CheckCircle,
  User
} from 'lucide-react';

type ReportType = 
  | 'daily-visitor'
  | 'weekly-summary'
  | 'monthly-statistics'
  | 'student-wise'
  | 'emergency-visit'
  | 'rejected-requests';

interface FilterState {
  startDate: string;
  endDate: string;
  student: string;
  purpose: string;
  exportFormat: 'PDF' | 'Excel' | 'CSV';
}

const students = ['All Students', 'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh'];
const purposes = ['All Purposes', 'Family Visit', 'Birthday Celebration', 'Medical Emergency', 'Other'];

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

  const handleExport = () => {
    // Get report type name
    const reportNames = {
      'daily-visitor': 'Daily Visitor Report',
      'weekly-summary': 'Weekly Summary',
      'monthly-statistics': 'Monthly Statistics',
      'student-wise': 'Student-wise History',
      'emergency-visit': 'Emergency Visit Log',
      'rejected-requests': 'Rejected Requests'
    };

    const reportName = reportNames[selectedReport];
    
    // Create export data object
    const exportData = {
      reportType: reportName,
      filters: {
        startDate: filters.startDate,
        endDate: filters.endDate,
        student: filters.student,
        purpose: filters.purpose
      },
      exportFormat: filters.exportFormat,
      generatedAt: new Date().toISOString()
    };

    // Log export request (in production, this would call your API)
    console.log('Export Request:', exportData);

    // Simulate export based on format
    if (filters.exportFormat === 'PDF') {
      // For PDF export - you would integrate a library like jsPDF
      alert(`Generating PDF Report:\n\nReport: ${reportName}\nDate Range: ${filters.startDate} to ${filters.endDate}\nStudent: ${filters.student}\nPurpose: ${filters.purpose}\n\nIn production, this would download a PDF file.`);
      
      // Example: Call your backend API
      // fetch('/api/reports/export', {
      //   method: 'POST',
      //   body: JSON.stringify(exportData)
      // }).then(response => response.blob())
      //   .then(blob => {
      //     const url = window.URL.createObjectURL(blob);
      //     const a = document.createElement('a');
      //     a.href = url;
      //     a.download = `${reportName}_${filters.startDate}_to_${filters.endDate}.pdf`;
      //     a.click();
      //   });
      
    } else if (filters.exportFormat === 'Excel') {
      // For Excel export - you would integrate a library like xlsx
      alert(`Generating Excel Report:\n\nReport: ${reportName}\nDate Range: ${filters.startDate} to ${filters.endDate}\nStudent: ${filters.student}\nPurpose: ${filters.purpose}\n\nIn production, this would download an Excel file.`);
      
    } else if (filters.exportFormat === 'CSV') {
      // For CSV export - generate and download CSV file
      const csvContent = generateCSVContent(selectedReport, filters);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportName.replace(/\s/g, '_')}_${filters.startDate}_to_${filters.endDate}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  // Helper function to generate CSV content based on report type
  const generateCSVContent = (reportType: ReportType, filterData: FilterState): string => {
    let csvContent = '';
    
    // Add header with filter information
    csvContent += `Report Type,${reportType}\n`;
    csvContent += `Date Range,${filterData.startDate} to ${filterData.endDate}\n`;
    csvContent += `Student Filter,${filterData.student}\n`;
    csvContent += `Purpose Filter,${filterData.purpose}\n`;
    csvContent += `Generated On,${new Date().toLocaleString()}\n\n`;
    
    // Add data based on report type
    switch(reportType) {
      case 'daily-visitor':
        csvContent += 'Visitor Name,Student,Purpose,Time,Duration,Status\n';
        csvContent += 'Suresh Sharma,Rahul Sharma,Family Visit,10:00,2 hours,Pending\n';
        csvContent += 'Rekha Patel,Priya Patel,Birthday Celebration,16:00,4 hours,Pending\n';
        break;
        
      case 'weekly-summary':
        csvContent += 'Day,Total Visitors,Approved,Rejected,Pending\n';
        csvContent += 'Monday,8,7,0,0\n';
        csvContent += 'Tuesday,7,6,1,1\n';
        csvContent += 'Wednesday,6,5,0,2\n';
        break;
        
      case 'monthly-statistics':
        csvContent += 'Week,Total Visitors,Approved,Rejected,Emergency\n';
        csvContent += 'Week 1 (1-7),45,40,3,2\n';
        csvContent += 'Week 2 (8-14),50,44,4,3\n';
        break;
        
      case 'student-wise':
        csvContent += 'Student Name,Total Visitors,Unique Visitors,Frequency,Last Visit\n';
        csvContent += 'Rahul Sharma,12,4,3/month,2026-01-04\n';
        csvContent += 'Priya Patel,8,3,2/month,2026-01-03\n';
        break;
        
      case 'emergency-visit':
        csvContent += 'Date,Visitor,Student,Purpose,Response Time,Status\n';
        csvContent += '2026-01-05,Dr. Mohan Kumar,Amit Kumar,Medical Emergency,15 min,Approved\n';
        break;
        
      case 'rejected-requests':
        csvContent += 'Date,Student,Visitor,Purpose,Reason,Status\n';
        csvContent += '2026-01-02,Rahul Sharma,Unknown Person,Other,Request denied. Late hours and too many visitors.,Rejected\n';
        break;
    }
    
    return csvContent;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Visitor activity and operational reports</p>
        </div>

        {/* Filters Bar */}
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
            <button
              onClick={() => {}}
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
          {/* Sidebar */}
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

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-end mb-6">
              <button onClick={handleExport} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg">
                <Download className="w-5 h-5" />
                Export {filters.exportFormat}
              </button>
            </div>
            {selectedReport === 'daily-visitor' && <DailyReport />}
            {selectedReport === 'weekly-summary' && <WeeklyReport />}
            {selectedReport === 'monthly-statistics' && <MonthlyReport />}
            {selectedReport === 'student-wise' && <StudentReport />}
            {selectedReport === 'emergency-visit' && <EmergencyReport />}
            {selectedReport === 'rejected-requests' && <RejectedReport />}
          </main>
        </div>
      </div>
    </div>
  );
}

function ReportBtn({ icon, title, subtitle, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full text-left p-4 rounded-lg transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className={active ? 'text-white' : 'text-gray-600'}>{icon}</div>
        <div>
          <div className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-900'}`}>{title}</div>
          <div className={`text-xs mt-0.5 ${active ? 'text-blue-100' : 'text-gray-500'}`}>{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

function StatCard({ icon, label, value, bgColor }: any) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-gray-600 text-sm mb-2">{label}</div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
        <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center text-white`}>{icon}</div>
      </div>
    </div>
  );
}

function DailyReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-6 h-6" />} label="Total Visitors" value="2" bgColor="bg-blue-500" />
        <StatCard icon={<CheckCircle className="w-6 h-6" />} label="Approved" value="0" bgColor="bg-green-600" />
        <StatCard icon={<Clock className="w-6 h-6" />} label="Pending" value="2" bgColor="bg-yellow-500" />
        <StatCard icon={<AlertTriangle className="w-6 h-6" />} label="Emergency" value="0" bgColor="bg-red-500" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Daily Visitor Details - January 6, 2026</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Visitor Name</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Student</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Purpose</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Time</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Duration</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Status</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="py-4 px-6 text-sm">Suresh Sharma</td><td className="py-4 px-6 text-sm">Rahul Sharma</td><td className="py-4 px-6 text-sm">Family Visit</td><td className="py-4 px-6 text-sm">10:00</td><td className="py-4 px-6 text-sm">2 hours</td><td className="py-4 px-6"><span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">Pending</span></td></tr>
            <tr className="border-b"><td className="py-4 px-6 text-sm">Rekha Patel</td><td className="py-4 px-6 text-sm">Priya Patel</td><td className="py-4 px-6 text-sm">Birthday Celebration</td><td className="py-4 px-6 text-sm">16:00</td><td className="py-4 px-6 text-sm">4 hours</td><td className="py-4 px-6"><span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">Pending</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WeeklyReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-6 h-6" />} label="Total Visits" value="45" bgColor="bg-blue-500" />
        <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Avg Daily" value="6.4" bgColor="bg-gray-600" />
        <StatCard icon={<Calendar className="w-6 h-6" />} label="Peak Day" value="Monday" bgColor="bg-green-600" />
        <StatCard icon={<Clock className="w-6 h-6" />} label="Approval Rate" value="89%" bgColor="bg-blue-500" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Weekly Summary - Jan 1-7, 2026</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Day</th><th className="text-left py-3 px-6 text-xs uppercase">Total Visitors</th><th className="text-left py-3 px-6 text-xs uppercase">Approved</th><th className="text-left py-3 px-6 text-xs uppercase">Rejected</th><th className="text-left py-3 px-6 text-xs uppercase">Pending</th></tr></thead>
          <tbody>
            {[{d:'Monday',t:8,a:7,r:0,p:0},{d:'Tuesday',t:7,a:6,r:1,p:1},{d:'Wednesday',t:6,a:5,r:0,p:2},{d:'Thursday',t:5,a:4,r:1,p:0}].map((x,i)=><tr key={i} className="border-b"><td className="py-4 px-6 text-sm font-medium">{x.d}</td><td className="py-4 px-6 text-sm">{x.t}</td><td className="py-4 px-6 text-sm text-green-600 font-medium">{x.a}</td><td className="py-4 px-6 text-sm text-red-600 font-medium">{x.r}</td><td className="py-4 px-6 text-sm text-yellow-600 font-medium">{x.p}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthlyReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-6 h-6" />} label="Total Visits" value="187" bgColor="bg-blue-500" />
        <StatCard icon={<Calendar className="w-6 h-6" />} label="Peak Day" value="15th Jan" bgColor="bg-green-600" />
        <StatCard icon={<Clock className="w-6 h-6" />} label="Peak Hours" value="2-4 PM" bgColor="bg-yellow-500" />
        <StatCard icon={<Users className="w-6 h-6" />} label="Unique Visitors" value="142" bgColor="bg-gray-600" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Monthly Statistics - January 2026</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Week</th><th className="text-left py-3 px-6 text-xs uppercase">Total</th><th className="text-left py-3 px-6 text-xs uppercase">Approved</th><th className="text-left py-3 px-6 text-xs uppercase">Rejected</th><th className="text-left py-3 px-6 text-xs uppercase">Emergency</th></tr></thead>
          <tbody>
            {[{w:'Week 1 (1-7)',t:45,a:40,r:3,e:2},{w:'Week 2 (8-14)',t:50,a:44,r:4,e:3}].map((x,i)=><tr key={i} className="border-b"><td className="py-4 px-6 text-sm font-medium">{x.w}</td><td className="py-4 px-6 text-sm">{x.t}</td><td className="py-4 px-6 text-sm text-green-600 font-medium">{x.a}</td><td className="py-4 px-6 text-sm text-red-600 font-medium">{x.r}</td><td className="py-4 px-6 text-sm text-orange-600 font-medium">{x.e}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-6 h-6" />} label="Students with Visitors" value="25" bgColor="bg-blue-500" />
        <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Avg per Student" value="3.2" bgColor="bg-gray-600" />
        <StatCard icon={<User className="w-6 h-6" />} label="Most Frequent" value="Rahul S." bgColor="bg-green-600" />
        <StatCard icon={<Users className="w-6 h-6" />} label="Unique Visitors" value="67" bgColor="bg-yellow-500" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Student-wise Visitor History</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Student Name</th><th className="text-left py-3 px-6 text-xs uppercase">Total</th><th className="text-left py-3 px-6 text-xs uppercase">Unique</th><th className="text-left py-3 px-6 text-xs uppercase">Frequency</th><th className="text-left py-3 px-6 text-xs uppercase">Last Visit</th></tr></thead>
          <tbody>
            {[{n:'Rahul Sharma',t:12,u:4,f:'3/month',l:'2026-01-04'}].map((x,i)=><tr key={i} className="border-b"><td className="py-4 px-6 text-sm font-medium">{x.n}</td><td className="py-4 px-6 text-sm">{x.t}</td><td className="py-4 px-6 text-sm">{x.u}</td><td className="py-4 px-6 text-sm">{x.f}</td><td className="py-4 px-6 text-sm">{x.l}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmergencyReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<AlertTriangle className="w-6 h-6" />} label="Total Emergency" value="1" bgColor="bg-red-500" />
        <StatCard icon={<Calendar className="w-6 h-6" />} label="This Week" value="1" bgColor="bg-yellow-500" />
        <StatCard icon={<Clock className="w-6 h-6" />} label="Avg Response" value="15 min" bgColor="bg-green-600" />
        <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Resolved" value="100%" bgColor="bg-blue-500" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Emergency Visit Log</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Date</th><th className="text-left py-3 px-6 text-xs uppercase">Visitor</th><th className="text-left py-3 px-6 text-xs uppercase">Student</th><th className="text-left py-3 px-6 text-xs uppercase">Purpose</th><th className="text-left py-3 px-6 text-xs uppercase">Response</th><th className="text-left py-3 px-6 text-xs uppercase">Status</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="py-4 px-6 text-sm">2026-01-05</td><td className="py-4 px-6 text-sm">Dr. Mohan Kumar</td><td className="py-4 px-6 text-sm">Amit Kumar</td><td className="py-4 px-6"><div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500"/><span className="text-sm">Medical Emergency</span></div></td><td className="py-4 px-6 text-sm">15 min</td><td className="py-4 px-6"><span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">Approved</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RejectedReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<XCircle className="w-6 h-6" />} label="Total Rejected" value="1" bgColor="bg-red-500" />
        <StatCard icon={<Calendar className="w-6 h-6" />} label="This Month" value="5" bgColor="bg-yellow-500" />
        <StatCard icon={<Clock className="w-6 h-6" />} label="Common Reason" value="Late Hours" bgColor="bg-gray-600" />
        <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Rejection Rate" value="11%" bgColor="bg-blue-500" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Rejected Requests Report</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Date</th><th className="text-left py-3 px-6 text-xs uppercase">Student</th><th className="text-left py-3 px-6 text-xs uppercase">Visitor</th><th className="text-left py-3 px-6 text-xs uppercase">Purpose</th><th className="text-left py-3 px-6 text-xs uppercase">Reason</th><th className="text-left py-3 px-6 text-xs uppercase">Status</th></tr></thead>
          <tbody>
            <tr className="border-b bg-red-50"><td className="py-4 px-6 text-sm">2026-01-02</td><td className="py-4 px-6 text-sm">Rahul Sharma</td><td className="py-4 px-6 text-sm">Unknown Person</td><td className="py-4 px-6 text-sm">Other</td><td className="py-4 px-6 text-sm text-red-700">Request denied. Late hours and too many visitors.</td><td className="py-4 px-6"><span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">Rejected</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}