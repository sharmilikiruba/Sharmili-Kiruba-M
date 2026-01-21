import React from 'react';

export const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
        />
    </button>
);

export const Section = ({ title, description, icon: Icon, children }: {
    title: string;
    description: string;
    icon: any;
    children: React.ReactNode
}) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-gray-600 text-sm mb-6">{description}</p>
        {children}
    </div>
);

export const ConfigField = ({ label, children, description }: {
    label: string;
    children: React.ReactNode;
    description?: string;
}) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {children}
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </div>
);

export const SettingRow = ({ title, description, checked, onChange }: {
    title: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}) => (
    <div className="flex items-center justify-between py-3 border-t border-gray-100 last:border-0 first:border-0 first:pt-0 last:pb-0">
        <div>
            <p className="font-medium text-gray-900">{title}</p>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
        <Toggle enabled={checked} onChange={onChange} />
    </div>
);
