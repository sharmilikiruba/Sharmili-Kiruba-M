import { X, Check, Phone, Mail, MapPin, User, Calendar, AlertCircle } from 'lucide-react';
import { Request } from './types';

interface RequestDetailsModalProps {
    request: Request;
    isOpen: boolean;
    onClose: () => void;
    onApprove: (id: string, name: string) => void;
    onReject: (id: string, name: string) => void;
}

export function RequestDetailsModal({
    request,
    isOpen,
    onClose,
    onApprove,
    onReject,
}: RequestDetailsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            ID: <span className="font-mono text-gray-700">{request.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${request.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {request.priority}
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-8 max-h-[70vh] overflow-y-auto">
                    {/* Visitor Profile */}
                    <div className="flex items-start gap-6 mb-8">
                        <img
                            src={request.visitorPhoto}
                            alt={request.visitorName}
                            className="w-24 h-24 rounded-2xl object-cover shadow-md"
                        />
                        <div className="flex-1">
                            <h4 className="text-2xl font-bold text-gray-900 mb-1">{request.visitorName}</h4>
                            <p className="text-gray-600 font-medium mb-3">{request.relation}</p>

                            <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{request.visitorDetails.mobile}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{request.visitorDetails.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 col-span-2">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{request.visitorDetails.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visit Info */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                            <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-600" />
                                Student Details
                            </h5>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900">{request.studentName}</p>
                                <p className="text-xs text-gray-600">{request.hostelBlock}</p>
                                <p className="text-xs text-gray-600">{request.room}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                            <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                Visit Schedule
                            </h5>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium text-gray-900">{request.date}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Time:</span>
                                    <span className="font-medium text-gray-900">{request.time}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Purpose:</span>
                                    <span className="font-medium text-gray-900">{request.purpose}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ID Proof Section */}
                    <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            ID Verification
                        </h5>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
                            <div className="text-sm text-blue-800">
                                <span className="font-semibold">ID Proof Provided:</span> {request.visitorDetails.idProof}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer (Actions) */}
                <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                        onClick={() => onReject(request.id, request.visitorName)}
                        className="px-5 py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    >
                        Reject Request
                    </button>
                    <button
                        onClick={() => onApprove(request.id, request.visitorName)}
                        className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm transition-all hover:shadow-md flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Approve Request
                    </button>
                </div>
            </div>
        </div>
    );
}
