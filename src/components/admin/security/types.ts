export interface BlocklistEntry {
    name: string;
    id: string;
    reason: string;
    addedBy: string;
    date: string;
}

export interface Alert {
    message: string;
    time: string;
    type: 'warning' | 'info' | 'critical' | string;
}

export interface BlocklistForm {
    name: string;
    id: string;
    reason: string;
}
