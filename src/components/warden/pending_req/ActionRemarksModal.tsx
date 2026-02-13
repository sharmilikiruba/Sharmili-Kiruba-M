import React, { useState } from 'react';
import { X, Check, AlertCircle, Clock } from 'lucide-react';

interface ActionRemarksModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (remarks: string, startTime?: string, endTime?: string) => void;
    type: 'Approve' | 'Reject';
    visitorName: string;
}

export const ActionRemarksModal: React.FC<ActionRemarksModalProps> = ({ isOpen, onClose, onConfirm, type, visitorName }) => {
    const [remarks, setRemarks] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(remarks, startTime, endTime);
        setRemarks('');
        setStartTime('');
        setEndTime('');
    };

    const isApprove = type === 'Approve';

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className={`px-6 py-4 flex items-center justify-between border-b ${isApprove ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <h3 className={`text-lg font-bold ${isApprove ? 'text-green-800' : 'text-red-800'}`}>
                        {isApprove ? 'Approve Request' : 'Reject Request'}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <AlertCircle className={`w-5 h-5 ${isApprove ? 'text-green-600' : 'text-red-600'}`} />
                        <p className="text-sm text-gray-600">
                            Provide {isApprove ? 'approval details' : 'a reason for rejection (required)'} for <strong>{visitorName}</strong>.
                        </p>
                    </div>

                    {isApprove && (
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
                            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                Set Approved Time Range
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">From</label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">To</label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isApprove ? 'Approval Remarks' : 'Reason for Rejection'}
                        </label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            required={!isApprove}
                            placeholder={isApprove ? "e.g. Please bring original ID proof..." : "e.g. Reason for rejection..."}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-24 text-gray-900"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 px-4 py-2.5 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md ${isApprove ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            Confirm {type}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
