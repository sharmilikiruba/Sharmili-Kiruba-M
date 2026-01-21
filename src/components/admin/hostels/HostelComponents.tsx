import React from 'react';

export const InputField = ({ label, value, onChange, type = "text", placeholder, required = true, disabled = false }: {
    label: string,
    value: string | number,
    onChange: (val: string) => void,
    type?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
        />
    </div>
);

export const SelectField = ({ label, value, onChange, options, required = true, disabled = false }: {
    label: string,
    value: string,
    onChange: (val: string) => void,
    options: { value: string, label: string }[] | string[],
    required?: boolean,
    disabled?: boolean
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
        >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map(opt => {
                const val = typeof opt === 'string' ? opt : opt.value;
                const lab = typeof opt === 'string' ? opt : opt.label;
                return <option key={val} value={val}>{lab}</option>;
            })}
        </select>
    </div>
);

export const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
        {status}
    </span>
);
