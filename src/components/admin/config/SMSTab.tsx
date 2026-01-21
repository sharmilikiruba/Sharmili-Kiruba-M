import React from 'react';
import { MessageSquare } from 'lucide-react';
import { SMSTemplates } from './types';
import { Section, ConfigField, SettingRow } from './ConfigComponents';

interface SMSTabProps {
    templates: SMSTemplates;
    onChange: (templates: SMSTemplates) => void;
}

export const SMSTab: React.FC<SMSTabProps> = ({ templates, onChange }) => {
    return (
        <div className="space-y-6">
            <Section
                title="SMS Templates & Triggers"
                description="Configure automated SMS notifications and message content"
                icon={MessageSquare}
            >
                <div className="space-y-8">
                    {Object.entries(templates).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                            <SettingRow
                                title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
                                description={`Enable/disable ${key.toLowerCase()} notification`}
                                checked={value.enabled}
                                onChange={() => onChange({
                                    ...templates,
                                    [key]: { ...value, enabled: !value.enabled }
                                })}
                            />
                            {value.enabled && (
                                <div className="mt-4">
                                    <ConfigField
                                        label="Message Template"
                                        description="Available variables: {visitor_name}, {host_name}, {time}, {date}"
                                    >
                                        <textarea
                                            value={value.template}
                                            onChange={(e) => onChange({
                                                ...templates,
                                                [key]: { ...value, template: e.target.value }
                                            })}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                            placeholder="Enter SMS template..."
                                        />
                                    </ConfigField>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};
