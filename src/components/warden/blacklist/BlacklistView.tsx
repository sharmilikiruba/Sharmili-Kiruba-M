import { Shield, Search, Plus, Edit, ChevronDown, Users, User as UserIcon } from 'lucide-react';
import { BlacklistEntry } from './types';

interface BlacklistViewProps {
    currentUser: { name: string; role: 'warden' | 'admin' };
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: 'all' | 'active' | 'removed';
    onStatusFilterChange: (value: 'all' | 'active' | 'removed') => void;
    showStatusDropdown: boolean;
    setShowStatusDropdown: (value: boolean) => void;
    filteredBlacklist: BlacklistEntry[];
    onAddClick: () => void;
    onEditClick: (entry: BlacklistEntry) => void;
    formatDate: (dateString: string) => string;
}

export function BlacklistView({
    currentUser,
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    showStatusDropdown,
    setShowStatusDropdown,
    filteredBlacklist,
    onAddClick,
    onEditClick,
    formatDate,
}: BlacklistViewProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Blocklist Management
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage blocked visitors for Krishna Hostel
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    <UserIcon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {currentUser.name}
                                    </div>
                                    <div className="text-xs">
                                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider">
                                            {currentUser.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-blue-900">
                                Warden Permissions
                            </h3>
                            <p className="text-sm text-blue-700 mt-0.5">
                                You can add and update blocklist entries for your hostel. Admin
                                entries are read-only. Only Admin can remove entries.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-8 py-6">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    {/* Section Header */}
                    <div className="p-6 border-b border-gray-200 bg-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <Users className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Blacklisted Visitors
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Blocked visitors who are not allowed entry to Krishna Hostel
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onAddClick}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm active:scale-95"
                            >
                                <Plus className="w-4 h-4" />
                                Add to Blocklist
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="p-6 border-b border-gray-200 flex items-center gap-4 bg-gray-50/50">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white min-w-[150px] justify-between shadow-sm"
                            >
                                <span className="text-sm text-gray-700 capitalize">
                                    {statusFilter === 'all' ? 'All Status' : statusFilter}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showStatusDropdown && (
                                <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    {(['all', 'active', 'removed'] as const).map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                onStatusFilterChange(status);
                                                setShowStatusDropdown(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors capitalize ${statusFilter === status
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700'
                                                }`}
                                        >
                                            {status === 'all' ? 'All Status' : status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Visitor
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        ID Proof
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Reason
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Added By
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredBlacklist.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-20 text-center text-gray-500"
                                        >
                                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                                <Users className="w-10 h-10 text-gray-300" />
                                            </div>
                                            <p className="text-base font-semibold text-gray-900">
                                                No blocklisted visitors found
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                                                {searchQuery
                                                    ? 'Try adjusting your search or filters to find what you are looking for.'
                                                    : 'Add visitors to the blocklist to restrict their entry to the hostel campus.'}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBlacklist.map((entry) => (
                                        <tr
                                            key={entry.id}
                                            className="hover:bg-gray-50/80 transition-colors"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="font-semibold text-gray-900">
                                                    {entry.visitorName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {entry.idProof}
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium">
                                                    {entry.idType}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm text-gray-700 max-w-xs leading-relaxed">
                                                    {entry.reason}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {entry.addedBy}
                                                </div>
                                                <div className="mt-1">
                                                    <span
                                                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${entry.role === 'warden'
                                                            ? 'bg-gray-100 text-gray-700'
                                                            : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                    >
                                                        {entry.role}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {formatDate(entry.date)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${entry.status === 'active'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-green-100 text-green-700'
                                                        }`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${entry.status === 'active' ? 'bg-red-600' : 'bg-green-600'}`}></span>
                                                    {entry.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    {entry.role === 'warden' ||
                                                        currentUser.role === 'admin' ? (
                                                        <button
                                                            onClick={() => onEditClick(entry)}
                                                            className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg transition-all text-gray-600 hover:text-blue-600"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    ) : (
                                                        <span className="text-[10px] text-gray-400 px-2 font-bold uppercase tracking-widest bg-gray-50 rounded py-1">
                                                            LOCKED
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown (handled in container, but visuals here) */}
        </div>
    );
}
