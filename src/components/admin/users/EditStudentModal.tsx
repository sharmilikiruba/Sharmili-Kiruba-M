import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Student, StudentForm } from './types';
import { InputField, SelectField } from './UserComponents';

interface EditStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, form: StudentForm) => void;
    student: Student | null;
    hostels: any[];
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, onSave, student, hostels }) => {
    const [form, setForm] = useState<StudentForm>({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        rollNumber: '',
        course: '',
        department: '',
        currentYear: '',
        semester: '',
        hostel: '',
        room_no: '',
        parentName: '',
        parentPhone: '',
        guardianName: '',
        guardianContact: '',
    });

    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (student) {
            setForm({
                fullName: student.fullName || '',
                email: student.email || '',
                phone: student.phone || '',
                gender: student.gender || '',
                dob: student.dob || '',
                rollNumber: student.rollNumber || '',
                course: student.course || '',
                department: student.department || '',
                currentYear: student.currentYear || '',
                semester: student.semester || '',
                hostel: student.hostel || '',
                room_no: student.room_no || '',
                parentName: student.parentName || '',
                parentPhone: student.parentPhone || '',
                guardianName: student.guardianName || '',
                guardianContact: student.guardianContact || '',
            });
            setError('');
        }
    }, [student, isOpen]);

    if (!isOpen || !student) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const res: any = await onSave(student.id, form);
        if (res && res.success === false) {
            setError(res.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-xl sm:rounded-xl max-w-lg w-full max-h-screen sm:max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Edit Student</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}
                    <InputField label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <InputField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                            label="Gender"
                            value={form.gender}
                            onChange={(v) => setForm({ ...form, gender: v })}
                            options={["Male", "Female", "Other"]}
                        />
                        <InputField
                            label="Date of Birth"
                            type="date"
                            value={form.dob}
                            onChange={(v) => setForm({ ...form, dob: v })}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Roll Number" value={form.rollNumber} onChange={(v) => setForm({ ...form, rollNumber: v })} />
                        <InputField label="Course" value={form.course} onChange={(v) => setForm({ ...form, course: v })} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Department" value={form.department} onChange={(v) => setForm({ ...form, department: v })} />
                        <InputField label="Current Year" value={form.currentYear} onChange={(v) => setForm({ ...form, currentYear: v })} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Semester" value={form.semester} onChange={(v) => setForm({ ...form, semester: v })} />
                        <SelectField
                            label="Hostel"
                            value={form.hostel}
                            onChange={(v) => setForm({ ...form, hostel: v })}
                            options={hostels.map(h => ({ value: h.hostel_name, label: h.hostel_name }))}
                        />
                    </div>
                    <InputField label="Room Number" value={form.room_no} onChange={(v) => setForm({ ...form, room_no: v })} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Parent Name" value={form.parentName || ''} onChange={(v) => setForm({ ...form, parentName: v })} required={false} />
                        <InputField label="Parent Phone" value={form.parentPhone || ''} onChange={(v) => setForm({ ...form, parentPhone: v })} required={false} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Guardian Name" value={form.guardianName || ''} onChange={(v) => setForm({ ...form, guardianName: v })} required={false} />
                        <InputField label="Guardian Contact" value={form.guardianContact || ''} onChange={(v) => setForm({ ...form, guardianContact: v })} required={false} />
                    </div>

                    <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};
