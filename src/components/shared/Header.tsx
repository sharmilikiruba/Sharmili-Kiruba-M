// Header.tsx
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Bell, LogOut, User, CheckCircle, XCircle, AlertTriangle, Info, Clock, LogIn, LogOut as LogOutIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'emergency';
  read: boolean;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user, logout } = useAuth();
  const userName = user?.name || '';
  const userEmail = user?.email || '';
  const userRole = user?.role || 'student';
  const hostelInfo = user?.hostelInfo;
  const roomInfo = user?.roomInfo;
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize notifications based on role
  useEffect(() => {
    const updateNotifications = () => {
      // Get config from localStorage
      const savedConfig = localStorage.getItem('notificationTriggers');
      const config = savedConfig ? JSON.parse(savedConfig) : {
        requestSubmitted: true,
        requestApproved: true,
        requestRejected: true,
        visitorEntered: true,
        visitorExited: true,
        overstayAlert: true,
        emergencyRequest: true,
      };

      const getMockNotifications = (role: string): Notification[] => {
        const allNotifications: Record<string, Notification[]> = {
          student: [
            ...(config.requestApproved ? [{ id: '1', title: 'Request Approved', message: 'Your family visit request has been approved.', time: '10 mins ago', type: 'success', read: false } as Notification] : []),
            ...(config.requestRejected ? [{ id: '2', title: 'Request Rejected', message: 'Your late night outing request was rejected.', time: '1 hour ago', type: 'error', read: false } as Notification] : []),
            ...(config.overstayAlert ? [{ id: '3', title: 'Overstay Alert', message: 'You have exceeded the allowed time for your outing.', time: '2 hours ago', type: 'warning', read: true } as Notification] : []),
          ],
          warden: [
            ...(config.emergencyRequest ? [{ id: '1', title: 'Emergency Request', message: 'Medical emergency reported in Room 302.', time: 'Just now', type: 'emergency', read: false } as Notification] : []),
            ...(config.requestSubmitted ? [{ id: '2', title: 'Request Submitted', message: 'New visitor request from Rahul Sharma.', time: '5 mins ago', type: 'info', read: false } as Notification] : []),
            ...(config.overstayAlert ? [{ id: '3', title: 'Overstay Alert', message: 'Visitor for Priya Patel has overstayed.', time: '30 mins ago', type: 'warning', read: false } as Notification] : []),
            ...(config.visitorEntered ? [{ id: '4', title: 'Visitor Entered', message: 'Suresh Sharma has entered the premises.', time: '1 hour ago', type: 'info', read: true } as Notification] : []),
            ...(config.visitorExited ? [{ id: '5', title: 'Visitor Exited', message: 'Mohan Lal has exited.', time: '2 hours ago', type: 'info', read: true } as Notification] : []),
          ],
          guard: [
            ...(config.visitorEntered ? [{ id: '1', title: 'Visitor Entered', message: 'Suresh Sharma checked in at Gate 1.', time: '2 mins ago', type: 'info', read: false } as Notification] : []),
            ...(config.visitorExited ? [{ id: '2', title: 'Visitor Exited', message: 'Mohan Lal checked out at Gate 1.', time: '15 mins ago', type: 'info', read: false } as Notification] : []),
            ...(config.overstayAlert ? [{ id: '3', title: 'Overstay Alert', message: 'Visitor Pass #4592 has expired/overstayed.', time: '1 hour ago', type: 'warning', read: false } as Notification] : []),
          ],
          admin: [
            ...(config.emergencyRequest ? [{ id: '1', title: 'Emergency Notification', message: 'Warden reported a medical emergency in Hostel A.', time: '10 mins ago', type: 'emergency', read: false } as Notification] : []),
            ...(config.overstayAlert ? [{ id: '2', title: 'Overstay Alert', message: 'Multiple overstay alerts in Hostel B.', time: '3 hours ago', type: 'warning', read: true } as Notification] : []),
          ],
        };

        return allNotifications[role] || [];
      };

      setNotifications(getMockNotifications(userRole));
    };

    // Initial load
    updateNotifications();

    // Listen for storage changes
    window.addEventListener('storage', updateNotifications);

    // Also listen for a custom event for same-window updates
    window.addEventListener('notificationConfigChange', updateNotifications);

    return () => {
      window.removeEventListener('storage', updateNotifications);
      window.removeEventListener('notificationConfigChange', updateNotifications);
    };
  }, [userRole]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIconForType = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Role-based profile menu items
  const getProfileMenuItems = () => {
    const roleSpecificItems = {
      student: [
        {
          icon: User,
          label: 'My Profile',
          href: '/student/student_profile',
        },
      ],
      warden: [
        {
          icon: User,
          label: 'My Profile',
          href: '/Warden/Warden_Profile',
        },
      ],
      guard: [
        {
          icon: User,
          label: 'My Profile',
          href: '/Guard/guard_profile',
        },
      ],
      admin: [
        {
          icon: User,
          label: 'My Profile',
          href: '/Admin/Admin_Profile',
        },
      ],
      super_admin: [
        {
          icon: User,
          label: 'My Profile',
          href: '/Admin/Admin_Profile',
        },
      ],
    }

    return roleSpecificItems[userRole] || [];
  }


  const roleColors: Record<string, string> = {
    student: 'bg-blue-600',
    warden: 'bg-purple-600',
    guard: 'bg-green-600',
    admin: 'bg-red-600',
    super_admin: 'bg-red-700'
  };

  const roleBadgeColors: Record<string, string> = {
    student: 'bg-blue-100 text-blue-800',
    warden: 'bg-purple-100 text-purple-800',
    guard: 'bg-green-100 text-green-800',
    admin: 'bg-red-100 text-red-800',
    super_admin: 'bg-red-100 text-red-800'
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome, {userName}!
            </h2>
            {(hostelInfo || roomInfo) && (
              <p className="text-sm text-gray-500">
                {hostelInfo && hostelInfo}
                {hostelInfo && roomInfo && ' • '}
                {roomInfo && roomInfo}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-0 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div key={notif.id} className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                        <div className="flex gap-3">
                          <div className="mt-1 flex-shrink-0">
                            {getIconForType(notif.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-200 text-center bg-gray-50 rounded-b-lg">
                  <button className="text-xs text-gray-500 hover:text-gray-700">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors"
            >
              <div className={`w-10 h-10 ${roleColors[userRole]} rounded-full flex items-center justify-center text-white font-semibold`}>
                {getInitials(userName)}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-800">{userName}</p>
                <p className={`text-xs px-2 py-0.5 rounded-full inline-block ${roleBadgeColors[userRole]} font-medium uppercase`}>
                  {userRole}
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                  <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${roleBadgeColors[userRole]} font-medium uppercase`}>
                    {userRole}
                  </span>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {getProfileMenuItems().map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 pt-2">
                  <button
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                    onClick={() => {
                      logout();
                      router.push('/login/login_page');
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;