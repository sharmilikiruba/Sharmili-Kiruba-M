import React from 'react';
import { WeeklySummaryData } from './types';

interface WeeklySummaryReportProps {
    data: WeeklySummaryData[];
}

export function WeeklySummaryReport({ data }: WeeklySummaryReportProps) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">Weekly Summary</h3>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-6 text-xs uppercase">Day</th>
                            <th className="text-left py-3 px-6 text-xs uppercase">Date</th>
                            <th className="text-left py-3 px-6 text-xs uppercase">Total Visitors</th>
                            <th className="text-left py-3 px-6 text-xs uppercase">Approved</th>
                            <th className="text-left py-3 px-6 text-xs uppercase">Rejected</th>
                            <th className="text-left py-3 px-6 text-xs uppercase">Pending</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((x, i) => (
                            <tr key={i} className="border-b">
                                <td className="py-4 px-6 text-sm font-medium">{x.day}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{x.date}</td>
                                <td className="py-4 px-6 text-sm">{x.total}</td>
                                <td className="py-4 px-6 text-sm text-green-600 font-medium">{x.approved}</td>
                                <td className="py-4 px-6 text-sm text-red-600 font-medium">{x.rejected}</td>
                                <td className="py-4 px-6 text-sm text-yellow-600 font-medium">{x.pending}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
