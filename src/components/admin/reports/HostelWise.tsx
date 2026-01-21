import React from 'react';
import { HostelStat } from './types';
import { HostelBar } from './ReportComponents';

export function HostelWise({ data }: { data: HostelStat[] }) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Hostel-wise Report</h1>
                <p className="text-slate-600">Visitor statistics per hostel</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {data.map((hostel, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{hostel.name}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Total Visitors</span>
                                <span className="text-lg font-bold text-slate-800">{hostel.totalVisitors}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Peak Time</span>
                                <span className="text-sm font-medium text-slate-700">{hostel.peakTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Compliance</span>
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                    {hostel.compliance}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-6">Hostel Comparison</h3>
                <div className="h-96 flex items-end justify-around gap-16 px-12">
                    {data.map((hostel, index) => (
                        <HostelBar key={index} name={hostel.name} visitors={hostel.totalVisitors} />
                    ))}
                </div>
            </div>
        </div>
    );
}
