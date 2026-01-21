import React, { useState } from 'react';
import { X } from 'lucide-react';
import { HostelForm } from './types';
import { InputField, SelectField } from './HostelComponents';

interface AddHostelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (form: HostelForm) => void;
    availableWardens: { id: string, name: string }[];
}

const initialForm: HostelForm = {
    name: '',
    type: '',
    totalRooms: '',
    capacity: '',
    warden: '',
    address: '',
    isNewWarden: false,
    newWardenName: '',
    newWardenEmail: '',
    newWardenContact: ''
};

export const AddHostelModal: React.FC<AddHostelModalProps> = ({ isOpen, onClose, onSave, availableWardens }) => {
    const [form, setForm] = useState<HostelForm>(initialForm);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        setForm(initialForm);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Add New Hostel</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Hostel Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Enter hostel name" />
                    <InputField label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="Enter address" />
                    <SelectField label="Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={["Boys", "Girls", "Co-ed"]} />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Total Rooms" type="number" value={form.totalRooms} onChange={(v) => setForm({ ...form, totalRooms: v })} placeholder="100" />
                        <InputField label="Capacity" type="number" value={form.capacity} onChange={(v) => setForm({ ...form, capacity: v })} placeholder="200" />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 mb-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.isNewWarden}
                                onChange={(e) => setForm({ ...form, isNewWarden: e.target.checked, warden: '' })}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Create New Warden</span>
                        </label>
                    </div>

                    {form.isNewWarden ? (
                        <>
                            <InputField label="Warden Name" value={form.newWardenName} onChange={(v) => setForm({ ...form, newWardenName: v })} placeholder="Enter warden name" />
                            <InputField label="Email" type="email" value={form.newWardenEmail} onChange={(v) => setForm({ ...form, newWardenEmail: v })} placeholder="warden@university.edu" />
                            <InputField label="Contact" type="tel" value={form.newWardenContact} onChange={(v) => setForm({ ...form, newWardenContact: v })} placeholder="+91 98765 43210" />
                        </>
                    ) : (
                        <SelectField
                            label="Assign Warden"
                            value={form.warden}
                            onChange={(v) => setForm({ ...form, warden: v })}
                            options={availableWardens.map(w => ({ value: w.name, label: w.name }))}
                        />
                    )}

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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
