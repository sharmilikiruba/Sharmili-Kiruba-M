import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationSettings, NotificationTriggers } from './types';
import { Section, SettingRow } from './ConfigComponents';

interface NotificationsTabProps {
    settings: NotificationSettings;
    triggers: NotificationTriggers;
    onSettingsChange: (settings: NotificationSettings) => void;
    onTriggersChange: (triggers: NotificationTriggers) => void;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({
    settings,
    triggers,
    onSettingsChange,
    onTriggersChange
}) => {
    return (
        <div className="space-y-6">
            <Section
                title="Notification Channels"
                description="Choose which channels to use for system notifications"
                icon={Bell}
            >
                <div className="space-y-2">
                    {Object.entries(settings).map(([key, value]) => (
                        <SettingRow
                            key={key}
                            title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
                            description={`Receive notifications via ${key.replace('Notifications', '').toLowerCase()}`}
                            checked={value}
                            onChange={() => onSettingsChange({ ...settings, [key]: !value })}
                        />
                    ))}
                </div>
            </Section>

            <Section
                title="Notification Triggers"
                description="Select events that should trigger a notification"
                icon={Bell}
            >
                <div className="space-y-2">
                    {Object.entries(triggers).map(([key, value]) => (
                        <SettingRow
                            key={key}
                            title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
                            description={`Notify when ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                            checked={value}
                            onChange={() => onTriggersChange({ ...triggers, [key]: !value })}
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
};
