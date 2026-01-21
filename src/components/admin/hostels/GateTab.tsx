import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Gate } from './types';
import { StatusBadge } from './HostelComponents';

interface GateTabProps {
    gates: Gate[];
    onEdit: (gate: Gate) => void;
    onDelete: (id: string) => void;
}

export const GateTab: React.FC<GateTabProps> = ({ gates, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gate</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Code</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guard</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {gates.map((gate) => (
                        <tr key={gate.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{gate.name}</td>
                            <td className="px-6 py-4 text-gray-900">{gate.code}</td>
                            <td className="px-6 py-4 text-gray-900">{gate.hostel}</td>
                            <td className="px-6 py-4 text-gray-900">{gate.type}</td>
                            <td className="px-6 py-4 text-gray-900">{gate.guard}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={gate.status} />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(gate)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Edit Gate"
                                    >
                                        <Edit className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(gate.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Gate"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {gates.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                No gates found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
