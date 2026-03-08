import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Guard, GuardForm } from './types';
import { InputField, SelectField } from './UserComponents';
import apiClient from '@/lib/api-client';

interface EditGuardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, form: GuardForm) => void;
    guard: Guard | null;
}

const initialForm: GuardForm = {
    fullName: '',
    email: '',
    phone: '',
    gender: 'M',
    dob: '',
    designation: 'Security',
    gate_id: undefined,
    shift_type: 'Day',
    shift_start_time: '',
    shift_end_time: '',
    address: '',
    empId: '',
    dateOfJoining: '',
};

export const EditGuardModal: React.FC<EditGuardModalProps> = ({ isOpen, onClose, onSave, guard }) => {
    const [form, setForm] = useState<GuardForm>(initialForm);
    const [gates, setGates] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchGates();
        }
    }, [isOpen]);

    const fetchGates = async () => {
        try {
            const response = await apiClient.get('/admin/gates');
            if (response.data.success) {
                setGates(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching gates:', error);
        }
    };

    useEffect(() => {
        if (guard) {
            setForm({
                fullName: guard.fullName || '',
                email: guard.email || '',
                phone: guard.phone || '',
                gender: guard.gender === 'Male' ? 'M' : guard.gender === 'Female' ? 'F' : (guard.gender as any) || 'M',
                dob: guard.dob || '',
                designation: guard.designation || 'Security',
                gate_id: guard.gate_id,
                shift_type: guard.shift_type || 'Day',
                shift_start_time: guard.shift_start_time || '',
                shift_end_time: guard.shift_end_time || '',
                address: guard.address || '',
                empId: guard.empId || '',
                dateOfJoining: guard.dateOfJoining || '',
            });
        }
    }, [guard]);

    if (!isOpen || !guard) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(guard.id, form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-xl sm:rounded-xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Edit Guard</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Employee ID" value={form.empId || ''} onChange={() => { }} disabled={true} />
                        <InputField label="Joining Date" value={form.dateOfJoining || ''} onChange={() => { }} type="date" disabled={true} />
                    </div>
                    <InputField label="Full Name" value={form.fullName || ''} onChange={(v) => setForm({ ...form, fullName: v })} />
                    <InputField label="Email" type="email" value={form.email || ''} onChange={(v) => setForm({ ...form, email: v })} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField label="Gender" value={form.gender || 'M'} onChange={(v) => setForm({ ...form, gender: v as any })} options={["M", "F", "Other"]} />
                        <InputField label="Date of Birth" type="date" value={form.dob || ''} onChange={(v) => setForm({ ...form, dob: v })} />
                    </div>

                    <InputField label="Designation" value={form.designation || ''} onChange={(v) => setForm({ ...form, designation: v })} />
                    <InputField label="Phone" value={form.phone || ''} onChange={(v) => setForm({ ...form, phone: v })} />
                    <InputField label="Address" value={form.address || ''} onChange={(v) => setForm({ ...form, address: v })} />

                    <SelectField
                        label="Assigned Gate"
                        value={form.gate_id?.toString() || ''}
                        onChange={(v) => setForm({ ...form, gate_id: v ? parseInt(v) : undefined })}
                        options={gates.map(g => ({ label: g.gate_name, value: g.gate_id.toString() }))}
                    />

                    <div className="grid grid-cols-1">
                        <SelectField label="Shift Type" value={form.shift_type} onChange={(v) => setForm({ ...form, shift_type: v as any })} options={["Day", "Night", "Rotating"]} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Shift Start" type="time" value={form.shift_start_time || ''} onChange={(v) => setForm({ ...form, shift_start_time: v })} />
                        <InputField label="Shift End" type="time" value={form.shift_end_time || ''} onChange={(v) => setForm({ ...form, shift_end_time: v })} />
                    </div>

                    <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};
