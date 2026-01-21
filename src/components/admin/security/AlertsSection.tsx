import React from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import { Alert } from './types';

interface AlertsSectionProps {
    alerts: Alert[];
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
            </div>

            <div className="space-y-4">
                {alerts.map((alert, index) => (
                    <div
                        key={index}
                        className={`flex gap-4 border rounded-xl p-4 transition-all hover:shadow-md ${alert.type === 'critical' ? 'bg-red-50 border-red-100' :
                                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                                    'bg-blue-50 border-blue-100'
                            }`}
                    >
                        <div className={`p-2 rounded-lg h-fit ${alert.type === 'critical' ? 'bg-red-100 text-red-600' :
                                alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-blue-100 text-blue-600'
                            }`}>
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 break-words">{alert.message}</p>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                {alert.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
