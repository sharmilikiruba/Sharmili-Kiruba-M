/* ---------------- TYPES ---------------- */

export interface Request {
    id: string;
    studentName: string;
    hostelBlock: string;
    room: string;
    visitorName: string;
    relation: string;
    date: string;
    time: string;
    purpose: string;
    priority: 'Normal' | 'Urgent';
    visitorPhoto: string;
    visitorDetails: {
        mobile: string;
        email: string;
        address: string;
        idProof: string;
    };
}
