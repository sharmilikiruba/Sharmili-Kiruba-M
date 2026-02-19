export type UserType = 'Student' | 'Warden' | 'Guard';
export type TabType = 'Students' | 'Wardens' | 'Guards';

export interface BaseUser {
    id: string;
    name: string;
    email: string;
    contact?: string;
    status: 'Active' | 'Inactive';
    empId?: string;
    dateOfJoining?: string;
    address?: string;
    password?: string;
}

export interface Student extends BaseUser {
    rollNo: string;
    department: string;
    hostel: string;
    room: string;
}

export interface Warden extends BaseUser {
    hostel: string;
}

export interface Guard extends BaseUser {
    gender: 'M' | 'F' | 'Other';
    designation: string;
    dob: string;
    gate_id?: number;
    assignedGate?: { gate_name: string };
    shift_type?: 'Day' | 'Night' | 'Rotating';
    shift_start_time?: string;
    shift_end_time?: string;
    security_agency?: string;
}

export interface StudentForm {
    fullName: string;
    email: string;
    mobile: string;
    rollNumber: string;
    course: string;
    department: string;
    currentYear: string;
    semester: string;
    hostel: string;
    room: string;
}

export interface WardenForm {
    fullName: string;
    email: string;
    mobile: string;
    hostel: string;
    address: string;
    empId: string;
    dateOfJoining: string;
    password: string;
}

export interface GuardForm {
    fullName: string;
    email: string;
    mobile: string;
    gender: 'M' | 'F' | 'Other';
    dob: string;
    designation: string;
    gate_id?: number;
    shift_type: 'Day' | 'Night' | 'Rotating';
    shift_start_time?: string;
    shift_end_time?: string;
    address: string;
    empId: string;
    dateOfJoining: string;
    password?: string;
}
