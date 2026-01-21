import React from 'react';
import { X } from 'lucide-react';
import { Guard } from './types';
import { ViewField } from './UserComponents';

interface GuardViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    guard: Guard | null;
}

export const GuardViewModal: React.FC<GuardViewModalProps> = ({ isOpen, onClose, guard }) => {
    if (!isOpen || !guard) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Guard Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <ViewField label="Full Name" value={guard.name} />
                    <ViewField label="Email" value={guard.email} />
                    <ViewField label="Contact" value={guard.contact || 'N/A'} />
                    <ViewField label="Gate" value={guard.gate} />
                    <ViewField label="Shift" value={guard.shift} />
                    <ViewField label="Status" value={guard.status} />
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
