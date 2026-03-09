import React from 'react';

interface ReportBtnProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    active: boolean;
    onClick: () => void;
}

export function ReportBtn({ icon, title, subtitle, active, onClick }: ReportBtnProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 rounded-lg transition-all ${active
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                }`}
        >
            <div className="flex items-start gap-3">
                <div className={active ? 'text-white' : 'text-gray-600'}>{icon}</div>
                <div>
                    <div className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                    </div>
                    <div className={`text-xs mt-0.5 ${active ? 'text-blue-100' : 'text-gray-500'}`}>
                        {subtitle}
                    </div>
                </div>
            </div>
        </button>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    bgColor: string;
}

export function StatCard({ icon, label, value, bgColor }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="text-gray-600 text-sm mb-2">{label}</div>
                    <div className="text-3xl font-bold text-gray-900">{value}</div>
                </div>
                <div
                    className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center text-white`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}
