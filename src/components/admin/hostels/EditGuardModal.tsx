import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GuardAssignment, AssignmentForm, Hostel, Gate } from './types';
import { InputField, SelectField } from './HostelComponents';

interface EditGuardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, form: AssignmentForm) => void;
    assignment: GuardAssignment | null;
    hostels: Hostel[];
    gates: Gate[];
}

export const EditGuardModal: React.FC<EditGuardModalProps> = ({ isOpen, onClose, onSave, assignment, hostels, gates }) => {
    const [form, setForm] = useState<AssignmentForm>({
        guard: '',
        hostel: '',
        gate: '',
        shiftStart: '06:00',
        shiftEnd: '14:00',
        status: true
    });

    useEffect(() => {
        if (assignment) {
            setForm({
                guard: assignment.guardName,
                hostel: assignment.hostel,
                gate: assignment.gate,
                shiftStart: assignment.shiftStart,
                shiftEnd: assignment.shiftEnd,
                status: assignment.status === 'Active',
            });
        }
    }, [assignment]);

    if (!isOpen || !assignment) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(assignment.id, form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-900">Edit Assignment</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Guard Name" value={form.guard} onChange={(v) => setForm({ ...form, guard: v })} />

                    <SelectField
                        label="Hostel"
                        value={form.hostel}
                        onChange={(v) => setForm({ ...form, hostel: v, gate: '' })}
                        options={hostels.map(h => ({ value: h.name, label: h.name }))}
                    />

                    <SelectField
                        label="Gate"
                        value={form.gate}
                        onChange={(v) => setForm({ ...form, gate: v })}
                        options={gates.filter(g => g.hostel === form.hostel).map(g => ({ value: g.name, label: g.name }))}
                        disabled={!form.hostel}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Shift Start" type="time" value={form.shiftStart} onChange={(v) => setForm({ ...form, shiftStart: v })} />
                        <InputField label="Shift End" type="time" value={form.shiftEnd} onChange={(v) => setForm({ ...form, shiftEnd: v })} />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Active Status</span>
                        </label>
                    </div>

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
