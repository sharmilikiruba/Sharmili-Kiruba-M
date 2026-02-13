import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WardenForm } from './types';
import { InputField, SelectField } from './UserComponents';

interface AddWardenModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (form: WardenForm) => void;
    hostels: any[];
}

const initialForm: WardenForm = {
    fullName: '',
    email: '',
    mobile: '',
    hostel: '',
    address: '',
    empId: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
    password: ''
};

export const AddWardenModal: React.FC<AddWardenModalProps> = ({ isOpen, onClose, onSave, hostels }) => {
    const [form, setForm] = useState<WardenForm>(initialForm);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        setForm(initialForm);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Add New Warden</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Joining Date" value={form.dateOfJoining} onChange={() => { }} type="date" disabled={true} />
                    <InputField label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <InputField label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
                    <InputField label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
                    <InputField label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                    <SelectField label="Hostel" value={form.hostel} onChange={(v) => setForm({ ...form, hostel: v })} options={hostels.map(h => ({ value: h.hostel_name, label: h.hostel_name }))} />

                    <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        Create Warden
                    </button>
                </form>
            </div>
        </div>
    );
};
