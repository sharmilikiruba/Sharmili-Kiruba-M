import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Gate, GateForm, Hostel } from './types';
import { InputField, SelectField } from './HostelComponents';

interface EditGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, form: GateForm) => void;
    gate: Gate | null;
    hostels: Hostel[];
}

export const EditGateModal: React.FC<EditGateModalProps> = ({ isOpen, onClose, onSave, gate, hostels }) => {
    const [form, setForm] = useState<GateForm>({
        gateName: '',
        hostel: '',
        gateType: '',
        guard: ''
    });

    useEffect(() => {
        if (gate) {
            setForm({
                gateName: gate.name,
                hostel: gate.hostel,
                gateType: gate.type,
                guard: gate.guard === 'Unassigned' ? '' : gate.guard,
            });
        }
    }, [gate]);

    if (!isOpen || !gate) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(gate.id, form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-900">Edit Gate</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Gate Name" value={form.gateName} onChange={(v) => setForm({ ...form, gateName: v })} />
                    <SelectField
                        label="Hostel"
                        value={form.hostel}
                        onChange={(v) => setForm({ ...form, hostel: v })}
                        options={hostels.map(h => ({ value: h.name, label: h.name }))}
                    />
                    <SelectField
                        label="Gate Type"
                        value={form.gateType}
                        onChange={(v) => setForm({ ...form, gateType: v })}
                        options={["Entry & Exit", "Entry Only", "Exit Only"]}
                    />
                    <InputField label="Assign Guard (Optional)" value={form.guard} onChange={(v) => setForm({ ...form, guard: v })} required={false} />

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
