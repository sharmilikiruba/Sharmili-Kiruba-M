export type ReportType =
    | 'daily-visitor'
    | 'weekly-summary'
    | 'monthly-statistics'
    | 'student-wise'
    | 'emergency-visit'
    | 'rejected-requests';

export interface FilterState {
    startDate: string;
    endDate: string;
    student: string;
    purpose: string;
    exportFormat: 'PDF' | 'Excel' | 'CSV';
}

export interface DailyVisitorData {
    visitorName: string;
    student: string;
    purpose: string;
    time: string;
    duration: string;
    status: string;
    date: string;
}

export interface WeeklySummaryData {
    day: string;
    total: number;
    approved: number;
    rejected: number;
    pending: number;
    date: string;
}

export interface MonthlyStatisticsData {
    week: string;
    total: number;
    approved: number;
    rejected: number;
    emergency: number;
    month: string;
}

export interface StudentWiseData {
    studentName: string;
    total: number;
    unique: number;
    frequency: string;
    lastVisit: string;
}

export interface EmergencyVisitData {
    date: string;
    visitor: string;
    student: string;
    purpose: string;
    responseTime: string;
    status: string;
}

export interface RejectedRequestData {
    date: string;
    student: string;
    visitor: string;
    purpose: string;
    reason: string;
    status: string;
}
