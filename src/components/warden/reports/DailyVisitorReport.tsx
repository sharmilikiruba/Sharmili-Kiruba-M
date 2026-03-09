import React from 'react';
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { DailyVisitorData } from './types';
import { StatCard } from './ReportComponents';

interface DailyVisitorReportProps {
    data: DailyVisitorData[];
    stats?: {
        total: number;
        approved: number;
        pending: number;
        emergency: number;
    };
}

export function DailyVisitorReport({ data, stats }: DailyVisitorReportProps) {
    // Fallback to manual calculation if stats not provided
    const displayStats = stats || {
        total: data.length,
        approved: data.filter(i => i.status === 'Approved').length,
        pending: data.filter(i => i.status === 'Pending').length,
        emergency: data.filter(i => i.purpose.toLowerCase().includes('emergency')).length
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                <StatCard
                    icon={<Users className="w-6 h-6" />}
                    label="Total Records"
                    value={displayStats.total}
                    bgColor="bg-blue-500"
                />
                <StatCard
                    icon={<CheckCircle className="w-6 h-6" />}
                    label="Approved"
                    value={displayStats.approved}
                    bgColor="bg-green-600"
                />
                <StatCard
                    icon={<Clock className="w-6 h-6" />}
                    label="Pending"
                    value={displayStats.pending}
                    bgColor="bg-yellow-500"
                />
                <StatCard
                    icon={<AlertTriangle className="w-6 h-6" />}
                    label="Emergency"
                    value={displayStats.emergency}
                    bgColor="bg-red-500"
                />
            </div>
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">Filtered Visitor Details</h3>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">
                                Visitor Name
                            </th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">
                                Student
                            </th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">
                                Purpose
                            </th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">
                                Time
                            </th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">
                                Duration
                            </th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i} className="border-b">
                                <td className="py-4 px-6 text-sm">{item.visitorName}</td>
                                <td className="py-4 px-6 text-sm">{item.student}</td>
                                <td className="py-4 px-6 text-sm">{item.purpose}</td>
                                <td className="py-4 px-6 text-sm">{item.time}</td>
                                <td className="py-4 px-6 text-sm">{item.duration}</td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${item.status === 'Approved' ? 'bg-green-600' : 'bg-yellow-500'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
