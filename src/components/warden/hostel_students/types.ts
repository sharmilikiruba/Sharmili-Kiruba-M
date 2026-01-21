export interface Student {
    id: number;
    name: string;
    rollNumber: string;
    email: string;
    mobile: string;
    roomNumber: string;
    department: string;
    year: string;
    semester: string;
    photo: string | null;
    parentName?: string;
    parentMobile?: string;
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
    department: string;
    year: string;
    semester: string;
    roomNumber: string;
    parentName: string;
    parentMobile: string;
    parentRelation: string;
    address: string;
    bloodGroup: string;
    emergencyContact: string;
    guardianName: string;
    guardianMobile: string;
}

export interface StudentPhotos {
    student: string | null;
    father: string | null;
    mother: string | null;
    guardian: string | null;
}
