import React from 'react';
import { Section, ConfigField, SettingRow } from './ConfigComponents';

interface QRSettingsTabProps {
    settings: {
        passValidity: string;
        passFormat: string;
        autoExpiry: boolean;
        includePhoto: boolean;
        requireSignature: boolean;
    };
    onChange: (settings: any) => void;
}

export const QRSettingsTab: React.FC<QRSettingsTabProps> = ({ settings, onChange }) => {
    return (
        <div className="space-y-6">
            <Section
                title="QR Pass Configuration"
                description="Configure visitor pass settings and validity"
                icon={() => (
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                )}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <ConfigField label="Pass Validity (Hours)">
                        <input
                            type="number"
                            value={settings.passValidity}
                            onChange={(e) => onChange({ ...settings, passValidity: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </ConfigField>
                    <ConfigField label="Pass Format">
                        <select
                            value={settings.passFormat}
                            onChange={(e) => onChange({ ...settings, passFormat: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option>Standard (Compact)</option>
                            <option>Detailed (Full Info)</option>
                            <option>Minimal (QR Only)</option>
                        </select>
                    </ConfigField>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-6">
                    <SettingRow
                        title="Auto-expire passes"
                        description="Automatically invalidate passes after validity period"
                        checked={settings.autoExpiry}
                        onChange={() => onChange({ ...settings, autoExpiry: !settings.autoExpiry })}
                    />
                    <SettingRow
                        title="Include Visitor Photo"
                        description="Show visitor photo on the generated pass"
                        checked={settings.includePhoto}
                        onChange={() => onChange({ ...settings, includePhoto: !settings.includePhoto })}
                    />
                    <SettingRow
                        title="Require Digital Signature"
                        description="Require visitor signature before generating pass"
                        checked={settings.requireSignature}
                        onChange={() => onChange({ ...settings, requireSignature: !settings.requireSignature })}
                    />
                </div>
            </Section>
        </div>
    );
};
