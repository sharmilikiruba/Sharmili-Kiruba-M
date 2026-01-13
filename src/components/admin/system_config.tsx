"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Home, Users, Layout, Settings, BarChart3, Lock, FileText,
    Building, Shield, AlertCircle, Bell, MessageSquare, Eye,
    EyeOff, Upload, Clock, ChevronDown
} from 'lucide-react';

type TabType = 'General' | 'Visitor Rules' | 'QR Settings' | 'SMS' | 'Notifications';

export default function SystemConfiguration() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('General');
    const [showApiKey, setShowApiKey] = useState(false);

    // General Tab State
    const [generalConfig, setGeneralConfig] = useState({
        instituteName: 'Central University',
        contactEmail: 'admin@university.edu',
        contactPhone: '+91 11 2345 6789',
        address: 'University Road, Academic City, State - 110001',
        timezone: 'Asia/Kolkata (IST)',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '12-hour',
    });

    // Visitor Rules State
    const [visitorRules, setVisitorRules] = useState({
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
    const [qrSettings, setQrSettings] = useState({
        passValidity: '4',
        passFormat: 'Standard (Compact)',
        autoExpiry: true,
        includePhoto: true,
        requireSignature: false,
    });

    // SMS Settings State
    const [smsSettings, setSmsSettings] = useState({
        provider: 'Twilio',
        apiKey: '••••••••••••••••',
        senderId: 'UNIHMS',
        creditsBalance: '4,850',
    });

    // SMS Templates State
    const [smsTemplates, setSmsTemplates] = useState<Record<string, { enabled: boolean; template: string }>>({
        approvalSms: { enabled: true, template: "Hi {visitor_name}, your visit request to meet {host_name} has been approved. Please show QR code at gate." },
        rejectionSms: { enabled: true, template: "Hi {visitor_name}, your visit request to meet {host_name} was not approved." },
        entryConfirmation: { enabled: true, template: "Welcome {visitor_name}! You have successfully checked in at {time}." },
        exitConfirmation: { enabled: true, template: "Goodbye {visitor_name}. You checked out at {time}. thanks for visiting." },
        reminderSms: { enabled: true, template: "Reminder: You have a scheduled visit tomorrow with {host_name} at {time}." },
    });

    // Notification Settings State
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: true,
    });

    // Notification Triggers State
    const [notificationTriggers, setNotificationTriggers] = useState({
        requestSubmitted: true,
        requestApproved: true,
        requestRejected: true,
        visitorEntered: true,
        visitorExited: true,
        overstayAlert: true,
        emergencyRequest: true,
    });

    const handleSaveConfiguration = () => {
        alert('Configuration saved successfully!');
    };

    const handleLogoUpload = () => {
        alert('Logo upload functionality');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Content */}
            <div className="p-8 w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
                    <p className="text-gray-600 mt-1">Configure visitor rules, notifications, and system settings</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab('General')}
                        className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'General'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Building className="w-4 h-4" />
                        General
                    </button>
                    <button
                        onClick={() => setActiveTab('Visitor Rules')}
                        className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Visitor Rules'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <AlertCircle className="w-4 h-4" />
                        Visitor Rules
                    </button>
                    <button
                        onClick={() => setActiveTab('QR Settings')}
                        className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'QR Settings'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        QR Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('SMS')}
                        className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'SMS'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        SMS
                    </button>
                    <button
                        onClick={() => setActiveTab('Notifications')}
                        className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Notifications'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Bell className="w-4 h-4" />
                        Notifications
                    </button>
                </div>

                {/* General Tab */}
                {activeTab === 'General' && (
                    <div className="space-y-6">
                        {/* Institute Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Building className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-900">Institute Information</h2>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">Basic information about your institution</p>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label>
                                    <input
                                        type="text"
                                        value={generalConfig.instituteName}
                                        onChange={(e) => setGeneralConfig({ ...generalConfig, instituteName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Institute Logo</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <button
                                            onClick={handleLogoUpload}
                                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload Logo
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                                    <input
                                        type="email"
                                        value={generalConfig.contactEmail}
                                        onChange={(e) => setGeneralConfig({ ...generalConfig, contactEmail: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                                    <input
                                        type="text"
                                        value={generalConfig.contactPhone}
                                        onChange={(e) => setGeneralConfig({ ...generalConfig, contactPhone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <textarea
                                        value={generalConfig.address}
                                        onChange={(e) => setGeneralConfig({ ...generalConfig, address: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Regional Settings */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Settings className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-900">Regional Settings</h2>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">Configure timezone and date/time formats</p>

                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                                    <select
                                        value={generalConfig.timezone}
                                        onChange={(e) => setGeneralConfig({ ...generalConfig, timezone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option>Asia/Kolkata (IST)</option>
                                        <option>America/New_York (EST)</option>
                                        <option>Europe/London (GMT)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                                    <select
                                        value={generalConfig.dateFormat}
                                        onChange={(e) => setGeneralConfig({ ...generalConfig, dateFormat: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option>DD/MM/YYYY</option>
                                        <option>MM/DD/YYYY</option>
                                        <option>YYYY-MM-DD</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="timeFormat"
                                                value="12-hour"
                                                checked={generalConfig.timeFormat === '12-hour'}
                                                onChange={(e) => setGeneralConfig({ ...generalConfig, timeFormat: e.target.value })}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">12-hour</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="timeFormat"
                                                value="24-hour"
                                                checked={generalConfig.timeFormat === '24-hour'}
                                                onChange={(e) => setGeneralConfig({ ...generalConfig, timeFormat: e.target.value })}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">24-hour</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Visitor Rules Tab */}
                {activeTab === 'Visitor Rules' && (
                    <div className="space-y-6">
                        {/* Visiting Hours */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-900">Visiting Hours</h2>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">Define allowed visiting hours for weekdays and weekends</p>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Weekday Hours</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    value={visitorRules.weekdayStart}
                                                    onChange={(e) => setVisitorRules({ ...visitorRules, weekdayStart: e.target.value })}
                                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                                <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    value={visitorRules.weekdayEnd}
                                                    onChange={(e) => setVisitorRules({ ...visitorRules, weekdayEnd: e.target.value })}
                                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                                <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Weekend Hours</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    value={visitorRules.weekendStart}
                                                    onChange={(e) => setVisitorRules({ ...visitorRules, weekendStart: e.target.value })}
                                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                                <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    value={visitorRules.weekendEnd}
                                                    onChange={(e) => setVisitorRules({ ...visitorRules, weekendEnd: e.target.value })}
                                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                                <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visitor Limits & Rules */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Settings className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-900">Visitor Limits & Rules</h2>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">Configure visitor limits and booking restrictions</p>

                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Visit Duration</label>
                                    <select
                                        value={visitorRules.defaultDuration}
                                        onChange={(e) => setVisitorRules({ ...visitorRules, defaultDuration: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option>1 hour</option>
                                        <option>2 hours</option>
                                        <option>3 hours</option>
                                        <option>4 hours</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Default duration for new requests</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Daily Visitors per Student</label>
                                    <input
                                        type="number"
                                        value={visitorRules.maxDailyVisitors}
                                        onChange={(e) => setVisitorRules({ ...visitorRules, maxDailyVisitors: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Maximum visitors allowed per day</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Advance Booking Days</label>
                                    <input
                                        type="number"
                                        value={visitorRules.advanceBookingDays}
                                        onChange={(e) => setVisitorRules({ ...visitorRules, advanceBookingDays: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Days in advance booking is allowed</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-t border-gray-200">
                                    <div>
                                        <p className="font-medium text-gray-900">Emergency Request Auto-Notify</p>
                                        <p className="text-sm text-gray-600">Automatically notify warden for emergency requests</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setVisitorRules({ ...visitorRules, emergencyAutoNotify: !visitorRules.emergencyAutoNotify })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${visitorRules.emergencyAutoNotify ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visitorRules.emergencyAutoNotify ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-3 border-t border-gray-200">
                                    <div>
                                        <p className="font-medium text-gray-900">Allow Walk-in Visitors</p>
                                        <p className="text-sm text-gray-600">Allow visitors without prior appointment</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setVisitorRules({ ...visitorRules, allowWalkIn: !visitorRules.allowWalkIn })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${visitorRules.allowWalkIn ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visitorRules.allowWalkIn ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* QR Settings Tab */}
                {activeTab === 'QR Settings' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                <h2 className="text-xl font-bold text-gray-900">QR Pass Configuration</h2>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">Configure visitor pass settings and validity</p>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pass Validity (Hours)</label>
                                    <input
                                        type="number"
                                        value={qrSettings.passValidity}
                                        onChange={(e) => setQrSettings({ ...qrSettings, passValidity: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pass Format</label>
                                    <select
                                        value={qrSettings.passFormat}
                                        onChange={(e) => setQrSettings({ ...qrSettings, passFormat: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option>Standard (Compact)</option>
                                        <option>Detailed (Full Info)</option>
                                        <option>Minimal (QR Only)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                                {[
                                    { key: 'autoExpiry', label: 'Auto-expire passes after validity period', desc: 'Automatically invalidate passes when time is up' },
                                    { key: 'includePhoto', label: 'Include Visitor Photo in Pass', desc: 'Show visitor photo on the generated pass' },
                                    { key: 'requireSignature', label: 'Require Digital Signature', desc: 'Require visitor signature before generating pass' }
                                ].map((setting) => (
                                    <div key={setting.key} className="flex items-center justify-between py-2">
                                        <div>
                                            <p className="font-medium text-gray-900">{setting.label}</p>
                                            <p className="text-sm text-gray-600">{setting.desc}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setQrSettings({ ...qrSettings, [setting.key]: !qrSettings[setting.key as keyof typeof qrSettings] })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${qrSettings[setting.key as keyof typeof qrSettings] ? 'bg-blue-600' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${qrSettings[setting.key as keyof typeof qrSettings] ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SMS Settings Tab */}
                {activeTab === 'SMS' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-900">SMS Gateway Configuration</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                                    <select
                                        value={smsSettings.provider}
                                        onChange={(e) => setSmsSettings({ ...smsSettings, provider: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option>Twilio</option>
                                        <option>AWS SNS</option>
                                        <option>Msg91</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                                    <div className="relative">
                                        <input
                                            type={showApiKey ? "text" : "password"}
                                            value={smsSettings.apiKey}
                                            onChange={(e) => setSmsSettings({ ...smsSettings, apiKey: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowApiKey(!showApiKey)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sender ID</label>
                                    <input
                                        type="text"
                                        value={smsSettings.senderId}
                                        onChange={(e) => setSmsSettings({ ...smsSettings, senderId: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Credits Balance</label>
                                    <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-medium">
                                        {smsSettings.creditsBalance}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">SMS Templates & Triggers</h3>
                            <div className="space-y-6">
                                {Object.entries(smsTemplates).map(([key, value]) => (
                                    <div key={key} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                                <p className="text-sm text-gray-500">Enable/disable this SMS notification</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSmsTemplates({
                                                    ...smsTemplates,
                                                    [key]: { ...value, enabled: !value.enabled }
                                                })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value.enabled ? 'bg-blue-600' : 'bg-gray-300'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value.enabled ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                        {value.enabled && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Message Template</label>
                                                <textarea
                                                    value={value.template}
                                                    onChange={(e) => setSmsTemplates({
                                                        ...smsTemplates,
                                                        [key]: { ...value, template: e.target.value }
                                                    })}
                                                    rows={3}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                                    placeholder="Enter SMS template..."
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Available variables: {'{visitor_name}'}, {'{host_name}'}, {'{time}'}, {'{date}'}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'Notifications' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Bell className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-900">Notification Channels</h2>
                            </div>
                            <div className="space-y-4">
                                {Object.entries(notificationSettings).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                        <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                        <button
                                            type="button"
                                            onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Triggers</h3>
                            <div className="space-y-3">
                                {Object.entries(notificationTriggers).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between py-2">
                                        <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                        <button
                                            type="button"
                                            onClick={() => setNotificationTriggers({ ...notificationTriggers, [key]: !value })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleSaveConfiguration}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}