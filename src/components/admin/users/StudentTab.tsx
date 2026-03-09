import React from 'react';
import { Eye, Trash2, CheckCircle, XCircle, Pencil } from 'lucide-react';
import { Student } from './types';
import { UserColumn } from './UserComponents';

interface StudentTabProps {
    students: Student[];
    onView: (student: Student) => void;
    onEdit: (student: Student) => void;
    onToggleStatus: (id: string) => void;
    onDelete?: (id: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {status}
    </span>
);

const ActionButtons = ({ onView, onEdit, onDelete }: { onView: () => void; onEdit: () => void; onDelete?: () => void }) => (
    <div className="flex items-center gap-1">
        <button onClick={onView} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="View Details">
            <Eye className="w-4 h-4" />
        </button>
        <button onClick={onEdit} className="p-2 hover:bg-amber-50 rounded-lg transition-colors text-amber-600" title="Edit Student">
            <Pencil className="w-4 h-4" />
        </button>
        {onDelete && (
            <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600" title="Delete Student">
                <Trash2 className="w-4 h-4" />
            </button>
        )}
    </div>
);

export const StudentTab: React.FC<StudentTabProps> = ({ students, onView, onEdit, onToggleStatus, onDelete }) => {
    const emptyMsg = 'No students found matching your search.';

    return (
        <div>
            {/* Mobile card view (hidden on sm+) */}
            <div className="sm:hidden divide-y divide-gray-100">
                {students.length === 0 ? (
                    <p className="p-6 text-center text-gray-500 text-sm">{emptyMsg}</p>
                ) : students.map((student) => (
                    <div key={student.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{student.fullName}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{student.email}</p>
                            </div>
                            <StatusBadge status={student.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
                            <div><span className="font-medium text-gray-500">Roll No</span><br />{student.rollNumber}</div>
                            <div><span className="font-medium text-gray-500">Dept</span><br />{student.department}</div>
                            <div><span className="font-medium text-gray-500">Hostel</span><br />{student.hostel}</div>
                            <div><span className="font-medium text-gray-500">Room</span><br />{student.room_no}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                                {student.dateOfJoining && student.dateOfJoining !== 'N/A'
                                    ? new Date(student.dateOfJoining).toLocaleDateString() : 'N/A'}
                            </span>
                            <ActionButtons
                                onView={() => onView(student)}
                                onEdit={() => onEdit(student)}
                                onDelete={onDelete ? () => onDelete(student.id) : undefined}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop table (hidden on mobile) */}
    <div className="hidden sm:block w-full overflow-x-auto">
    <table className="w-full min-w-[900px]">
        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll No</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Room</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <UserColumn name={student.fullName} email={student.email} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.rollNumber}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{student.department}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{student.hostel}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.room_no}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {student.dateOfJoining && student.dateOfJoining !== 'N/A'
                                        ? new Date(student.dateOfJoining).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={student.status} /></td>
                                <td className="px-6 py-4">
                                    <ActionButtons
                                        onView={() => onView(student)}
                                        onEdit={() => onEdit(student)}
                                        onDelete={onDelete ? () => onDelete(student.id) : undefined}
                                    />
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">{emptyMsg}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
