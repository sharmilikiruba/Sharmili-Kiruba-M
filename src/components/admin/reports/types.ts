export type ReportType =
    | 'visitor-statistics'
    | 'warden-performance'
    | 'security-report'
    | 'student-wise'
    | 'hostel-wise'
    | 'custom-report';

export interface VisitorStat {
    date: string;
    visitor: string;
    student: string;
    purpose: string;
    entryTime: string;
    exitTime: string;
    duration: string;
    status?: string;
}

export interface WardenPerf {
    name: string;
    hostel: string;
    totalRequests: number;
    approved: number;
    rejected: number;
    approvalRate: string;
    avgResponseTime: string;
}

export interface SecurityEvent {
    timestamp: string;
    visitor: string;
    student: string;
    eventType: string;
    status: 'Normal' | 'Warning' | 'Alert';
    remarks: string;
}

export interface StudentStat {
    studentId: string;
    studentName: string;
    totalVisitors: number;
    uniqueVisitors: number;
    frequency: string;
    lastVisit: string;
}

export interface HostelStat {
    name: string;
    totalVisitors: number;
    peakTime: string;
    compliance: string;
}

export type ExportFormat = 'pdf' | 'csv' | 'excel';
