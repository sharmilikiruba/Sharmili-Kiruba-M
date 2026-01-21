/* ---------------- TYPES ---------------- */

export interface BlacklistEntry {
    id: string;
    visitorName: string;
    idProof: string;
    idType: string;
    reason: string;
    addedBy: string;
    role: 'warden' | 'admin';
    date: string;
    status: 'active' | 'removed';
}

export interface BlacklistFormData {
    visitorName: string;
    idProof: string;
    idType: string;
    reason: string;
}
