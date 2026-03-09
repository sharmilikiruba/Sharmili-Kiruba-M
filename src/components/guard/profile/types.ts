export interface ProfileData {
    fullName: string;
    employeeId: string;
    gender: string;
    dateOfBirth: string;
    mobileNumber: string;
    alternateMobile: string;
    email: string;
    address: string;
    securityAgency: string;
    dateOfJoining: string;
    assignedHostel: string;
    assignedGate: string;
    shiftType: string;
    shiftStart: string;
    shiftEnd: string;
}

export interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
