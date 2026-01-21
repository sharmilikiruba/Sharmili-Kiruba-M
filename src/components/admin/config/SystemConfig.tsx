"use client";
import React, { useState, useEffect } from 'react';
import { Building, AlertCircle, MessageSquare, Bell } from 'lucide-react';

// Modular Imports
import {
    TabType,
    GeneralConfig,
    VisitorRules,
    QRSettings,
    SMSTemplates,
    NotificationSettings,
    NotificationTriggers
} from './types';
import { GeneralTab } from './GeneralTab';
import { VisitorRulesTab } from './VisitorRulesTab';
import { QRSettingsTab } from './QRSettingsTab';
import { SMSTab } from './SMSTab';
import { NotificationsTab } from './NotificationsTab';

export default function SystemConfiguration() {
    const [activeTab, setActiveTab] = useState<TabType>('General');

    // General Tab State
    const [generalConfig, setGeneralConfig] = useState<GeneralConfig>({
        instituteName: 'Central University',
        contactEmail: 'admin@university.edu',
        contactPhone: '+91 11 2345 6789',
        address: 'University Road, Academic City, State - 110001',
        timezone: 'Asia/Kolkata (IST)',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '12-hour',
    });

    // Visitor Rules State
    const [visitorRules, setVisitorRules] = useState<VisitorRules>({
        weekdayStart: '08:00',
        weekdayEnd: '20:00',
        weekendStart: '10:00',
        weekendEnd: '18:00',
        defaultDuration: '2 hours',
        maxDailyVisitors: '3',
        advanceBookingDays: '7',
        emergencyAutoNotify: true,
        allowWalkIn: false,
    });

    // QR Settings State
    const [qrSettings, setQrSettings] = useState<QRSettings>({
        passValidity: '4',
        passFormat: 'Standard (Compact)',
        autoExpiry: true,
        includePhoto: true,
        requireSignature: false,
    });

    // SMS Templates State
    const [smsTemplates, setSmsTemplates] = useState<SMSTemplates>({
        approvalSms: { enabled: true, template: "Hi {visitor_name}, your visit request to meet {host_name} has been approved. Please show QR code at gate." },
        rejectionSms: { enabled: true, template: "Hi {visitor_name}, your visit request to meet {host_name} was not approved." },
        entryConfirmation: { enabled: true, template: "Welcome {visitor_name}! You have successfully checked in at {time}." },
        exitConfirmation: { enabled: true, template: "Goodbye {visitor_name}. You checked out at {time}. thanks for visiting." },
        reminderSms: { enabled: true, template: "Reminder: You have a scheduled visit tomorrow with {host_name} at {time}." },
    });

    // Notification Channels State
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: true,
    });

    // Notification Triggers State
    const [notificationTriggers, setNotificationTriggers] = useState<NotificationTriggers>({
        requestSubmitted: true,
        requestApproved: true,
        requestRejected: true,
        visitorEntered: true,
        visitorExited: true,
        overstayAlert: true,
        emergencyRequest: true,
    });

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedTriggers = localStorage.getItem('notificationTriggers');
        if (savedTriggers) {
            try {
                setNotificationTriggers(JSON.parse(savedTriggers));
            } catch (e) {
                console.error("Failed to parse triggers from localStorage", e);
            }
        }
    }, []);

    const handleSaveConfiguration = () => {
        // Save relevant settings to localStorage
        localStorage.setItem('notificationTriggers', JSON.stringify(notificationTriggers));

        // Dispatch event to notify other components (like Header)
        window.dispatchEvent(new Event('storage'));

        alert('Configuration saved successfully!');
    };

    const handleLogoUpload = () => {
        alert('Logo upload functionality triggered');
    };

    return (
        <div className="p-8 w-full bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
                <p className="text-gray-600 mt-1">Configure visitor rules, notifications, and system settings</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <TabButton
                    active={activeTab === 'General'}
                    onClick={() => setActiveTab('General')}
                    icon={Building}
                    label="General"
                />
                <TabButton
                    active={activeTab === 'Visitor Rules'}
                    onClick={() => setActiveTab('Visitor Rules')}
                    icon={AlertCircle}
                    label="Visitor Rules"
                />
                <TabButton
                    active={activeTab === 'QR Settings'}
                    onClick={() => setActiveTab('QR Settings')}
                    icon={() => (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                    )}
                    label="QR Settings"
                />
                <TabButton
                    active={activeTab === 'SMS'}
                    onClick={() => setActiveTab('SMS')}
                    icon={MessageSquare}
                    label="SMS"
                />
                <TabButton
                    active={activeTab === 'Notifications'}
                    onClick={() => setActiveTab('Notifications')}
                    icon={Bell}
                    label="Notifications"
                />
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300">
                {activeTab === 'General' && (
                    <GeneralTab config={generalConfig} onChange={setGeneralConfig} onLogoUpload={handleLogoUpload} />
                )}
                {activeTab === 'Visitor Rules' && (
                    <VisitorRulesTab rules={visitorRules} onChange={setVisitorRules} />
                )}
                {activeTab === 'QR Settings' && (
                    <QRSettingsTab settings={qrSettings} onChange={setQrSettings} />
                )}
                {activeTab === 'SMS' && (
                    <SMSTab templates={smsTemplates} onChange={setSmsTemplates} />
                )}
                {activeTab === 'Notifications' && (
                    <NotificationsTab
                        settings={notificationSettings}
                        triggers={notificationTriggers}
                        onSettingsChange={setNotificationSettings}
                        onTriggersChange={setNotificationTriggers}
                    />
                )}
            </div>

            {/* Global Save Button */}
            <div className="flex justify-end mt-8 sticky bottom-8">
                <button
                    onClick={handleSaveConfiguration}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                    Save Configuration
                </button>
            </div>
        </div>
    );
}

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 font-semibold border-b-2 transition-all flex items-center gap-2 ${active
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
            }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);
