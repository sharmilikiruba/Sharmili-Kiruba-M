'use client';

import { useState } from 'react';
import {
    Shield,
    Search,
    Plus,
    Edit,
    X,
    ChevronDown,
    Users,
    Calendar,
    FileText,
    User as UserIcon,
} from 'lucide-react';

interface BlacklistEntry {
    id: string;
    visitorName: string;
    idProof: string;
    idType: string;
    reason: string;
    addedBy: string;
    role: 'warden' | 'admin';
    date: string;
    status: 'active' | 'removed';
}

export default function BlacklistManagement() {
    const [blacklist, setBlacklist] = useState<BlacklistEntry[]>([
        {
            id: '1',
            visitorName: 'Rajesh Kumar',
            idProof: 'XXXX-XXXX-1234',
            idType: 'Aadhar',
            reason: 'Suspicious behavior during visit',
            addedBy: 'Dr. Suresh Kumar',
            role: 'warden',
            date: '2026-01-02',
            status: 'active',
        },
        {
            id: '2',
            visitorName: 'Sanjay Patel',
            idProof: 'DL-5678-9012',
            idType: 'Driving License',
            reason: 'Attempted entry with fake ID',
            addedBy: 'Admin Office',
            role: 'admin',
            date: '2025-12-28',
            status: 'active',
        },
        {
            id: '3',
            visitorName: 'Amit Sharma',
            idProof: 'J1234567',
            idType: 'Passport',
            reason: 'Overstayed multiple times',
            addedBy: 'Dr. Suresh Kumar',
            role: 'warden',
            date: '2025-12-15',
            status: 'removed',
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'removed'>('all');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const [formData, setFormData] = useState({
        visitorName: '',
        idProof: '',
        idType: 'Aadhar',
        reason: '',
    });

    const currentUser: { name: string; role: 'warden' | 'admin' } = {
        name: 'Dr. Suresh Kumar',
        role: 'warden',
    };

    const handleOpenModal = (entry?: BlacklistEntry) => {
        if (entry) {
            setIsEditMode(true);
            setEditingId(entry.id);
            setFormData({
                visitorName: entry.visitorName,
                idProof: entry.idProof,
                idType: entry.idType,
                reason: entry.reason,
            });
        } else {
            setIsEditMode(false);
            setEditingId(null);
            setFormData({
                visitorName: '',
                idProof: '',
                idType: 'Aadhar',
                reason: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.visitorName || !formData.reason) {
            alert('Please fill in all required fields');
            return;
        }

        if (isEditMode && editingId) {
            // Update existing entry
            setBlacklist(
                blacklist.map((entry) =>
                    entry.id === editingId
                        ? {
                            ...entry,
                            visitorName: formData.visitorName,
                            idProof: formData.idProof,
                            idType: formData.idType,
                            reason: formData.reason,
                        }
                        : entry
                )
            );
        } else {
            // Add new entry
            const newEntry: BlacklistEntry = {
                id: Date.now().toString(),
                visitorName: formData.visitorName,
                idProof: formData.idProof,
                idType: formData.idType,
                reason: formData.reason,
                addedBy: currentUser.name,
                role: currentUser.role,
                date: new Date().toISOString().split('T')[0],
                status: 'active',
            };
            setBlacklist([newEntry, ...blacklist]);
        }

        setIsModalOpen(false);
        setFormData({
            visitorName: '',
            idProof: '',
            idType: 'Aadhar',
            reason: '',
        });
    };

    const filteredBlacklist = blacklist.filter((entry) => {
        const matchesSearch =
            entry.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.idProof.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

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
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {currentUser.name}
                                    </div>
                                    <div className="text-xs">
                                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-medium uppercase">
                                            {currentUser.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
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
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                    {/* Section Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-gray-700" />
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
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add to Blocklist
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="p-6 border-b border-gray-200 flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white min-w-[150px] justify-between"
                            >
                                <span className="text-sm text-gray-700 capitalize">
                                    {statusFilter === 'all' ? 'All Status' : statusFilter}
                                </span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>

                            {showStatusDropdown && (
                                <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <button
                                        onClick={() => {
                                            setStatusFilter('all');
                                            setShowStatusDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'all'
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-700'
                                            }`}
                                    >
                                        All Status
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStatusFilter('active');
                                            setShowStatusDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'active'
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-700'
                                            }`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStatusFilter('removed');
                                            setShowStatusDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors rounded-b-lg ${statusFilter === 'removed'
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-700'
                                            }`}
                                    >
                                        Removed
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Visitor
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ID Proof
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Reason
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Added By
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredBlacklist.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-sm font-medium">
                                                No blocklisted visitors found
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {searchQuery
                                                    ? 'Try adjusting your search'
                                                    : 'Add visitors to the blocklist to restrict their entry'}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBlacklist.map((entry) => (
                                        <tr
                                            key={entry.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {entry.visitorName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {entry.idProof}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {entry.idType}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-700 max-w-xs">
                                                    {entry.reason}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {entry.addedBy}
                                                </div>
                                                <div className="text-xs">
                                                    <span
                                                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase ${entry.role === 'warden'
                                                                ? 'bg-gray-100 text-gray-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                    >
                                                        {entry.role}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {formatDate(entry.date)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${entry.status === 'active'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {entry.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    {entry.role === 'warden' ||
                                                        currentUser.role === 'admin' ? (
                                                        <button
                                                            onClick={() => handleOpenModal(entry)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 px-2">
                                                            Admin entry
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

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h2 className="text-xl font-bold text-gray-900">
                                {isEditMode ? 'Edit Blocklist Entry' : 'Add to Blocklist'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
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
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                    placeholder="Explain why this visitor is being blocked..."
                                />
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <p className="text-sm text-amber-800">
                                    <strong>⚠️ Important:</strong> This visitor will be blocked from
                                    all entry points. Make sure to document the reason clearly.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    {isEditMode ? 'Save Changes' : 'Add to Blocklist'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Click outside to close dropdown */}
            {showStatusDropdown && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowStatusDropdown(false)}
                />
            )}
        </div>
    );
}