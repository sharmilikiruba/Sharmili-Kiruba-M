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
        <div className="p-8">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="bg-white p-6 rounded-lg border flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome, Rahul Sharma</h1>
                        <p className="text-gray-600">Krishna Hostel • Room A-204</p>
                    </div>

                    <button
                        onClick={onOpenNewRequest}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        New Request
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg border flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by visitor name"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="pl-4 pr-10 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-[150px]"
                        >
                            {allStatuses.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border rounded-lg overflow-x-auto shadow-sm">
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
                                        <td className="px-6 py-4 text-gray-700">{r.visitDate}</td>
                                        <td className="px-6 py-4 text-gray-700">{r.purpose}</td>
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
