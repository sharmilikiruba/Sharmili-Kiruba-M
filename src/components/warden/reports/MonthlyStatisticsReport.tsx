import React from 'react';
import { MonthlyStatisticsData } from './types';

interface MonthlyStatisticsReportProps {
    data: MonthlyStatisticsData[];
}

export function MonthlyStatisticsReport({ data }: MonthlyStatisticsReportProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Monthly Statistics</h3>
            </div>
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="text-left py-3 px-6 text-xs uppercase">Week</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Total</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Approved</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Rejected</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Emergency</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x, i) => (
                        <tr key={i} className="border-b">
                            <td className="py-4 px-6 text-sm font-medium">{x.week}</td>
                            <td className="py-4 px-6 text-sm">{x.total}</td>
                            <td className="py-4 px-6 text-sm text-green-600 font-medium">{x.approved}</td>
                            <td className="py-4 px-6 text-sm text-red-600 font-medium">{x.rejected}</td>
                            <td className="py-4 px-6 text-sm text-orange-600 font-medium">{x.emergency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
