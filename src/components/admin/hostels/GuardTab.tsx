import React from 'react';
import { Edit, Trash2, Clock } from 'lucide-react';
import { GuardAssignment } from './types';
import { StatusBadge } from './HostelComponents';

interface GuardTabProps {
    assignments: GuardAssignment[];
    onEdit: (assignment: GuardAssignment) => void;
    onDelete: (id: string) => void;
}

export const GuardTab: React.FC<GuardTabProps> = ({ assignments, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guard Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gate</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Shift Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {assignments.map((assignment) => (
                        <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{assignment.guardName}</td>
                            <td className="px-6 py-4 text-gray-900">{assignment.hostel}</td>
                            <td className="px-6 py-4 text-gray-900">{assignment.gate}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Clock className="w-4 h-4" />
                                    {assignment.shiftStart} - {assignment.shiftEnd}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={assignment.status} />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(assignment)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Edit Assignment"
                                    >
                                        <Edit className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(assignment.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Assignment"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {assignments.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                No guard assignments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
