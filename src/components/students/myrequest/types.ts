/* ---------------- TYPES ---------------- */

export interface Request {
    id: string;
    requestId: string;
    visitorName: string;
    relation: string;
    visitDate: string;
    purpose: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    visitorDetails: {
        phone: string;
        email?: string;
        address?: string;
        idProof: string;
    };
    visitDetails: {
        entryTime?: string;
        exitTime?: string;
        reason?: string;
    };
    qrCode?: string;
}
