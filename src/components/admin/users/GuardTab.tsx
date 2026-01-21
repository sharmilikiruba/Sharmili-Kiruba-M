import React from 'react';
import { Edit, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Guard } from './types';
import { UserColumn } from './UserComponents';

interface GuardTabProps {
    guards: Guard[];
    onEdit: (guard: Guard) => void;
    onView: (guard: Guard) => void;
    onToggleStatus: (id: string) => void;
}

export const GuardTab: React.FC<GuardTabProps> = ({ guards, onEdit, onView, onToggleStatus }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guard</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gate</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Shift</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {guards.map((guard) => (
                        <tr key={guard.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <UserColumn name={guard.name} email={guard.email} />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{guard.gate}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{guard.shift}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{guard.contact}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${guard.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {guard.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {guard.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(guard)}
                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                        title="Edit Details"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onView(guard)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onToggleStatus(guard.id)}
                                        className={`p-2 rounded-lg transition-colors ${guard.status === 'Active' ? 'hover:bg-red-50 text-red-600' : 'hover:bg-green-50 text-green-600'}`}
                                        title={guard.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {guards.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                No guards found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
