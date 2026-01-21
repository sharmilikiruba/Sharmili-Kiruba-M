import { X } from 'lucide-react';
import { BlacklistFormData } from './types';
import { useState, useEffect } from 'react';

interface BlacklistModalProps {
    isOpen: boolean;
    isEditMode: boolean;
    onClose: () => void;
    onSubmit: (data: BlacklistFormData) => void;
    initialData?: BlacklistFormData;
}

export function BlacklistModal({
    isOpen,
    isEditMode,
    onClose,
    onSubmit,
    initialData,
}: BlacklistModalProps) {
    const [formData, setFormData] = useState<BlacklistFormData>({
        visitorName: '',
        idProof: '',
        idType: 'Aadhar',
        reason: '',
    });

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData(initialData);
        } else if (isOpen) {
            setFormData({
                visitorName: '',
                idProof: '',
                idType: 'Aadhar',
                reason: '',
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEditMode ? 'Edit Blocklist Entry' : 'Add to Blocklist'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Visitor Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.visitorName}
                            onChange={(e) =>
                                setFormData({ ...formData, visitorName: e.target.value })
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter visitor's full name"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ID Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.idType}
                                onChange={(e) =>
                                    setFormData({ ...formData, idType: e.target.value })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                            >
                                <option value="Aadhar">Aadhar</option>
                                <option value="Driving License">Driving License</option>
                                <option value="Passport">Passport</option>
                                <option value="Voter ID">Voter ID</option>
                                <option value="PAN Card">PAN Card</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ID Number
                            </label>
                            <input
                                type="text"
                                value={formData.idProof}
                                onChange={(e) =>
                                    setFormData({ ...formData, idProof: e.target.value })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter ID number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason for Blocklisting{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            required
                            value={formData.reason}
                            onChange={(e) =>
                                setFormData({ ...formData, reason: e.target.value })
                            }
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                            placeholder="Explain why this visitor is being blocked..."
                        />
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800 flex items-start gap-2">
                            <span className="text-amber-500 font-bold mt-0.5">⚠️</span>
                            <span>
                                <strong>Important:</strong> This visitor will be blocked from
                                all entry points. Make sure to document the reason clearly.
                            </span>
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            {isEditMode ? 'Save Changes' : 'Add to Blocklist'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
