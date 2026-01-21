import React from 'react';
import { Building, Upload, Settings } from 'lucide-react';
import { GeneralConfig } from './types';
import { Section, ConfigField } from './ConfigComponents';

interface GeneralTabProps {
    config: GeneralConfig;
    onChange: (config: GeneralConfig) => void;
    onLogoUpload: () => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({ config, onChange, onLogoUpload }) => {
    return (
        <div className="space-y-6">
            <Section
                title="Institute Information"
                description="Basic information about your institution"
                icon={Building}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ConfigField label="Institute Name">
                        <input
                            type="text"
                            value={config.instituteName}
                            onChange={(e) => onChange({ ...config, instituteName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </ConfigField>
                    <ConfigField label="Institute Logo">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <button
                                onClick={onLogoUpload}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                Upload Logo
                            </button>
                        </div>
                    </ConfigField>
                    <ConfigField label="Contact Email">
                        <input
                            type="email"
                            value={config.contactEmail}
                            onChange={(e) => onChange({ ...config, contactEmail: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </ConfigField>
                    <ConfigField label="Contact Phone">
                        <input
                            type="text"
                            value={config.contactPhone}
                            onChange={(e) => onChange({ ...config, contactPhone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </ConfigField>
                    <div className="md:col-span-2">
                        <ConfigField label="Address">
                            <textarea
                                value={config.address}
                                onChange={(e) => onChange({ ...config, address: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </ConfigField>
                    </div>
                </div>
            </Section>

            <Section
                title="Regional Settings"
                description="Configure timezone and date/time formats"
                icon={Settings}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ConfigField label="Time Zone">
                        <select
                            value={config.timezone}
                            onChange={(e) => onChange({ ...config, timezone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option>Asia/Kolkata (IST)</option>
                            <option>America/New_York (EST)</option>
                            <option>Europe/London (GMT)</option>
                        </select>
                    </ConfigField>
                    <ConfigField label="Date Format">
                        <select
                            value={config.dateFormat}
                            onChange={(e) => onChange({ ...config, dateFormat: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option>DD/MM/YYYY</option>
                            <option>MM/DD/YYYY</option>
                            <option>YYYY-MM-DD</option>
                        </select>
                    </ConfigField>
                    <ConfigField label="Time Format">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="timeFormat"
                                    value="12-hour"
                                    checked={config.timeFormat === '12-hour'}
                                    onChange={(e) => onChange({ ...config, timeFormat: e.target.value })}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">12-hour</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="timeFormat"
                                    value="24-hour"
                                    checked={config.timeFormat === '24-hour'}
                                    onChange={(e) => onChange({ ...config, timeFormat: e.target.value })}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">24-hour</span>
                            </label>
                        </div>
                    </ConfigField>
                </div>
            </Section>
        </div>
    );
};
