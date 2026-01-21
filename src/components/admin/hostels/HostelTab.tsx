import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Hostel } from './types';
import { StatusBadge } from './HostelComponents';

interface HostelTabProps {
    hostels: Hostel[];
    onEdit: (hostel: Hostel) => void;
    onDelete: (id: string) => void;
}

export const HostelTab: React.FC<HostelTabProps> = ({ hostels, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rooms</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Warden</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {hostels.map((hostel) => (
                        <tr key={hostel.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div>
                                    <div className="font-semibold text-gray-900">{hostel.name}</div>
                                    <div className="text-sm text-gray-600">{hostel.address}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{hostel.type}</td>
                            <td className="px-6 py-4 text-gray-900">{hostel.rooms}</td>
                            <td className="px-6 py-4 text-gray-900">{hostel.warden}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={hostel.status} />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(hostel)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Edit Hostel"
                                    >
                                        <Edit className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(hostel.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Hostel"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {hostels.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                No hostels found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
