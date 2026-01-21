import React from 'react';
import { Clock, Settings } from 'lucide-react';
import { VisitorRules } from './types';
import { Section, ConfigField, SettingRow } from './ConfigComponents';

interface VisitorRulesTabProps {
    rules: VisitorRules;
    onChange: (rules: VisitorRules) => void;
}

export const VisitorRulesTab: React.FC<VisitorRulesTabProps> = ({ rules, onChange }) => {
    return (
        <div className="space-y-6">
            <Section
                title="Visiting Hours"
                description="Define allowed visiting hours for weekdays and weekends"
                icon={Clock}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Weekday Hours</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ConfigField label="Start Time">
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={rules.weekdayStart}
                                        onChange={(e) => onChange({ ...rules, weekdayStart: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                </div>
                            </ConfigField>
                            <ConfigField label="End Time">
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={rules.weekdayEnd}
                                        onChange={(e) => onChange({ ...rules, weekdayEnd: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                </div>
                            </ConfigField>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Weekend Hours</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ConfigField label="Start Time">
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={rules.weekendStart}
                                        onChange={(e) => onChange({ ...rules, weekendStart: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                </div>
                            </ConfigField>
                            <ConfigField label="End Time">
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={rules.weekendEnd}
                                        onChange={(e) => onChange({ ...rules, weekendEnd: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                </div>
                            </ConfigField>
                        </div>
                    </div>
                </div>
            </Section>

            <Section
                title="Visitor Limits & Rules"
                description="Configure visitor limits and booking restrictions"
                icon={Settings}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <ConfigField label="Default Visit Duration" description="Default duration for new requests">
                        <select
                            value={rules.defaultDuration}
                            onChange={(e) => onChange({ ...rules, defaultDuration: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>3 hours</option>
                            <option>4 hours</option>
                        </select>
                    </ConfigField>
                    <ConfigField label="Max Daily Visitors" description="Maximum visitors allowed per student per day">
                        <input
                            type="number"
                            value={rules.maxDailyVisitors}
                            onChange={(e) => onChange({ ...rules, maxDailyVisitors: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </ConfigField>
                    <ConfigField label="Advance Booking Days" description="Days in advance booking is allowed">
                        <input
                            type="number"
                            value={rules.advanceBookingDays}
                            onChange={(e) => onChange({ ...rules, advanceBookingDays: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </ConfigField>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-6">
                    <SettingRow
                        title="Emergency Request Auto-Notify"
                        description="Automatically notify warden for emergency requests"
                        checked={rules.emergencyAutoNotify}
                        onChange={() => onChange({ ...rules, emergencyAutoNotify: !rules.emergencyAutoNotify })}
                    />
                    <SettingRow
                        title="Allow Walk-in Visitors"
                        description="Allow visitors without prior appointment"
                        checked={rules.allowWalkIn}
                        onChange={() => onChange({ ...rules, allowWalkIn: !rules.allowWalkIn })}
                    />
                </div>
            </Section>
        </div>
    );
};
