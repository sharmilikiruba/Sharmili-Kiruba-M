import React from 'react';
import { Users, Clock, TrendingUp, Eye } from 'lucide-react';
import { VisitorStat } from './types';
import { StatCard, PurposeBar, HourBar } from './ReportComponents';

export function VisitorStatistics({ data }: { data: VisitorStat[] }) {
    const totalVisits = data.length;
    const uniqueVisitors = new Set(data.map(d => d.visitor)).size;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Reports & Analytics</h1>
                <p className="text-slate-600">Operational insights and compliance monitoring</p>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <StatCard
                    icon={<Users className="w-6 h-6 text-slate-600" />}
                    label="Total Visits"
                    value={totalVisits.toString()}
                    change="+12% from last month"
                    subChange="↑ 12% from last week"
                    changePositive
                />
                <StatCard
                    icon={<Clock className="w-6 h-6 text-slate-600" />}
                    label="Avg Duration"
                    value="2h 15m"
                />
                <StatCard
                    icon={<TrendingUp className="w-6 h-6 text-slate-600" />}
                    label="Peak Hours"
                    value="2-4 PM"
                />
                <StatCard
                    icon={<Eye className="w-6 h-6 text-slate-600" />}
                    label="Frequent Visitors"
                    value={uniqueVisitors.toString()}
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Visitor Trend</h3>
                    <div className="h-64 relative">
                        <svg viewBox="0 0 600 200" className="w-full h-full">
                            <text x="50" y="195" className="text-xs fill-slate-400">Jan 1</text>
                            <text x="150" y="195" className="text-xs fill-slate-400">Jan 2</text>
                            <text x="250" y="195" className="text-xs fill-slate-400">Jan 3</text>
                            <text x="350" y="195" className="text-xs fill-slate-400">Jan 4</text>
                            <text x="450" y="195" className="text-xs fill-slate-400">Jan 5</text>
                            <text x="550" y="195" className="text-xs fill-slate-400">Jan 6</text>
                            <text x="10" y="160" className="text-xs fill-slate-400">15</text>
                            <text x="10" y="120" className="text-xs fill-slate-400">30</text>
                            <text x="10" y="80" className="text-xs fill-slate-400">45</text>
                            <text x="10" y="40" className="text-xs fill-slate-400">60</text>
                            <defs>
                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                                </linearGradient>
                                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#f87171" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#f87171" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 40 100 L 100 120 L 160 110 L 220 60 L 280 50 L 340 65 L 400 55 L 460 70 L 520 60 L 580 75 L 580 180 L 40 180 Z"
                                fill="url(#areaGradient)"
                            />
                            <path
                                d="M 40 90 L 100 110 L 160 100 L 220 50 L 280 45 L 340 55 L 400 50 L 460 65 L 520 55 L 580 70"
                                fill="none"
                                stroke="url(#strokeGradient)"
                                strokeWidth="3"
                            />
                        </svg>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Request Status</h3>
                    <div className="flex items-center justify-center h-64">
                        <div className="relative w-48 h-48">
                            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="40" strokeDasharray="396 396" strokeDashoffset="0" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#fbbf24" strokeWidth="40" strokeDasharray="60 396" strokeDashoffset="-313" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" strokeWidth="40" strokeDasharray="45 396" strokeDashoffset="-373" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-slate-800">79%</div>
                                    <div className="text-xs text-slate-500">Approved</div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-8 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm text-slate-600">Approved 79%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <span className="text-sm text-slate-600">Pending 12%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm text-slate-600">Rejected 9%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Visit Purpose Distribution</h3>
                    <div className="space-y-3">
                        <PurposeBar label="Family Visit" percentage={75} color="bg-blue-600" />
                        <PurposeBar label="Medical" percentage={30} color="bg-blue-600" />
                        <PurposeBar label="Birthday" percentage={25} color="bg-blue-600" />
                        <PurposeBar label="Delivery" percentage={15} color="bg-blue-600" />
                        <PurposeBar label="Other" percentage={10} color="bg-blue-600" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Hourly Distribution</h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                        <HourBar height={20} label="8AM" />
                        <HourBar height={45} label="10AM" />
                        <HourBar height={60} label="12PM" />
                        <HourBar height={80} label="2PM" />
                        <HourBar height={90} label="4PM" />
                        <HourBar height={65} label="6PM" />
                        <HourBar height={25} label="8PM" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Recent Visits</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Visitor</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Purpose</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Entry Time</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Exit Time</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((visit, index) => (
                                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="py-3 px-4 text-sm text-slate-700">{visit.date}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{visit.visitor}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{visit.student}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{visit.purpose}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{visit.entryTime}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{visit.exitTime}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700">{visit.duration}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-4 text-center text-slate-500">No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
