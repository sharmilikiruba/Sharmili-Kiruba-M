"use client";
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import apiClient from '@/lib/api-client';

// Modular Imports
import {
    TabType,
    NotificationSettings,
    NotificationTriggers
} from './types'


import { NotificationsTab } from './NotificationsTab';

export default function SystemConfiguration() {
    const [activeTab, setActiveTab] = useState<TabType>('Notifications');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // Notification Channels State
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        emailNotifications: false,
        pushNotifications: false
    });

    // Notification Triggers State
    const [notificationTriggers, setNotificationTriggers] = useState<NotificationTriggers>({
        requestSubmitted: false,
        requestApproved: false,
        requestRejected: false,
        visitorEntered: false,
        visitorExited: false,
        overstayAlert: false,
        emergencyRequest: false,
    });

    // Load settings from API on mount
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            if (typeof window === 'undefined') return;
            setLoading(true);

            const notifRes = await apiClient.get('/admin/notification-settings');

            // Populate notification settings & triggers
            if (notifRes.data.success && notifRes.data.data) {
                const d = notifRes.data.data;
                setNotificationSettings(prev => ({
                    emailNotifications: d.emailNotifications ?? prev.emailNotifications,
                    pushNotifications: d.pushNotifications ?? prev.pushNotifications,
                }));
                setNotificationTriggers(prev => ({
                    requestSubmitted: d.requestSubmitted ?? prev.requestSubmitted,
                    requestApproved: d.requestApproved ?? prev.requestApproved,
                    requestRejected: d.requestRejected ?? prev.requestRejected,
                    visitorEntered: d.visitorEntered ?? prev.visitorEntered,
                    visitorExited: d.visitorExited ?? prev.visitorExited,
                    overstayAlert: d.overstayAlert ?? prev.overstayAlert,
                    emergencyRequest: d.emergencyRequest ?? prev.emergencyRequest,
                }));
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveConfiguration = async () => {
        try {
            setSaving(true);

            const [notifRes] = await Promise.all([
                apiClient.put('/admin/notification-settings', {
                    ...notificationSettings,
                    ...notificationTriggers,
                }),

            ]);

            if (notifRes.data.success) {
                alert('Configuration saved successfully!');
                window.dispatchEvent(new Event('storage'));
            }
        } catch (error: any) {
            console.error("Error saving configuration:", error);
            alert(error.response?.data?.message || 'Failed to save configuration');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 w-full bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 w-full bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
                <p className="text-gray-600 mt-1">Configure visitor rules, notifications, and system settings</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <TabButton
                    active={activeTab === 'Notifications'}
                    onClick={() => setActiveTab('Notifications')}
                    icon={Bell}
                    label="Notifications"
                />
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300">
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
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {saving ? 'Saving...' : 'Save Configuration'}
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
