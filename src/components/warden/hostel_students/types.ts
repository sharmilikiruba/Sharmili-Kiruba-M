export interface Student {
    id: number;
    fullName: string;
    rollNumber: string;
    email: string;
    mobile: string;
    roomNumber: string;
    department: string;
    year: string;
    semester: string;
    photo: string | null;
    gender?: string;
    dob?: string;
    address?: string;
    parentName?: string;
    parent_phone?: string;
    room_no?: string;
    guardianName?: string;
    guardianMobile?: string;
    fatherPhoto?: string | null;
    motherPhoto?: string | null;
    guardianPhoto?: string | null;
}

export interface StudentFormData {
    fullName: string;
    rollNumber: string;
    email: string;
    mobile: string;
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
    guardian_phone: string;
    password: string;
}

export interface StudentPhotos {
    student: string | null;
}
