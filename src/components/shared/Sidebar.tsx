// Sidebar.tsx

"use client"
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, User, History, Clock, CheckCircle, Users,
  FileText, Settings, Shield, ScrollText, Building2, UserCog,
  ChevronDown, ChevronRight, LogIn, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  collapsible?: boolean;
  subitems?: SubItem[];
}

interface SubItem {
  id: string;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  activeItem?: string;
  onItemClick: (label: string, href: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onItemClick }) => {
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  // Sidebar configurations for each role
  const sidebarConfig: Record<string, SidebarItem[]> = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/student/student_dashboard' },
      {
        id: 'myrequest',
        label: 'My Request',
        icon: User,
        href: '/student/myrequest',
      },

      { id: 'visitor-history', label: 'Visitor History', icon: History, href: '/student/visitor_history' },
      {
        id: 'profile',
        label: 'Profile',
        icon: User,
        href: '/student/student_profile',
      }
    ],
    warden: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/Warden/WardenDashboard' },
      { id: 'hostel-student', label: 'Hostel Student', icon: Users, href: '/Warden/Hostel_student' },
      { id: 'pending-requests', label: 'Pending Requests', icon: Clock, href: '/Warden/Pending_Request' },
      { id: 'approved-visits', label: 'Approved Visits', icon: CheckCircle, href: '/Warden/Approved_visit' },
      { id: 'active-visitors', label: 'Active Visitors', icon: Users, href: '/Warden/Active_Visitors' },
      {
        id: 'reports', label: 'Reports', icon: FileText, href: '/Warden/reports',
      },
    ],
    guard: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/Guard/guard_dashboard' },
      {
        id: 'profile',
        label: 'Profile',
        icon: User,
        href: '/Guard/guard_profile',
      },
      { id: 'Scan-Visitors', label: 'Scan Visitors', icon: LogIn, href: '/Guard/Scan-Entry' },
      { id: 'walkin-registration', label: 'Walk-in Registration', icon: UserCog, href: '/Guard/WalkIn-Registration' },
      { id: 'active-visitors', label: 'Active Visitors', icon: Users, href: '/Guard/Active_Visitors' },
      { id: 'Emergency-visit', label: 'Emergency Visit', icon: Users, href: '/Guard/Emergency_visit' }
    ],

    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/Admin/Admin_dashboard' },    
      { id: 'user-management', label: 'User Management', icon: Users, href: '/Admin/User_mgt' },
      { id: 'hostel-management', label: 'Hostel Management', icon: Building2, href: '/Admin/Hostel_mgt' },
      { id: 'reports-analytics', label: 'Reports & Analytics', icon: FileText, href: '/Admin/Admin_reports' },
      { id: 'system-config', label: 'System Configuration', icon: Settings, href: '/Admin/system_config' },
    ],
    super_admin: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/Admin/Admin_dashboard' },
      { id: 'user-management', label: 'User Management', icon: Users, href: '/Admin/User_mgt' },
      { id: 'hostel-management', label: 'Hostel Management', icon: Building2, href: '/Admin/Hostel_mgt' },
      { id: 'reports-analytics', label: 'Reports & Analytics', icon: FileText, href: '/Admin/Admin_reports' },
      { id: 'system-config', label: 'System Configuration', icon: Settings, href: '/Admin/system_config' },
    ]
  };

  const currentSidebar = sidebarConfig[userRole] || [];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.collapsible) {
      toggleExpanded(item.id);
    } else {
      router.push(item.href);
      // We don't rely on activeItem prop anymore, so no change here for visual state
    }
    // onItemClick(item.label, item.href); // Optional if parent needs to know, but we rely on pathname now
  };

  const isActive = (href: string) => {
    // Exact match or sub-path match can be implemented here
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col fixed left-0 top-0 h-screen z-50`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">HVMS</h1>
            <p className="text-xs text-gray-400">Visitor Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {currentSidebar.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.href) && !item.collapsible
                ? 'bg-blue-600 text-white'
                : 'text-white hover:bg-gray-800'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.collapsible && (
                expandedItems.includes(item.id) ?
                  <ChevronDown className="w-4 h-4" /> :
                  <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Collapsible Subitems */}
            {item.collapsible && expandedItems.includes(item.id) && item.subitems && (
              <div className="ml-4 mt-2 space-y-1">
                {item.subitems.map((subitem) => (
                  <button
                    key={subitem.id}
                    onClick={() => router.push(subitem.href)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${isActive(subitem.href)
                      ? 'bg-gray-800 text-white'
                      : 'text-white hover:bg-gray-800 hover:text-white'
                      }`}
                  >
                    {subitem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}

    </aside>
  );
};

export default Sidebar;