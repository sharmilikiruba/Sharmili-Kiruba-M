export type ReportType =
    | 'visitor-statistics'
    | 'student-wise'
    | 'hostel-wise';

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
