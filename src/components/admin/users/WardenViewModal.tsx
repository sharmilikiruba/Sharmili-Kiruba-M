import React from 'react';
import { X } from 'lucide-react';
import { Warden } from './types';
import { ViewField } from './UserComponents';

interface WardenViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    warden: Warden | null;
}

export const WardenViewModal: React.FC<WardenViewModalProps> = ({ isOpen, onClose, warden }) => {
    if (!isOpen || !warden) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-xl sm:rounded-xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Warden Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <ViewField label="Employee ID" value={warden.empId || 'N/A'} />
                    <ViewField label="Full Name" value={warden.fullName} />
                    <ViewField label="Email" value={warden.email} />
                    <ViewField label="Contact" value={warden.phone || 'N/A'} />
                    <ViewField label="Address" value={warden.address || 'N/A'} />
                    <ViewField label="Hostel" value={warden.hostel} />
                    <ViewField label="Date of Joining" value={warden.dateOfJoining && warden.dateOfJoining !== 'N/A' ? new Date(warden.dateOfJoining).toLocaleDateString() : 'N/A'} />
                    <ViewField label="Status" value={warden.status} />
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
