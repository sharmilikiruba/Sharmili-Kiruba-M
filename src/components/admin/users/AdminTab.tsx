import React from 'react';
import { Edit, Eye, Trash2, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { AdminUser } from './types';
import { UserColumn } from './UserComponents';

interface AdminTabProps {
    admins: AdminUser[];
    onEdit: (admin: AdminUser) => void;
    onView: (admin: AdminUser) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {status}
    </span>
);

export const AdminTab: React.FC<AdminTabProps> = ({ admins, onEdit, onView, onToggleStatus, onDelete }) => {
    const emptyMsg = 'No administrators found.';

    return (
        <div>
            {/* Mobile card view */}
            <div className="sm:hidden divide-y divide-gray-100">
                {admins.length === 0 ? (
                    <p className="p-6 text-center text-gray-500 text-sm">{emptyMsg}</p>
                ) : admins.map((admin) => (
                    <div key={admin.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{admin.fullName}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{admin.email}</p>
                            </div>
                            <StatusBadge status={admin.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
                            <div>
                                <span className="font-medium text-gray-500">Designation</span><br />
                                <span className="text-blue-600 font-medium flex items-center gap-1 mt-0.5">
                                    <ShieldCheck className="w-3 h-3" />{admin.designation}
                                </span>
                            </div>
                            <div><span className="font-medium text-gray-500">Contact</span><br />{admin.phone || 'N/A'}</div>
                            <div><span className="font-medium text-gray-500">Emp ID</span><br />{admin.empId || 'N/A'}</div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex items-center gap-1">
                                <button onClick={() => onEdit(admin)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Edit">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => onView(admin)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="View">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button onClick={() => onDelete(admin.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete">
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
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Administrator</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Designation</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Emp ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {admins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <UserColumn name={admin.fullName} email={admin.email} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="flex items-center gap-1.5 font-medium text-blue-600">
                                        <ShieldCheck className="w-4 h-4" />
                                        {admin.designation}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{admin.phone || 'N/A'}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{admin.empId || 'N/A'}</td>
                                <td className="px-6 py-4"><StatusBadge status={admin.status} /></td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onEdit(admin)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Edit Details">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onView(admin)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="View Details">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(admin.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete Admin">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {admins.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-medium">{emptyMsg}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
