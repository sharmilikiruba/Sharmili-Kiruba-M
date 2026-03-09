export interface Student {
    id: number;
    fullName: string;
    rollNumber: string;
    email: string;
    phone: string;
    room_no: string;
    department: string;
    year: string;
    semester: string;
    photo: string | null;
    gender?: string;
    dob?: string;
    address?: string;
    parentName?: string;
    parent_phone?: string;
    guardianName?: string;
    dateOfJoining?: string;
    guardian_contact?: string;
}

export interface StudentFormData {
    fullName: string;
    rollNumber: string;
    email: string;
    phone: string;
    course: string;
    department: string;
    currentYear: string;
    semester: string;
    room_no: string;
    parentName: string;
    parent_phone: string;
    parentRelation: string;
    address: string;
    gender: string;
    dob: string;
    bloodGroup: string;
    emergencyContact: string;
    guardianName: string;
    guardian_contact: string;
}

export interface StudentPhotos {
    student: string | null;
}
