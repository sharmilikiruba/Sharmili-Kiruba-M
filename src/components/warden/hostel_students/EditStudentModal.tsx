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
    photos: StudentPhotos;
    onPhotoUpload: (type: keyof StudentPhotos, e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemovePhoto: (type: keyof StudentPhotos) => void;
    departments: string[];
    years: string[];
    semesters: string[];
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    setFormData,
    photos,
    onPhotoUpload,
    onRemovePhoto,
    departments,
    years,
    semesters,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center z-10 transition-colors">
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

                <div className="p-8 pb-32">
                    <StudentForm
                        formData={formData}
                        setFormData={setFormData}
                        photos={photos}
                        onPhotoUpload={onPhotoUpload}
                        onRemovePhoto={onRemovePhoto}
                        departments={departments}
                        years={years}
                        semesters={semesters}
                    />
                </div>

                <div className="fixed bottom-0 left-0 right-0 max-w-4xl mx-auto p-8 pointer-events-none">
                    <div className="flex gap-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-2xl pointer-events-auto">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3.5 border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Discard Changes
                        </button>
                        <button
                            onClick={onSubmit}
                            className="flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                        >
                            Update Information
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
