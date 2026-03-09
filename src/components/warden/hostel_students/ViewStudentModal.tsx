import React from 'react';
import {
    X,
    Phone,
    Mail,
    Home,
    GraduationCap,
    Calendar,
    User,
    MapPin
} from 'lucide-react';
import { Student } from './types'; // student prop uses the Student interface which we updated

interface ViewStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
}

export const ViewStudentModal: React.FC<ViewStudentModalProps> = ({
    isOpen,
    onClose,
    student
}) => {
    if (!isOpen) return null;

    const DetailItem = ({
        icon: Icon,
        label,
        value,
        color = 'blue'
    }: {
        icon: any;
        label: string;
        value?: string;
        color?: string;
    }) => (
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/80 flex items-start gap-4 transition-all hover:bg-white hover:shadow-sm">
            <div className={`bg-${color}-100 p-2.5 rounded-lg`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    {label}
                </p>
                <p className="text-sm font-bold text-gray-900">
                    {value || 'N/A'}
                </p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                {/* Banner Section */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-r from-blue-700 to-indigo-800 p-4 sm:p-8 flex items-end">
                    <button
                        onClick={onClose}
                        className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-8 translate-y-16 sm:translate-y-20 w-full sm:w-auto">
                        <div className="relative">
                            <img
                                src={student.photo || 'https://via.placeholder.com/150'}
                                alt={student.fullName}
                                className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl sm:rounded-3xl object-cover border-4 sm:border-8 border-white shadow-2xl"
                            />
                            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-4 border-white shadow-lg" />
                        </div>

                        <div className="pb-0 sm:pb-8 text-center sm:text-left">
                            <h3 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">
                                {student.fullName}
                            </h3>
                            <div className="flex justify-center sm:justify-start gap-2 sm:gap-3">
                                <span className="bg-white/20 text-white text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                                    {student.rollNumber}
                                </span>
                                <span className="bg-white/20 text-white text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                                    Room {student.room_no || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-4 sm:p-8 pt-20 sm:pt-24 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <DetailItem icon={Mail} label="University Email" value={student.email} />
                        <DetailItem icon={Phone} label="Primary Contact" value={student.phone} />
                        <DetailItem icon={Phone} label="Parent Contact" value={student.parent_phone} />
                        <DetailItem icon={GraduationCap} label="Department" value={student.department} />
                        <DetailItem icon={Calendar} label="Education Year" value={student.year} />
                        <DetailItem icon={Home} label="Current Semester" value={student.semester} />
                        <DetailItem icon={User} label="Gender" value={student.gender} />
                        <DetailItem icon={Calendar} label="Date of Birth" value={student.dob} />
                        <DetailItem icon={Calendar} label="Date Joined" value={student.dateOfJoining ? new Date(student.dateOfJoining).toLocaleDateString() : 'N/A'} />
                        <DetailItem icon={MapPin} label="Permanent Address" value={student.address} />
                    </div>
                </div>

                {/* Footer actions */}
                <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 flex justify-end rounded-b-[2rem]">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95 text-sm sm:text-base"
                    >
                        Close Profile
                    </button>
                </div>
            </div>
        </div>
    );
};
