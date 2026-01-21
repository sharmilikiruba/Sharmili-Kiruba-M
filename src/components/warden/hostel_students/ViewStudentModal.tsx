import React from 'react';
import { X, Phone, Mail, Home, GraduationCap, Calendar, User, MapPin, Heart, AlertCircle } from 'lucide-react';
import { Student } from './types';

interface ViewStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
}

export const ViewStudentModal: React.FC<ViewStudentModalProps> = ({ isOpen, onClose, student }) => {
    if (!isOpen) return null;

    const DetailItem = ({ icon: Icon, label, value, color = "blue" }: { icon: any, label: string, value?: string, color?: string }) => (
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/80 flex items-start gap-4 transition-all hover:bg-white hover:shadow-sm">
            <div className={`bg-${color}-100 p-2.5 rounded-lg`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-bold text-gray-900">{value || 'N/A'}</p>
            </div>
        </div>
    );

    const FamilyPhoto = ({ src, label }: { src: string | null | undefined, label: string }) => (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{label}</p>
            <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm transition-all hover:border-blue-400">
                {src ? (
                    <img src={src} alt={label} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-300" />
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
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
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg"></div>
                        </div>
                        <div className="pb-8">
                            <h3 className="text-4xl font-bold text-white tracking-tight leading-none mb-3">{student.name}</h3>
                            <div className="flex gap-3">
                                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
                                    {student.rollNumber}
                                </span>
                                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
                                    Room {student.roomNumber}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailItem icon={Mail} label="University Email" value={student.email} />
                            <DetailItem icon={Phone} label="Primary Contact" value={student.mobile} />
                            <DetailItem icon={GraduationCap} label="Department" value={student.department} />
                            <DetailItem icon={Calendar} label="Education Year" value={student.year} />
                            <DetailItem icon={Home} label="Current Semester" value={student.semester} />
                            <DetailItem icon={MapPin} label="Permanent Address" value="Main Campus, Hostel Block A" />
                        </div>

                        <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 flex items-start gap-5">
                            <div className="bg-blue-600 p-3.5 rounded-xl shadow-lg shadow-blue-600/20">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Health & Emergency</h4>
                                <p className="text-sm font-medium text-gray-500 leading-relaxed mb-6">Verified medical data for campus safety protocols.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Blood Group</span>
                                        <span className="text-lg font-bold text-gray-900">B+ Positive</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Emergency No</span>
                                        <span className="text-lg font-bold text-gray-900">+91 91234 56789</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Family */}
                    <div className="space-y-6">
                        <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gray-900 p-2.5 rounded-xl">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 tracking-tight">Family Registry</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <FamilyPhoto src={student.fatherPhoto} label="Father" />
                                <FamilyPhoto src={student.motherPhoto} label="Mother" />
                            </div>

                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-100">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Guardian Primary</p>
                                    <p className="text-base font-bold text-gray-900">{student.parentName}</p>
                                    <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-blue-600" /> {student.parentMobile}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Local Guardian</p>
                                    <p className="text-base font-bold text-gray-900">{student.guardianName}</p>
                                    <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-blue-600" /> {student.guardianMobile}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">Safety Lock</p>
                                <p className="text-xs font-semibold text-amber-900 leading-relaxed italic">Verified information. Only Admin can modify health records.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
