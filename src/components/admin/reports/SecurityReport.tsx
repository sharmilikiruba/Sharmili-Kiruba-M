import React from 'react';
import { Shield, AlertTriangle, XCircle, UserPlus } from 'lucide-react';
import { SecurityEvent } from './types';
import { StatCard } from './ReportComponents';

export function SecurityReport({ data }: { data: SecurityEvent[] }) {
    const totalEvents = data.length;
    const overstays = data.filter(d => d.eventType === 'Overstay').length;
    const denied = data.filter(d => d.eventType === 'Denied').length;
    const manualEntries = data.filter(d => d.eventType === 'Manual Entry').length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Security Report</h1>
                <p className="text-slate-600">Entry/Exit logs, overstays, and security alerts</p>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <StatCard
                    icon={<Shield className="w-6 h-6 text-slate-600" />}
                    label="Total Events"
                    value={totalEvents.toString()}
                />
                <StatCard
                    icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
                    label="Overstays"
                    value={overstays.toString()}
                    bgColor="bg-amber-50"
                />
                <StatCard
                    icon={<XCircle className="w-6 h-6 text-red-500" />}
                    label="Denied Entries"
                    value={denied.toString()}
                    bgColor="bg-red-50"
                />
                <StatCard
                    icon={<UserPlus className="w-6 h-6 text-slate-600" />}
                    label="Manual Entries"
                    value={manualEntries.toString()}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Security Events</h3>
                <p className="text-sm text-slate-600 mb-4">Entry/Exit logs, overstays, and security alerts</p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Timestamp</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Visitor</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Event Type</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((event, index) => (
                                    <tr key={index} className={`border-b border-slate-100 hover:bg-slate-50 ${event.status === 'Warning' ? 'bg-amber-50' : event.status === 'Alert' ? 'bg-red-50' : ''}`}>
                                        <td className="py-3 px-4 text-sm text-slate-700">{event.timestamp}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{event.visitor}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{event.student}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{event.eventType}</td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Normal' ? 'bg-blue-100 text-blue-700' :
                                                    event.status === 'Warning' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-600">{event.remarks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-4 text-center text-slate-500">No events found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
