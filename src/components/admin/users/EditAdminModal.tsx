import React, { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { AdminUser, AdminForm } from './types';
import { InputField } from './UserComponents';

interface EditAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: AdminUser | null;
    onSave: (id: string, form: AdminForm) => void;
}

export const EditAdminModal: React.FC<EditAdminModalProps> = ({ isOpen, onClose, admin, onSave }) => {
    const [formData, setFormData] = useState<AdminForm>({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        designation: '',
        empId: ''
    });

    useEffect(() => {
        if (admin) {
            setFormData({
                fullName: admin.fullName,
                email: admin.email,
                phone: admin.phone || '',
                gender: admin.gender || '',
                dob: admin.dob ? admin.dob.split('T')[0] : '',
                designation: admin.designation,
                empId: admin.empId || ''
            });
        }
    }, [admin]);

    if (!isOpen || !admin) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(admin.id, formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[95vh] overflow-y-auto">
                <div className="bg-amber-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <ShieldCheck className="w-5 h-5" />
                        <h2 className="text-xl font-bold">Edit Administrator</h2>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-4">
                        <InputField
                            label="Full Name"
                            value={formData.fullName}
                            onChange={(val) => setFormData({ ...formData, fullName: val })}
                            placeholder="Enter full name"
                        />
                        <InputField
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(val) => setFormData({ ...formData, email: val })}
                            placeholder="admin@example.com"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Gender</label>
                                <select
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <InputField
                                label="Date of Birth"
                                type="date"
                                value={formData.dob}
                                onChange={(val) => setFormData({ ...formData, dob: val })}
                            />
                        </div>
                        <InputField
                            label="Phone Number"
                            value={formData.phone}
                            onChange={(val) => setFormData({ ...formData, phone: val })}
                            placeholder="10-digit number"
                        />
                        <InputField
                            label="Designation"
                            value={formData.designation}
                            onChange={(val) => setFormData({ ...formData, designation: val })}
                            placeholder="e.g. Staff Admin"
                        />
                        <InputField
                            label="Employee ID (Optional)"
                            value={formData.empId || ''}
                            onChange={(val) => setFormData({ ...formData, empId: val })}
                            placeholder="ADM-XXXX"
                            required={false}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-gray-700 font-semibold border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors order-2 sm:order-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-shadow shadow-lg shadow-amber-100 order-1 sm:order-2"
                        >
                            Update Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
