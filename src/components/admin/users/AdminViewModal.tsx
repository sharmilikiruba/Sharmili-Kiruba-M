import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { AdminUser } from './types';
import { ViewField } from './UserComponents';

interface AdminViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: AdminUser | null;
}

export const AdminViewModal: React.FC<AdminViewModalProps> = ({ isOpen, onClose, admin }) => {
    if (!isOpen || !admin) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[95vh] overflow-y-auto">
                <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <ShieldCheck className="w-5 h-5" />
                        <h2 className="text-xl font-bold">Administrator Details</h2>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <ViewField label="Full Name" value={admin.fullName} />
                        <ViewField label="Email Address" value={admin.email} />
                        <ViewField label="Gender" value={admin.gender === 'M' ? 'Male' : admin.gender === 'F' ? 'Female' : admin.gender || 'N/A'} />
                        <ViewField label="Date of Birth" value={admin.dob ? new Date(admin.dob).toLocaleDateString() : 'N/A'} />
                        <ViewField label="Phone Number" value={admin.phone || 'N/A'} />
                        <ViewField label="Designation" value={admin.designation} />
                        <ViewField label="Employee ID" value={admin.empId || 'N/A'} />
                        <ViewField label="Status" value={admin.status} />
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
