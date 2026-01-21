export type TabType = 'Hostels' | 'Gates' | 'Guards';

export interface Hostel {
    id: string;
    name: string;
    address: string;
    type: string;
    rooms: number;
    capacity: number;
    warden: string;
    status: string;
}

export interface Gate {
    id: string;
    name: string;
    code: string;
    hostel: string;
    type: string;
    guard: string;
    status: string;
}

export interface GuardAssignment {
    id: string;
    guardName: string;
    hostel: string;
    gate: string;
    shiftStart: string;
    shiftEnd: string;
    status: string;
}

export interface HostelForm {
    name: string;
    type: string;
    totalRooms: string;
    capacity: string;
    warden: string;
    address: string;
    isNewWarden: boolean;
    newWardenName: string;
    newWardenEmail: string;
    newWardenContact: string;
}

export interface GateForm {
    gateName: string;
    hostel: string;
    gateType: string;
    guard: string;
}

export interface AssignmentForm {
    guard: string;
    hostel: string;
    gate: string;
    shiftStart: string;
    shiftEnd: string;
    status: boolean;
}
