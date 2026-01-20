'use client';

import { useState } from 'react';
import {
    Shield,
    Trash2,
    Plus,
    AlertTriangle,
    QrCode,
    Bell,
    X,
} from 'lucide-react';

export default function SecurityManagement() {
    const [blocklist, setBlocklist] = useState([
        {
            name: 'John Doe',
            id: 'XXXX-1234',
            reason: 'Suspicious behavior',
            addedBy: 'Dr. Suresh Kumar',
            date: '2026-01-02',
        },
        {
            name: 'Jane Smith',
            id: 'DL-5678',
            reason: 'Fake ID attempted',
            addedBy: 'Dr. Meera Singh',
            date: '2025-12-28',
        },
    ]);

    const [alerts, setAlerts] = useState([
        {
            message: 'Visitor overstay detected - Room A-204',
            time: '10 mins ago',
            type: 'warning',
        },
        {
            message: 'Emergency pass generated for Medical Emergency',
            time: '30 mins ago',
            type: 'info',
        },
        {
            message: 'Multiple failed QR scan attempts at East Gate',
            time: '1 hour ago',
            type: 'critical',
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({
        name: '',
        id: '',
        reason: '',
    });

    const handleAddBlocklist = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEntry.name || !newEntry.reason) return;

        const newItem = {
            ...newEntry,
            addedBy: 'Admin (You)',
            date: new Date().toISOString().split('T')[0],
        };

        setBlocklist([newItem, ...blocklist]);
        setNewEntry({ name: '', id: '', reason: '' });
        setIsModalOpen(false);
    };

    const handleDelete = (index: number) => {
        if (confirm('Are you sure you want to remove this person from the blocklist?')) {
            const newList = [...blocklist];
            newList.splice(index, 1);
            setBlocklist(newList);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Security Management
                </h1>
                <p className="text-sm text-gray-500">
                    Manage blocklist, emergency passes, and security alerts
                </p>
            </div>

            {/* Blocklist Section */}
            <div className="bg-white border rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-gray-700" />
                        <h2 className="text-lg font-semibold">
                            Blocklist Management
                        </h2>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add to Blocklist
                    </button>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                    Manage blocked visitors who are not allowed entry
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b">
                            <tr className="text-left text-gray-500">
                                <th className="py-3">Name</th>
                                <th>ID Number</th>
                                <th>Reason</th>
                                <th>Added By</th>
                                <th>Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blocklist.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-500">
                                        No records found in blocklist.
                                    </td>
                                </tr>
                            ) : (
                                blocklist.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b last:border-none hover:bg-gray-50"
                                    >
                                        <td className="py-4 font-medium">
                                            {item.name}
                                        </td>
                                        <td>{item.id || '-'}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.addedBy}</td>
                                        <td>{item.date}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                title="Remove from blocklist"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Emergency Pass */}
                <div className="bg-white border rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <QrCode className="w-5 h-5 text-gray-700" />
                        <h2 className="text-lg font-semibold">
                            Emergency Pass
                        </h2>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                        Generate emergency visitor passes that bypass normal approval
                    </p>

                    <button className="btn-primary w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <QrCode className="w-4 h-4" />
                        Generate Emergency Pass
                    </button>
                </div>

                {/* Active Alerts */}
                <div className="bg-white border rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-5 h-5 text-gray-700" />
                        <h2 className="text-lg font-semibold">
                            Active Alerts
                        </h2>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                        Recent security alerts and notifications
                    </p>

                    <div className="space-y-3">
                        {alerts.map((alert, index) => (
                            <div
                                key={index}
                                className="flex gap-3 border rounded-md p-3"
                            >
                                <AlertTriangle
                                    className={`w-4 h-4 mt-0.5 ${alert.type === 'critical'
                                            ? 'text-red-600'
                                            : alert.type === 'warning'
                                                ? 'text-yellow-600'
                                                : 'text-blue-600'
                                        }`}
                                />
                                <div>
                                    <p className="text-sm font-medium">
                                        {alert.message}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {alert.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Add to Blocklist</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddBlocklist} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newEntry.name}
                                    onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ID Number (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={newEntry.id}
                                    onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g., Aadhar, DL"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason for Blocklisting *
                                </label>
                                <textarea
                                    required
                                    value={newEntry.reason}
                                    onChange={(e) => setNewEntry({ ...newEntry, reason: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Explain why this person is blocked..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Add to Blocklist
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
