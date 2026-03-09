import { Search, Eye, ChevronDown, Plus } from 'lucide-react';
import { Request } from './types';
import { StatusBadge } from './StatusBadge';

interface MyRequestsViewProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
    allStatuses: string[];
    filteredRequests: Request[];
    onOpenNewRequest: () => void;
    onViewRequest: (request: Request) => void;
}

export function MyRequestsView({
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    allStatuses,
    filteredRequests,
    onOpenNewRequest,
    onViewRequest,
}: MyRequestsViewProps) {
    return (
        <div className="p-4 sm:p-8 pb-10">
            <div className="max-w-[1400px] mx-auto space-y-4 sm:space-y-6">

                {/* Header */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">My Requests</h1>
                        <p className="text-gray-600 text-sm mt-0.5">Track and manage your visitor requests</p>
                    </div>
                    <button
                        onClick={onOpenNewRequest}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 font-semibold active:scale-[0.98] w-full sm:w-auto"
                    >
                        <Plus size={18} />
                        New Request
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl border flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by visitor name"
                            className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full sm:w-auto pl-4 pr-10 py-2.5 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            {allStatuses.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden space-y-3">
                    {filteredRequests.length > 0 ? filteredRequests.map((r) => (
                        <div key={r.id} className="bg-white border rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-bold text-gray-900">{r.visitorName}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{r.requestId} &bull; {r.relation}</p>
                                </div>
                                <StatusBadge status={r.status} />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                                <div><span className="font-medium text-gray-500">Date</span><br />{r.visitDate}</div>
                                <div><span className="font-medium text-gray-500">Purpose</span><br />{r.purpose}</div>
                            </div>
                            <button
                                onClick={() => onViewRequest(r)}
                                className="w-full py-2.5 text-center text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Eye size={14} /> View Details
                            </button>
                        </div>
                    )) : (
                        <div className="bg-white border rounded-xl p-8 text-center text-gray-500 italic text-sm">
                            No requests found.
                        </div>
                    )}
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block bg-white border rounded-xl overflow-x-auto shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                {[
                                    'Request ID',
                                    'Visitor',
                                    'Relation',
                                    'Date',
                                    'Purpose',
                                    'Status',
                                    'Action',
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left px-6 py-3 text-xs text-gray-600 uppercase font-semibold tracking-wider"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{r.requestId}</td>
                                        <td className="px-6 py-4 text-gray-700">{r.visitorName}</td>
                                        <td className="px-6 py-4 text-gray-700">{r.relation}</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            <div>{r.visitDate}</div>
                                            {r.status === 'Approved' && r.approvedStartTime && r.approvedEndTime && (
                                                <div className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 inline-block mt-1">
                                                    {r.approvedStartTime} - {r.approvedEndTime}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            <div>{r.purpose}</div>
                                            {r.status === 'Approved' && r.remarks && (
                                                <div className="text-[10px] text-gray-500 italic truncate max-w-[150px]" title={r.remarks}>
                                                    "{r.remarks}"
                                                </div>
                                            )}
                                            {r.status === 'Rejected' && r.rejectionReason && (
                                                <div className="text-[10px] text-red-500 italic truncate max-w-[150px]" title={r.rejectionReason}>
                                                    "{r.rejectionReason}"
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={r.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => onViewRequest(r)}
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                            >
                                                <Eye size={16} /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic">
                                        No requests found matching your criteria.
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
