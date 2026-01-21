import React from 'react';
import { X, Info } from 'lucide-react';
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Student Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-800 mt-0.5" />
                        <span className="text-sm text-blue-800">
                            <strong>Read-Only View:</strong> Students are managed by their respective wardens.
                            Contact the warden of <strong>{student.hostel}</strong> to make changes.
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <ViewField label="Full Name" value={student.name} />
                        <ViewField label="Roll Number" value={student.rollNo} />
                        <ViewField label="Email" value={student.email} />
                        <ViewField label="Contact" value={student.contact || 'N/A'} />
                        <ViewField label="Department" value={student.department} />
                        <ViewField label="Hostel" value={student.hostel} />
                        <ViewField label="Room" value={student.room} />
                        <ViewField label="Status" value={student.status} />
                    </div>
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
