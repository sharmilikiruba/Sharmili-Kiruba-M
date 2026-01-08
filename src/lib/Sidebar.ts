// lib/sidebar-menu.ts
import {
  LayoutDashboard,
  User,
  ClipboardList,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Shield,
  Building2,
  Settings,
  BarChart3,
  ScanLine,
} from 'lucide-react'

export const SIDEBAR_MENU = {
  STUDENT: [
    { href: '/student_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student_profile', label: 'My Profile', icon: User },
    { href: '/studReq', label: 'New Request', icon: ClipboardList },
    { href: '/myrequest', label: 'My Requests', icon: Clock },
  ],

  WARDEN: [
    { href: '/warden/warden_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/warden/pending_req', label: 'Pending Requests', icon: ClipboardList },
    { href: '/warden/approved_visits', label: 'Approved Visits', icon: CheckCircle },
    { href: '/warden/active_visitors', label: 'Active Visitors', icon: Users },
    { href: '/warden/warden report', label: 'Reports', icon: FileText },
  ],

  GUARD: [
    { href: '/guard/active-visitors', label: 'Active Visitors', icon: Users },
    { href: '/guard/walkin', label: 'Walk-in Registration', icon: ScanLine },
  ],

  ADMIN: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'User Management', icon: Shield },
    { href: '/admin/hostels', label: 'Hostel Management', icon: Building2 },
    { href: '/admin/system-config', label: 'System Configuration', icon: Settings },
    { href: '/admin/security', label: 'Security', icon: Shield },
    { href: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { href: '/admin/audit-logs', label: 'Audit Logs', icon: FileText },
  ],
} as const
