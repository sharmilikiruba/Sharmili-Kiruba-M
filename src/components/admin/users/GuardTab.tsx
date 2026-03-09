import React from 'react';
import { Edit, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Guard } from './types';
import { UserColumn } from './UserComponents';

interface GuardTabProps {
    guards: Guard[];
    onEdit: (guard: Guard) => void;
    onView: (guard: Guard) => void;
    onDelete: (id: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {status}
    </span>
);

export const GuardTab: React.FC<GuardTabProps> = ({ guards, onEdit, onView, onDelete }) => {
    const emptyMsg = 'No guards found matching your search.';

    return (
        <div>
            {/* Mobile card view */}
            <div className="sm:hidden divide-y divide-gray-100">
                {guards.length === 0 ? (
                    <p className="p-6 text-center text-gray-500 text-sm">{emptyMsg}</p>
                ) : guards.map((guard) => (
                    <div key={guard.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{guard.fullName}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{guard.email}</p>
                            </div>
                            <StatusBadge status={guard.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
                            <div><span className="font-medium text-gray-500">Gate</span><br />{guard.gate || 'Unassigned'}</div>
                            <div><span className="font-medium text-gray-500">Contact</span><br />{guard.phone}</div>
                            <div>
                                <span className="font-medium text-gray-500">Shift</span><br />
                                {guard.shift_type || 'N/A'}
                                {guard.shift_start_time && guard.shift_end_time
                                    ? <span className="text-gray-400"> ({guard.shift_start_time}–{guard.shift_end_time})</span>
                                    : null}
                            </div>
                            <div>
                                <span className="font-medium text-gray-500">Joined</span><br />
                                {guard.dateOfJoining && guard.dateOfJoining !== 'N/A'
                                    ? new Date(guard.dateOfJoining).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex items-center gap-1">
                                <button onClick={() => onEdit(guard)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Edit">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => onView(guard)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="View">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button onClick={() => onDelete(guard.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete">
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
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guard</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gate</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Shift</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {guards.map((guard) => (
                            <tr key={guard.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <UserColumn name={guard.fullName} email={guard.email} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{guard.gate || 'Unassigned'}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="font-medium text-gray-900">{guard.shift_type || 'N/A'}</div>
                                    {guard.shift_start_time && guard.shift_end_time ? (
                                        <div className="text-xs text-gray-500">{guard.shift_start_time} - {guard.shift_end_time}</div>
                                    ) : (
                                        <div className="text-xs text-gray-400 italic font-light">Timing not set</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{guard.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {guard.dateOfJoining && guard.dateOfJoining !== 'N/A'
                                        ? new Date(guard.dateOfJoining).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={guard.status} /></td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onEdit(guard)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Edit Details">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onView(guard)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="View Details">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(guard.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete Guard">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {guards.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">{emptyMsg}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
