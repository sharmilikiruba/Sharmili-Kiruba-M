import React from 'react';
import { Users } from 'lucide-react';

export const InputField = ({ label, value, onChange, type = "text", required = true, placeholder, disabled = false }: { label: string, value: string, onChange: (val: string) => void, type?: string, required?: boolean, placeholder?: string, disabled?: boolean }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={disabled}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
    </div>
);

export const SelectField = ({ label, value, onChange, options, required = true }: { label: string, value: string, onChange: (val: string) => void, options: (string | { label: string, value: string })[], required?: boolean }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
        >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map(opt => {
                const label = typeof opt === 'string' ? opt : opt.label;
                const val = typeof opt === 'string' ? opt : opt.value;
                return <option key={val} value={val}>{label}</option>;
            })}
        </select>
    </div>
);

export const ViewField = ({ label, value }: { label: string, value: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
            {value}
        </div>
    </div>
);

export const UserColumn = ({ name, email }: { name: string, email: string }) => (
    <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-500" />
        </div>
        <div>
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">{email}</div>
        </div>
    </div>
);
