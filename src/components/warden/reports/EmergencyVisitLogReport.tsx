import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { EmergencyVisitData } from './types';

interface EmergencyVisitLogReportProps {
    data: EmergencyVisitData[];
}

export function EmergencyVisitLogReport({ data }: EmergencyVisitLogReportProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Emergency Visit Log</h3>
            </div>
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="text-left py-3 px-6 text-xs uppercase">Date</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Visitor</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Student</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Purpose</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Response</th>
                        <th className="text-left py-3 px-6 text-xs uppercase">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="border-b">
                            <td className="py-4 px-6 text-sm">{item.date}</td>
                            <td className="py-4 px-6 text-sm">{item.visitor}</td>
                            <td className="py-4 px-6 text-sm">{item.student}</td>
                            <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                    <span className="text-sm">{item.purpose}</span>
                                </div>
                            </td>
                            <td className="py-4 px-6 text-sm">{item.responseTime}</td>
                            <td className="py-4 px-6">
                                <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
