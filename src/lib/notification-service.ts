import apiClient from './api-client';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info' | 'emergency';
    read: boolean;
    createdAt: string;
}

export interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
}

const notificationService = {
    /**
     * Fetch unread and read notifications for the current user
     */
    async getNotifications() {
        try {
            const response = await apiClient.get('/protected/notifications');
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    },

    /**
     * Mark a specific notification as read
     */
    async markAsRead(id: string) {
        try {
            const response = await apiClient.patch(`/protected/notifications/${id}/read`);
            return response.data;
        } catch (error) {
            console.error(`Error marking notification ${id} as read:`, error);
            throw error;
        }
    },

    /**
     * Update user notification settings
     */
    async updateSettings(settings: Partial<NotificationSettings>) {
        try {
            const response = await apiClient.patch('/protected/notifications/settings', settings);
            return response.data;
        } catch (error) {
            console.error('Error updating notification settings:', error);
            throw error;
        }
    }
};

export default notificationService;
