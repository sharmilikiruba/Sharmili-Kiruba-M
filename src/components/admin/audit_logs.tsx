'use client';

import { useState } from 'react';
import { 
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  Filter,
  Download,
  FileText,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    name: string;
    role: 'Admin' | 'Warden' | 'Student' | 'Guard' | 'Unknown';
  };
  action: string;
  module: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Failed' | 'Warning';
  details?: {
    oldValue?: string;
    newValue?: string;
    reason?: string;
    additionalInfo?: string;
  };
}

const sampleLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: 'Jan 06, 2026, 02:30 PM',
    user: { name: 'Prof. Rajesh Gupta', role: 'Admin' },
    action: 'Created new hostel',
    module: 'Hostel Management',
    ipAddress: '192.168.1.100',
    device: 'Chrome 120 / Windows',
    status: 'Success',
    details: {
      additionalInfo: 'Created "Ramanujan Hostel" with 50 rooms'
    }
  },
  {
    id: '2',
    timestamp: 'Jan 06, 2026, 02:00 PM',
    user: { name: 'Dr. Suresh Kumar', role: 'Warden' },
    action: 'Approved visitor request',
    module: 'Visitor Management',
    ipAddress: '192.168.1.101',
    device: 'Safari 17 / macOS',
    status: 'Success',
    details: {
      additionalInfo: 'Approved visit request for Kiran Sharma to meet Rahul Sharma'
    }
  },
  {
    id: '3',
    timestamp: 'Jan 05, 2026, 03:45 PM',
    user: { name: 'Prof. Rajesh Gupta', role: 'Admin' },
    action: 'Updated system configuration',
    module: 'Settings',
    ipAddress: '192.168.1.100',
    device: 'Edge 120 / Windows',
    status: 'Success',
    details: {
      oldValue: 'Max visit duration: 2 hours',
      newValue: 'Max visit duration: 4 hours',
      reason: 'Updated policy for family visits'
    }
  },
  {
    id: '4',
    timestamp: 'Jan 04, 2026, 10:15 PM',
    user: { name: 'Ramesh Singh', role: 'Guard' },
    action: 'Recorded visitor exit',
    module: 'Entry/Exit',
    ipAddress: '192.168.1.150',
    device: 'Chrome 120 / Android',
    status: 'Success',
    details: {
      additionalInfo: 'Visitor: Kiran Sharma, Exit time: 10:15 PM'
    }
  },
  {
    id: '5',
    timestamp: 'Jan 04, 2026, 05:00 PM',
    user: { name: 'Rahul Sharma', role: 'Student' },
    action: 'Submitted visitor request',
    module: 'Visitor Management',
    ipAddress: '192.168.2.50',
    device: 'Chrome 120 / Windows',
    status: 'Success',
    details: {
      additionalInfo: 'Request for family visit on Jan 06, 2026'
    }
  },
  {
    id: '6',
    timestamp: 'Jan 04, 2026, 02:30 PM',
    user: { name: 'Prof. Rajesh Gupta', role: 'Admin' },
    action: 'Login',
    module: 'Authentication',
    ipAddress: '192.168.1.100',
    device: 'Chrome 120 / Windows',
    status: 'Success'
  },
  {
    id: '7',
    timestamp: 'Jan 04, 2026, 05:15 AM',
    user: { name: 'Unknown User', role: 'Unknown' },
    action: 'Failed login attempt',
    module: 'Authentication',
    ipAddress: '203.45.67.89',
    device: 'Unknown Browser',
    status: 'Failed',
    details: {
      reason: 'Invalid credentials',
      additionalInfo: 'Multiple failed attempts from this IP'
    }
  },
  {
    id: '8',
    timestamp: 'Jan 03, 2026, 11:30 PM',
    user: { name: 'Prof. Rajesh Gupta', role: 'Admin' },
    action: 'Generated report',
    module: 'Reports',
    ipAddress: '192.168.1.100',
    device: 'Chrome 120 / Windows',
    status: 'Success',
    details: {
      additionalInfo: 'Generated Visitor Statistics Report for December 2025'
    }
  },
  {
    id: '9',
    timestamp: 'Jan 03, 2026, 06:20 PM',
    user: { name: 'Dr. Meera Singh', role: 'Warden' },
    action: 'Rejected visitor request',
    module: 'Visitor Management',
    ipAddress: '192.168.1.105',
    device: 'Firefox 120 / Windows',
    status: 'Success',
    details: {
      reason: 'Outside visiting hours',
      additionalInfo: 'Request was for 11 PM visit'
    }
  },
  {
    id: '10',
    timestamp: 'Jan 03, 2026, 02:15 PM',
    user: { name: 'Ramesh Singh', role: 'Guard' },
    action: 'Recorded visitor entry',
    module: 'Entry/Exit',
    ipAddress: '192.168.1.150',
    device: 'Chrome 120 / Android',
    status: 'Success',
    details: {
      additionalInfo: 'Visitor: Dr. Mohan Kumar, Entry time: 02:15 PM'
    }
  }
];

const allRoles = ['All Roles', 'Admin', 'Warden', 'Student', 'Guard', 'Unknown'];
const allActions = [
  'All Actions',
  'Login',
  'Logout',
  'Created new hostel',
  'Approved visitor request',
  'Rejected visitor request',
  'Submitted visitor request',
  'Updated system configuration',
  'Generated report',
  'Recorded visitor entry',
  'Recorded visitor exit',
  'Failed login attempt'
];
const allModules = [
  'All Modules',
  'Authentication',
  'Hostel Management',
  'Visitor Management',
  'Settings',
  'Reports',
  'Entry/Exit'
];
const allStatuses = ['All Status', 'Success', 'Failed', 'Warning'];

export default function AuditLogs() {
  const [logs] = useState<AuditLog[]>(sampleLogs);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedAction, setSelectedAction] = useState('All Actions');
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const itemsPerPage = 10;

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'All Roles' || log.user.role === selectedRole;
    const matchesAction = selectedAction === 'All Actions' || log.action === selectedAction;
    const matchesModule = selectedModule === 'All Modules' || log.module === selectedModule;
    const matchesStatus = selectedStatus === 'All Status' || log.status === selectedStatus;

    return matchesSearch && matchesRole && matchesAction && matchesModule && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Module', 'IP Address', 'Device', 'Status'];
    const csvData = filteredLogs.map(log => [
      log.timestamp,
      log.user.name,
      log.user.role,
      log.action,
      log.module,
      log.ipAddress,
      log.device,
      log.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleExportPDF = () => {
    // In a real implementation, you would use a library like jsPDF
    alert('PDF export functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Audit Logs</h1>
          <p className="text-slate-600">System activity and security events</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">System Activity Log</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm"
              >
                <Download className="w-4 h-4" />
                CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm"
              >
                <FileText className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="border-b border-slate-200">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full px-8 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Filter className="w-5 h-5" />
                Filters
              </div>
              {showFilters ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {showFilters && (
              <div className="px-8 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
                {/* Search and Date Filters */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by user, action, or details..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      placeholder="From date"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      placeholder="To date"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Dropdown Filters */}
                <div className="grid grid-cols-4 gap-4">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-slate-700"
                  >
                    {allRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>

                  <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {allActions.map(action => (
                      <option key={action} value={action}>{action}</option>
                    ))}
                  </select>

                  <select
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(e.target.value)}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {allModules.map(module => (
                      <option key={module} value={module}>{module}</option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {allStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Module
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentLogs.map((log) => (
                  <>
                    <tr
                      key={log.id}
                      className="hover:bg-indigo-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleRow(log.id)}
                    >
                      <td className="py-4 px-6">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          {expandedRows.has(log.id) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                        {log.timestamp}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-sm font-medium text-slate-800">{log.user.name}</div>
                          <RoleBadge role={log.user.role} />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-700">
                        {log.action}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-700">
                        {log.module}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-700 font-mono">
                        {log.ipAddress}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {log.device}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={log.status} />
                      </td>
                    </tr>
                    {expandedRows.has(log.id) && log.details && (
                      <tr className="bg-indigo-50/30">
                        <td colSpan={8} className="py-4 px-6">
                          <div className="ml-12 p-4 bg-white rounded-lg border border-indigo-200 shadow-sm">
                            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-indigo-600" />
                              Activity Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              {log.details.oldValue && (
                                <div className="flex gap-2">
                                  <span className="font-medium text-slate-600 min-w-[120px]">Previous Value:</span>
                                  <span className="text-slate-800">{log.details.oldValue}</span>
                                </div>
                              )}
                              {log.details.newValue && (
                                <div className="flex gap-2">
                                  <span className="font-medium text-slate-600 min-w-[120px]">New Value:</span>
                                  <span className="text-slate-800">{log.details.newValue}</span>
                                </div>
                              )}
                              {log.details.reason && (
                                <div className="flex gap-2">
                                  <span className="font-medium text-slate-600 min-w-[120px]">Reason:</span>
                                  <span className="text-slate-800">{log.details.reason}</span>
                                </div>
                              )}
                              {log.details.additionalInfo && (
                                <div className="flex gap-2">
                                  <span className="font-medium text-slate-600 min-w-[120px]">Additional Info:</span>
                                  <span className="text-slate-800">{log.details.additionalInfo}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-6 bg-slate-50 flex items-center justify-between border-t border-slate-200">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Show first page, last page, current page, and one page on each side
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                          : 'border border-slate-300 text-slate-700 hover:bg-white'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  (page === currentPage - 2 && currentPage > 3) ||
                  (page === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return <span key={page} className="px-2 text-slate-400">...</span>;
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function RoleBadge({ role }: { role: string }) {
  const roleStyles = {
    Admin: 'bg-blue-100 text-blue-700 border-blue-200',
    Warden: 'bg-green-100 text-green-700 border-green-200',
    Student: 'bg-purple-100 text-purple-700 border-purple-200',
    Guard: 'bg-orange-100 text-orange-700 border-orange-200',
    Unknown: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border mt-1 ${roleStyles[role as keyof typeof roleStyles]}`}>
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    Success: {
      icon: CheckCircle,
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    Failed: {
      icon: XCircle,
      className: 'bg-red-100 text-red-700 border-red-200'
    },
    Warning: {
      icon: AlertCircle,
      className: 'bg-amber-100 text-amber-700 border-amber-200'
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.className}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}