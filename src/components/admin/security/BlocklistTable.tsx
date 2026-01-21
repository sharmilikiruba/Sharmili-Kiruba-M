import React from 'react';
import { Trash2, Shield, Plus } from 'lucide-react';
import { BlocklistEntry } from './types';

interface BlocklistTableProps {
    entries: BlocklistEntry[];
    onDelete: (index: number) => void;
    onAddClick: () => void;
}

export const BlocklistTable: React.FC<BlocklistTableProps> = ({ entries, onDelete, onAddClick }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                        <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Blocklist Management</h2>
                        <p className="text-sm text-gray-500">Manage visitors permanently denied access</p>
                    </div>
                </div>

                <button
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5" />
                    Add Entry
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                            <th className="px-6 py-4">Visitor Details</th>
                            <th className="px-6 py-4">Reason</th>
                            <th className="px-6 py-4">Blocked By</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-gray-50/30">
                                    <Shield className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                    <p className="text-lg font-medium text-gray-400">No visitors currently blocked</p>
                                </td>
                            </tr>
                        ) : (
                            entries.map((item, index) => (
                                <tr
                                    key={`${item.id}-${index}`}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{item.name}</div>
                                        <div className="text-sm text-gray-500">{item.id || 'No ID provided'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-700 max-w-xs">{item.reason}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{item.addedBy}</div>
                                        <div className="text-xs text-gray-500">{item.date}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => onDelete(index)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            title="Remove from blocklist"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
