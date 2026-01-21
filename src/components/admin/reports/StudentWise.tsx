import React from 'react';
import { Users, TrendingUp, Eye } from 'lucide-react';
import { StudentStat } from './types';
import { StatCard } from './ReportComponents';

export function StudentWise({ data }: { data: StudentStat[] }) {
    const totalStudents = data.length;
    const totalVisitors = data.reduce((acc, curr) => acc + curr.totalVisitors, 0);
    const avgVisitors = totalStudents > 0 ? (totalVisitors / totalStudents).toFixed(1) : "0";
    const mostActive = data.reduce((prev, current) => (prev.totalVisitors > current.totalVisitors) ? prev : current, data[0] || { studentName: 'N/A' });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Student-wise Report</h1>
                <p className="text-slate-600">Visitor statistics per student</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <StatCard
                    icon={<Users className="w-6 h-6 text-slate-600" />}
                    label="Active Students"
                    value={totalStudents.toString()}
                />
                <StatCard
                    icon={<TrendingUp className="w-6 h-6 text-slate-600" />}
                    label="Avg Visitors/Student"
                    value={avgVisitors}
                />
                <StatCard
                    icon={<Eye className="w-6 h-6 text-slate-600" />}
                    label="Most Active"
                    value={mostActive.studentName}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Student Visitor Statistics</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student Name</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Total Visitors</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Unique Visitors</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Frequency</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Last Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, index) => (
                                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4 text-sm text-slate-700">{student.studentId}</td>
                                    <td className="py-3 px-4 text-sm text-slate-700">{student.studentName}</td>
                                    <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.totalVisitors}</td>
                                    <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.uniqueVisitors}</td>
                                    <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.frequency}</td>
                                    <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.lastVisit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
