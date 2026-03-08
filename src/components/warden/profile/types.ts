export interface WardenProfileData {
    fullName: string;
    employeeId: string;
    gender: string;
    dob: string;
    mobile: string;
    alternateMobile: string;
    email: string;
    address: string;
    designation: string;
    dateOfJoining: string;
    hostel_name: string;
    hostel_type: string;
    location: string;
}

export interface PasswordData {
    current: string;
    new: string;
    confirm: string;
}
