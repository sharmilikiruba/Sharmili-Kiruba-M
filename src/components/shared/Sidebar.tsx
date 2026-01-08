// Sidebar.tsx
import React, { useState } from 'react';
import { 
  LayoutDashboard, User, History, Clock, CheckCircle, Users, 
  FileText, Settings, Shield, ScrollText, Building2, UserCog,
  ChevronDown, ChevronRight
} from 'lucide-react';

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
  userRole: 'student' | 'warden' | 'guard' | 'admin';
  activeItem: string;
  onItemClick: (label: string, href: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole, activeItem, onItemClick }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Sidebar configurations for each role
  const sidebarConfig: Record<string, SidebarItem[]> = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { 
        id: 'profile', 
        label: 'Profile', 
        icon: User,
        href: '/profile',
        collapsible: true,
        subitems: [
          { id: 'personal-info', label: 'Personal Information', href: '/profile/personal' },
          { id: 'emergency-contacts', label: 'Emergency Contacts', href: '/profile/emergency' },
          { id: 'settings', label: 'Settings', href: '/profile/settings' }
        ]
      },
      { id: 'visitor-history', label: 'Visitor History', icon: History, href: '/visitor-history' }
    ],
    warden: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { id: 'pending-requests', label: 'Pending Requests', icon: Clock, href: '/pending-requests' },
      { id: 'approved-visits', label: 'Approved Visits', icon: CheckCircle, href: '/approved-visits' },
      { id: 'active-visitors', label: 'Active Visitors', icon: Users, href: '/active-visitors' },
      { id: 'reports', label: 'Reports', icon: FileText, href: '/reports' }
    ],
    guard: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { id: 'walkin-registration', label: 'Walk-in Registration', icon: UserCog, href: '/walkin-registration' }
    ],
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { id: 'user-management', label: 'User Management', icon: Users, href: '/user-management' },
      { id: 'hostel-management', label: 'Hostel Management', icon: Building2, href: '/hostel-management' },
      { id: 'system-config', label: 'System Configuration', icon: Settings, href: '/system-config' },
      { id: 'reports-analytics', label: 'Reports & Analytics', icon: FileText, href: '/reports-analytics' },
      { id: 'security-management', label: 'Security Management', icon: Shield, href: '/security-management' },
      { id: 'audit-logs', label: 'Audit Logs', icon: ScrollText, href: '/audit-logs' }
    ]
  };

  const currentSidebar = sidebarConfig[userRole];

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
    }
    onItemClick(item.label, item.href);
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
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeItem === item.label
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
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
                    onClick={() => onItemClick(subitem.label, subitem.href)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeItem === subitem.label
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">© 2026 University HVMS</p>
      </div>
    </aside>
  );
};

export default Sidebar;