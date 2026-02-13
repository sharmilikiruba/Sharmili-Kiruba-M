'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { GateForm, Hostel } from './types';
import { InputField, SelectField } from './HostelComponents';

interface AddGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (form: GateForm) => void;
    hostels: Hostel[];
}

const initialForm: GateForm = {
    gateName: '',
    gateNo: '',
    hostel: '',
    hostel_id: 0,
    location: '',
    gateType: '',
    guard: '',
    guard_id: undefined
};

export const AddGateModal: React.FC<AddGateModalProps> = ({ isOpen, onClose, onSave, hostels }) => {
    const [form, setForm] = useState<GateForm>(initialForm);
    const [guards, setGuards] = useState<any[]>([]);

    React.useEffect(() => {
        if (isOpen) {
            fetchGuards();
        }
    }, [isOpen]);

    const fetchGuards = async () => {
        try {
            const apiClient = (await import('@/lib/api-client')).default;
            const response = await apiClient.get('/admin/guards');
            if (response.data.success) {
                setGuards(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching guards:', error);
        }
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        setForm(initialForm);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-900">Add New Gate</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Gate Name" value={form.gateName} onChange={(v) => setForm({ ...form, gateName: v })} placeholder="e.g., Main Gate" />
                    <InputField label="Gate Number" value={form.gateNo} onChange={(v) => setForm({ ...form, gateNo: v })} placeholder="G-1" />
                    <SelectField
                        label="Hostel"
                        value={form.hostel}
                        onChange={(v) => {
                            const selected = hostels.find(h => h.name === v);
                            setForm({ ...form, hostel: v, hostel_id: selected ? parseInt(selected.id) : 0 });
                        }}
                        options={hostels.map(h => ({ value: h.name, label: h.name }))}
                    />
                    <InputField label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="North Wing" />
                    <SelectField
                        label="Gate Type"
                        value={form.gateType}
                        onChange={(v) => setForm({ ...form, gateType: v })}
                        options={["Entry & Exit", "Entry Only", "Exit Only"]}
                    />
                    <SelectField
                        label="Assign Guard (Optional)"
                        value={form.guard_id?.toString() || ''}
                        onChange={(v) => {
                            const selectedGuard = guards.find(g => g.guard_id?.toString() === v);
                            setForm({
                                ...form,
                                guard_id: v ? parseInt(v) : undefined,
                                guard: selectedGuard ? selectedGuard.name : ''
                            });
                        }}
                        options={guards.map(g => ({
                            label: g.name || 'Unknown',
                            value: g.guard_id?.toString() || ''
                        }))}
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
