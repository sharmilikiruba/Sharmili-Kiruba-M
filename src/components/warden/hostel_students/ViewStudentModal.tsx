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
import { Student } from './types';

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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                {/* Banner Section */}
                <div className="relative h-48 bg-gradient-to-r from-blue-700 to-indigo-800 p-8 flex items-end">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-8 translate-y-20">
                        <div className="relative">
                            <img
                                src={student.photo || 'https://via.placeholder.com/150'}
                                alt={student.name}
                                className="w-40 h-40 rounded-3xl object-cover border-8 border-white shadow-2xl"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg" />
                        </div>

                        <div className="pb-8">
                            <h3 className="text-4xl font-bold text-white mb-3">
                                {student.name}
                            </h3>
                            <div className="flex gap-3">
                                <span className="bg-white/20 text-white text-[11px] font-bold px-4 py-1.5 rounded-full">
                                    {student.rollNumber}
                                </span>
                                <span className="bg-white/20 text-white text-[11px] font-bold px-4 py-1.5 rounded-full">
                                    Room {student.roomNumber}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-8 pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DetailItem icon={Mail} label="University Email" value={student.email} />
                        <DetailItem icon={Phone} label="Primary Contact" value={student.mobile} />
                        <DetailItem icon={GraduationCap} label="Department" value={student.department} />
                        <DetailItem icon={Calendar} label="Education Year" value={student.year} />
                        <DetailItem icon={Home} label="Current Semester" value={student.semester} />
                        <DetailItem icon={User} label="Gender" value={student.gender} />
                        <DetailItem icon={Calendar} label="Date of Birth" value={student.dob} />
                        <DetailItem icon={MapPin} label="Permanent Address" value={student.address} />
                    </div>
                </div>

                {/* Footer actions */}
                <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-8 py-5 border-t border-gray-100 flex justify-end rounded-b-[2rem]">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                    >
                        Close Profile
                    </button>
                </div>
            </div>
        </div>
    );
};
