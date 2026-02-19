import React from 'react';
import { Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Student } from './types';
import { UserColumn } from './UserComponents';

interface StudentTabProps {
    students: Student[];
    onView: (student: Student) => void;
    onToggleStatus: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const StudentTab: React.FC<StudentTabProps> = ({ students, onView, onToggleStatus, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll No</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Room</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <UserColumn name={student.name} email={student.email} />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.rollNo}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{student.department}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{student.hostel}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.room}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${student.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {student.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {student.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onView(student)}
                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete && onDelete(student.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                                        title="Delete Student"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {students.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                No students found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
