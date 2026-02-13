'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Hostel, HostelForm } from './types';
import { InputField, SelectField } from './HostelComponents';

interface EditHostelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, form: HostelForm) => void;
    hostel: Hostel | null;
    availableWardens: { id: string, name: string }[];
}

export const EditHostelModal: React.FC<EditHostelModalProps> = ({ isOpen, onClose, onSave, hostel, availableWardens }) => {
    const [form, setForm] = useState<HostelForm>({
        name: '',
        type: '',
        totalRooms: '',
        capacity: '',
        warden: '',
        address: '',
        password: '',
    });

    useEffect(() => {
        if (hostel) {
            setForm({
                name: hostel.name,
                type: hostel.type,
                totalRooms: (hostel.rooms || 0).toString(),
                capacity: (hostel.capacity || 0).toString(),
                warden: hostel.warden,
                address: hostel.address,
                password: '',
            });
        }
    }, [hostel]);

    if (!isOpen || !hostel) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(hostel.id, form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Edit Hostel</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Hostel Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <InputField label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                    <SelectField label="Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={["Boys", "Girls", "Co-ed"]} />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Total Rooms" type="number" value={form.totalRooms} onChange={(v) => setForm({ ...form, totalRooms: v })} />
                        <InputField label="Capacity" type="number" value={form.capacity} onChange={(v) => setForm({ ...form, capacity: v })} />
                    </div>

                    <SelectField
                        label="Assign Warden"
                        value={form.warden}
                        onChange={(v) => setForm({ ...form, warden: v })}
                        options={availableWardens.map(w => ({ value: w.name, label: w.name }))}
                    />

                    <div className="flex gap-3 mt-6 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
