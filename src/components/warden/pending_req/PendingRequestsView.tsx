import { Search, Check, X, Eye } from 'lucide-react';
import { Request } from './types';

interface PendingRequestsViewProps {
    requestsCount: number;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filteredRequests: Request[];
    onApprove: (id: string, name: string) => void;
    onReject: (id: string, name: string) => void;
    onViewDetails: (request: Request) => void;
}

export function PendingRequestsView({
    requestsCount,
    searchTerm,
    onSearchChange,
    filteredRequests,
    onApprove,
    onReject,
    onViewDetails,
}: PendingRequestsViewProps) {
    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Pending Requests</h1>
                <p className="text-gray-500 mt-1">
                    {requestsCount} requests awaiting your decision
                </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Visitor Requests
                    </h2>

                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium">Request ID</th>
                                <th className="text-left px-6 py-3 font-medium">Student</th>
                                <th className="text-left px-6 py-3 font-medium">Visitor</th>
                                <th className="text-left px-6 py-3 font-medium">Visit Date</th>
                                <th className="text-left px-6 py-3 font-medium">Purpose</th>
                                <th className="text-left px-6 py-3 font-medium">Priority</th>
                                <th className="text-center px-6 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((req) => (
                                    <tr
                                        key={req.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {req.id}
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">
                                                {req.studentName}
                                            </p>
                                            <p className="text-xs text-gray-500">{req.room}</p>
                                        </td>

                                        <td className="px-6 py-4 flex items-center gap-3">
                                            {req.visitorPhoto ? (
                                                <img
                                                    src={req.visitorPhoto}
                                                    alt="visitor"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                                                    {req.visitorName.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {req.visitorName}
                                                </p>
                                                <p className="text-xs text-gray-500">{req.relation}</p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-gray-900">{req.date}</p>
                                            <p className="text-xs text-gray-500">{req.time}</p>
                                        </td>

                                        <td className="px-6 py-4">{req.purpose}</td>

                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.priority === 'Urgent'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-green-100 text-green-700'
                                                }`}>
                                                {req.priority}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    onClick={() => onApprove(req.id, req.visitorName)}
                                                    className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors"
                                                    title="Approve Request"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => onReject(req.id, req.visitorName)}
                                                    className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
                                                    title="Reject Request"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => onViewDetails(req)}
                                                    className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        No pending requests found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
