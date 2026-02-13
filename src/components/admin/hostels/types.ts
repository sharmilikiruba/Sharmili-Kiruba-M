export type TabType = 'Hostels' | 'Gates';

export interface Hostel {
    id: string;
    hostel_id?: number;
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
    gate_id?: number;
    name: string;
    gate_no: string;
    code: string;
    hostel: string;
    hostel_id: number;
    location: string;
    type: string;
    guard?: string;
    guard_id?: number;
    status: string;
}

export interface HostelForm {
    name: string;
    type: string;
    totalRooms: string;
    capacity: string;
    warden: string;
    address: string;
    password?: string;
}

export interface GateForm {
    gateName: string;
    gateNo: string;
    hostel: string;
    hostel_id: number;
    location: string;
    gateType: string;
    guard: string;
    guard_id?: number;
}
