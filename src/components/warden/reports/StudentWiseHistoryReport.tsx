import React from 'react';
import { StudentWiseData } from './types';

interface StudentWiseHistoryReportProps {
    data: StudentWiseData[];
}

export function StudentWiseHistoryReport({ data }: StudentWiseHistoryReportProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Student-wise Visitor History</h3>
            </div>
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="text-left py-3 px-6 text-xs uppercase">Student Name</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Total</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Unique</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Frequency</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Last Visit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x, i) => (
                        <tr key={i} className="border-b">
                            <td className="py-4 px-6 text-sm font-medium">{x.studentName}</td>
                            <td className="py-4 px-6 text-sm">{x.total}</td>
                            <td className="py-4 px-6 text-sm">{x.unique}</td>
                            <td className="py-4 px-6 text-sm">{x.frequency}</td>
                            <td className="py-4 px-6 text-sm">{x.lastVisit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
