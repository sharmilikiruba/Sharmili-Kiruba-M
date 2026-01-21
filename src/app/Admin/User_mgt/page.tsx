import DashboardLayout from "@/components/shared/layout";
import UserManagement from "@/components/admin/users/UserManagement";

export default function UserMgtPage() {
  return (
    <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
      <UserManagement />
    </DashboardLayout>
  )
}   