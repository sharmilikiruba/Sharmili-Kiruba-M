export type UserType = 'Student' | 'Warden' | 'Guard' | 'Admin';
export type TabType = 'Students' | 'Wardens' | 'Guards' | 'Admins';

export interface BaseUser {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    status: 'Active' | 'Inactive';
    empId?: string;
    dateOfJoining?: string;
    address?: string;
}

export interface Student extends BaseUser {
    rollNumber: string;
    department: string;
    hostel: string;
    room_no: string;
    phone: string;
    gender?: string;
    dob?: string;
    course?: string;
    currentYear?: string;
    semester?: string;
    parentName?: string;
    parentPhone?: string;
    guardianName?: string;
    guardianContact?: string;
}

export interface Warden extends BaseUser {
    hostel: string;
}

export interface Guard extends BaseUser {
    gender: 'Male' | 'Female' | 'Other';
    designation: string;
    dob: string;
    gate_id?: number;
    gate?: string;
    assignedGate?: { gate_name: string };
    shift_type?: 'Day' | 'Night' | 'Rotating';
    shift_start_time?: string;
    shift_end_time?: string;
    security_agency?: string;
}

export interface AdminUser extends BaseUser {
    designation: string;
    gender?: string;
    dob?: string;
}

export interface StudentForm {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    rollNumber: string;
    course: string;
    department: string;
    currentYear: string;
    semester: string;
    hostel: string;
    room_no: string;
    parentName?: string;
    parentPhone?: string;
    guardianName?: string;
    guardianContact?: string;
}

export interface WardenForm {
    fullName: string;
    email: string;
    phone: string;
    hostel: string;
    address: string;
    empId: string;
    dateOfJoining?: string;
}

export interface GuardForm {
    fullName: string;
    email: string;
    phone: string;
    gender: 'M' | 'F' | 'Other';
    dob: string;
    designation: string;
    gate_id?: number;
    shift_type: 'Day' | 'Night' | 'Rotating';
    shift_start_time?: string;
    shift_end_time?: string;
    address: string;
    empId: string;
    dateOfJoining?: string;
}

export interface AdminForm {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    designation: string;
    address?: string;
    empId?: string;
}
