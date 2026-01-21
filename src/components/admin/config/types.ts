export type TabType = 'General' | 'Visitor Rules' | 'QR Settings' | 'SMS' | 'Notifications';

export interface GeneralConfig {
    instituteName: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
}

export interface VisitorRules {
    weekdayStart: string;
    weekdayEnd: string;
    weekendStart: string;
    weekendEnd: string;
    defaultDuration: string;
    maxDailyVisitors: string;
    advanceBookingDays: string;
    emergencyAutoNotify: boolean;
    allowWalkIn: boolean;
}

export interface QRSettings {
    passValidity: string;
    passFormat: string;
    autoExpiry: boolean;
    includePhoto: boolean;
    requireSignature: boolean;
}

export interface SMSSettings {
    provider: string;
    apiKey: string;
    senderId: string;
    creditsBalance: string;
}

export interface SMSTemplate {
    enabled: boolean;
    template: string;
}

export type SMSTemplates = Record<string, SMSTemplate>;

export interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
}

export interface NotificationTriggers {
    requestSubmitted: boolean;
    requestApproved: boolean;
    requestRejected: boolean;
    visitorEntered: boolean;
    visitorExited: boolean;
    overstayAlert: boolean;
    emergencyRequest: boolean;
}
