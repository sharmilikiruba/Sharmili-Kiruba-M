export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  photo?: string;
  phone: string;
  email: string;
  address: string;
  course: string;
  department: string;
  yearOfStudy: string;
  hostelName: string;
  hostelType: string;
  roomNumber: string;
  dateOfJoining: string;
  status: 'Active' | 'Left';
  parentName: string;
  parentMobile: string;
  parentAddress: string;
}

export interface VisitorStats {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}