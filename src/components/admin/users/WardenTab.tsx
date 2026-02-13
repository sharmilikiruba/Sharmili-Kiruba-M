import React from 'react';
import { Edit, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Warden } from './types';
import { UserColumn } from './UserComponents';

interface WardenTabProps {
    wardens: Warden[];
    onEdit: (warden: Warden) => void;
    onView: (warden: Warden) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export const WardenTab: React.FC<WardenTabProps> = ({ wardens, onEdit, onView, onToggleStatus, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Warden</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {wardens.map((warden) => (
                        <tr key={warden.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <UserColumn name={warden.name} email={warden.email} />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{warden.hostel}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{warden.contact}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${warden.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {warden.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {warden.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(warden)}
                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                        title="Edit Details"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onView(warden)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                
                                    <button
                                        onClick={() => onDelete(warden.id)}
                                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                        title="Delete Warden"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {wardens.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                No wardens found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
