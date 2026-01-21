import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Guard, GuardForm } from './types';
import { InputField, SelectField } from './UserComponents';

interface EditGuardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, form: GuardForm) => void;
    guard: Guard | null;
}

export const EditGuardModal: React.FC<EditGuardModalProps> = ({ isOpen, onClose, onSave, guard }) => {
    const [form, setForm] = useState<GuardForm>({ fullName: '', email: '', mobile: '', gate: '', shift: '' });

    useEffect(() => {
        if (guard) {
            setForm({
                fullName: guard.name,
                email: guard.email,
                mobile: guard.contact || '',
                gate: guard.gate,
                shift: guard.shift
            });
        }
    }, [guard]);

    if (!isOpen || !guard) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(guard.id, form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Edit Guard</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <InputField label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
                    <InputField label="Gate" value={form.gate} onChange={(v) => setForm({ ...form, gate: v })} />
                    <SelectField label="Shift" value={form.shift} onChange={(v) => setForm({ ...form, shift: v })} options={["Morning", "Evening", "Night"]} />

                    <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};
