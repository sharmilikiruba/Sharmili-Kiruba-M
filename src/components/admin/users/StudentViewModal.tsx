import React from 'react';
import { X } from 'lucide-react';
import { Student } from './types';
import { ViewField } from './UserComponents';

interface StudentViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
}

export const StudentViewModal: React.FC<StudentViewModalProps> = ({ isOpen, onClose, student }) => {
    if (!isOpen || !student) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-xl sm:rounded-xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl relative">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold text-gray-900">Student Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ViewField label="Full Name" value={student.fullName} />
                        <ViewField label="Roll Number" value={student.rollNumber} />
                        <ViewField label="Email" value={student.email} />
                        <ViewField label="Gender" value={student.gender || 'N/A'} />
                        <ViewField label="Date of Birth" value={student.dob || 'N/A'} />
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Contact Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ViewField label="Contact" value={student.phone || 'N/A'} />
                            <ViewField label="Parent Name" value={student.parentName || 'N/A'} />
                            <ViewField label="Parent Phone" value={student.parentPhone || 'N/A'} />
                            <ViewField label="Guardian Name" value={student.guardianName || 'N/A'} />
                            <ViewField label="Guardian Contact" value={student.guardianContact || 'N/A'} />
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Academic & Hostel</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ViewField label="Department" value={student.department} />
                            <ViewField label="Hostel" value={student.hostel} />
                            <ViewField label="Room" value={student.room_no} />
                            <ViewField label="Joined" value={student.dateOfJoining ? new Date(student.dateOfJoining).toLocaleDateString() : 'N/A'} />
                            <ViewField label="Status" value={student.status} />
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
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
