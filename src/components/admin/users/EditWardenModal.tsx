import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Warden, WardenForm } from './types';
import { InputField, SelectField } from './UserComponents';

interface EditWardenModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, form: WardenForm) => void;
    warden: Warden | null;
}

export const EditWardenModal: React.FC<EditWardenModalProps> = ({ isOpen, onClose, onSave, warden }) => {
    const [form, setForm] = useState<WardenForm>({ fullName: '', email: '', mobile: '', hostel: '' });

    useEffect(() => {
        if (warden) {
            setForm({
                fullName: warden.name,
                email: warden.email,
                mobile: warden.contact || '',
                hostel: warden.hostel
            });
        }
    }, [warden]);

    if (!isOpen || !warden) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(warden.id, form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Edit Warden</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <InputField label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
                    <SelectField label="Hostel" value={form.hostel} onChange={(v) => setForm({ ...form, hostel: v })} options={["Krishna Hostel", "Saraswati Hostel", "Ganga Hostel"]} />

                    <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};
