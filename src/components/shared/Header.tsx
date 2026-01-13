// Header.tsx
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Bell, LogOut, User, Settings, Shield, FileText } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userRole: 'student' | 'warden' | 'guard' | 'admin';
  userName: string;
  userEmail: string;
  hostelInfo?: string;
  roomInfo?: string;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  userRole,
  userName,
  userEmail,
  hostelInfo,
  roomInfo
}) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
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
  }

  return roleSpecificItems[userRole]
}


  const roleColors = {
    student: 'bg-blue-600',
    warden: 'bg-purple-600',
    guard: 'bg-green-600',
    admin: 'bg-red-600'
  };

  const roleBadgeColors = {
    student: 'bg-blue-100 text-blue-800',
    warden: 'bg-purple-100 text-purple-800',
    guard: 'bg-green-100 text-green-800',
    admin: 'bg-red-100 text-red-800'
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
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

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
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
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