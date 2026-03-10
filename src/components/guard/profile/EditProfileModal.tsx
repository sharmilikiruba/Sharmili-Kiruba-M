import React, { useState } from 'react';
import { ProfileData } from './types';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ProfileData;
    onSave: (updatedData: ProfileData) => void;
}

export function EditProfileModal({ isOpen, onClose, data, onSave }: EditProfileModalProps) {
    const [editForm, setEditForm] = useState({ ...data });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editForm);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text"
                                value={editForm.fullName}
                                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all outline-none text-sm font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Date of Birth</label>
                            <input
                                type="date"
                                value={editForm.dateOfBirth}
                                onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all outline-none text-sm font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Mobile Number</label>
                            <input
                                type="text"
                                value={editForm.mobileNumber}
                                onChange={(e) => setEditForm({ ...editForm, mobileNumber: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all outline-none text-sm font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Alternate Mobile</label>
                            <input
                                type="text"
                                value={editForm.alternateMobile}
                                onChange={(e) => setEditForm({ ...editForm, alternateMobile: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all outline-none text-sm font-semibold"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all outline-none text-sm font-semibold"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Residential Address</label>
                            <textarea
                                value={editForm.address}
                                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all outline-none text-sm font-semibold resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
