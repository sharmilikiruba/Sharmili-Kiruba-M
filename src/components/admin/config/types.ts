export type TabType = 'General' | 'Visitor Rules' | 'Notifications';

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


export interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
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
