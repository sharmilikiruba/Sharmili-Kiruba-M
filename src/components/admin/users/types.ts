export type UserType = 'Student' | 'Warden' | 'Guard';
export type TabType = 'Students' | 'Wardens' | 'Guards';

export interface BaseUser {
    id: string;
    name: string;
    email: string;
    contact?: string;
    status: 'Active' | 'Inactive';
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
    gate: string;
    shift: string;
}

export interface StudentForm {
    fullName: string;
    email: string;
    mobile: string;
    rollNumber: string;
    department: string;
    hostel: string;
    room: string;
}

export interface WardenForm {
    fullName: string;
    email: string;
    mobile: string;
    hostel: string;
}

export interface GuardForm {
    fullName: string;
    email: string;
    mobile: string;
    gate: string;
    shift: string;
}
