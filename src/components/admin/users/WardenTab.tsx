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

const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {status}
    </span>
);

export const WardenTab: React.FC<WardenTabProps> = ({ wardens, onEdit, onView, onToggleStatus, onDelete }) => {
    const emptyMsg = 'No wardens found matching your search.';

    return (
        <div>
            {/* Mobile card view */}
            <div className="sm:hidden divide-y divide-gray-100">
                {wardens.length === 0 ? (
                    <p className="p-6 text-center text-gray-500 text-sm">{emptyMsg}</p>
                ) : wardens.map((warden) => (
                    <div key={warden.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{warden.fullName}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{warden.email}</p>
                            </div>
                            <StatusBadge status={warden.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
                            <div><span className="font-medium text-gray-500">Hostel</span><br />{warden.hostel}</div>
                            <div><span className="font-medium text-gray-500">Contact</span><br />{warden.phone}</div>
                            <div className="col-span-2">
                                <span className="font-medium text-gray-500">Joined</span><br />
                                {warden.dateOfJoining && warden.dateOfJoining !== 'N/A'
                                    ? new Date(warden.dateOfJoining).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex items-center gap-1">
                                <button onClick={() => onEdit(warden)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Edit">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => onView(warden)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="View">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button onClick={() => onDelete(warden.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Warden</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {wardens.map((warden) => (
                            <tr key={warden.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <UserColumn name={warden.fullName} email={warden.email} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{warden.hostel}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{warden.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {warden.dateOfJoining && warden.dateOfJoining !== 'N/A'
                                        ? new Date(warden.dateOfJoining).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={warden.status} /></td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onEdit(warden)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Edit Details">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onView(warden)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="View Details">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(warden.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete Warden">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {wardens.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">{emptyMsg}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
