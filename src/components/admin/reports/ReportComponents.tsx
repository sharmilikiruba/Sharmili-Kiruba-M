import React from 'react';

export function StatCard({
    icon,
    label,
    value,
    change,
    subChange,
    changePositive,
    bgColor = "bg-white"
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    change?: string;
    subChange?: string;
    changePositive?: boolean;
    bgColor?: string;
}) {
    return (
        <div className={`${bgColor} rounded-2xl shadow-lg border border-slate-200 p-6`}>
            <div className="flex items-start justify-between mb-3">
                {icon}
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
            <div className="text-sm text-slate-600 mb-2">{label}</div>
            {change && (
                <div className={`text-xs ${changePositive ? 'text-green-600' : 'text-slate-500'}`}>
                    {change}
                </div>
            )}
            {subChange && (
                <div className={`text-xs ${changePositive ? 'text-green-600' : 'text-slate-500'}`}>
                    {subChange}
                </div>
            )}
        </div>
    );
}

export function ReportCard({
    icon,
    title,
    isActive,
    onClick
}: {
    icon: React.ReactNode;
    title: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-600 hover:bg-slate-50'
                }`}
        >
            {icon}
            <span className="font-medium text-sm">{title}</span>
        </button>
    );
}

export function PurposeBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-600">{label}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-8">
                <div
                    className={`${color} h-8 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}

export function HourBar({ height, label }: { height: number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="w-12 bg-green-500 rounded-t-lg transition-all duration-300"
                style={{ height: `${height}%` }}
            ></div>
            <span className="text-xs text-slate-600">{label}</span>
        </div>
    );
}

export function WardenBar({
    name,
    approved,
    rejected,
    total,
    approvalRate
}: {
    name: string;
    approved: number;
    rejected: number;
    total: number;
    approvalRate: string;
}) {
    const approvedHeight = (approved / 160) * 100;
    const rejectedHeight = (rejected / 160) * 100;

    return (
        <div className="flex flex-col items-center gap-3 flex-1 relative group">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                <div className="font-medium">{name}</div>
                <div className="text-xs">Approved: {approved}</div>
                <div className="text-xs">Rejected: {rejected}</div>
            </div>
            <div className="flex flex-col items-center gap-1 w-full">
                <div
                    className="w-full bg-green-500 rounded-t-lg transition-all duration-300"
                    style={{ height: `${approvedHeight * 2}px`, minHeight: '10px' }}
                ></div>
                <div
                    className="w-full bg-red-500 transition-all duration-300"
                    style={{ height: `${rejectedHeight * 3}px`, minHeight: '10px' }}
                ></div>
            </div>
            <div className="text-center">
                <div className="text-xs font-medium text-slate-700 mb-1">{name}</div>
                <div className="text-xs text-slate-500">Total: {total}</div>
                <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mt-1">
                    {approvalRate}
                </div>
            </div>
        </div>
    );
}

export function HostelBar({ name, visitors }: { name: string; visitors: number }) {
    const height = (visitors / 500) * 100;

    return (
        <div className="flex flex-col items-center gap-3 flex-1 relative group">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                <div>Total Visitors: {visitors}</div>
            </div>
            <div
                className="w-full bg-blue-600 rounded-t-lg transition-all duration-300"
                style={{ height: `${height * 3}px`, minHeight: '50px' }}
            ></div>
            <div className="text-center">
                <div className="text-sm font-medium text-slate-700">{name}</div>
            </div>
        </div>
    );
}
