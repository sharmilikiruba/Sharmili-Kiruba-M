import { X, Check } from 'lucide-react';
import { Request } from './types';

interface RequestDetailModalProps {
    request: Request;
    onClose: () => void;
}

export function RequestDetailModal({
    request,
    onClose,
}: RequestDetailModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                        Request {request.requestId}
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Visitor Name</p>
                            <p className="font-semibold">{request.visitorName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Relation</p>
                            <p className="font-semibold">{request.relation}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Purpose</p>
                            <p className="font-semibold">{request.purpose}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Visit Date</p>
                            <p className="font-semibold">{request.visitDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Mobile Number</p>
                            <p className="font-semibold">{request.visitorDetails.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-semibold">{request.status}</p>
                        </div>
                    </div>

                    {request.status === 'Approved' && (request.remarks || (request.approvedStartTime && request.approvedEndTime)) && (
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 space-y-3">
                            <h4 className="text-sm font-bold text-green-800 flex items-center gap-2">
                                <Check size={16} />
                                Approval Details
                            </h4>
                            {request.approvedStartTime && request.approvedEndTime && (
                                <div className="flex items-center gap-2 text-sm text-green-700 bg-white/50 p-2 rounded-lg inline-block">
                                    <span className="font-bold">Approved Time:</span>
                                    <span>{request.approvedStartTime} - {request.approvedEndTime}</span>
                                </div>
                            )}
                            {request.remarks && (
                                <p className="text-sm text-green-700 italic">"{request.remarks}"</p>
                            )}
                        </div>
                    )}

                    {request.status === 'Rejected' && request.rejectionReason && (
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <h4 className="text-sm font-bold text-red-800 mb-1">Rejection Reason</h4>
                            <p className="text-sm text-red-700">{request.rejectionReason}</p>
                        </div>
                    )}

                    {request.status === 'Approved' && request.qrCode && (
                        <div className="bg-blue-50 p-6 rounded-lg text-center border-2 border-dashed border-blue-200">
                            <div className="mb-2 text-sm font-medium text-blue-800 uppercase tracking-wider">Visitor Entry QR Code</div>
                            <div className="bg-white p-4 inline-block rounded shadow-sm">
                                <p className="font-mono text-lg font-bold text-gray-800">{request.qrCode}</p>
                            </div>
                            <p className="mt-3 text-xs text-blue-600">Please show this code at the gate</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-4"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
