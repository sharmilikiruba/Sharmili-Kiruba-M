import React from 'react';
import { X, Edit3 } from 'lucide-react';
import { StudentForm } from './StudentForm';
import { StudentFormData, StudentPhotos } from './types';

interface EditStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    formData: StudentFormData;
    setFormData: (data: StudentFormData) => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    setFormData,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 sm:duration-200">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center z-10 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-2xl">
                            <Edit3 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Edit Student Profile</h3>
                            <p className="text-sm font-medium text-gray-500">Update details for {formData.fullName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-all active:scale-95"
                    >
                        Discard Changes
                    </button>
                    <button
                        onClick={onSubmit}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                    >
                        Update Information
                    </button>
                </div>
            </div>
        </div>
    );
};
