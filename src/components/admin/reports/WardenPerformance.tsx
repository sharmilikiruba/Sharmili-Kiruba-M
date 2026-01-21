import React from 'react';
import { FileText, UserCheck, Clock, XCircle } from 'lucide-react';
import { WardenPerf } from './types';
import { StatCard, WardenBar } from './ReportComponents';

export function WardenPerformance({ data }: { data: WardenPerf[] }) {
    const totalRequests = data.reduce((sum, item) => sum + item.totalRequests, 0);
    const totalApproved = data.reduce((sum, item) => sum + item.approved, 0);
    const totalRejected = data.reduce((sum, item) => sum + item.rejected, 0);
    const avgApprovalRate = totalRequests > 0 ? Math.round((totalApproved / totalRequests) * 100) : 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Warden Performance</h1>
                <p className="text-slate-600">Performance metrics and comparison</p>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <StatCard
                    icon={<FileText className="w-6 h-6 text-slate-600" />}
                    label="Total Requests"
                    value={totalRequests.toString()}
                />
                <StatCard
                    icon={<UserCheck className="w-6 h-6 text-slate-600" />}
                    label="Avg Approval Rate"
                    value={`${avgApprovalRate}%`}
                    change="↑ 2% from last week"
                    changePositive
                />
                <StatCard
                    icon={<Clock className="w-6 h-6 text-slate-600" />}
                    label="Avg Response Time"
                    value="25 min"
                    change="-5 min improvement"
                    subChange="↑ 5% from last week"
                    changePositive
                />
                <StatCard
                    icon={<XCircle className="w-6 h-6 text-slate-600" />}
                    label="Rejections"
                    value={totalRejected.toString()}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-6">Warden Performance Comparison</h3>
                <div className="h-96 flex items-end justify-around gap-8 px-8">
                    {data.map((warden) => (
                        <WardenBar
                            key={warden.name}
                            name={warden.name}
                            approved={warden.approved}
                            rejected={warden.rejected}
                            total={warden.totalRequests}
                            approvalRate={warden.approvalRate}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-center gap-8 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500"></div>
                        <span className="text-sm text-slate-600">Approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500"></div>
                        <span className="text-sm text-slate-600">Rejected</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Detailed Performance</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Warden Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Hostel</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Total Requests</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Approved</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Rejected</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Approval Rate</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Avg Response Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((warden, index) => (
                                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4 text-sm text-slate-700">{warden.name}</td>
                                    <td className="py-3 px-4 text-sm text-slate-700">{warden.hostel}</td>
                                    <td className="py-3 px-4 text-sm text-slate-700 text-center">{warden.totalRequests}</td>
                                    <td className="py-3 px-4 text-sm text-green-600 text-center font-medium">{warden.approved}</td>
                                    <td className="py-3 px-4 text-sm text-red-600 text-center font-medium">{warden.rejected}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            {warden.approvalRate}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-slate-700 text-center">{warden.avgResponseTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
