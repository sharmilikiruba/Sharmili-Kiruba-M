// Layout.tsx
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  userRole: 'student' | 'warden' | 'guard' | 'admin';
  userName: string;
  userEmail: string;
  hostelInfo?: string;
  roomInfo?: string;
}

const DashboardLayout: React.FC<LayoutProps> = ({
  children,
  userRole,
  userName,
  userEmail,
  hostelInfo,
  roomInfo
}) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (label: string, href: string) => {
    setActiveItem(label);
    router.push(href);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        userRole={userRole}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userRole={userRole}
          userName={userName}
          userEmail={userEmail}
          hostelInfo={hostelInfo}
          roomInfo={roomInfo}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;